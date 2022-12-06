<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useCategoryStore } from "@/stores/CategoryStore";
const route = useRoute();
const categoryStore = useCategoryStore();
const showDropDown = ref(false);
</script>

<style scoped>
.header-dropdown {
  position: relative;
}

.header-dropdown li {
  padding: 0.25em 0.5em;
  border: 1px solid white;
  box-shadow: #0008;
}

.categories-button {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  border-radius: 10px;
  padding: 0.5em;
  margin: 0.125em;
}

.header-dropdown:hover .categories-button {
  background-color: var(--primary-color-dark);
  color: white;
}

.header-dropdown a {
  display: block;
  color: var(--primary-color-dark);
  text-decoration: none;
}

.header-dropdown li:hover {
  background-color: var(--nav-color);
  border: 1px solid var(--primary-color-dark);
  box-shadow: var(--primary-color-dark);
  border-radius: 10px;
  font-weight: bold;
}

.header-dropdown li:hover > a {
  color: var(--primary-color-dark);
  box-shadow: #0008;
  background-color: var(--nav-color);
}

.header-dropdown ul {
  display: flex;
  flex-direction: column;
  max-height: 0;
  transition: max-height 0.25s ease-out, border 0.25s ease-out;
  overflow: hidden;
  background-color: white;
  color: black;
  position: absolute;
  z-index: 1;
  width: 100%;
  border: 0 var(--primary-color) solid;
  border-radius: 10px;
}

.header-dropdown:hover ul {
  display: flex;
  flex-direction: column;
  flex: content-box;
  position: absolute;
  width: 100%;
  z-index: 1;
  max-height: 500px;
  transition: max-height 0.55s ease-in;
  cursor: pointer;
  border: 0.05em var(--primary-color) solid;
  border-radius: 10px;
}
</style>

<template>
  <div
    class="header-dropdown"
    @mouseover="showDropDown = true"
    @mouseleave="showDropDown = false"
  >
    <button class="button categories-button">
      Categories<i
        v-bind:class="{
          'fa-solid fa-caret-down': !showDropDown,
          'fa-solid fa-caret-up': showDropDown,
        }"
      ></i>
    </button>
    <ul>
      <li
        v-for="category in categoryStore.categoryList"
        :key="category.categoryId"
      >
        <router-link
          :to="{ name: 'category-view', params: { name: category.name } }"
          :class="
            category.name === route.params.name
              ? 'selected-category-button'
              : 'unselected-category-button'
          "
        >
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
