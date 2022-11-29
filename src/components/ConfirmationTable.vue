<script setup lang="ts">
import { useOrderDetailsStore } from "@/stores/OrderDetailsStore";
import { useCartStore } from "@/stores/CartStore";
import { asDollarsAndCents } from "@/utils";
import { computed } from "vue";
const orderDetailsStore = useOrderDetailsStore();
const cartStore = useCartStore();
const orderDetails = computed(() => {
  return orderDetailsStore.orderDetails;
});
</script>

<style scoped>
.confirmation-table {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
}

.order-details-header {
  background-color: transparent;
  border: none;
}

table,
td {
  border-block: 1px solid black;
  border-collapse: collapse;
}

table {
  width: 80%;
  margin-top: 1em;
  margin-bottom: 1em;
  border-left: solid var(--primary-color-dark);
  border-right: solid var(--primary-color-dark);
}

td {
  display: table-cell;
  padding: 0.5em 0.5em;
  background-color: white;
  vertical-align: middle;
}

th {
  background-color: var(--nav-color);
  padding: 0.25em;
  border-block: solid var(--primary-color-dark);
}

tr:nth-last-child(1) > td {
  background-color: var(--nav-color);
  border-block: solid var(--primary-color-dark);
}

td:nth-child(1) {
  text-align: left;
}

td:nth-child(2) {
  text-align: center;
}

td:nth-child(3) {
  text-align: right;
}

#price {
  text-align: right;
}
</style>

<template>
  <div class="confirmation-table">
    <table>
      <tr>
        <th colspan="3" class="order-details-header">
          <h3>Order Details</h3>
        </th>
      </tr>
      <tr>
        <th>Book</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
      <tr
        v-for="(item, index) in orderDetails.lineItems"
        :key="orderDetails.order.orderId + '-' + item.bookId"
      >
        <td>
          {{ orderDetails.books[index].title }}
        </td>
        <td>{{ item.quantity }}</td>
        <td>
          {{
            asDollarsAndCents(orderDetails.books[index].price * item.quantity)
          }}
        </td>
      </tr>
      <tr>
        <td colspan="2">-- Delivery Surcharge --</td>
        <td id="price">{{ asDollarsAndCents(cartStore.cart.surcharge) }}</td>
      </tr>
      <tr>
        <td colspan="2">
          <strong>Total</strong>
        </td>
        <td id="price">
          <strong style="color: black">
            {{ asDollarsAndCents(orderDetails.order.amount) }}
          </strong>
        </td>
      </tr>
    </table>
  </div>
</template>
