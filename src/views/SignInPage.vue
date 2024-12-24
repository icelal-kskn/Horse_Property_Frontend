<template>
  <div id="sign-in">
    <div class="header-overlay mb-6">
      <AppHeader />
    </div>
    <div class="content">

      <error-dialog ref="errorDialog" :error="errorData" />

      <h2 class="mb-12 d-flex align-center justify-center mt-12">Login</h2>
      <v-form>
        <v-row class="d-flex justify-center">
          <v-col cols="6">
            <v-text-field v-model="email" label="E-mail" type="email" required outlined></v-text-field>
            <v-text-field v-model="password" label="Password" type="password" required outlined></v-text-field>
          </v-col>
        </v-row>
        <div style="display: flex; justify-content: end;">
          <v-btn @click="loginButton" color="#010237C4" style="border: 1px solid black; color: white;">
            Login
          </v-btn>
        </div>
      </v-form>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/_Layout/AppHeader'
import axios from '@/plugins/axios'
import ErrorDialog from '@/components/Widgets/WarningDialog.vue';
import AppFooter from '@/components/_Layout/AppFooter.vue';

export default {
  name: 'SignInPage',
  components: {
    AppHeader,
    ErrorDialog,
    AppFooter,
  },
  data() {
    return {
      email: '',
      password: '',
      errorData: { type: '', message: '' },
    }
  },
  methods: {
    async loginButton() {
      if (!this.validateForm()) {
        this.showErrorDialog('Error', this.errorData.message);
        return null;
      }
      try {

        const payload = {
          email: this.email,
          password: this.password,
        };

        const response = await axios.post('api/user/login', payload);

        localStorage.setItem('token', response.data.token);
        console.log("Log in successful:", response.data, "Token:", response.data.token);
        this.$router.push('/dashboard');

      } catch (error) {

        let errorMessage = 'Login failed';
        if (error.response) {
          errorMessage = error.response.data.message || 'An error occurred during login';
        } else if (error.request) {
          errorMessage = 'No response from server';
        }

        this.showErrorDialog('Error', errorMessage);
        console.log('Login error:', error);
      }

    },
    validateForm() {
      if (!this.email || !this.password) {
        this.errorData = { type: 'Error', message: 'Please fill all the fields' };
        return false;
      }
      return true;
    },

    showErrorDialog(type, message) {
      this.errorData = { type, message };
      this.$refs.errorDialog.show();
    },


  }
};
</script>

<style scoped>
#sign-in {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  justify-content: center
}

.content {
  width: 60%;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #E5E7F4;
  margin-bottom: 1rem;
}
</style>