<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>ZombieFlix</h3>
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
        <p>&copy; {{ currentYear }} ZombieFlix. Dados fornecidos por TMDB.</p>
      </div>
    </div>
  </footer>
</template>