<template>
    <v-card elevation="2" class="mb-4">
      <v-row no-gutters>
        <!-- Property resmi -->
        <v-col cols="4" >
          <v-img
            :src="property.images?.filter(img => img)?.[0] || require('@/assets/bg-image.jpeg')"
            height="200"
            cover
            class = "mt-2 ml-2"
          ></v-img>
        </v-col>
  
        <!-- Property bilgileri -->
        <v-col cols="8">
          <v-card-text>
            <div class="d-flex justify-space-between align-center">
              <h3 class="text-h5 mb-2">{{ property.title }}</h3>
              <div class="text-h6">${{ formatPrice(property.price) }}</div>
            </div>
  
            <div class="mb-2">
              <v-chip small class="mr-2">{{ property.type }}</v-chip>
              <v-chip small>{{ property.status }}</v-chip>
            </div>
  
            <div class="mb-2">
              <v-icon small class="mr-1">mdi-map-marker</v-icon>
              {{ property.location.city }}, {{ property.location.district }}
            </div>
  
            <p class="mb-2">{{ property.description }}</p>
  
            <!-- Butonlar -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="$emit('edit', property._id)">
                <v-icon left>mdi-pencil</v-icon> Edit
              </v-btn>
              <v-btn color="error" text @click="$emit('delete', property._id)">
                <v-icon left>mdi-delete</v-icon> Delete
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </template>
  
  <script>
  export default {
    name: 'LongCardComponent',
    props: {
      property: {
        type: Object,
        required: true
      }
    },
    methods: {
      formatPrice(price) {
        return price.toLocaleString()
      }
    }
  }
  </script>