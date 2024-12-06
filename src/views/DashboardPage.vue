<template>
    <div id="dashboard">

        <div class="header-overlay">
            <AppHeader />
        </div>
        
        <div class="content">

        </div>

    </div>
</template>

<script>
import AppHeader from '@/components/_Layout/AppHeader.vue';

export default{
    name: 'DashboardPage',
    components: {
        AppHeader
    },
    data(){
        return{
            userType:'',
        }
},
    mounted(){
        this.checkUserLogin();
    },
    methods:{
        checkUserLogin(){
            if(!localStorage.getItem('token')){
                this.$router.push('/sign-in');
            }

            
        },

    },  
}
</script>

<style scoped>

</style>