<template>
  <div class="color-palette">
    <div class="color-box" style="background-color: #4CAF50;"></div>
    <div class="color-box" style="background-color: #8BC34A;"></div>
    <div class="color-box" style="background-color: #FFC107;"></div>
    <div class="color-box" style="background-color: #FF5722;"></div>
    <div class="color-box" style="background-color: #607D8B;"></div>
  </div>

  <div class="frame">
    <div class="page-frame">
      <h2>Uvod u svijet životinja</h2>
      <div class="separator"></div>
      <p>Dobrodošli u svijet životinja! Ovdje možete pronaći informacije o različitim vrstama.</p>
    </div>

    <!-- Novi page-frame za listu životinja -->
    <div class="page-frame">
      <h1>Lista Životinja</h1>

      <!-- Dugme za otvaranje forme -->
      <button class="toggle-form-btn" @click="toggleForm">
        <img v-if="!showForm" src="@/assets/icons/add.png" alt="Dodaj" class="icon-small" />
        {{ showForm ? 'Sakrij formu' : 'Dodaj novu životinju' }}
      </button>
      <div class="separator"></div>

      <!-- Forma za dodavanje nove životinje -->
      <form v-if="showForm" @submit.prevent="addAnimal" class="animal-form">
        <h2>Dodaj novu životinju</h2>
        <input v-model="newAnimal.name" placeholder="Ime životinje" required />
        <input v-model="newAnimal.description" placeholder="Opis" required />
        <input v-model="newAnimal.group" placeholder="Grupa" required />
        <input v-model="newAnimal.diet" placeholder="Prehrana" required />
        <input v-model="newAnimal.nameOfYoung" placeholder="Ime mladunčeta" required />
        <input v-model="newAnimal.imageUrl" placeholder="URL slike" required />
        <input v-model="newAnimal.averageLifespanInMinutes" type="number" placeholder="Životni vijek (u minutama)" required />
        <input v-model="newAnimal.biggestThreat" placeholder="Najveće prijetnje" required />
        <input v-model="newAnimal.continents" placeholder="Kontinenti (razdvojeni zarezom)" required />

        <button class="btn-primary" type="submit">
          <img src="@/assets/icons/add.png" alt="Dodaj" class="icon-small" />
          Dodaj životinju
        </button>
        <div class="separator"></div>
      </form>

      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="animals.length === 0 && !errorMessage">Nema dostupnih životinja.</div>
    </div>

    <!-- Novi page-frame za prikaz liste životinja -->
    <div class="page-frame">
      <ul class="animal-list">
        <li v-for="animal in paginatedAnimals" :key="animal.id" class="animal-card">
          <h3>{{ animal.name }}</h3>
          <img :src="animal.imageUrl" alt="Slika životinje" class="animal-image"/>
          <p><strong>Opis:</strong> {{ animal.description }}</p>
          <p><strong>Grupa:</strong> {{ animal.group }}</p>
          <p><strong>Prehrana:</strong> {{ animal.diet }}</p>
          <p><strong>Ime mladunčeta:</strong> {{ animal.nameOfYoung }}</p>
          <p><strong>Životni vijek:</strong> {{ formatLifespan(animal.averageLifespanInMinutes) }}</p>
          <p><strong>Najveće prijetnje:</strong> {{ animal.biggestThreat }}</p>
          <p><strong>Kontinenti:</strong> {{ formatContinents(animal.continents) }}</p>

          <button class="btn-outline" @click="deleteAnimal(animal.id)">
            <img src="@/assets/icons/trash.png" alt="Obriši" class="icon-small" />
            Obriši
          </button>
        </li>
      </ul>

      <!-- Navigacija za paginaciju -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">← Prethodna</button>
        <span>Stranica {{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages">Sljedeća →</button>
      </div>
    </div>

    <div class="page-frame last-section">
      <img src="@/assets/illustrations/cute-animals-unblast.png" alt="Ekološka svijest" class="illustration" />
    </div>
  </div>
</template>


<script>
export default {
  name: "Animals",
  data() {
    return {
      animals: [],
      errorMessage: "",
      newAnimal: {
        name: "",
        description: "",
        group: "",
        diet: "",
        nameOfYoung: "",
        imageUrl: "",
        averageLifespanInMinutes: "",
        biggestThreat: "",
        continents: "",
      },
      showForm: false,
      currentPage: 1,
      itemsPerPage: 6, // SADA JE 6 UMJESTO 5
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.animals.length / this.itemsPerPage);
    },
    paginatedAnimals() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.animals.slice(start, start + this.itemsPerPage);
    }
  },
  created() {
    this.fetchAnimals();
  },
  methods: {
    async fetchAnimals() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.errorMessage = "Niste prijavljeni.";
        this.$router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/v1/animals", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Greška u dohvaćanju podataka");

        const data = await response.json();
        this.animals = data.data.animals;
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    async addAnimal() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.errorMessage = "Niste prijavljeni.";
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/v1/animals", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...this.newAnimal,
            averageLifespanInMinutes: parseInt(this.newAnimal.averageLifespanInMinutes),
            continents: this.newAnimal.continents.split(",").map(c => c.trim()),
          }),
        });

        if (!response.ok) throw new Error("Greška pri dodavanju životinje");

        const data = await response.json();
        this.animals.push(data.data.animal);
        this.resetForm();
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    async deleteAnimal(id) {
      const token = localStorage.getItem("token");
      try {
        await fetch(`http://localhost:3000/api/v1/animals/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` },
        });

        this.animals = this.animals.filter(animal => animal.id !== id);
      } catch (error) {
        console.error("Greška:", error);
      }
    },
    resetForm() {
      this.newAnimal = {
        name: "",
        description: "",
        group: "",
        diet: "",
        nameOfYoung: "",
        imageUrl: "",
        averageLifespanInMinutes: "",
        biggestThreat: "",
        continents: "",
      };
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    formatLifespan(minutes) {
      return `${Math.floor(minutes / 525600)} godina`;
    },
    formatContinents(continents) {
      return continents ? continents.join(", ") : "Nepoznato";
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    }
  },
};
</script>

