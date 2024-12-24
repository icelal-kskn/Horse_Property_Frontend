<template>
  <div id="footer">
    <v-row class="justify-start" style="color: whitesmoke;">
      <v-col cols="2" class="ml-2 mb-2 justify-start text-start text-white">
        Follow Us
        <v-row>
          <a href="https://www.instagram.com/icelal_kskn/">
            <v-col><v-icon>mdi-instagram</v-icon></v-col>
          </a>
          <a href="https://x.com/kafeinsizcelal">
            <v-col><v-icon>mdi-twitter</v-icon></v-col>
          </a>
          <a href="https://www.facebook.com" >
            <v-col><v-icon>mdi-facebook</v-icon></v-col>
          </a>
          <a href="https://www.youtube.com/@kafeinsizcelal" >
            <v-col><v-icon>mdi-youtube</v-icon></v-col>
          </a>
        </v-row>
      </v-col>
      <v-col cols="2" class="justify-start text-start text-white">
        Contact Us
        <v-row>
          <a href="tel:+905555555555">
            <v-col cols="3"><v-icon>mdi-phone</v-icon></v-col>
          </a>
          <a href="mailto:200316059@ogr.cbu.edu.tr">
            <v-col cols="3"><v-icon>mdi-mail</v-icon></v-col>
          </a>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'AppFooter',

}

</script>

<style scoped>
.v-icon {
  color: whitesmoke;
}
</style>