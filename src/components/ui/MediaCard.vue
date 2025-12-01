<script setup lang="ts">
import { image } from '@/services/image';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

interface Props {
  media: {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    overview: string;
    genre_ids?: number[];
  };
  mediaType: 'movie' | 'tv';
  genres?: { id: number; name: string }[];
}

const props = defineProps<Props>();
const router = useRouter();

const title = computed(() => props.media.title || props.media.name);
const releaseDate = computed(() => props.media.release_date || props.media.first_air_date);
const posterUrl = computed(() => 
  props.media.poster_path 
    ? image('w342', props.media.poster_path)
    : '/placeholder-poster.jpg'
);

const navigateToDetails = () => {
  router.push(`/${props.mediaType}/${props.media.id}`);
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR');
};

const getGenreNames = (genreIds: number[]) => {
  if (!props.genres) return [];
  return genreIds
    .map(id => props.genres!.find(genre => genre.id === id)?.name)
    .filter(Boolean)
    .slice(0, 2);
};
</script>

<template>
  <article class="media-card" @click="navigateToDetails">
    <div class="poster-container">
      <img 
        :src="posterUrl" 
        :alt="title"
        class="poster"
        loading="lazy"
      />
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
        <span 
          v-for="genre in getGenreNames(media.genre_ids)" 
          :key="genre"
          class="genre-tag"
        >
          {{ genre }}
        </span>
      </div>
      
      <p class="overview">
        {{ media.overview.slice(0, 120) }}...
      </p>
    </div>
  </article>
</template>