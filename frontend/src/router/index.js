import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Animals from '../views/Animals.vue';
import Home from '../views/Home.vue';
import About from '../views/onama.vue';
import Contact from '../views/kontakt.vue';

const routes = [
  {
    path: '/',
    redirect: '/login' // Početna stranica sada je Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/pocetna',
    name: 'pocetna',
    component: Home,
    meta: { requiresAuth: true } // Ova stranica traži prijavu
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: { requiresAuth: true }
  },
  {
    path: '/kontakt',
    name: 'kontakt',
    component: Contact,
    meta: { requiresAuth: true }
  },
  {
    path: '/animals',
    name: 'animals',
    component: Animals,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 🔹 Provjera prijave prije otvaranja stranica
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    next('/login'); // Ako nije prijavljen, ide na login
  } else {
    next(); // Inače ide normalno na rutu
  }
});

export default router;
