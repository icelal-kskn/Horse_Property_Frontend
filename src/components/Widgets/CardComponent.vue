<template>

  <div class="card">
    <error-dialog ref="errorDialog" :error="errorData" />
    <v-img :src="require(`@/assets/${imageUrl}`)" :alt="title" class="vimg"></v-img>

    <div class="card-content">
      <h3>{{ title }}</h3>
      <div class="row">
        <div class="col1">
          <p>{{ district }}</p>
          <p>,{{ city }}</p>
          <p>Price:{{ price }}$</p>
        </div>
        <div class="col2 mt-3">
          Add to fav.
          <v-btn icon :color="color" @click="changeFavoriteStatus()">
            <v-icon>mdi-heart</v-icon>
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
import axios from '@/plugins/axios';
import ErrorDialog from '@/components/Widgets/WarningDialog.vue';
export default {
  name: 'CardComponent',
  components: {
    ErrorDialog,
  },
  props: {
    id: {
      type: String,
      required: true
    },
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
    },
    fav: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      color: 'black',
      isFavorite: this.$props.fav,
      token: localStorage.getItem('token'),
      errorData: { type: '', message: '' },
    }
  },
  mounted() {
    //TODO: check token status
    if (this.token) {
      this.isFavoritedBefore(this.$props.id);
    }
  },
  methods: {
    detailClicked() {
      this.dialog = true;
      console.log("id", this.$props.id);
    },
    detailClosed() {
      this.dialog = false;
      console.log('Close clicked');
    },
    changeFavoriteStatus() {
      if (!this.token) {
        this.showErrorDialog('Error', 'You are not logged in. Please sign in to continue.');
        return;
      }
      try {
        if (this.isFavorite) {
          this.removeFromFavorites();
        } else {
          this.addToFavorites();
        }
        this.isFavorite = !this.isFavorite;
        this.color = this.isFavorite ? 'pink' : 'black';

      } catch (error) {
        console.log(error);
        setTimeout(() => {
          this.$emit('showErrorDialog', 'Error', 'An error occurred while changing favorites.');
        }, 2000);
      }
    },
    async addToFavorites() {
      try {
        const response = await axios.post('api/user/favorite', {
          propertyId: this.$props.id
        });
        console.log(this.isFavorite, response.data);
      }
      catch (error) {
        console.log(error);
        setTimeout(() => {
          this.$emit('showErrorDialog', 'Error', 'An error occurred while adding to favorites.');
        }, 2000);
      }
    },
    async removeFromFavorites() {
      try {
        const response = await axios.delete('api/user/favorite/', {
          data: { propertyId: this.$props.id }
        });
        console.log(this.isFavorite, response.data);
      }
      catch (error) {
        console.log(error);
        setTimeout(() => {
          this.$emit('showErrorDialog', 'Error', 'An error occurred while removing from favorites.');
        }, 2000);
      }
    },
    async isFavoritedBefore(id) {
      await axios.get(`api/user/favorite/${id}`)
        .then(response => {
          this.isFavorite = response.data;
          this.color = this.isFavorite ? 'pink' : 'black';
        })
        .catch(error => {
          console.log(error);
          setTimeout(() => {
            this.$emit('showErrorDialog', 'Error', 'An error occurred while checking favorites.');
          }, 2000);
        });
    },
    showErrorDialog(type, message) {
      this.errorData = { type, message };
      this.$refs.errorDialog.show();
    },
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

.vimg {
  display: flex;
  margin-top: 5%;
  width: 90%;
}

.row {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.col1 {
  flex: 1;
}

.col2 {
  flex: 1.5;
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