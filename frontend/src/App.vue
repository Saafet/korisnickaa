<template>
  <div id="app">
    <nav v-if="showNavbar" class="navbar">
      <div class="nav-links">
        <router-link to="/pocetna">Početna</router-link>
        <router-link to="/animals">Životinje</router-link>
        <router-link to="/about">O nama</router-link>
        <router-link to="/kontakt">Kontakt</router-link>
      </div>
      <button @click="logout" class="logout-btn">Odjava</button>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNavbar: false,
    };
  },
  created() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      this.showNavbar = !!localStorage.getItem('token');
    },
    logout() {
      localStorage.removeItem('token');
      this.showNavbar = false;
      this.$router.push('/login');
    },
  },
  watch: {
    $route(to) {
      this.checkAuth();
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #222;
  padding: 15px 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  transition: color 0.3s ease-in-out;
}

.nav-links a:hover {
  color: #00c853;
}

.logout-btn {
  background: none;
  border: 2px solid #ff1744;
  color: #ff1744;
  padding: 8px 15px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-family: 'Lora', serif;
}

.logout-btn:hover {
  background: #ff1744;
  color: white;
}
</style>
