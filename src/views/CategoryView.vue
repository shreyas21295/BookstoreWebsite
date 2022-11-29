<script setup lang="ts">
import { watch } from "vue";
import CategoryNav from "@/components/CategoryNav.vue";
import CategoryBookList from "@/components/CategoryBookList.vue";
import { useRoute } from "vue-router";
import { useBookStore } from "@/stores/BookStore";
import { useCategoryStore } from "@/stores/CategoryStore";

const route = useRoute();
const bookStore = useBookStore();
const categoryStore = useCategoryStore();

watch(
  () => route.params.name,
  (newName) => {
    bookStore.fetchBooks(newName as string);
    categoryStore.fetchSelectedCategory(newName as string);
  },
  { immediate: true }
);
// const rows = computed(() => {
//   return Math.floor((bookStore.bookList.length - 1) / 4) + 1;
// });
//provide("bookList", bookList);
</script>

<style scoped>
.category-page {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: auto;
  /*overflow-y: auto;*/
  /*margin: auto 0.5em auto 0.5em;*/
  border-bottom: 1px solid black;
}

.books-list {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 69vh;
  /*margin-top: 0.5em;*/
  /*margin-bottom: 0.5em;*/
}
</style>

<template>
  <div class="category-page">
    <category-nav></category-nav>
    <div class="books-list">
      <!--      <template v-for="row in rows" :key="row">-->
      <!--        <category-book-list-->
      <!--          :bookList="bookStore.bookList.slice((row - 1) * 4, (row - 1) * 4 + 4)"-->
      <!--          v-show="row * 2 < bookStore.bookList.length"-->
      <!--        >-->
      <!--        </category-book-list>-->
      <category-book-list :bookList="bookStore.bookList"></category-book-list>
      <!--      </template>-->
    </div>
  </div>
</template>
