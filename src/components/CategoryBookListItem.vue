<script setup lang="ts">
import { defineProps } from "vue";
import { BookItem } from "@/types";
import { useCartStore } from "@/stores/CartStore";
import { asDollarsAndCents } from "@/utils";
const cartStore = useCartStore();
const props = defineProps<{
  book: BookItem;
}>();
const bookImageFileName = function (book: BookItem): string {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.gif`;
};
</script>
<style scoped>
.book-box {
  display: flex;
  flex-direction: column;
  border: 0.1rem solid var(--nav-color);
  width: 16rem;
  /*max-width: 17rem;*/
  padding: 1em;
  gap: 0.25em;
}

.img-responsive {
  width: 125px;
  height: 190px;
}

.book-image {
  display: flex;
  /*justify-content: center;*/
  width: fit-content;
  height: fit-content;
  position: relative;
  margin-bottom: 0.125em;
}

.book-title {
  font-weight: bold;
  font-size: 1.1rem;
}

.book-author,
.book-price {
  font-weight: normal;
  font-size: 1rem;
}

.read-now-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.star {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -40%);
  color: var(--primary-color);
  font-size: 1rem;
}

.book-rating {
  color: var(--primary-color-dark);
}

.add-cart {
  display: flex;
  flex-direction: row;
  width: fit-content;
  gap: 0.2em;
  justify-content: center;
  font-size: 0.85rem;
  border-radius: 10px;
  border-style: solid;
  padding: 0.5em;
  cursor: pointer;
}

.read-now:hover {
  /*position: absolute;*/
  /*top: 50%;*/
  /*left: 50%;*/
  /*transform: translate(-50%, -50%);*/
  background-color: var(--primary-color-dark);
  display: flex;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.3em;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  cursor: pointer;
  width: max-content;
  transition: 0.15s border ease-in;
}

.read-now {
  background-color: var(--primary-color-dark);
  display: flex;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.3em;
  color: var(--primary-color);
  border-radius: 10px;
  /*border-style: solid;*/
  border: 2px solid var(--primary-color-dark);
  cursor: pointer;
  width: max-content;
  transition: 0.15s border ease-out;
}
</style>

<template>
  <li class="book-box">
    <div class="book-image">
      <img
        class="img-responsive"
        :src="require('@/assets/images/books/' + bookImageFileName(book))"
        :alt="book.title"
        v-bind:style="[book.isPublic ? { opacity: '0.7' } : { opacity: '1' }]"
      />
      <div v-if="book.isPublic" class="read-now-container">
        <button class="read-now">Read Now</button>
      </div>
      <div v-if="book.rating > 3" class="fa-stack star">
        <span class="fa-solid fa-star fa-stack-2x"></span>
        <span class="fa-stack-1x book-rating">{{ book.rating }}</span>
      </div>
    </div>

    <div class="book-title">{{ book.title }}</div>
    <div class="book-author">{{ book.author }}</div>
    <div class="book-price">{{ asDollarsAndCents(book.price) }}</div>
    <button class="button add-cart" @click="cartStore.addToCart(book)">
      <i class="fa-solid fa-cart-plus"></i> Add to Cart
    </button>
  </li>
</template>
