<template>
    <div id="register">
        <div class="header-overlay mb-6">
            <AppHeader />
        </div>
        <div class="content">
            <h2 class="mb-12 d-flex align-center justify-center mt-12">Create Your Account</h2>
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
    </div>
</template>

<script>
import AppHeader from '@/components/_Layout/AppHeader'

export default {
    name: 'RegisterPage',
    components: {
        AppHeader,
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
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }
    },
    methods: {
        createButton() {
            console.log(`Email:${this.email} Password:${this.password}`)
            console.log(`Phone:${this.phone}`)
            console.log(`Name:${this.fname} ${this.lname}`)
            console.log(`Password:${this.password} Confirm Password:${this.confirmPassword}`)
            console.log(`Day:${this.day} Month:${this.month} Year:${this.year}`)
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