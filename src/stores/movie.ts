import { defineStore } from 'pinia'
import { ref } from 'vue'
import { discover } from '@/services/discover'
import { getGenres } from '@/services/genres'
import { trending } from '@/services/trending'
import getGenreName from './utils/getGenreName'
import useKeywordsStore from '@/stores/keywords'

const useMovieStore = defineStore('movie', () => {
  const genres = ref<{ id: number; name: string }[]>([])
  const keywordsStore = useKeywordsStore()

  const loadGenres = async () => {
    const res = await getGenres('movie')
    if (res.result) genres.value = res.data
    return res
  }

  const discoverMovies = (page: `${number}` = '1') => {
    const keywordIds = keywordsStore.allSelectedKeywordIds
    return discover('movie', {
      page,
      sort_by: 'popularity.desc',
      ...(keywordIds.length && { with_keywords: keywordIds.join('|') }),
    })
  }

  const getOneGenre = (id: number) => {
    const keywordIds = keywordsStore.allSelectedKeywordIds
    return discover('movie', {
      with_genres: id,
      ...(keywordIds.length && { with_keywords: keywordIds.join('|') }),
    })
  }

  const getListOfGenres = loadGenres
  const getDiscoverList = discoverMovies
  const getOneOfGenreById = getOneGenre

  return {
    genres,
    loadGenres,
    discoverMovies,
    getOneGenre,
    getTrendingMovies: (period: 'day' | 'week') => {
      const keywordIds = keywordsStore.allSelectedKeywordIds
      return trending(
        'movie',
        period,
        keywordIds.length ? { with_keywords: keywordIds.join('|') } : undefined,
      )
    },
    genreName: (id: number) => getGenreName(id, genres.value),
    getListOfGenres,
    getDiscoverList,
    getOneOfGenreById,
  }
})

export default useMovieStore
