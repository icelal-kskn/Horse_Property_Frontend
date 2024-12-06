<template>
    <v-dialog v-model="dialogVisible" max-width="400" persistent>
      <v-card class="pa-6" style="background-color: #4a4a4a; color: white; border-radius: 10px;">
        <!-- Başlık -->
        <v-card-title class="d-flex justify-center text-center" style="font-size: 2rem; font-weight: bold;">
          {{ error.type }}
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogVisible = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
  
        <!-- Mesaj -->
        <v-card-text class="text-start" style="font-size: 1.5rem; margin-top: 1rem;">
          {{ error.message }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      error: {
        type: Object,
        required: true,
        validator: (value) => ['type', 'message'].every((key) => key in value),
      },
    },
    data() {
      return {
        dialogVisible: false,
      };
    },
    methods: {
      show() {
        this.dialogVisible = true;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Vuetify vars kullanarak daha iyi renk yönetimi */
  .v-btn {
    transition: 0.3s ease;
  }
  .v-btn:hover {
    background-color: #616161;
  }
  </style>
  