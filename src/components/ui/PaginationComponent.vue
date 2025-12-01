<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  currentPage: number
  totalPages: number
  totalResults?: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'page-change': [page: number]
}>()

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, props.currentPage - 2)
  const end = Math.min(props.totalPages, props.currentPage + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}
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

    <div class="page-info">Página {{ currentPage }} de {{ totalPages }}</div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-lg);
  margin: var(--spacing-2xl) 0;
  flex-wrap: wrap;
  animation: slideUp var(--transition-standard);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.results-info {
  color: var(--color-accent-primary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
}

.pagination-controls {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  justify-content: center;
}

.pagination-btn {
  padding: 0.625rem 1rem;
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border: 0.125rem solid var(--color-border);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-weight: 600;
  transition: all var(--transition-fast);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  min-width: 2.5rem;
}

.pagination-btn:hover:not(:disabled) {
  background: var(--color-accent-primary);
  color: var(--color-bg-dark);
  border-color: var(--color-accent-primary);
  transform: translateY(-0.25rem);
  box-shadow: 0 0.5rem 1rem rgba(255, 255, 255, 0.2);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn.active {
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  color: var(--color-bg-dark);
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 1rem rgba(255, 255, 255, 0.3);
  font-weight: 700;
}

.page-info {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
