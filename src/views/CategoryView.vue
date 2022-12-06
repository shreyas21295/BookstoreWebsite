<script setup lang="ts">
import { watch } from "vue";
import CategoryNav from "@/components/CategoryNav.vue";
import CategoryBookList from "@/components/CategoryBookList.vue";
import { useRoute } from "vue-router";
import { useBookStore } from "@/stores/BookStore";
import { useCategoryStore } from "@/stores/CategoryStore";
import router from "@/router";

const route = useRoute();
const bookStore = useBookStore();
const categoryStore = useCategoryStore();

watch(
  () => route.params.name,
  async (newName) => {
    await categoryStore.fetchSelectedCategory(newName as string);
    await bookStore.fetchBooks(newName as string).catch(() => {
      router.push("/not-found");
    });
  },
  { immediate: true }
);
</script>

<style scoped>
.category-page {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: auto;
  border-bottom: 1px solid black;
}

.books-list {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 69vh;
}
</style>

<template>
  <div class="category-page">
    <category-nav></category-nav>
    <div class="books-list">
      <category-book-list :bookList="bookStore.bookList"></category-book-list>
    </div>
  </div>
</template>
