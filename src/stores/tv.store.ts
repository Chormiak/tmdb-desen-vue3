import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import type { Ref, Reactive } from 'vue';

import api from '@/plugins/axios';

import getGenreName from './utils/getGenreName';

import type {
  GetDiscoverTv,
  GetListOfGenresTv,
  GetSearchTv,
  GetTrendingTv,
} from '@/types/tv.types';

type ReturnRequest<Obj extends Record<string, any>> = Promise<
  { result: true; data: Obj } | { result: false }
>;

const useTvStore = defineStore('tv', function () {
  const genres: Ref<GetListOfGenresTv['genres']> = ref([]);

  async function getDiscoverList(page: `${number}` = '1'): ReturnRequest<GetDiscoverTv> {
    return api
      .get('/discover/tv', { params: { page: page, sort_by: 'popularity.desc' } })
      .then((response) => {
        if (response.data['page'] != page) throw new Error();
        return { result: true, data: response.data as GetDiscoverTv };
      })
      .catch(() => ({ result: false }));
  }

  async function getListOfGenres(): ReturnRequest<GetListOfGenresTv['genres']> {
    return api
      .get('/genre/tv/list')
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
      .get('/discover/tv', { params: { with_genres: id } })
      .then((response) => {
        if (!response.data['page']) throw new Error();

        return { result: true, data: response.data };
      })
      .catch(() => ({ result: false }));
  }

  const QueyParams = [
    { name: 'first_air_date_year', type: 'number' },
    { name: 'include_adult', type: 'boolean' },
    { name: 'year', type: 'number' },
  ] as const;

  async function getSearch(
    page: `${number}` = '1',
    queries: Record<string, any>,
  ): ReturnRequest<GetSearchTv> {
    const queyParams: Record<string, any> = {};

    for (const quey in queries) {
      const found = QueyParams.find((params) => params.name === quey);
      if (found && queyParams[found.name] && typeof queries[quey] !== found.type) throw new Error();

      queyParams[quey] = queries[quey];
    }

    return api
      .get('/search/tv', { params: { page: page, ...queyParams } })
      .then((response) => {
        if (response.data['page'] != page) throw new Error();

        return { result: true, data: response.data };
      })
      .catch(() => ({ result: false }));
  }

  const periodNameMap = {
    day: 'day',
    week: 'week',
  } as const;

  async function getTrending(
    page: `${number}` = '1',
    period: (typeof periodNameMap)[keyof typeof periodNameMap],
  ): ReturnRequest<GetTrendingTv> {
    return api
      .get('/trending/tv/day')
      .then((response) => {
        if (response.data['page'] != page) throw new Error();

        return { result: true, data: response.data };
      })
      .catch(() => ({ result: false }));
  }

  const genreName = (id: number) => getGenreName(id, genres.value);

  return { getDiscoverList, getListOfGenres, getOneOfGenreById, getSearch, getTrending, genreName };
});

export default useTvStore;
