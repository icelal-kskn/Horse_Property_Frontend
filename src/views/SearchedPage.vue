<template>
    <div id="searchedPage">
        <div class="header-overlay">
            <AppHeader />
        </div>
        <div class="content">
            <error-dialog ref="errorDialog" :error="errorData" />
            <div v-if="loading" class="loading">
                <v-progress-circular indeterminate></v-progress-circular>
            </div>
            <div v-else>

                <v-row>
                    <v-col v-for="card in properties" :key="card._id" cols="12" sm="6" md="4" lg="3">
                        <CardComponent :id="card._id"
                            :imageUrl="card?.images?.filter(img => img)?.[0] || 'bg-image.jpeg'"
                            :title="card.title" :city="card.location.city" :district="card.location.district"
                            :price="card.price" :fav="false" />
                    </v-col>
                </v-row>
            </div>
            <div class="pagination mt-8">
                <VPagination v-model="currentPage" :length="pagination.totalPages" :total-visible="8"
                    prev-icon="mdi-menu-left" next-icon="mdi-menu-right" @input="fetchProperties"></VPagination>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/plugins/axios';
import AppHeader from '@/components/_Layout/AppHeader.vue';
import CardComponent from '@/components/Widgets/CardComponent.vue';
import ErrorDialog from '@/components/Widgets/WarningDialog.vue';

export default {
    name: 'SearchedPage',
    components: {
        AppHeader,
        CardComponent,
        ErrorDialog
    },
    data() {
        return {
            properties: [],
            loading: true,
            currentPage: 1,
            pagination: {
                totalPages: 1,
                totalProperties: 0
            },
            filters: {
                city: '',
                district: '',
                status: '',
                minPrice: 0,
                maxPrice: 0,
                bathrooms: 0,
                bedrooms: 0,
                radius: 0,
            },
            errorData: { type: '', message: '' },
        }
    },
    created() {
        // Parse route query parameters
        Object.keys(this.$route.query).forEach((key) => {
            if (key in this.filters) {
                // Convert to appropriate type
                this.filters[key] = this.$route.query[key];
            }
        });

        // Fetch properties on component creation
        this.fetchProperties();
    },
    methods: {
        async fetchProperties() {
            this.loading = true;
            try {
                // Construct query parameters
                const params = {
                    page: this.currentPage,
                    city: this.filters.city,
                    district: this.filters.district,
                    status: this.filters.status,
                    minPrice: this.filters.minPrice,
                    maxPrice: this.filters.maxPrice,
                    bathrooms: this.filters.bathrooms,
                    bedrooms: this.filters.bedrooms,
                    radius: this.filters.radius
                };

                // Remove undefined or empty values
                Object.keys(params).forEach(key =>
                    (params[key] === '' || params[key] === 0) && delete params[key]
                );

                // Make API call
                const response = await axios.get('/api/property', { params });

                // Update component data
                this.properties = response.data.properties;
                this.pagination = response.data.pagination;
                console.log(this.properties);
                if (this.properties.length === 0) {
                    this.showErrorDialog('Info', 'No properties found');
                    setTimeout(() => {
                        this.$router.push('/');
                    }, 2000);
                }

            } catch (error) {
                this.showErrorDialog('Error', 'Failed to fetch properties');
                setTimeout(() => {
                    this.$router.push('/');
                }, 2000);
            } finally {
                this.loading = false;
            }
        },
        showErrorDialog(type, message) {
            this.errorData = { type, message };
            this.$refs.errorDialog.show();
        },
    }
}
</script>

<style scoped>
#searchedPage {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    overflow: hidden;
    justify-content: center
}

.content {
    width: 80%;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #E5E7F4;
    margin-bottom: 1rem;
}
</style>