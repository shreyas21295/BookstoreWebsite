<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useCategoryStore } from "@/stores/CategoryStore";
import { watch } from "vue";
import { useRoute } from "vue-router";
const categoryStore = useCategoryStore();
const route = useRoute();
categoryStore.fetchCategories();

watch(
  () => route.path,
  (path) => {
    categoryStore.fetchSelectedCategory(path);
  },
  { immediate: true }
);
</script>
<style>
#app {
  height: 100%;
}
</style>

<template>
  <div id="app">
    <app-header></app-header>
    <router-view :key="$route.fullPath"></router-view>
    <app-footer></app-footer>
  </div>
</template>
