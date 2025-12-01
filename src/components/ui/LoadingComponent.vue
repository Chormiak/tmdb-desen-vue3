<script setup lang="ts">
import { isLoading } from '@/plugins/loading'
import LoadingIcon from '@/components/icons/LoadingIcon.vue'
</script>

<template>
  <div :class="isLoading ? 'loading' : ''">
    <loading-icon :is-loading="isLoading" />
    <h2>Calma Betinha</h2>
    <p>Estamos fazendo o serviço pesado aqui.</p>
  </div>
</template>

<style scoped>
div {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  opacity: 0;
  background: linear-gradient(135deg, rgba(10, 14, 39, 0.95), rgba(26, 31, 58, 0.95));
  backdrop-filter: blur(0.25rem);
  color: var(--color-accent-primary);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity var(--transition-fast);
}

div.loading {
  display: flex;
  opacity: 1;
}

h2 {
  margin-top: 2rem;
  font-size: 1.75rem;
  font-weight: 900;
  text-shadow: 0 0 1.25rem rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  animation: pulse 1.5s infinite;
}

p {
  margin-top: 1rem;
  color: var(--color-text-secondary);
  font-size: 1.125rem;
  animation: pulse 1.5s infinite 0.2s backwards;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}
</style>
