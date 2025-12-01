import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  
  const setLoading = (loading: boolean) => {
    isLoading.value = loading;
  };
  
  const setError = (message: string | null) => {
    error.value = message;
  };
  
  const clearError = () => {
    error.value = null;
  };
  
  return {
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    setLoading,
    setError,
    clearError
  };
});