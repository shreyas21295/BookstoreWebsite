<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useCategoryStore } from "@/stores/CategoryStore";
import { watch } from "vue";
import { useRoute } from "vue-router";
const categoryStore = useCategoryStore();
const route = useRoute();
categoryStore.fetchCategories();

//console.log(categoryStore.categoryList[0]);
//console.log(categoryStore);

watch(
  () => route.path,
  (path) => {
    categoryStore.fetchSelectedCategory(path);
  },
  { immediate: true }
);

// const categoryList: CategoryItem[] = [
//   { categoryId: 1001, name: "Classics" },
//   { categoryId: 1002, name: "Fantasy" },
//   { categoryId: 1002, name: "Mystery" },
//   { categoryId: 1002, name: "Sci-Fi" },
//   { categoryId: 1002, name: "Thriller" },
//   { categoryId: 1002, name: "Romance" },
//   { categoryId: 1002, name: "Westerns" },
//   { categoryId: 1003, name: "Contemporary" },
//   { categoryId: 1004, name: "Horror" },
// ];
</script>
<style>
#app {
  height: 100%;
}
</style>

<template>
  <div id="app">
    <!--    <Suspense>-->
    <!--      <AppFetchCategories></AppFetchCategories>-->
    <!--    </Suspense>-->
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>
