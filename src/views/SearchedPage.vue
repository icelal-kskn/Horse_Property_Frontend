<template>
    <div id="searchedPage">
        <div class="header-overlay">
            <AppHeader />
        </div>
        <div class="content">
            <div>
                <v-row>
                    <v-col v-for="card in cards" :key="card.id" cols="12" sm="6" md="4" lg="3">
                        <CardComponent :imageUrl="card.imageUrl" :title="card.title" :city="card.city"
                            :district="card.district" :price="card.price" :fav="card.isFavorite" />
                    </v-col>
                </v-row>

            </div>
            <div class="pagination">
                <VPagination v-model="currentPage" :length="totalPages" :total-visible="7" prev-icon="mdi-menu-left"
                    next-icon="mdi-menu-right"></VPagination>
            </div>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/_Layout/AppHeader.vue';
import CardComponent from '@/components/Widgets/CardComponent.vue';

export default {
    name: 'SearchedPage',
    components: {
        AppHeader,
        CardComponent
    },
    data() {
        return {
            recievedData: {
                city: '',
                district: '',
                status: '',
                priceFrom: 0,
                priceTo: 0,
                bathrooms: 0,
                bedrooms: 0,
                radius: 0,
            },
            cards: [],
            currentPage: 1,
            totalPages: 52,
            counter: 0,//delete dummy data
        }
    },
    mounted() {
        Object.keys(this.$route.query).forEach((key) => {
            if (key in this.recievedData) {
                this.recievedData[key] = this.$route.query[key];
            }
        });
        console.log(this.recievedData);

        for (let i = 0; i < 8; i++) {
        const newCardIndex = this.counter + 1;
        this.cards.push({
        id: newCardIndex,
        title: `Ad-${newCardIndex}`,
        city: `City${newCardIndex}`,
        district: `District${newCardIndex}`,
        price: this.getRandomPrice(),
        imageUrl: 'bg-image.jpeg',
        fav: false
      });
      this.counter++;
    }
  },
    methods: {
        getRandomPrice() {
        return Math.floor(Math.random() * 1000000) + 100000;
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