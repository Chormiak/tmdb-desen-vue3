<script setup lang="ts">
import useKeywordsStore from '@/stores/keywords'
import keywordGroups from '@/config/keywordGroups'

const keywordsStore = useKeywordsStore()
</script>

<template>
  <div class="keyword-filter">
    <div class="keyword-options">
      <button
        v-for="[key, group] in Object.entries(keywordGroups.options)"
        :key="key"
        :class="['keyword-btn', { active: keywordsStore.isOptionSelected(key as any) }]"
        @click="keywordsStore.toggleKeywordOption(key as any)"
      >
        {{ group.name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.keyword-filter {
  background: transparent;
  padding: var(--spacing-md) 0;
  margin-bottom: var(--spacing-lg);
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

.keyword-options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.keyword-btn {
  padding: 0.5rem 1rem;
  border: 0.0625rem solid var(--color-accent-primary);
  border-radius: var(--border-radius-md);
  background: transparent;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.keyword-btn:hover {
  border-color: var(--color-accent-primary);
  background: rgba(255, 255, 255, 0.05);
}

.keyword-btn.active {
  background: var(--color-accent-primary);
  color: var(--color-bg-dark);
  border-color: var(--color-accent-primary);
  font-weight: 700;
}
</style>
