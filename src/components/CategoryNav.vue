<script setup lang="ts">
import { useRoute } from "vue-router";
import { useCategoryStore } from "@/stores/CategoryStore";
const route = useRoute();
const categoryStore = useCategoryStore();
</script>

<style scoped>
.category-nav {
  border-bottom: 1px solid black;
  flex-wrap: wrap;
  font-size: 1rem;
  background-color: var(--card-background-color);
}

.category-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  text-align: center;
  padding-bottom: 0.2em;
  margin: auto 0.2em auto;
  gap: 0.05em;
}

.category-header {
  font-weight: bold;
  font-size: var(--default-font-size);
  flex-wrap: wrap;
  text-align: center;
  padding: 0.2em;
  color: var(--primary-color-dark);
}

.button.selected-category-button {
  background-color: var(--primary-color);
  color: var(--primary-color-dark);
  border: 1px solid var(--primary-color-dark);
  border-radius: 10px;
}

.button.unselected-category-button,
.button.unselected-category-button:visited {
  background-color: var(--nav-color);
  color: var(--primary-color-dark);
  border: 1px solid var(--primary-color-dark);
  border-radius: 10px;
}

.button.unselected-category-button:hover,
.button.unselected-category-button:active {
  background-color: var(--primary-color);
}
</style>

<template>
  <nav class="category-nav">
    <div class="category-header">Categories</div>
    <ul class="category-buttons">
      <li
        v-for="category in categoryStore.categoryList"
        :key="category.categoryId"
      >
        <router-link
          :to="{ name: 'category-view', params: { name: category.name } }"
          :class="
            category.name === route.params.name
              ? 'button selected-category-button'
              : 'button unselected-category-button'
          "
        >
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>
