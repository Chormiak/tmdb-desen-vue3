<script setup lang="ts">
import { image } from '@/services/images'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  media: {
    id: number
    title?: string
    name?: string
    poster_path: string | null
    vote_average: number
    release_date?: string
    first_air_date?: string
    overview: string
    genre_ids?: number[]
  }
  mediaType: 'movie' | 'tv'
  genres?: { id: number; name: string }[]
}

const props = defineProps<Props>()
const router = useRouter()

const title = computed(() => props.media.title || props.media.name)
const releaseDate = computed(() => props.media.release_date || props.media.first_air_date)
const posterUrl = computed(() =>
  props.media.poster_path ? image('w342', props.media.poster_path) : '/placeholder-poster.jpg',
)

const navigateToDetails = () => {
  router.push(`/${props.mediaType}/${props.media.id}`)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const getGenreNames = (genreIds: number[]) => {
  if (!props.genres) return []
  return genreIds
    .map((id) => props.genres!.find((genre) => genre.id === id)?.name)
    .filter(Boolean)
    .slice(0, 2)
}
</script>

<template>
  <article class="media-card" @click="navigateToDetails">
    <div class="poster-container">
      <img :src="posterUrl" :alt="title" class="poster" loading="lazy" />
      <div class="rating">
        {{ media.vote_average.toFixed(1) }}
      </div>
    </div>

    <div class="content">
      <h3 class="title">{{ title }}</h3>

      <div v-if="releaseDate" class="release-date">
        {{ formatDate(releaseDate) }}
      </div>

      <div v-if="media.genre_ids && genres" class="genres">
        <span v-for="genre in getGenreNames(media.genre_ids)" :key="genre" class="genre-tag">
          {{ genre }}
        </span>
      </div>

      <p class="overview">{{ media.overview.slice(0, 120) }}...</p>
    </div>
  </article>
</template>

<style scoped>
.media-card {
  background: var(--color-bg-secondary);
  border: 0.0625rem solid var(--color-border);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-standard);
  display: flex;
  flex-direction: column;
  height: 100%;
  animation: slideUp var(--transition-standard);
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

.media-card:hover {
  transform: translateY(-0.625rem);
  border-color: var(--color-accent-primary);
  box-shadow:
    0 1rem 3rem rgba(255, 255, 255, 0.15),
    0 0.25rem 0.625rem rgba(139, 0, 0, 0.1);
}

.poster-container {
  position: relative;
  overflow: hidden;
  padding-top: 150%;
  background: linear-gradient(45deg, var(--color-bg-tertiary), var(--color-bg-secondary));
}

.poster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-standard);
}

.media-card:hover .poster {
  transform: scale(1.1) rotate(0.5deg);
}

.rating {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  color: var(--color-bg-dark);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.875rem;
  box-shadow: 0 0.25rem 1rem rgba(255, 255, 255, 0.3);
  border: 0.125rem solid var(--color-accent-primary);
  animation: ratingPulse 2s infinite;
}

@keyframes ratingPulse {
  0%,
  100% {
    box-shadow: 0 0.25rem 1rem rgba(255, 255, 255, 0.3);
  }
  50% {
    box-shadow: 0 0.25rem 1.5rem rgba(255, 255, 255, 0.5);
  }
}

.content {
  padding: var(--spacing-lg);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-accent-primary);
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
  text-shadow: 0 0 0.625rem rgba(255, 255, 255, 0.15);
}

.release-date {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.genre-tag {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  background: var(--color-bg-tertiary);
  border: 0.0625rem solid var(--color-accent-primary);
  border-radius: var(--border-radius-md);
  font-size: 0.75rem;
  color: var(--color-accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.genre-tag:hover {
  background: var(--color-accent-primary);
  color: var(--color-bg-dark);
}

.overview {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
  flex: 1;
}
</style>
