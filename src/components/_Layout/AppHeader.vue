<template>
  <header>
    <nav>
      <div class="logo">
        <a href="/"><img alt="Home Real Estate" class="logo-image" src="../../assets/logo.png"></a>
      </div>
      <div class="nav-menu" v-if="!signed">
        <a href="/sign-in" class="sign-in">Sign In</a>
        <a href="/register" class="register">Register</a>
      </div>
      <div class="nav-menu" v-else>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar v-bind="attrs" v-on="on" class=""> <img src="../../assets/dummyAvatar.png"
                alt="Avatar"></v-avatar>
          </template>
          <v-list>
            <v-list-item link href="/my-profile">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item link href="/favorites">
              <v-list-item-title>Favorites</v-list-item-title>
            </v-list-item>
            <v-list-item link href="/my-estate">
              <v-list-item-title>My Estates</v-list-item-title>
            </v-list-item>
            <v-list-item link href="/dashboard">
              <v-list-item-title>My Dashboard</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>Log Out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

    </nav>
  </header>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  name: 'AppHeader',
  mounted() {
    this.signed = localStorage.getItem('token') ? true : false;
  },
  data() {
    return {
      signed: false,
    }
  },
  methods: {
    async logout() {
      try {
        const response = await axios.post('api/user/logout')
        if (response.status !== 200) {
          console.error("Unexpected status code:", response.status);
          return;
        }
        // Başarılı çıkış
        localStorage.removeItem('token');
        this.$router.push('/sign-in');
      } catch (error) {
        if (error.response?.status === 401) {
          console.error("Unauthorized access:", error.response.data.message);
          this.$router.push('/sign-in');
        } else {
          console.error("Unexpected error:", error);
        }
      }
    },
  }
};
</script>

<style scoped>
header {
  padding: 1rem 0;
  z-index: 100;
  opacity: 0.9;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.logo-image {
  height: 3.5rem;
  opacity: 3;
  filter: brightness(3);
}

.nav-menu {
  display: flex;
  gap: 1rem;
}

.nav-menu a {
  display: flex;
  align-items: center;
  text-align: center;
  text-decoration: none;
  justify-content: center;
  cursor: pointer;
  width: 5rem;
  height: 2.5rem;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
  border: solid #757575;
  border-width: 0.1rem;
  border-radius: 8px;
}


.sign-in {
  background-color: #FFFFFFCC;
  color: #2C2C2C;
}

.sign-in:hover {
  color: rgba(117, 115, 115, 0.902);
}

.register {
  background-color: #2C2C2C;
  color: #fff;
}

.register:hover {
  color: #e2e8f0;
}


@media (max-width: 768px) {
  nav {
    flex-direction: column;
  }

  .nav-menu {
    flex-direction: column;
    align-items: center;
  }

  .nav-menu div {
    margin: 0.5rem 0;
  }
}
</style>
