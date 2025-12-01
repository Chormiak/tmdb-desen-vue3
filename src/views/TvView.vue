<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import useTvStore from '@/stores/tv.ts'
import useKeywordsStore from '@/stores/keywords.ts'
import MediaCard from '@/components/ui/MediaCard.vue'
import PaginationComponent from '@/components/ui/PaginationComponent.vue'
import KeywordFilter from '@/components/KeywordFilter.vue'

const tvStore = useTvStore()
const keywordsStore = useKeywordsStore()

const tvShows = ref<any[]>([])
const currentPage = ref(1)
const totalPages = ref(0)
const isLoading = ref(false)

const loadTvShows = async (page: number = 1) => {
  isLoading.value = true
  currentPage.value = page

  try {
    const result = await tvStore.discoverTv(`${page}`)
    if (result.result) {
      tvShows.value = (result as any).data.results
      totalPages.value = Math.min((result as any).data.total_pages, 500)
    }
  } catch (error) {
    console.error('Error loading TV shows:', error)
  } finally {
    isLoading.value = false
  }
}

const handlePageChange = (page: number) => {
  loadTvShows(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(
  () => keywordsStore.allSelectedKeywordIds,
  () => {
    loadTvShows(1)
  },
)

onMounted(async () => {
  await tvStore.loadGenres()
  loadTvShows()
})
</script>

<template>
  <div class="tv-view">
    <div class="container">
      <header class="page-header">
        <h1>Séries Zumbis</h1>
        <p>Descubra as melhores séries sobre o apocalipse zumbi</p>
      </header>

      <KeywordFilter />

      <div v-if="isLoading" class="loading">Carregando séries...</div>

      <div v-else>
        <div v-if="tvShows.length" class="results-section">
          <div class="media-grid">
            <MediaCard
              v-for="tvShow in tvShows"
              :key="tvShow.id"
              :media="tvShow"
              media-type="tv"
              :genres="tvStore.genres"
            />
          </div>

          <PaginationComponent
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="handlePageChange"
          />
        </div>

        <div v-else class="no-results">
          <h3>Nenhuma série encontrada</h3>
          <p>Tente ajustar os filtros de busca</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tv-view {
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

.results-section {
  animation: slideUp var(--transition-standard) 0.1s backwards;
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
  margin-bottom: var(--spacing-2xl);
  animation: fadeIn var(--transition-standard);
}
</style>
