import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { search as searchService } from '@/services/search'
import type { Movie, TV } from '@/types/tmdb'
import useKeywordsStore from '@/stores/keywords'

interface SearchResults {
  movies: Movie[]
  tv: TV[]
  totalResults: number
}

const useSearchStore = defineStore('search', () => {
  const results = ref<SearchResults>({
    movies: [],
    tv: [],
    totalResults: 0,
  })

  const query = ref('')
  const isLoading = ref(false)
  const keywordsStore = useKeywordsStore()

  const performSearch = async (searchQuery: string, page: number = 1) => {
    if (!searchQuery.trim()) return

    isLoading.value = true
    query.value = searchQuery

    try {
      const keywordIds = keywordsStore.allSelectedKeywordIds
      const searchParams = {
        query: searchQuery,
        page,
        ...(keywordIds.length && { with_keywords: keywordIds.join('|') }),
      }

      const [moviesResult, tvResult] = await Promise.all([
        searchService('movie', searchParams),
        searchService('tv', searchParams),
      ])

      const moviesData = moviesResult.result ? (moviesResult as any).data : null
      const tvData = tvResult.result ? (tvResult as any).data : null

      results.value = {
        movies: moviesData?.results || [],
        tv: tvData?.results || [],
        totalResults: (moviesData?.total_results || 0) + (tvData?.total_results || 0),
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      isLoading.value = false
    }
  }

  const clearResults = () => {
    results.value = { movies: [], tv: [], totalResults: 0 }
    query.value = ''
  }

  return {
    results: computed(() => results.value),
    query: computed(() => query.value),
    isLoading: computed(() => isLoading.value),
    performSearch,
    clearResults,
  }
})

export default useSearchStore
