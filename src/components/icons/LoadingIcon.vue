<script setup lang="ts">
interface Props {
  isLoading: boolean;
}

const props = defineProps<Props>();

// /public/eduardo.jpeg
</script>

<template>
  <img src="/public/loading.svg" alt="LoadingIcon" :class="isLoading ? 'rotating' : ''" />
</template>

<style scoped>
img {
  width: 4em;
  height: 4em;
}
img.rotating {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
