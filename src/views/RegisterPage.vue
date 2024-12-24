<template>
    <div id="register">
        <div class="header-overlay mb-6">
            <AppHeader />
        </div>
        <div class="content">
            <h2 class="mb-12 d-flex align-center justify-center mt-12">Create Your Account</h2>

            <error-dialog ref="errorDialog" :error="errorData" />

            <v-form>
                <v-row class="">
                    <v-col>
                        <v-text-field v-model="email" label="E-mail" type="email" required outlined></v-text-field>
                        <v-text-field v-model="password" label="Password" type="password" required
                            outlined></v-text-field>
                        <v-text-field v-model="phone" label="Phone" type="tel" required outlined></v-text-field>
                    </v-col>
                    <v-col>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="fname" label="First Name" required outlined></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="lname" label="Last Name" required outlined></v-text-field>
                            </v-col>
                        </v-row>
                        <v-text-field v-model="confirmPassword" label="Confirm Password" type="password" required
                            outlined></v-text-field>
                        <v-row>
                            <v-col>
                                <v-select v-model="day" label="Day" :items="days" outlined></v-select>
                            </v-col>
                            <v-col>
                                <v-select v-model="month" label="Month" :items="months" outlined></v-select>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="year" label="Year" type="number" min="1960" max="2024" outlined>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>

                <div style="display: flex; justify-content: end;">
                    <v-btn @click="createButton" color="#010237C4" style="border: 1px solid black; color: white;">
                        Create
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
    name: 'RegisterPage',
    components: {
        AppFooter,
        AppHeader,
        ErrorDialog,
    },
    data() {
        return {
            email: '',
            password: '',
            phone: '',
            fname: '',
            lname: '',
            confirmPassword: '',
            day: null,
            month: null,
            year: null,
            days: Array.from({ length: 31 }, (_, i) => i + 1),
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            errorData: { type: '', message: '' },
        }
    },
    methods: {
        async createButton() {
            if (!this.validateForm()) {
                this.showErrorDialog('Error', this.errorData.message);
                return null;
            }
            try {

                const payload = {
                    email: this.email,
                    password: this.password,
                    fullName: `${this.fname} ${this.lname}`,
                    phone: this.phone,
                };

                const response = await axios.post('api/user/register', payload);

                localStorage.setItem('token', response.data.token);
                console.log("Registration successful:", response.data, "Token:", response.data.token);
                this.$router.push('/dashboard');

            } catch (error) {
                let errorMessage = 'Registration failed';
                if (error.response) {
                    errorMessage = error.response.data.message || 'An error occurred during registration';
                } else if (error.request) {
                    errorMessage = 'No response from server';
                }
                this.showErrorDialog('Error', errorMessage);
                console.log('Registration error:', error);
            }
        },
        validateForm() {
            // Basic form validation
            if (!this.email) {
                this.showErrorDialog('Error', 'Email is required');
                return false;
            }

            if (!this.password) {
                this.showErrorDialog('Error', 'Password is required');
                return false;
            }

            if (this.password !== this.confirmPassword) {
                this.showErrorDialog('Error', 'Passwords do not match');
                return false;
            }

            if (!this.fname || !this.lname) {
                this.showErrorDialog('Error', 'First and last name are required');
                return false;
            }

            if (!this.phone) {
                this.showErrorDialog('Error', 'Phone number is required');
                return false;
            }

            // Additional validation for birth date (optional)
            if (!this.day || !this.month || !this.year) {
                this.showErrorDialog('Error', 'Complete birth date is required');
                return false;
            }
            return true;
        },

        showErrorDialog(type, message) {
            this.errorData = { type, message };
            this.$refs.errorDialog.show();
        }

    }
};
</script>

<style scoped>
#register {
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

.v-input input {
    background-color: white;
    border-color: #ccc;
}
</style>