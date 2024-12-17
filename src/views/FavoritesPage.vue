<template>
    <div id="favorites">

        <div class="header-overlay">
            <AppHeader />
        </div>

        <div class="content">
            <error-dialog ref="errorDialog" :error="errorData" />
            <div v-if="loading" class="loading">Loading...</div>
            <div v-else>

                <v-row>
                    <v-col v-for="card in properties" :key="card._id" cols="12" sm="6" md="4" lg="3">
                        <CardComponent :id="card._id"
                            :imageUrl="card.images && card.images.length > 0 ? card.images[0] : 'bg-image.jpeg'"
                            :title="card.title" :city="card.location.city" :district="card.location.district"
                            :price="card.price" :fav="false" />
                    </v-col>
                </v-row>
            </div>
            <div class="pagination mt-8">
                <VPagination v-model="currentPage" :length="pagination.totalPages" :total-visible="8"
                    prev-icon="mdi-menu-left" next-icon="mdi-menu-right" @input="fetchFavoriteProperties"></VPagination>
            </div>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/_Layout/AppHeader.vue';
import ErrorDialog from '@/components/Widgets/WarningDialog.vue';
import CardComponent from '@/components/Widgets/CardComponent.vue';
import axios from '@/plugins/axios';

export default {
    name: 'FavoritesPage',
    components: {
        AppHeader,
        ErrorDialog,
        CardComponent,
    },
    data() {
        return {
            errorData: { type: '', message: '' },
            loading: true,
            properties: [],
            currentPage: 1,
            pagination: {
                totalPages: 1,
                totalProperties: 0
            }
        }
    },
    mounted() {
        this.checkUserLogin();
        this.fetchFavoriteProperties();
    },
    methods: {
        checkUserLogin() {
            if (!localStorage.getItem('token')) {
                this.showErrorDialog('Error', 'You are not logged in. Please sign in to continue.');
                setTimeout(() => {
                    this.$router.push('/');
                }, 2000);
            }
        },
        async fetchFavoriteProperties() {
            try {
                this.loading = true;
                const response = await axios.get('/api/user/favorite', {
                    params: {
                        page: this.currentPage
                    }
                });

                this.properties = response.data.properties;
                this.pagination = response.data.pagination;

                if (this.properties.length === 0) {
                    this.showErrorDialog('Info', 'No favorite properties found');
                    if (this.currentPage === 1) {
                        setTimeout(() => {
                            this.$router.push('/');
                        }, 2000);
                    }
                }
                this.loading = false;
            } catch (error) {
                this.showErrorDialog('Error', 'Failed to fetch favorite properties');
                setTimeout(() => {
                    this.$router.push('/');
                }, 2000);
            }
        },
        showErrorDialog(type, message) {
            this.errorData = { type, message };
            this.$refs.errorDialog.show();
        }

    },
}
</script>

<style scoped>
#favorites {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    overflow: hidden;
    justify-content: center
}

.content {
    width: 90%;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #E5E7F4;
    margin-bottom: 1rem;
}
</style>