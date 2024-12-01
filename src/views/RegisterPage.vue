<template>
    <div id="register">
        <div class="background-container">
            <img src="../assets/bg-image.jpeg" alt="Background Image">
            <div class="header-overlay">
                <AppHeader />
            </div>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/_Layout/AppHeader'

export default {
    name: 'RegisterPage',
    components: {
        AppHeader,
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
</style>