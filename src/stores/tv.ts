import { defineStore } from 'pinia'
import { ref } from 'vue'
import { discover } from '@/services/discover'
import { getGenres } from '@/services/genres'
import { trending } from '@/services/trending'
import { search } from '@/services/search'
import getGenreName from './utils/getGenreName'
import useKeywordsStore from '@/stores/keywords'

const allowedSearchParams = {
  first_air_date_year: 'number',
  include_adult: 'boolean',
  year: 'number',
} as const

const useTvStore = defineStore('tv', () => {
  const genres = ref<{ id: number; name: string }[]>([])
  const keywordsStore = useKeywordsStore()

  const loadGenres = async () => {
    const res = await getGenres('tv')
    if (res.result) genres.value = res.data
    return res
  }

  const validateTvSearch = (queries: Record<string, any>) => {
    const filtered: Record<string, any> = {}
    for (const key in queries) {
      const type = allowedSearchParams[key as keyof typeof allowedSearchParams]
      if (type && typeof queries[key] === type) filtered[key] = queries[key]
    }
    return filtered
  }

  const discoverTv = (page: `${number}` = '1') => {
    const keywordIds = keywordsStore.allSelectedKeywordIds
    return discover('tv', {
      page,
      sort_by: 'popularity.desc',
      ...(keywordIds.length && { with_keywords: keywordIds.join('|') }),
    })
  }

  const getOneGenre = (id: number) => {
    const keywordIds = keywordsStore.allSelectedKeywordIds
    return discover('tv', {
      with_genres: id,
      ...(keywordIds.length && { with_keywords: keywordIds.join('|') }),
    })
  }

  const searchTv = (page: `${number}` = '1', queries: Record<string, any>) => {
    const keywordIds = keywordsStore.allSelectedKeywordIds
    return search('tv', {
      page,
      ...validateTvSearch(queries),
      ...(keywordIds.length && { with_keywords: keywordIds.join('|') }),
    })
  }

  const getListOfGenres = loadGenres
  const getDiscoverList = discoverTv
  const getOneOfGenreById = getOneGenre

  return {
    genres,
    loadGenres,
    discoverTv,
    getOneGenre,
    searchTv,
    getTrendingTv: (period: 'day' | 'week') => {
      const keywordIds = keywordsStore.allSelectedKeywordIds
      return trending(
        'tv',
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

export default useTvStore
