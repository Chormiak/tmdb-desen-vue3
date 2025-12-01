<script setup lang="ts">
import { computed } from 'vue';
interface Props {
  currentPage: number;
  totalPages: number;
  totalResults?: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  'page-change': [page: number];
}>();

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, props.currentPage - 2);
  const end = Math.min(props.totalPages, props.currentPage + 2);
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page);
  }
};
</script>

<template>
  <div class="pagination">
    <div v-if="totalResults" class="results-info">
      {{ totalResults.toLocaleString() }} resultados encontrados
    </div>
    
    <div class="pagination-controls">
      <button
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
        class="pagination-btn"
      >
        ‹ Anterior
      </button>
      
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="['pagination-btn', { active: page === currentPage }]"
      >
        {{ page }}
      </button>
      
      <button
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
        class="pagination-btn"
      >
        Próxima ›
      </button>
    </div>
    
    <div class="page-info">
      Página {{ currentPage }} de {{ totalPages }}
    </div>
  </div>
</template>