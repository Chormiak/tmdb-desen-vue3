<script setup lang="ts">
import { onMounted, watch, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useSearchStore from '@/stores/search'
import useMovieStore from '@/stores/movie.ts'
import useTvStore from '@/stores/tv.ts'
import MediaCard from '@/components/ui/MediaCard.vue'

const route = useRoute()
const router = useRouter()
const searchStore = useSearchStore()
const movieStore = useMovieStore()
const tvStore = useTvStore()

const currentTab = ref<'all' | 'movies' | 'tv'>('all')

const searchQuery = computed(() => route.query.q as string)

const performSearch = () => {
  if (searchQuery.value) {
    searchStore.performSearch(searchQuery.value)
  }
}

const visibleResults = computed(() => {
  if (currentTab.value === 'movies') {
    return searchStore.results.movies
  } else if (currentTab.value === 'tv') {
    return searchStore.results.tv
  }
  return [...searchStore.results.movies, ...searchStore.results.tv]
})

// Função para determinar o tipo de mídia
const getMediaType = (item: any): 'movie' | 'tv' => {
  return 'title' in item ? 'movie' : 'tv'
}

// Função para obter a chave única
const getItemKey = (item: any, index: number) => {
  return `${getMediaType(item)}-${item.id}-${index}`
}

// Função para obter os gêneros corretos
const getGenres = (item: any) => {
  return getMediaType(item) === 'movie' ? movieStore.genres : tvStore.genres
}

watch(
  () => route.query.q,
  (newQuery) => {
    if (newQuery) {
      performSearch()
    }
  },
  { immediate: true },
)

onMounted(async () => {
  await Promise.all([movieStore.loadGenres(), tvStore.loadGenres()])
})
</script>

<template>
  <div class="search-view">
    <div class="container">
      <header class="page-header">
        <h1>Resultados da Busca</h1>
        <p v-if="searchQuery">Para: "{{ searchQuery }}"</p>
        <p v-else>Digite algo para buscar</p>
      </header>

      <div v-if="searchQuery && !searchStore.isLoading" class="search-results">
        <div class="results-header">
          <h2>{{ searchStore.results.totalResults }} resultados encontrados</h2>

          <div class="tabs">
            <button :class="['tab', { active: currentTab === 'all' }]" @click="currentTab = 'all'">
              Todos ({{ searchStore.results.totalResults }})
            </button>
            <button
              :class="['tab', { active: currentTab === 'movies' }]"
              @click="currentTab = 'movies'"
            >
              Filmes ({{ searchStore.results.movies.length }})
            </button>
            <button :class="['tab', { active: currentTab === 'tv' }]" @click="currentTab = 'tv'">
              Séries ({{ searchStore.results.tv.length }})
            </button>
          </div>
        </div>

        <div v-if="visibleResults.length" class="media-grid">
          <MediaCard
            v-for="(item, index) in visibleResults"
            :key="getItemKey(item, index)"
            :media="item"
            :media-type="getMediaType(item)"
            :genres="getGenres(item)"
          />
        </div>

        <div v-else class="no-results">
          <h3>Nenhum resultado encontrado</h3>
          <p>Tente buscar por outros termos</p>
        </div>
      </div>

      <div v-else-if="searchStore.isLoading" class="loading">Buscando...</div>
    </div>
  </div>
</template>

<style scoped>
.search-view {
  animation: fadeIn var(--transition-standard);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.page-header {
  margin-bottom: var(--spacing-2xl);
  animation: slideUp var(--transition-standard);
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--color-accent-primary);
  margin-bottom: var(--spacing-sm);
  text-shadow: 0 0 1.25rem rgba(255, 255, 255, 0.4);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.page-header p {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-results {
  animation: slideUp var(--transition-standard) 0.1s backwards;
}

.results-header {
  margin-bottom: var(--spacing-2xl);
}

.results-header h2 {
  color: var(--color-accent-primary);
  margin-bottom: var(--spacing-lg);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.tabs {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  border-bottom: 0.0625rem solid var(--color-border);
  padding-bottom: var(--spacing-md);
}

.tab {
  padding: var(--spacing-sm) var(--spacing-md);
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
  transition: all var(--transition-fast);
  position: relative;
}

.tab:hover {
  color: var(--color-accent-primary);
}

.tab.active {
  color: var(--color-accent-primary);
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -var(--spacing-md);
  left: 0;
  right: 0;
  height: 0.1875rem;
  background: var(--color-accent-primary);
  animation: expandWidth var(--transition-fast) ease-out;
}

@keyframes expandWidth {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  font-size: 1.25rem;
  color: var(--color-accent-primary);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl) var(--spacing-lg);
  text-align: center;
  animation: slideUp var(--transition-standard);
}

.no-results h3 {
  font-size: 1.75rem;
  color: var(--color-accent-primary);
  margin-bottom: var(--spacing-md);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.no-results p {
  color: var(--color-text-secondary);
  font-size: 1.125rem;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: var(--spacing-lg);
  animation: fadeIn var(--transition-standard);
}
</style>
