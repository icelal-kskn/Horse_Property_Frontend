<template>
    <div class="card">
      <img :src="require(`@/assets/${imageUrl}`)" :alt="title">
      <div class="card-content">
        <h3>{{ title }}</h3>
        <p>{{ district }}, {{ city }}</p>
        <p>Price: ${{ price }}</p>
        <button>View More</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CardComponent',
    props: {
      imageUrl: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      district: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .card {
    width: 15rem;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .card img {
    height: 9rem;
    object-fit: cover;
  }
  
  .card-content {
    flex-grow: 1;
    padding: 16px;
  }
  
  .card-content h3 {
    margin-top: 0;
  }
  
  .card-content button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
  }
  </style>