<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

const navigateTo = (path: string) => {
  router.push(path);
};

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/search',
      query: { q: searchQuery.value.trim() }
    });
    searchQuery.value = '';
  }
};

const handleKeypress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    performSearch();
  }
};
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="logo" @click="navigateTo('/')">
        <h1>ZombieFlix</h1>
        <span>Apocalipse Zumbi</span>
      </div>
      
      <nav class="navigation">
        <button @click="navigateTo('/')" class="nav-link">
          Início
        </button>
        <button @click="navigateTo('/movies')" class="nav-link">
          Filmes
        </button>
        <button @click="navigateTo('/tv')" class="nav-link">
          Séries
        </button>
      </nav>

      <div class="search-container">
        <input
          v-model="searchQuery"
          @keypress="handleKeypress"
          type="text"
          placeholder="Buscar filmes ou séries..."
          class="search-input"
        />
        <button @click="performSearch" class="search-button">
          🔍
        </button>
      </div>
    </div>
  </header>
</template>