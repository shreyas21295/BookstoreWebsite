<script setup lang="ts"></script>
<style scoped>
footer {
  background: var(--primary-background-color);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 0.5em;
  padding-bottom: 1em;
  gap: 1em;
}

.copyright {
  color: var(--primary-color-dark);
  display: flex;
  justify-content: space-around;
}

.social-media-icons {
  display: flex;
  flex-direction: row;
  color: var(--primary-color-dark);
  text-align: center;
  gap: 0.5em;
}
</style>

<template>
  <footer class="container">
    <section class="copyright">
      <span>
        Copyright
        <i class="fa-solid fa-copyright"></i>
        The Books Place
      </span>
    </section>
    <section class="links-about">
      <router-link to="/">About</router-link>
    </section>
    <section class="links-contact">
      <router-link to="/">Contact Us</router-link>
    </section>
    <section class="links-direction">
      <router-link to="/">Locate Us</router-link>
    </section>
    <section class="social-media-icons">
      <span>Follow Us</span>
      <router-link to="/"><i class="fa-brands fa-facebook"></i></router-link>
      <router-link to="/"><i class="fa-brands fa-twitter"></i></router-link>
      <router-link to="/"><i class="fa-brands fa-instagram"></i></router-link>
    </section>
  </footer>
</template>
