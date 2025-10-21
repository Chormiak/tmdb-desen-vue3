import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';

import api from '@/plugins/axios';

import getGenreName from './utils/getGenreName';

type ReturnRequest = Promise<{ result: true; data: Record<string, any> } | { result: false }>;

const useMovieStore = defineStore('movie', () => {
  const genres: Ref<{ id: number; name: string }[]> = ref([]);

  async function getDiscoverList(page: `${number}` = '1'): ReturnRequest {
    return api
      .get('/discover/movie', { params: { page: page, sort_by: 'popularity.desc' } })
      .then((response) => {
        if (response.data['page'] != page) throw new Error();
        return { result: true, data: response.data };
      })
      .catch(() => ({ result: false }));
  }

  async function getListOfGenres(): ReturnRequest {
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

  async function getOneOfGenreById(id: number): ReturnRequest {
    return api
      .get('/discover/movie', { params: { with_genres: id } })
      .then((response) => {
        if (!response.data['page']) throw new Error();

        return { result: true, data: response.data };
      })
      .catch(() => ({ result: false }));
  }

  const genreName = (id: number) => getGenreName(id, genres.value);

  return { getDiscoverList, getListOfGenres, getOneOfGenreById, genreName };
});

export default useMovieStore;
