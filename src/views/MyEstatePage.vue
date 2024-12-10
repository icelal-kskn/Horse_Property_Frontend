<template>
    <div id="my-estate">

        <div class="header-overlay">
            <AppHeader />
        </div>

        <div class="content">
            <h1>My Estates</h1>
            <error-dialog ref="errorDialog" :error="errorData"/>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/_Layout/AppHeader.vue';
import ErrorDialog from '@/components/Widgets/WarningDialog.vue';

export default{
    name: 'MyEstatePage',
    components: {
        AppHeader,
        ErrorDialog,
    },
    data(){
        return{
            errorData: { type: '', message: '' },

        }
},
    mounted(){
        this.checkUserLogin();
    },
    methods:{
        checkUserLogin(){
            if(!localStorage.getItem('token')){
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
#my-estate {
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