<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue';
import useTvStore from '@/stores/tv.store';
import useMovieStore from '@/stores/movie.store';
import useImageTmdb from '@/services/useImageTmdb';
import { defineProps } from 'vue';

interface Props {
  type: 'tv' | 'movie';
  id: string;
}
const props = defineProps<Props>();

const stores = {
  tv: useTvStore(),
  movie: useMovieStore(),
};

const list: Ref<any[]> = ref([]);

onMounted(async () => {
  if (!props.type || !props.id) return;

  const store = stores[props.type as keyof typeof stores];
  if (!store) return;

  const data = await store.getOneOfGenreById(Number(props.id)).then((r) => (r as any).data);
  list.value = (data as any)?.results || [];

});
</script>

<template>
  <div>
    <h2 v-if="props.type === 'movie'">Movies</h2>
    <h2 v-else>TV</h2>

    <ul>
      <li v-for="item in list" :key="item.id">
        <router-link
          :to="{
            name: props.type === 'movie' ? 'movie-details' : 'tv-details',
            params: { id: item.id },
          }"
          class="media-link"
        >
          <img :src="useImageTmdb('w342', item.poster_path)" :alt="item.title || item.name" />
          <div>
            <h3>{{ item.title || item.name }}</h3>
            <p>
              {{
                ((item.genre_ids || []) as any[])
                  .map((id) => stores[props.type].genreName(id))
                  .join(', ')
              }}
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
