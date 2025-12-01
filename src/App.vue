<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import HeaderComponent from '@/components/layout/HeaderComponent.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'
import LoadingComponent from './components/ui/LoadingComponent.vue'

const appStore = useAppStore()
const isLoading = computed(() => appStore.isLoading)
</script>

<template>
  <div class="app">
    <LoadingComponent v-if="isLoading" />

    <HeaderComponent />

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <FooterComponent />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
