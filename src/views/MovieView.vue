<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import useMovieStore from '@/stores/movie.store';
import useImageTmdb from '@/services/useImageTmdb';

import { changeLoading } from '@/plugins/loading';
import formatDate from '@/utils/formatDate';

interface Props {
  id: string;
}
const props = defineProps<Props>();
const movieStore = useMovieStore();

const discoverList: Ref<Record<string, any>> = ref({});
const currentItem: Ref<Record<string, any>> = ref({});

function getOneOfArray(id: number) {
  const list = discoverList.value.results;
  if (!list || !Array.isArray(list)) return null;
  return list.find((movie) => movie.id === id);
}

function changeMovie(id: number) {
  currentItem.value = getOneOfArray(Number(id));
}

onMounted(async function () {
  changeLoading(true);
  await movieStore.getListOfGenres();
  await movieStore.getDiscoverList().then((r) => {
    if (r.result) discoverList.value = r.data;
  });

  if (props.id) currentItem.value = getOneOfArray(Number(props.id));

  changeLoading(false);
});
</script>

<template>
  <div>
    <h2>Movie</h2>
    <div v-if="props.id">
      <img :src="useImageTmdb('w780', currentItem.backdrop_path)" alt="backdrop_path" />
      <h3>{{ currentItem.title }}</h3>
      <p>{{ formatDate(currentItem.release_date) }}</p>
      <ul>
        <li v-for="genre_id in currentItem.genre_ids as any">
          <router-link :to="{ name: 'genres', params: { type: 'movie', id: genre_id } }">
            <p>{{ movieStore.genreName(genre_id) }}</p>
          </router-link>
        </li>
      </ul>
      <p v-if="currentItem.genre_ids">
        {{ (currentItem.genre_ids as any[]).map((id) => movieStore.genreName(id)).join(', ') }}
      </p>

      <p>{{ currentItem.overview }}</p>
    </div>

    <ul v-else>
      <li v-for="movie in discoverList.results" :key="`movie${movie.id}`">
        <router-link
          @click="changeMovie(movie.id)"
          :to="{ name: 'movie-details', params: { id: movie.id } }"
          class="movie-link"
        >
          <img :src="useImageTmdb('w342', movie.poster_path)" alt="poster_path" />
          <div>
            <h3>{{ movie.title }}</h3>
            <ul>
              <li v-for="genre_id in movie.genre_ids as any">
                <router-link :to="{ name: 'genres', params: { type: 'movie', id: genre_id } }">
                  <p>{{ movieStore.genreName(genre_id) }}</p>
                </router-link>
              </li>
            </ul>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
li {
  margin-top: 2vw;
}
</style>
