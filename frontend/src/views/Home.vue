<template>
  <div class="home-container">
    <section class="hero">
      <h1>Dobrodošli u Svijet Životinja</h1>
      <p>Otkrijte fascinantan svijet životinja i saznajte više o njima!</p>
      <router-link to="/Animals" class="cta-button"
        >Istraži Životinje</router-link
      >
    </section>

    <section class="image-gallery">
      <div class="gallery-item">
        <img
          src="https://i.ytimg.com/vi/xW1ZLoH97yg/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCaPp-JIoaiA5JtuJLvuBUFbVPh-g"
          alt="Lav"
        />
        <p>Zaštitimo ugrožene vrste</p>
      </div>
      <div class="gallery-item">
        <img
          src="https://www.liber-media.hr/image/catalog/Slon.jpg"
          alt="Slon"
        />
        <p>Slonovi – nježni divovi prirode</p>
      </div>
      <div class="gallery-item">
        <img
          src="https://storage.radiosarajevo.ba/article/289724/871x540/pingvin_pixabay.jpg?v1517425385"
          alt="Pingvini"
        />
        <p>Život u hladnim predjelima</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  text-align: center;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('https://images.vexels.com/content/315263/preview/cute-animals-children-s-background-892621.png')
    no-repeat center center/cover;
  color: black;
}

.hero {
  background: rgba(0, 0, 0, 0.6);
  padding: 100px 20px;
  width: 100%;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
}

.hero h1 {
  font-size: 40px;
  font-family: 'Lora', serif;
}

.hero p {
  font-size: 18px;
  margin-top: 10px;
}

.cta-button {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 18px;
  color: white;
  background: #2e7d32;
  text-decoration: none;
  border-radius: 5px;
  transition: 0.3s;
}

.cta-button:hover {
  background: #1b5e20;
}

.image-gallery {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 40px 0;
}

.gallery-item {
  text-align: center;
}

.gallery-item img {
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.gallery-item p {
  margin-top: 10px;
  font-size: 16px;
}
</style>
