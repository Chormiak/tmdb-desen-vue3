import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/movies',
    name: 'movies',
    component: () => import('@/views/MoviesView.vue'),
  },
  {
    path: '/tv',
    name: 'tv',
    component: () => import('@/views/TvView.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/SearchView.vue'),
  },
  {
    path: '/movie/:id',
    name: 'movie-details',
    component: () => import('@/views/MovieDetailsView.vue'),
    props: true,
  },
  {
    path: '/tv/:id',
    name: 'tv-details',
    component: () => import('@/views/TvDetailsView.vue'),
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;