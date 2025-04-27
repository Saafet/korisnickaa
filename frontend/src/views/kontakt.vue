<template>
  <div class="contact-container">
    <h2>Kontaktirajte nas</h2>

    <div class="contact-info">
      <div class="info-box">
        <i class="fas fa-map-marker-alt"></i>
        <p>
          <img src="@/assets/icons/marker.png" alt="Adresa" class="icon-small" />
          Adresa: Zelena ulica 123, Zivotinje</p>
      </div>
      <div class="info-box">
        <i class="fas fa-envelope"></i>
        <p>
          <img src="@/assets/icons/envelope.png" alt="Email" class="icon-small" />
          Email: info@zivotinje.com</p>
      </div>
      <div class="info-box">
        <i class="fas fa-phone"></i>
        <p>
          <img src="@/assets/icons/phone-call.png" alt="Telefon" class="icon-small" />
          Telefon: +387 61 123 456
        </p>
      </div>
    </div>

    <form @submit.prevent="sendMessage" class="contact-form">
      <input v-model="name" type="text" placeholder="Ime i prezime" required />
      <input v-model="email" type="email" placeholder="Vaš email" required />
      <textarea v-model="message" placeholder="Vaša poruka" required></textarea>
      <button type="submit" class="submit-btn">Pošalji</button>
    </form>

    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>

    <div class="social-icons">
      <a href="#"><i class="fab fa-facebook"></i></a>
      <a href="#"><i class="fab fa-instagram"></i></a>
      <a href="#"><i class="fab fa-twitter"></i></a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
      successMessage: ''
    };
  },
  methods: {
    sendMessage() {
      this.successMessage = "Vaša poruka je uspješno poslana!";
      this.name = '';
      this.email = '';
      this.message = '';
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
  }
};
</script>

<style scoped>
.icon-small {
  width: 16px; /* prilagodi veličinu */
  height: auto;
  margin-right: 5px; /* razmak između ikonice i teksta */
}

.contact-container {
  text-align: center;
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

h2 {
  font-family: 'Lora', serif;
  color: #2E7D32;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.info-box {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #333;
}

.info-box i {
  font-size: 20px;
  color: #2E7D32;
}

.contact-form input, .contact-form textarea {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.contact-form textarea {
  height: 100px;
}

.submit-btn {
  background: #2E7D32;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.submit-btn:hover {
  background: #1B5E20;
}

.success-message {
  color: green;
  margin-top: 10px;
}

.social-icons {
  margin-top: 20px;
}

.social-icons a {
  margin: 0 10px;
  font-size: 20px;
  color: #2E7D32;
  text-decoration: none;
}

.social-icons a:hover {
  color: #1B5E20;
}
</style>
