<template>
  <div class="card">
    <img :src="require(`@/assets/${imageUrl}`)" :alt="title">
    <div class="card-content">
      <h3>{{ title }}</h3>
      <div class="row">
        <div class="col1">
          <p>{{ district }},{{ city }}</p>
          <p>Price:{{ price }}$</p>
        </div>
        <div class="col2">
          Add to fav.
          <v-btn icon :color="color" @click="addToFavorites">
            <v-icon >mdi-heart</v-icon> 
          </v-btn>
          <button @click="detailClicked()" class="wiew-more-button">View More</button>
        </div>
      </div>
    </div>
    <!-- Popup Dialog -->
    <v-dialog v-model="dialog" class="popup-dialog" max-width="500">
      <v-card>
        <v-card-title>
          <span class="text-h6">{{ title }} Details</span>
        </v-card-title>
        <v-card-text>
          <v-img :src="require(`@/assets/${imageUrl}`)" :alt="title" height="200"></v-img>
          <p>City: {{ city }}</p>
          <p>District: {{ district }}</p>
          <p>Price: {{ price }}$</p>
          <p>Additional details about the property can go here.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="detailClosed()">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Finished popup dialog -->
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    district: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      color: 'black',
      fav:false
    }
  },
  mounted(){
    this.isFavorite();
  },
  methods: {
    detailClicked() {
      this.dialog = true;
      console.log('View More clicked', this.imageUrl, this.title, this.city, this.district, this.price);
    },
    detailClosed() {
      this.dialog = false;
      console.log('Close clicked');
    },
    addToFavorites() {
      this.fav = !this.fav;
      this.color = this.fav ? 'black' : 'pink';
      console.log('Add to fav. clicked');
    },
    isFavorite(){
      this.fav=false
      //Server operation goes there

    }

  },
}
</script>

<style scoped>
.card {
  background-color: #B3B3B3;
  width: 15rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  align-items: center;
}

.card img {
  display: flex;
  margin-top: 5%;
  width: 90%;
}

.row {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}


.col1 p {
  margin-top: 0.4rem;
  margin-bottom: 0.5rem;
}



.wiew-more-button:hover {
  background-color: #CD6E1BAF;
}

.card-content {
  flex-grow: 1;
  padding: 1rem
}

.card-content h3 {
  margin-top: 0;
}

.wiew-more-button {
  background-color: #CD6E1B;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}

</style>