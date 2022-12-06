<script setup lang="ts"></script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: var(--primary-color-dark);
  border-bottom: 1px solid black;
}

h1 {
  padding: 1em;
}

p {
  padding: 1em;
}

.continue {
  border-color: var(--primary-color);
  background-color: var(--primary-color);
  color: var(--primary-color-dark);
}

.continue:hover {
  border-color: var(--primary-color-dark);
  background-color: var(--primary-color-dark);
  color: var(--nav-color);
}
</style>
<template>
  <div class="page">
    <h2>404, Page Not Found!</h2>
    <section class="flow-content container">
      <p>Please go back to the home page.</p>
      <router-link
        :to="{
          name: 'home-view',
        }"
      >
        <button class="button continue">Home Page</button>
      </router-link>
    </section>
  </div>
</template>
