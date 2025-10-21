import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';

import api from '@/plugins/axios';

const useMovieStore = defineStore('movie', () => {
  const genres: Ref<{ id: number; name: string }[]> = ref([]);

  async function getDiscoverList(page: `${number}` = '1') {
    return api
      .get('/discover/movie', { params: { page: page, sort_by: 'popularity.desc' } })
      .then((response) => {
        if (response.data['page'] != page) throw new Error();
        return { result: true, data: response.data };
      })
      .catch(() => ({ result: false }));
  }

  async function getListOfGenres() {
    return api
      .get('/genre/movie/list')
      .then((response) => {
        if (!response.data['genres']) throw new Error();

        genres.value.splice(0, genres.value.length);
        for (const genre of response.data['genres']) genres.value.push(genre);

        return { result: true, data: response.data['genres'] };
      })
      .catch(() => ({ result: false }));
  }

  async function getOneOfGenreById(id: number) {
    return api
      .get('/genre/movie/' + id)
      .then((response) => {
        if (response.data['original_title'].length === 0) throw new Error();

        return { result: true, data: response.data };
      })
      .catch(() => ({ result: false }));
  }

  function getGenreName(id: number): string | undefined {
    return genres.value.find((genre) => genre.id === id)?.name;
  }
});