<style scoped>

.color-palette {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  padding: 10px;
}

.color-box {
  width: 50px;
  height: 50px;
  border-radius: 5px;
}

.separator {
  width: 80%;
  height: 2px;
  background-color: #333;
  margin: 20px auto;
}


.icon-small {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}


html, body {
  height: 100%;
  overflow-x: hidden;
}

/* Sprječava pomjeranje slike pri dodavanju novih elemenata */
.frame {
  background-attachment: fixed; /* Fiksira pozadinu */
  min-height: 100vh; /* Osigurava da se ne rasteže */
}

/* Reset osnovnih stilova */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}
.illustration {
  max-width: 40%;
  height: auto;
  display: block;
  margin: 5px auto;
}


/* Glavni kontejner */
.frame {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: linear-gradient(to bottom, #f0f0f0, #d9d9d9); /* Blagi gradient */
  padding: 20px;
}


/* Sekcije */
.page-frame {
  width: 80%;
  max-width: 1000px;
  background: rgba(255, 255, 255, 0.9); /* Blaga prozirnost za čitljivost */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Dugme za otvaranje forme */
.toggle-form-btn {
  margin-bottom: 10px;
  padding: 10px 15px;
  border: none;
  background: #28a745;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.toggle-form-btn:hover {
  background: #218838;
}

/* Forma za unos */
.animal-form input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Dugmad */
.btn-primary {
  padding: 10px 15px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-primary:hover {
  background: #218838;
}

.btn-outline {
  background: none;
  border: 2px solid #28a745;
  color: #28a745;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-outline:hover {
  background: #28a745;
  color: white;
}

/* Lista životinja */
.animal-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

/* Kartica za životinje */
.animal-card {
  width: 250px;
  padding: 15px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-radius: 10px;
}

/* Slika životinje */
.animal-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
}

/* Paginacija */
.pagination {
  margin-top: 20px;
}

.pagination button {
  padding: 8px 12px;
  border: none;
  background: #28a745;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
}

.pagination button:disabled {
  background: gray;
  cursor: not-allowed;
}

</style>
