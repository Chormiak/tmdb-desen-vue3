<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const navigateTo = (path: string) => {
  router.push(path)
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/search',
      query: { q: searchQuery.value.trim() },
    })
    searchQuery.value = ''
  }
}

const handleKeypress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    performSearch()
  }
}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="logo" @click="navigateTo('/')">
        <h1>Zone 4 Dead</h1>
        <span>Apocalipse Zumbi</span>
      </div>

      <nav class="navigation">
        <button @click="navigateTo('/')" class="nav-link">Início</button>
        <button @click="navigateTo('/movies')" class="nav-link">Filmes</button>
        <button @click="navigateTo('/tv')" class="nav-link">Séries</button>
      </nav>

      <div class="search-container">
        <input
          v-model="searchQuery"
          @keypress="handleKeypress"
          type="text"
          placeholder="Buscar filmes ou séries..."
          class="search-input"
        />
        <button @click="performSearch" class="search-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: var(--color-bg-secondary);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(0.625rem);
  animation: slideDown var(--transition-standard);
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xl);
  padding: var(--spacing-md) var(--spacing-lg);
}

.logo {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.logo h1 {
  font-size: 1.875rem;
  font-weight: 900;
  color: var(--color-accent-primary);
  margin: 0;
  text-shadow: 0 0 0.625rem rgba(255, 255, 255, 0.3);
  letter-spacing: 0.1em;
}

.logo span {
  font-size: 0.75rem;
  color: var(--color-accent-secondary);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 600;
}

.logo:hover h1 {
  text-shadow:
    0 0 1.25rem rgba(255, 255, 255, 0.8),
    0 0 2rem rgba(139, 0, 0, 0.3);
  transform: scale(1.05);
}

.navigation {
  display: flex;
  gap: var(--spacing-lg);
  flex: 1;
}

.nav-link {
  background: none;
  border: none;
  color: var(--color-text-primary);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  padding: var(--spacing-sm) var(--spacing-md);
  position: relative;
  transition: all var(--transition-fast);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0.1875rem;
  background: var(--color-accent-primary);
  transition: width var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-accent-primary);
}

.nav-link:hover::after {
  width: 100%;
}

.search-container {
  display: flex;
  gap: var(--spacing-sm);
  flex-shrink: 0;
}

.search-input {
  padding: 0.625rem 1rem;
  border: 0.125rem solid var(--color-border);
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
  border-radius: var(--border-radius-md);
  font-size: 0.875rem;
  transition: all var(--transition-fast);
  min-width: 15rem;
}

.search-input::placeholder {
  color: var(--color-text-secondary);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 1rem rgba(255, 255, 255, 0.2);
  background: var(--color-bg-secondary);
}

.search-button {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  background: var(--color-accent-primary);
  color: var(--color-bg-dark);
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button svg {
  width: 1.25rem;
  height: 1.25rem;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.search-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 1rem rgba(255, 255, 255, 0.3);
}

.search-button:active {
  transform: scale(0.95);
}
</style>
