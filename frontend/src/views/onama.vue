<template>
  <div class="about-container">
    <div class="about-content">
      <div class="about-text">
        <h2>O nama 🐾</h2>
        <p>
          Dobrodošli u <strong>Animal Explorer</strong>, aplikaciju posvećenu istraživanju, učenju i očuvanju životinjskog svijeta! 🌍🐾
          Naša misija je pružiti edukativne i zanimljive informacije o životinjama širom svijeta, od onih koje svakodnevno srećemo do rijetkih i ugroženih vrsta. Želimo potaknuti svijest o očuvanju prirode i pomoći ljudima da bolje razumiju značaj svake vrste u ekosistemu.
        </p>
        <p>
          Šta možete pronaći u aplikaciji?
        </p>
        <p>
          ✅ Detaljne informacije o različitim vrstama životinja 🦁🐧🐍
        </p><p>
          ✅ Pregled ugroženih i zaštićenih vrsta 📜</p><p>
          ✅ Podaci o staništima, prehrani i načinu života 🌱</p><p>
          ✅ Laka pretraga i pregled po kategorijama 🔍</p><p>
          ✅ Redovno ažurirani podaci i mogućnost dodavanja novih životinja 📝</p><p>

          🌿 Naša vizija je stvoriti platformu koja će inspirirati ljude svih generacija da cijene i štite prirodu. Svaka životinja ima svoju priču, a mi smo ovdje da je ispričamo!

          Hvala što ste dio naše zajednice! 💚🐾
        </p>
      </div>

      <div class="about-image">
        <img src="@/assets/illustrations/salamandra-tomtixier.png" alt="Ekološka svijest" class="illustration" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.about-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.about-text {
  flex: 1;
  text-align: left;
}

.about-text h2 {
  color: #2E7D32;
  font-family: 'Lora', serif;
}

.about-text p {
  color: #333;
  line-height: 1.5;
  font-size: 16px;
}

.about-image img {
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
}

.team-section {
  margin-top: 30px;
}

.team-section h3 {
  font-size: 22px;
  color: #2E7D32;
}

.team-members {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
}

.team-member {
  text-align: center;
}

.team-member img {
  border-radius: 50%;
  width: 80px;
  height: 80px;
}

.team-member p {
  margin: 5px 0;
  font-size: 14px;
}
</style>
<script setup lang="ts">
</script>