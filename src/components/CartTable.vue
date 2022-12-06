<script setup lang="ts">
import { useCartStore } from "@/stores/CartStore";
import { useCategoryStore } from "@/stores/CategoryStore";
import { BookItem } from "@/types";
import { asDollarsAndCents } from "@/utils";
const categoryStore = useCategoryStore();
const cartStore = useCartStore();
const bookImageFileName = function (book: BookItem): string {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.gif`;
};
</script>

<style scoped>
.cart-table {
  display: grid;
  grid-template-columns:
    max-content minmax(min-content, auto) min-content
    minmax(10em, auto) minmax(5em, max-content);
  row-gap: 1em;
  margin: 0 auto;
  background-color: var(--nav-color);
  border-top: solid gray;
  border-left: solid gray;
  border-right: solid gray;
}

ul {
  display: contents;
}

ul > li {
  display: contents;
}

.table-heading {
  background-color: var(--nav-color);
  color: var(--primary-color-dark);
  font-weight: bold;
  border-bottom: solid gray;
}

.table-heading > * {
  background-color: var(--nav-color);
  padding: 0.5em;
  border-bottom: solid gray;
}

.heading-book {
  grid-column: 1 / 3;
  padding-left: 1.5em;
}

.heading-price {
  grid-column: 3 / 4;
  text-align: center;
}

.heading-quantity {
  grid-column: 4 / 5;
  text-align: center;
}

.heading-subtotal {
  text-align: right;
  grid-column: -2 / -1;
}

.cart-book-title {
  padding: 0.25em 1em;
}

.cart-book-image {
  padding: 0.25em 1em;
}

.cart-book-image > * {
  margin-left: auto;
  margin-right: 0;
}

img {
  display: block;
  width: 70px;
  height: auto;
}

.cart-book-price {
  text-align: right;
  padding: 0.25em 1em;
}

.cart-book-quantity {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  height: max-content;
  padding: 0.25em;
  text-align: center;
}

.cart-book-subtotal {
  text-align: right;
  padding: 0.25em 1em;
}

.line-sep {
  display: block;
  height: 2px;
  background-color: gray;
  grid-column: 1 / -1;
}

.fa-plus-circle {
  font-size: 1.5em;
  color: var(--primary-color-dark);
  border-color: var(--primary-color-dark);
  border: none;
  padding: 0;
  margin: 0;
  border-radius: 100%;
}

.fa-plus-circle:hover {
  font-size: 1.5em;
  color: var(--primary-color);
  border-color: var(--primary-color);
  background-color: var(--nav-color);
  border: none;
  padding: 0;
  margin: 0;
  border-radius: 100%;
  cursor: pointer;
}

.fa-minus-circle {
  font-size: 1.5em;
  color: var(--primary-color-dark);
  border: none;
  padding: 0;
  margin: 0;
  border-radius: 100%;
}

.fa-minus-circle:hover {
  font-size: 1.5em;
  color: var(--primary-color);
  background-color: var(--nav-color);
  border: none;
  padding: 0;
  margin: 0;
  border-radius: 100%;
  cursor: pointer;
}

.quantity {
  font-size: 1.2em;
  padding-left: 0.5em;
  padding-right: 0.5em;
}

select {
  background-color: var(--primary-color);
  color: white;
  border: 2px solid var(--primary-color-dark);
  border-radius: 3px;
}

.cart-checkout {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 1.25em;
  margin: auto 0.2em auto;
}
.cart-options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0.25em 0.5em;
  border-bottom: solid gray;
  border-left: solid gray;
  border-right: solid gray;
  background-color: var(--nav-color);
}

.clear-cart {
  font-size: 0.8em;
  padding: 0.25em;
  border: 0.1em solid var(--primary-color-dark);
  background-color: inherit;
  color: var(--primary-color-dark);
}

.clear-cart:hover {
  border-color: var(--primary-color-dark);
  background-color: var(--primary-color-dark);
  color: var(--nav-color);
}

.continue {
  border-color: var(--primary-color-dark);
  background-color: var(--primary-color-dark);
  color: var(--nav-color);
}

.continue:hover {
  border-color: var(--primary-color-dark);
  background-color: inherit;
  color: var(--primary-color-dark);
}

.cart-subtotal {
  font-weight: bold;
  font-size: 1.25em;
}

.checkout {
  font-family: var(--title-font-family);
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 2px 2px 2px;
}
</style>

<template>
  <div class="cart-table-over">
    <div class="cart-table">
      <ul>
        <li class="table-heading">
          <div class="heading-book">Book</div>
          <div class="heading-price">Price</div>
          <div class="heading-quantity">Quantity</div>
          <div class="heading-subtotal">Amount</div>
        </li>
        <template v-for="item in cartStore.cart.items" :key="item.book.bookId">
          <li>
            <div class="cart-book-image">
              <img
                :src="
                  require('@/assets/images/books/' +
                    bookImageFileName(item.book))
                "
                :alt="item.book.title"
                width="100px"
                height="auto"
              />
            </div>
            <div class="cart-book-title">{{ item.book.title }}</div>
            <div class="cart-book-price">
              {{ asDollarsAndCents(item.book.price) }}
            </div>
            <div class="cart-book-quantity">
              <button
                class="fa-solid fa-minus-circle"
                @click="
                  cartStore.updateBookQuantity(item.book, item.quantity - 1)
                "
              ></button>
              <span class="quantity">{{ item.quantity }}</span>
              <button
                class="fa-solid fa-plus-circle"
                @click="
                  cartStore.updateBookQuantity(item.book, item.quantity + 1)
                "
              ></button>
            </div>
            <div class="cart-book-subtotal">
              {{ asDollarsAndCents(item.quantity * item.book.price) }}
            </div>
          </li>
          <li class="line-sep"></li>
        </template>
      </ul>
    </div>
    <div class="cart-options">
      <div class="button clear-cart" @click="cartStore.clearCart()">
        Clear Cart
      </div>
      <div class="cart-subtotal">
        {{ "Subtotal: " + asDollarsAndCents(cartStore.cart.subtotal) }}
      </div>
    </div>
  </div>

  <div class="cart-checkout">
    <router-link
      :to="{
        name: 'category-view',
        params: { name: categoryStore.selectedCategoryName },
      }"
      class="button continue"
      >Continue Shopping</router-link
    >
    <router-link to="/checkout" class="button checkout"
      >Proceed to checkout</router-link
    >
  </div>
</template>
