<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import useTvStore from '@/stores/tv.store';
import useImageTmdb from '@/services/useImageTmdb';

import { changeLoading } from '@/plugins/loading';
import formatDate from '@/utils/formatDate';

interface Props {
  id: string;
}
const props = defineProps<Props>();
const tvStore = useTvStore();

const discoverList: Ref<Record<string, any>> = ref({});
const currentItem: Ref<Record<string, any>> = ref({});

function getOneOfArray(id: number) {
  const list = discoverList.value.results;
  if (!list || !Array.isArray(list)) return null;
  return list.find((tv) => tv.id === id);
}

function changeTv(id: number) {
  currentItem.value = getOneOfArray(Number(id));
}

onMounted(async function () {
  changeLoading(true);
  await tvStore.getListOfGenres();
  await tvStore.getDiscoverList().then((r) => {
    if (r.result) discoverList.value = r.data;
  });

  if (props.id) currentItem.value = getOneOfArray(Number(props.id));

  changeLoading(false);
});
</script>

<template>
  <div>
    <h2>Tv</h2>
    <div v-if="props.id">
      <img :src="useImageTmdb('w780', currentItem.backdrop_path)" alt="backdrop_path" />
      <div v-if="currentItem.genre_ids">
        <h3>{{ currentItem.name }}</h3>
        <p>{{ formatDate(currentItem.first_air_date) }}</p>
        <ul>
          <li v-for="genre_id in currentItem.genre_ids as any">
            <router-link :to="{ name: 'genres', params: { type: 'tv', id: genre_id } }">
              <p>{{ tvStore.genreName(genre_id) }}</p>
            </router-link>
          </li>
        </ul>
        <p>{{ currentItem.overview }}</p>
      </div>
    </div>

    <ul v-else>
      <li v-for="tv in discoverList.results" :key="`tv${tv.id}`">
        <router-link
          @click="changeTv(tv.id)"
          :to="{ name: 'tv-details', params: { id: tv.id } }"
          class="tv-link"
        >
          <img :src="useImageTmdb('w342', tv.poster_path)" alt="poster_path" />
          <div>
            <h3>{{ tv.name }}</h3>
            <ul>
              <li v-for="genre_id in tv.genre_ids as any">
                <router-link :to="{ name: 'genres', params: { type: 'tv', id: genre_id } }">
                  <p>{{ tvStore.genreName(genre_id) }}</p>
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
li img {
  margin-top: 2vw;
}
li ul {
  display: flex;
}
li ul li {
  margin-right: 0.5vw;
}
</style>
