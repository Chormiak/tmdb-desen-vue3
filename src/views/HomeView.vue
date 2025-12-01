<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import useMovieStore from '@/stores/movie.ts'
import useTvStore from '@/stores/tv.ts'
import useKeywordsStore from '@/stores/keywords'
import MediaCard from '@/components/ui/MediaCard.vue'
import KeywordFilter from '@/components/KeywordFilter.vue'

const movieStore = useMovieStore()
const tvStore = useTvStore()
const keywordsStore = useKeywordsStore()

const trendingMovies = ref<any[]>([])
const trendingTV = ref<any[]>([])
const isLoading = ref(true)

const loadTrendingContent = async () => {
  isLoading.value = true
  try {
    const [moviesResult, tvResult] = await Promise.all([
      movieStore.discoverMovies('1'),
      tvStore.discoverTv('1'),
    ])

    if (moviesResult.result) {
      trendingMovies.value = (moviesResult as any).data.results.slice(0, 8)
    }

    if (tvResult.result) {
      trendingTV.value = (tvResult as any).data.results.slice(0, 8)
    }
  } catch (error) {
    console.error('Error loading trending content:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadTrendingContent()
})

watch(
  () => keywordsStore.allSelectedKeywordIds,
  () => {
    loadTrendingContent()
  },
)
</script>

<template>
  <div class="home-view">
    <section class="hero">
      <div class="hero-content">
        <h1>Mundo Zumbi no Cinema e TV</h1>
        <p>Descubra os melhores filmes e séries sobre zumbis, apocalipse e infecções</p>
        <KeywordFilter />
      </div>
    </section>

    <div class="container">
      <section class="trending-section">
        <h2>Filmes Zumbis em Alta</h2>
        <div v-if="isLoading" class="loading">Carregando...</div>
        <div v-else class="media-grid">
          <MediaCard
            v-for="movie in trendingMovies"
            :key="`movie-${movie.id}`"
            :media="movie"
            media-type="movie"
            :genres="movieStore.genres"
          />
        </div>
      </section>

      <section class="trending-section">
        <h2>Séries Zumbis em Alta</h2>
        <div v-if="isLoading" class="loading">Carregando...</div>
        <div v-else class="media-grid">
          <MediaCard
            v-for="tvShow in trendingTV"
            :key="`tv-${tvShow.id}`"
            :media="tvShow"
            media-type="tv"
            :genres="tvStore.genres"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.home-view {
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

.hero {
  background: linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%);
  border-bottom: 0.1875rem solid var(--color-accent-primary);
  padding: var(--spacing-2xl) var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
  box-shadow: 0 0.5rem 2rem rgba(255, 255, 255, 0.05);
}

.hero-content {
  max-width: 90rem;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--color-accent-primary);
  margin-bottom: var(--spacing-md);
  text-shadow: 0 0 1.25rem rgba(255, 255, 255, 0.4);
  letter-spacing: 0.05em;
  animation: slideUp 0.6s ease-out;
}

.hero p {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
  animation: slideUp 0.6s ease-out 0.1s backwards;
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

.trending-section {
  margin-bottom: var(--spacing-2xl);
  animation: slideUp var(--transition-standard) 0.2s backwards;
}

.trending-section h2 {
  font-size: 1.75rem;
  color: var(--color-accent-primary);
  margin-bottom: var(--spacing-lg);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 0 0.625rem rgba(255, 255, 255, 0.2);
  position: relative;
  padding-bottom: var(--spacing-md);
}

.trending-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.1875rem;
  background: linear-gradient(90deg, var(--color-accent-primary), transparent);
  animation: expandWidth var(--transition-slow) ease-out;
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

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: var(--spacing-lg);
  animation: fadeIn var(--transition-standard);
}
</style>
