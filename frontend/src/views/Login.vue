<template>
  <div class="login-container">
    <div class="login-box">
      <!-- Slika -->
      <div class="login-image">
        <img src="https://www.kucni-ljubimci.com/wp-content/uploads/2017/02/Kucni-ljubimci-facebook-share.jpg" alt="Login Slika">
      </div>

      <!-- Login forma -->
      <div class="login-form">
        <h2>Prijava</h2>
        <form @submit.prevent="login">
          <div class="input-group">
            <input v-model="email" type="email" required />
            <label>Email</label>
          </div>
          <div class="input-group">
            <input v-model="password" type="password" required />
            <label>Lozinka</label>
          </div>
          <button type="submit" class="login-btn">Prijavi se</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3000/api/v1/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        });

        const data = await response.json();
        if (data.status === 'success') {
          localStorage.setItem('token', data.token);
          this.$router.push('/pocetna');
        } else {
          this.errorMessage = 'Pogrešan email ili lozinka';
        }
      } catch (error) {
        this.errorMessage = 'Došlo je do greške';
      }
    }
  }
};
</script>

<style scoped>
/* Google Font */
@import url('https://as1.ftcdn.net/v2/jpg/01/07/54/74/1000_F_107547435_vseggy1QpSh5YvCXIZTk0rOv3JO8XmCJ.jpg');

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('https://as1.ftcdn.net/v2/jpg/01/07/54/74/1000_F_107547435_vseggy1QpSh5YvCXIZTk0rOv3JO8XmCJ.jpg') no-repeat center center;
  background-size: cover;
}

.login-box {
  display: flex;
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 700px;
  width: 90%;
}

/* Slika sa desne strane */
.login-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.login-image img {
  max-width: 100%;
  border-radius: 10px;
}

/* Forma */
.login-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  text-align: center;
}

.login-form h2 {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

/* Input polja */
.input-group {
  position: relative;
  margin-bottom: 20px;
}

.input-group input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease-in-out;
}

.input-group input:focus {
  border-color: #00c853;
}

/* Animirani labeli */
.input-group label {
  position: absolute;
  left: 12px;
  top: 14px;
  font-size: 16px;
  color: #777;
  transition: all 0.3s ease;
}

.input-group input:focus + label,
.input-group input:not(:placeholder-shown) + label {
  top: -10px;
  left: 10px;
  font-size: 14px;
  color: #00c853;
  background: white;
  padding: 0 5px;
}

/* Dugme */
.login-btn {
  background: #00c853;
  color: white;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  font-family: 'Roboto', sans-serif;
}

.login-btn:hover {
  background: #009624;
}

/* Error poruka */
.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

/* Responsivnost */
@media (max-width: 768px) {
  .login-box {
    flex-direction: column;
  }

  .login-image {
    display: none; /* Sakriva sliku na manjim ekranima */
  }
}
</style>
