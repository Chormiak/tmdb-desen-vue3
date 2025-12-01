<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { image } from '@/services/images'
import useMovieStore from '@/stores/movie.ts'

interface Props {
  id?: string
}

const props = defineProps<Props>()
const route = useRoute()
const movieStore = useMovieStore()

const movieId = ref(props.id || (route.params.id as string))
const movie = ref<any>(null)
const isLoading = ref(true)

const loadMovieDetails = async () => {
  try {
    // Aqui você precisaria criar um serviço para buscar detalhes do filme
    // Por enquanto, vou simular com os dados que temos
    const result = await movieStore.discoverMovies('1')
    if (result.result) {
      const movies = (result as any).data.results
      movie.value = movies.find((m: any) => m.id.toString() === movieId.value) || null
    }
  } catch (error) {
    console.error('Error loading movie details:', error)
  } finally {
    isLoading.value = false
  }
}

const backdropUrl = ref('')
const posterUrl = ref('')

onMounted(() => {
  loadMovieDetails()
})

watch(
  () => movie.value,
  (newMovie) => {
    if (newMovie) {
      backdropUrl.value = newMovie.backdrop_path ? image('w780', newMovie.backdrop_path) : ''
      posterUrl.value = newMovie.poster_path
        ? image('w342', newMovie.poster_path)
        : '/placeholder-poster.jpg'
    }
  },
)
</script>

<template>
  <div class="movie-details-view">
    <div v-if="isLoading" class="loading">Carregando...</div>

    <div v-else-if="movie" class="movie-details">
      <div class="backdrop" :style="{ backgroundImage: `url(${backdropUrl})` }"></div>

      <div class="container">
        <div class="movie-content">
          <div class="poster-section">
            <img :src="posterUrl" :alt="movie.title" class="poster" />
          </div>

          <div class="info-section">
            <h1 class="title">{{ movie.title }}</h1>

            <div class="meta-info">
              <div class="rating">
                {{ movie.vote_average?.toFixed(1) }} ({{ movie.vote_count }} votos)
              </div>
              <div class="release-date" v-if="movie.release_date">
                {{ new Date(movie.release_date).toLocaleDateString('pt-BR') }}
              </div>
            </div>

            <div class="genres" v-if="movie.genre_ids">
              <span v-for="genreId in movie.genre_ids" :key="genreId" class="genre-tag">
                {{ movieStore.genreName(genreId) }}
              </span>
            </div>

            <div class="overview">
              <h3>Sinopse</h3>
              <p>{{ movie.overview || 'Sinopse não disponível.' }}</p>
            </div>

            <div class="additional-info">
              <div class="info-item">
                <strong>Idioma Original:</strong> {{ movie.original_language?.toUpperCase() }}
              </div>
              <div class="info-item">
                <strong>Popularidade:</strong> {{ movie.popularity?.toFixed(0) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <h2>Filme não encontrado</h2>
      <p>O filme que você está procurando não existe ou foi removido.</p>
    </div>
  </div>
</template>

<style scoped>
.movie-details-view {
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

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50rem;
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

.movie-details {
  position: relative;
}

.backdrop {
  position: relative;
  width: 100%;
  height: clamp(15rem, 40vw, 35rem);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  animation: slideDown var(--transition-standard);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.backdrop::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(10, 14, 39, 0.7), rgba(26, 31, 58, 0.6));
}

.backdrop::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: clamp(4rem, 12vw, 10rem);
  background: linear-gradient(to bottom, transparent, var(--color-bg-dark));
}

.container {
  position: relative;
  z-index: 10;
  transform: translateY(clamp(-4rem, -12vw, -10rem));
}

.movie-content {
  display: grid;
  grid-template-columns: clamp(12rem, 20%, 16rem) 1fr;
  gap: clamp(var(--spacing-lg), 5vw, var(--spacing-xl));
  animation: slideUp var(--transition-standard) 0.2s backwards;
  max-width: 95%;
  margin: 0 auto;
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

.poster-section {
  flex-shrink: 0;
}

.poster {
  width: clamp(12rem, 100%, 16rem);
  border-radius: var(--border-radius-lg);
  box-shadow:
    0 1rem 3rem rgba(255, 255, 255, 0.15),
    0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  border: 0.125rem solid var(--color-accent-primary);
  transition:
    transform var(--transition-standard),
    box-shadow var(--transition-standard);
}

.poster:hover {
  transform: translateY(-0.5rem) scale(1.02);
  box-shadow:
    0 1.5rem 4rem rgba(255, 255, 255, 0.2),
    0 0.75rem 1.5rem rgba(139, 0, 0, 0.15);
}

.info-section {
  padding: clamp(var(--spacing-md), 2vw, var(--spacing-lg)) 0;
}

.title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 900;
  color: var(--color-accent-primary);
  margin-bottom: var(--spacing-md);
  text-shadow: 0 0 1.25rem rgba(255, 255, 255, 0.4);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1.2;
}

.meta-info {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
  align-items: center;
}

.rating {
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  color: var(--color-bg-dark);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-md);
  font-weight: 700;
  font-size: 1.125rem;
}

.release-date {
  color: var(--color-text-secondary);
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.genre-tag {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--color-bg-tertiary);
  border: 0.0625rem solid var(--color-accent-primary);
  border-radius: var(--border-radius-lg);
  color: var(--color-accent-primary);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all var(--transition-fast);
}

.genre-tag:hover {
  background: var(--color-accent-primary);
  color: var(--color-bg-dark);
  box-shadow: 0 0.5rem 1rem rgba(255, 255, 255, 0.2);
}

.overview {
  margin-bottom: clamp(var(--spacing-lg), 3vw, var(--spacing-xl));
  animation: slideUp var(--transition-standard) 0.3s backwards;
}

.overview h3 {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  color: var(--color-accent-primary);
  margin-bottom: var(--spacing-md);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 0 0.625rem rgba(255, 255, 255, 0.2);
}

.overview p {
  color: var(--color-text-secondary);
  line-height: 1.8;
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
}

.additional-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(12rem, 22vw, 18rem), 1fr));
  gap: clamp(var(--spacing-md), 2vw, var(--spacing-lg));
  padding: clamp(var(--spacing-md), 2vw, var(--spacing-lg));
  background: linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg-tertiary));
  border: 0.0625rem solid var(--color-accent-primary);
  border-radius: var(--border-radius-lg);
  animation: slideUp var(--transition-standard) 0.4s backwards;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.info-item strong {
  color: var(--color-accent-primary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.info-item {
  color: var(--color-text-secondary);
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 30rem;
  text-align: center;
  animation: slideUp var(--transition-standard);
}

.not-found h2 {
  font-size: 2rem;
  color: var(--color-accent-primary);
  margin-bottom: var(--spacing-md);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.not-found p {
  color: var(--color-text-secondary);
  font-size: 1.125rem;
}

@media (max-width: 50rem) {
  .backdrop {
    height: 20rem;
  }

  .movie-content {
    grid-template-columns: 1fr;
  }

  .poster-section {
    display: flex;
    justify-content: center;
  }

  .poster {
    width: 12rem;
  }

  .title {
    font-size: 1.75rem;
  }

  .additional-info {
    grid-template-columns: 1fr;
  }
}
</style>
