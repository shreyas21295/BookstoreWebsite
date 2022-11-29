<script setup lang="ts">
import { useCartStore } from "@/stores/CartStore";
import { useCategoryStore } from "@/stores/CategoryStore";
const categoryStore = useCategoryStore();
const cartStore = useCartStore();
import { BookItem } from "@/types";
// import { asDollarsAndCents } from "@/main";
import { asDollarsAndCents } from "@/utils";
const bookImageFileName = function (book: BookItem): string {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.gif`;
};
// TODO If necessary, replace the above function with the "bookImageFileName" function
//  TODO from your CategoryBookListItem component.

// const updateCart = function (book: BookItem, quantity: number) {
//   cartStore.cart.update(book, quantity);
// };
// TODO The above function calls through directly to the shopping cart, which means it does not update local storage.
// TODO Change the implementation so that it uses the appropriate action from the cart storage.
</script>

<style scoped>
.cart-table {
  display: grid;
  /*grid-template-columns:*/
  /*  max-content minmax(20em, 30em) minmax(20em, 30em) minmax(10em, 20em)*/
  /*  minmax(5em, 10em);*/
  grid-template-columns:
    max-content minmax(min-content, auto) min-content
    minmax(10em, auto) minmax(5em, max-content);

  /*grid-template-columns: repeat(5, minmax(max-content, 100%));*/
  row-gap: 1em;
  /*width: fit-content;*/
  margin: 0 auto;
  background-color: var(--nav-color);
  border-top: solid gray;
  border-left: solid gray;
  border-right: solid gray;
  /*border-bottom: 1px solid black;*/
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
  /*text-align: center;*/
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
  /*width: 3.5em;*/
  width: 70px;
  height: auto;
}
/* TODO The width above is for book images that are normally 200px wide. Change this (if necessary) */
/* TODO to accommodate your own book images. the rule of thumb is that the image here should be about */
/* TODO half the size of the book images as they appear on your category page. */

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
  /*padding-left: 1em;*/
  /*padding-right: 1em;*/
  padding: 0.25em;
  text-align: center;
}

.cart-book-subtotal {
  text-align: right;
  padding: 0.25em 1em;
}

/* Row separators in the table */

.line-sep {
  display: block;
  height: 2px;
  background-color: gray;
  grid-column: 1 / -1;
}

/* Increment/decrement buttons */

/* TODO Consider using icon buttons for your increment and decrement buttons. */
/* TODO Modify the CSS here to suit your own design. */
/* TODO In particular, you may or may not have custom properties */
/* TODO primary-color and primary-color-dark defined in your global CSS file. */

.fa-plus-circle {
  font-size: 1.5em;
  color: var(--primary-color-dark);
  border-color: var(--primary-color-dark);
  /*background-color: var(--primary-color);*/
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
  /*background-color: var(--primary-color);*/
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
  /*border-color: var(--primary-color-dark);*/
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
  /*font-size: 1.25em;*/
  /*padding: 0.5em;*/
  border-radius: 10px;
  box-shadow: 2px 2px 2px;
  /*cursor: pointer;*/
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
