<script setup lang="ts">
interface Props {
  isLoading: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <div class="loading-spinner">
    <svg class="spinner-icon" viewBox="0 0 50 50">
      <circle
        class="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        stroke-width="5"
      ></circle>
    </svg>
  </div>
</template>

<style scoped>
.loading-spinner {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner-icon {
  width: 100%;
  height: 100%;
  color: var(--color-accent-primary);
  animation: spin 1.5s linear infinite;
}

.path {
  stroke-dasharray: 1, 150;
  stroke-dashoffset: 0;
  animation: strokeAnim 1.5s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes strokeAnim {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
