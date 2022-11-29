import { defineStore } from "pinia";
import { CategoryItem } from "@/types";
import { apiUrl } from "@/services/ApiService";

export const useCategoryStore = defineStore("CategoryStore", {
  //state, actions, getters
  state: () => ({
    categoryList: [] as CategoryItem[],
    selectedCategoryName: "Classics" as string,
  }),
  actions: {
    async fetchCategories() {
      const url = apiUrl + "categories/";
      this.categoryList = await fetch(url).then((response) => response.json());
    },
    async fetchSelectedCategory(newName: string) {
      //console.log("route" + newName);
      try {
        if (newName.includes("category")) {
          this.selectedCategoryName = newName.split("/")[2];
        }
      } catch (e) {
        console.log("");
      }
    },
  },
});
