<template>
  <v-app class ="app">
    <router-view></router-view>
</v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style scoped>
.app {
  background-image: url('./assets/bg-image.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>