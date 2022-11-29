import { defineStore } from "pinia";
import { BookItem } from "@/types";
import { apiUrl } from "@/services/ApiService";
import { useCategoryStore } from "@/stores/CategoryStore";

export const useBookStore = defineStore("BookStore", {
  state: () => ({
    bookList: [] as BookItem[],
  }),
  actions: {
    async fetchBooks(categoryName: string) {
      const categoryStore = useCategoryStore();
      const selectedCategory =
        categoryStore.categoryList?.find(
          (category) => category.name === categoryName
        ) || categoryStore.categoryList[2];
      // categoryStore.selectedCategoryName = selectedCategory.name;
      const url =
        apiUrl + "categories/name/" + selectedCategory.name + "/books/";
      this.bookList = await fetch(url).then((response) => response.json());
    },
  },
  // getters
});
