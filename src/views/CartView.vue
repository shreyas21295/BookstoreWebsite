<script setup lang="ts">
import CartTable from "@/components/CartTable.vue";
import { useCartStore } from "@/stores/CartStore";
import { useCategoryStore } from "@/stores/CategoryStore";
const categoryStore = useCategoryStore();
const cartStore = useCartStore();
</script>
<style scoped>
h1 {
  margin: 1em auto;
  text-align: center;
}
.empty-cart {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 0.5em;
  flex-wrap: wrap;
  text-align: center;
  padding: 1em 2em;
  color: var(--primary-color-dark);
  background-color: var(--card-background-color);
}

.continue {
  border-color: var(--primary-color);
  background-color: var(--primary-color);
  color: var(--primary-color-dark);
}

.continue:hover {
  border-color: var(--primary-color-dark);
  background-color: var(--primary-color-dark);
  color: var(--nav-color);
}

.cart-page {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  border-bottom: 1px solid black;
}
.cart-header {
  font-weight: bold;
  flex-wrap: wrap;
  padding: 1em;
}
</style>

<template>
  <div class="cart-page">
    <div class="empty-cart" v-if="cartStore.cart.empty">
      <h2>Cart is empty</h2>
      <div>
        <router-link
          :to="{
            name: 'category-view',
            params: { name: categoryStore.selectedCategoryName },
          }"
          class="button continue"
          >Continue Shopping</router-link
        >
      </div>
    </div>
    <div class="cart-header" v-else-if="cartStore.cart.numberOfItems === 1">
      You have 1 book in your cart.
    </div>
    <div class="cart-header" v-else>
      You have {{ cartStore.cart.numberOfItems }} books in your cart.
    </div>
    <cart-table v-if="!cartStore.cart.empty"></cart-table>
  </div>
</template>
