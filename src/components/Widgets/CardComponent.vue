<template>
    <div class="card">
      <img :src="require(`@/assets/${imageUrl}`)" :alt="title">
      <div class="card-content">
        <h3>{{ title }}</h3>
        <div class="row">
          <div class="col1">
          <p>{{ district }},{{ city }}</p>
          <p>Price:{{ price }}$</p>
        </div>
        <div class="col2">
          <button href="#">View More</button>
        </div>
        </div>
        
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
    background-color: #B3B3B3;
    width: 15rem;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    align-items: center;
  }
  
  .card img {
    display: flex;
    margin-top: 5%;
    width: 90%;
  }
  .row{
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1rem;
  }
  .col1 p{
    margin-bottom:0.5rem;
  }
  .card-content button:hover{
    background-color: #CD6E1BAF;
  }
  
  .card-content {
    flex-grow: 1;
    padding: 1rem
  }
  
  .card-content h3 {
    margin-top: 0;
  }
  
  .card-content button {
    background-color: #CD6E1B;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
  }
  </style>