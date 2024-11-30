<template>
  <header>
    <nav>
      <div class="logo">
        <img alt="Home Real Estate" class="logo-image" src="../../assets/logo.png" >
      </div>
      <div class="nav-menu" v-if="!signed">
          <a href="#" class="sign-in">Sign In</a>
          <a href="#" class="register">Register</a>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data(){
    return{
      signed: false,
    }
  },
};
</script>

<style scoped>
header {
  padding: 1rem 0;
  z-index: 100;
  opacity: 0.9;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.logo-image {
  height: 3.5rem;
  opacity: 3;
  filter: brightness(3);
}

.nav-menu {
  display: flex;
  gap: 1rem;
}

.nav-menu a {
  display: flex;
  align-items: center;
  text-align: center;
  text-decoration: none;
  justify-content: center;
  cursor: pointer;
  width: 5rem ;
  height: 2.5rem;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
  border: solid #757575;
  border-width: 0.1rem;
  border-radius: 8px;
}




.sign-in{
  background-color: #FFFFFFCC;
  color: #2C2C2C;
}

.sign-in:hover {
  color: rgba(117, 115, 115, 0.902);
}

.register{
  background-color: #2C2C2C;
  color: #fff;
}

.register:hover {
  color: #e2e8f0;
}


@media (max-width: 768px) {
  nav {
    flex-direction: column;
  }

  .nav-menu {
    flex-direction: column;
    align-items: center;
  }

  .nav-menu div {
    margin: 0.5rem 0;
  }
}
</style>
