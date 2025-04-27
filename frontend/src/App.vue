<template>
  <div id="app">
    <!-- Navbar se prikazuje samo ako postoji token -->
    <nav v-if="showNavbar" class="navbar">
      <div class="nav-links">
        <router-link to="/pocetna">Početna</router-link>
        <router-link to="/animals">Životinje</router-link>
        <router-link to="/about">O nama</router-link>
        <router-link to="/kontakt">Kontakt</router-link>
      </div>
      <button @click="logout" class="logout-btn">Odjava</button>
    </nav>

    <!-- Ovdje se prikazuju ostale stranice -->
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNavbar: false, // Po defaultu navbar je sakriven
    };
  },
  created() {
    this.checkAuth(); // Provjerava login status pri učitavanju
  },
  methods: {
    checkAuth() {
      this.showNavbar = !!localStorage.getItem('token'); // Postavlja navbar ako postoji token
    },
    logout() {
      localStorage.removeItem('token'); // Briše token
      this.showNavbar = false; // Sakriva navbar
      this.$router.push('/login'); // Preusmjerava na login
    }
  },
  watch: {
    // Ovaj watcher omogućava da se navbar odmah ažurira
    $route(to) {
      this.checkAuth();
    }
  }
};
</script>

<style scoped>
/* Navbar stil */
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

/* Logout dugme */
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
