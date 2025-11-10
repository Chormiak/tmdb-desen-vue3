import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/movie',
    name: 'movie',
    component: () => import('../views/MovieView.vue'),
  },
  {
    path: '/movie/:id',
    name: 'movie-details',
    component: () => import('../views/MovieView.vue'),
    props: true,
  },
  {
    path: '/tv',
    name: 'tv',
    component: () => import('../views/TvView.vue'),
  },
  {
    path: '/tv/:id',
    name: 'tv-details',
    component: () => import('../views/TvView.vue'),
    props: true,
  },
  {
    path: '/genre/:type:id',
    name: 'genres',
    component: () => import('../views/GenreView.vue'),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
