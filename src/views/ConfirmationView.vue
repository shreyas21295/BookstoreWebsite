<script setup lang="ts">
import ConfirmationTable from "@/components/ConfirmationTable.vue";
import { useOrderDetailsStore } from "@/stores/OrderDetailsStore";
import { useCategoryStore } from "@/stores/CategoryStore";
const orderDetailsStore = useOrderDetailsStore();
const categoryStore = useCategoryStore();
const orderDetails = orderDetailsStore.orderDetails;

const months: string[] = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JULY",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
</script>
<style scoped>
#confirmation {
  color: var(--primary-color-dark);
  border-bottom: 1px solid black;
}
#confirmation-invalid {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 0.5em;
  flex-wrap: wrap;
  text-align: center;
  padding: 1em 2em;
  color: var(--primary-color-dark);
  border-bottom: 1px solid black;
  background-color: var(--card-background-color);
}
ul {
  text-align: left;
}
ul > li {
  margin: 0.25em;
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

.checkout-empty-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

#confirmation-summary {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1.1em;
  padding: 0.25em;
}

.confirmation-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.confirmation-row-start {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.confirmation-row-one {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.confirmation-summary-header {
  text-align: center;
  background-color: var(--nav-color);
  color: var(--primary-color-dark);
  border: solid var(--primary-color-dark);
  padding: 0.25em;
}

#customer-details {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 0.25em;
}

.order-confirmation-details {
  display: flex;
  flex-wrap: wrap;
  color: black;
  font-weight: bold;
  padding-right: 0.45em;
  margin-right: 0.45em;
}

.customer-details-info {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.customer-details-row-one {
  display: flex;
  flex-direction: row;
  border-bottom: solid var(--primary-color-dark);
  border-left: solid var(--primary-color-dark);
  border-right: solid var(--primary-color-dark);
  justify-content: space-around;
  flex-wrap: wrap;
}

#confirmation-continue {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;
  flex-wrap: wrap;
  text-align: center;
  padding: 0.25em;
  margin: 0.25em;
  color: var(--primary-color-dark);
}

.confirmation-table-div {
  display: flex;
  flex-direction: column;
}
</style>
<template>
  <div id="confirmation">
    <section
      v-if="!orderDetailsStore.hasOrderDetails()"
      id="confirmation-invalid"
    >
      <div class="checkout-empty-content">
        <span>We are sorry, the order you requested could not be found.</span>
      </div>
      <div>
        <router-link
          :to="{
            name: 'home-view',
          }"
          class="button continue"
          >Home Page</router-link
        >
      </div>
    </section>
    <template v-else>
      <section id="confirmation-summary">
        <div class="confirmation-summary-header">
          <h3>Order Confirmation</h3>
        </div>
        <span class="confirmation-row"
          ><span class="confirmation-row-start" style="flex-grow: 2">
            Your order is successfully placed!</span
          ><span class="confirmation-row-one">
            Confirmation #:
            <strong class="order-confirmation-details"
              >{{ orderDetails.order.confirmationNumber }}
            </strong>
            Date:
            <strong class="order-confirmation-details">
              {{
                new Date(orderDetails.order.dateCreated).toLocaleDateString()
              }}
            </strong>
            Time:
            <strong class="order-confirmation-details">
              {{
                new Date(orderDetails.order.dateCreated).toLocaleTimeString(
                  "en-US",
                  {
                    timeZone: "GMT",
                  }
                )
              }}
            </strong>
          </span>
        </span>
      </section>
      <section id="customer-details">
        <div class="confirmation-summary-header">
          <h3>Customer Information</h3>
        </div>

        <div class="customer-details-info">
          <div class="customer-details-row-one">
            <p>
              Name (Email):
              <span class="order-confirmation-details">
                {{ orderDetails.customer.customerName }} ({{
                  orderDetails.customer.email
                }})</span
              >
            </p>
            <p>
              Shipping Address:
              <span class="order-confirmation-details">
                {{ orderDetails.customer.address }}</span
              >
            </p>
          </div>
          <div class="customer-details-row-one">
            <p>
              Phone No:
              <span class="order-confirmation-details">
                {{ orderDetails.customer.phone }}</span
              >
            </p>
            <p>
              Credit Card: <i class="fa-solid fa-credit-card"></i
              ><span class="order-confirmation-details">
                ***** {{ orderDetails.customer.ccNumber.slice(-4) }}</span
              >
            </p>
            <p>
              Credit Card Expiry Month/Year:<span
                class="order-confirmation-details"
              >
                {{
                  months[
                    new Date(orderDetails.customer.ccExpDate).getUTCMonth()
                  ]
                }}
                /
                {{ new Date(orderDetails.customer.ccExpDate).getUTCFullYear() }}
              </span>
            </p>
          </div>
        </div>
      </section>

      <section id="confirmation-continue">
        <div class="confirmation-table-div" style="flex-grow: 4">
          <confirmation-table />
        </div>
        <div class="order-details">
          <router-link
            :to="{
              name: 'category-view',
              params: { name: categoryStore.selectedCategoryName },
            }"
          >
            <button class="button continue">Continue Shopping</button>
          </router-link>
        </div>
      </section>
    </template>
  </div>
</template>
