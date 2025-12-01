<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Zone 4 Dead</h3>
          <p>Seu portal definitivo para o mundo zumbi no cinema e TV</p>
        </div>

        <div class="footer-section">
          <h4>Explorar</h4>
          <ul>
            <li><router-link to="/movies">Filmes Zumbis</router-link></li>
            <li><router-link to="/tv">Séries Zumbis</router-link></li>
            <li><router-link to="/trending">Em Alta</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Recursos</h4>
          <ul>
            <li><a href="https://www.themoviedb.org/" target="_blank">TMDB</a></li>
            <li><a href="https://www.themoviedb.org/documentation/api" target="_blank">API</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Zone 4 Dead. Dados fornecidos por TMDB.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #0d0d0d;
  margin-top: auto;
  padding: var(--spacing-2xl) 0 var(--spacing-lg);
  box-shadow: 0 -0.5rem 2rem rgba(255, 255, 255, 0.05);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
}

.footer-section h3,
.footer-section h4 {
  color: var(--color-accent-primary);
  margin-bottom: var(--spacing-md);
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.footer-section p {
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.footer-section ul {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-section a {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
  position: relative;
}

.footer-section a::after {
  content: '';
  position: absolute;
  bottom: -0.25rem;
  left: 0;
  width: 0;
  height: 0.125rem;
  background: var(--color-accent-primary);
  transition: width var(--transition-fast);
}

.footer-section a:hover {
  color: var(--color-accent-primary);
}

.footer-section a:hover::after {
  width: 100%;
}

.footer-bottom {
  padding-top: var(--spacing-lg);
  border-top: 0.0625rem solid var(--color-border);
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}
</style>
