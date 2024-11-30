<template>
  <div id="home">
    <div class="background-container">
      <img src="../assets/bg-image.jpeg" alt="Background Image">
      <div class="header-overlay">
        <AppHeader />

        <div class="row">
          <div class="col1">
            <div class="up">
              <h1>Search, Find, Move In...</h1>
            </div>
            <div class="content">
              <h2>Find Your New Home</h2>
              <form>
                <div class="searchParams">
                  <label for="city">City:</label>
                  <input type="text" id="city" placeholder="Select A City" v-model="city">
                </div>

                <div class="searchParams">
                  <label for="district">District:</label>
                  <input type="text" id="city" placeholder="District" v-model="district">
                </div>

                <div class="searchParams">
                  <label for="status">Status:</label>
                  <input id="status" type="text" placeholder="Status" v-model="status" />
                </div>

                <div class="searchParams">
                  <label for="price-range">Price Range:</label>
                  <input id="price-range" type="text" placeholder="From" v-model="priceFrom" />
                  <input id="price-range" type="text" placeholder="To" v-model="priceTo">
                </div>

                <div class="searchParams">
                  <label for="bathrooms">Bathroom(s):</label>
                  <input id="bathrooms" type="number" v-model.number="bathrooms" />
                </div>

                <div class="searchParams">
                  <label for="bedrooms">Bedroom(s):</label>
                  <input id="bedrooms" type="number" v-model.number="bedrooms" />
                </div>

                <div class="searchParams">
                  <label for="radius">Radius:</label>
                  <input id="radius" type="number" placeholder="Radius" v-model.number="radius" />
                </div>

                <div class="button-container">
                  <button type="button" class="searchButton" @click="searchProperties()">Search
                    Properties</button>
                </div>

              </form>

            </div>
          </div>
          <div class="col2">
            <div class="content">
              <h2>Recommended Listing</h2>
              <div class="card-container">
                <div class="card-row" v-for="card in cards" :key="card.id">

                  <CardComponent :imageUrl="card.imageUrl" :title="card.title" :city="card.city"
                    :district="card.district" :price="card.price" />
                </div>

                <div class="load-more" @click="loadMoreCards()">
                  <v-btn icon>
                    <v-icon class="load-more-button" size="7rem">mdi-chevron-right</v-icon>
                  </v-btn>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/_Layout/AppHeader'
import CardComponent from '@/components/Widgets/CardComponent';
import axios from "axios";

export default {
  name: 'HomePage',
  components: {
    AppHeader,
    CardComponent
  },
  mounted() {
  // Başlangıçta 2 kart yükle
  for (let i = 0; i < 2; i++) {
    const newCardIndex = this.cards.length + 1;
    this.cards.push({
      id: newCardIndex,
      title: `Ad-${newCardIndex}`,
      city: `City${newCardIndex}`,
      district: `District${newCardIndex}`,
      price: this.getRandomPrice(),
      imageUrl: 'bg-image.jpeg'
    });
  }
},
  data() {
    return {
      city: '',
      district: '',
      status: '',
      priceFrom: 0,
      priceTo: 0,
      bathrooms: 0,
      bedrooms: 0,
      radius: 0,
      cards: [],
      isLoading: false,
    }
  },
  methods: {
    searchProperties() {
      axios.get('http://localhost:1806/api/property/', {
        params: {
          city: this.city,
          district: this.district,
          status: this.status,
          priceFrom: this.priceFrom,
          priceTo: this.priceTo,
          bathrooms: this.bathrooms,
          bedrooms: this.bedrooms,
          radius: this.radius
        }
      }).then((response) => {
        console.log(response.data); //TODO: DELETE LOG
      }).catch((error) => {
        console.log(error);
      });
    },

    getRandomPrice() {
      return Math.floor(Math.random() * 1000000);
    },

    loadMoreCards() {
    if (!this.isLoading) {
      this.isLoading = true;

      setTimeout(() => {
        // Eski kartları kaldır
        this.cards = []; // Eski kartları temizle

        // Yeni 2 kart ekle
        for (let i = 0; i < 2; i++) {
          const newCardIndex = this.cards.length + 1; // Yeni kartların indexi
          this.cards.push({
            id: newCardIndex,
            title: `Ad-${newCardIndex}`,
            city: `City${newCardIndex}`,
            district: `District${newCardIndex}`,
            price: this.getRandomPrice(),
            imageUrl: 'bg-image.jpeg'
          });
        }

        this.isLoading = false;
      }, 300); // Animasyon süresi
    }
  },

  }
}
</script>

<style scoped>
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.background-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.background-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 2.85;
  z-index: 1;
  filter: brightness(0.7);
}

.header-overlay {
  position: relative;
  z-index: 10;
}

.up {
  display: flex;
  justify-content: start;
  color: whitesmoke;
  margin-left: 0.2rem;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #E5E7F4;
}

.content h2 {
  font-size: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
  display: flex;
  justify-content: start;
}

.content form div.searchParams {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
}

#price-range {
  display: flex;
  width: 8rem;
}

.content form div label {
  width: 8rem;
  text-align: right;
}

.content form div input {
  width: 15rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.searchButton:hover {
  background-color: #010237;
}

.searchButton {
  padding: 0.5rem;
  border-radius: 8px;
  border-color: black;
  background-color: #010237C4;
  color: white;
  cursor: pointer;
  transition: 0.3s ease;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
}

.col1 {
  flex: 1;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 0.50;
}

.col2 {
  flex: 1.5;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  margin-left: 2rem;
  transition: transform 0.3s ease;
}

.card-container .card-row {
  margin-left: 1rem;
  flex-basis: calc(40% - 0.5rem);
}

.load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  margin-top: 1rem;
  cursor: pointer;
}
</style>