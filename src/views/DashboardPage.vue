<template>
    <div id="dashboard">

        <div class="header-overlay">
            <AppHeader />
        </div>

        <div class="content">

            <error-dialog ref="errorDialog" :error="errorData" />
            <h2 class="ml-8 d-flex justify-start">Dashboard Page</h2>
            <v-container>

                <v-row class="mb-4">
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>Views</v-card-title>
                            <v-card-text>
                                <canvas id="viewsChart"></canvas>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-card>
                            <v-card-title>Favorites</v-card-title>
                            <v-card-text>
                                <canvas id="favoritesChart"></canvas>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

            </v-container>

        </div>
        <AppFooter />
    </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import AppHeader from '@/components/_Layout/AppHeader.vue';
import ErrorDialog from '@/components/Widgets/WarningDialog.vue';
import AppFooter from '@/components/_Layout/AppFooter.vue'
Chart.register(...registerables);

export default {
    name: 'DashboardPage',
    components: {
        AppFooter,
        AppHeader,
        ErrorDialog,
    },
    data() {
        return {
            userType: '',
            errorData: { type: '', message: '' },

        }
    },
    mounted() {
        this.checkUserLogin();
        // Views Chart
        new Chart(document.getElementById("viewsChart"), {
            type: "bar",
            data: {
                labels: ["A", "B", "C", "D"],
                datasets: [
                    {
                        label: "Views",
                        data: [100, 150, 80, 250],
                        backgroundColor: "#2196F3",
                    },
                ],
            },
        });

        // Favorites Chart
        new Chart(document.getElementById("favoritesChart"), {
            type: "bar",
            data: {
                labels: ["A", "B", "C", "D"],
                datasets: [
                    {
                        label: "Favorites",
                        data: [2, 10, 6, 14],
                        backgroundColor: "#FF9800",
                    },
                ],
            },
        });
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
        showErrorDialog(type, message) {
            this.errorData = { type, message };
            this.$refs.errorDialog.show();
        }

    },
}
</script>

<style scoped>
#dashboard {
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