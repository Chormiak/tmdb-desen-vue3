<script setup lang="ts">
import LoadingIcon from '../icons/LoadingIcon.vue';

interface Props {
  isLoading: boolean;
}

const props = defineProps<Props>();
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
  position: absolute;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  opacity: 0;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.1s ease;
}
div.loading {
  display: flex;
  opacity: 1;
}
h2 {
  margin-top: 2vw;
}
</style>
