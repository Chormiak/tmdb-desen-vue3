<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="not-found-view">
    <div class="container">
      <div class="not-found-content">
        <div class="error-code">404</div>
        <h1 class="error-title">Página Não Encontrada</h1>
        <p class="error-message">
          A página que você está procurando pode ter sido removida, ter seu nome alterado ou estar
          temporariamente indisponível.
        </p>

        <div class="error-actions">
          <button @click="goBack" class="btn btn-secondary">Voltar</button>
          <button @click="goHome" class="btn btn-primary">Ir para a Página Inicial</button>
        </div>

        <div class="zombie-message">
          <p>Enquanto isso, fique atento aos zumbis!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg-tertiary));
  animation: fadeIn var(--transition-standard);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.container {
  width: 100%;
}

.not-found-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-2xl) var(--spacing-xl);
  animation: slideUp var(--transition-standard);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-code {
  font-size: 12rem;
  font-weight: 900;
  color: var(--color-accent-primary);
  line-height: 1;
  text-shadow:
    0 0 2rem rgba(255, 255, 255, 0.3),
    0 0 4rem rgba(139, 0, 0, 0.2);
  margin-bottom: var(--spacing-lg);
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1rem);
  }
}

.error-title {
  font-size: 3rem;
  font-weight: 900;
  color: var(--color-accent-primary);
  margin-bottom: var(--spacing-md);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 0 1.25rem rgba(255, 255, 255, 0.4);
  animation: slideUp var(--transition-standard) 0.2s backwards;
}

.error-message {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 30rem;
  margin-bottom: var(--spacing-2xl);
  line-height: 1.8;
  animation: slideUp var(--transition-standard) 0.3s backwards;
}

.error-actions {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: var(--spacing-2xl);
  animation: slideUp var(--transition-standard) 0.4s backwards;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  transition: all var(--transition-fast);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
  color: var(--color-bg-dark);
}

.btn-primary:hover {
  transform: translateY(-0.25rem);
  box-shadow: 0 0.75rem 2rem rgba(255, 255, 255, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background: var(--color-bg-tertiary);
  color: var(--color-accent-primary);
  border: 0.125rem solid var(--color-accent-primary);
}

.btn-secondary:hover {
  background: var(--color-accent-primary);
  color: var(--color-bg-dark);
  transform: translateY(-0.25rem);
  box-shadow: 0 0.75rem 2rem rgba(255, 255, 255, 0.2);
}

.btn-secondary:active {
  transform: translateY(0);
}

.zombie-message {
  animation: slideUp var(--transition-standard) 0.5s backwards;
}

.zombie-message p {
  color: var(--color-accent-secondary);
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  animation: pulse 2s infinite;
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

@media (max-width: 50rem) {
  .error-code {
    font-size: 6rem;
  }

  .error-title {
    font-size: 1.75rem;
  }

  .error-message {
    font-size: 1rem;
  }

  .error-actions {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .btn {
    width: 100%;
    max-width: 15rem;
  }
}
</style>
