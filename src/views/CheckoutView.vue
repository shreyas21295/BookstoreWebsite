<script setup lang="ts">
import { useCategoryStore } from "@/stores/CategoryStore";
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { asDollarsAndCents } from "@/utils";
import { email, helpers, required } from "@vuelidate/validators";
import { useCartStore } from "@/stores/CartStore";
import { isCreditCard, isMobilePhone } from "@/utils";
import CheckoutFieldError from "@/components/CheckoutFieldError.vue";
import router from "@/router";

const categoryStore = useCategoryStore();
const cartStore = useCartStore();
const cart = cartStore.cart;

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const form = reactive({
  name: "",
  address: "",
  phone: "",
  email: "",
  ccNumber: "",
  ccExpiryMonth: 1,
  ccExpiryYear: new Date().getFullYear(),
  checkoutStatus: "",
});

const rules = {
  name: {
    required: helpers.withMessage("Please provide a name.", required),
    minLength: helpers.withMessage(
      "Name must have at least 4 letters.",
      (value: string) => !helpers.req(value.trim()) || value.trim().length > 3
    ),
    maxLength: helpers.withMessage(
      "Name can have at most 45 letters.",
      (value: string) => !helpers.req(value.trim()) || value.trim().length < 46
    ),
  },
  address: {
    required: helpers.withMessage("Please provide an address.", required),
    minLength: helpers.withMessage(
      "Address must have at least 4 letters.",
      (value: string) => !helpers.req(value.trim()) || value.trim().length > 3
    ),
    maxLength: helpers.withMessage(
      "Address can have at most 45 letters.",
      (value: string) => !helpers.req(value.trim()) || value.trim().length < 46
    ),
  },
  phone: {
    required: helpers.withMessage("Please provide a phone number.", required),
    phone: helpers.withMessage(
      "Please provide a valid phone number.",
      (value: string) =>
        !helpers.req(value.trim()) || isMobilePhone(value.trim())
    ),
  },
  email: {
    required: helpers.withMessage("Please provide an email address.", required),
    email: helpers.withMessage("Please provide a valid email address.", email),
  },
  ccNumber: {
    required: helpers.withMessage("Please provide a CC number.", required),
    ccNumber: helpers.withMessage(
      "Please provide a valid CC number.",
      (value: string) => !helpers.req(value.trim()) || isCreditCard(value)
    ),
  },
  ccExpiryMonth: {},
  ccExpiryYear: {},
};
const $v = useVuelidate(rules, form);

async function submitOrder() {
  const isFormCorrect = await $v.value.$validate();
  if (!isFormCorrect) {
    form.checkoutStatus = "ERROR";
  } else {
    form.checkoutStatus = "PENDING";
    await cartStore
      .placeOrder({
        name: form.name,
        address: form.address,
        phone: form.phone,
        email: form.email,
        ccNumber: form.ccNumber,
        ccExpiryMonth: form.ccExpiryMonth,
        ccExpiryYear: form.ccExpiryYear,
      })
      .then(() => {
        form.checkoutStatus = "OK";
        router.push({ name: "confirmation-view" });
      })
      .catch((reason) => {
        form.checkoutStatus = "SERVER_ERROR";
        console.log("Error placing order", reason);
      });
  }
}

function yearFrom(index: number) {
  return new Date().getFullYear() + index;
}
</script>

<style scoped>
.checkout-page {
  color: var(--primary-color-dark);
}
.checkout-page-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  border-bottom: 1px solid black;
}
.checkout-empty {
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

.checkout-empty-content {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
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

.form-and-info {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 1em;
  padding-bottom: 1em;
  align-items: center;
}

.form-details {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-evenly;
  border: solid gray;
  background: var(--nav-color);
  padding: 1em;
}

.form-element {
  display: flex;
  flex-direction: column;
  margin-left: 0.5em;
  margin-bottom: 1em;
  margin-right: 0.5em;
  line-height: 1.5em;
  padding: 0.2em;
}

.form-input > label {
  display: inline-block;
  text-align: right;
  margin-right: 0.925em;
}

.form-input {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
}

.form-input > input {
  border: 2px solid var(--primary-color-dark);
  padding: 0.2em;
}

.selector-container {
  position: relative;
  width: fit-content;
  font-size: 1em;
}

.selector-dropdown {
  height: 2.625rem;
  padding: 0 0.7em 0 0;
  border: solid var(--primary-color-dark) 1px;
}

.selector-icon {
  font-size: 0.9rem;
  position: absolute;
  top: 0;
  right: 0;
  padding-top: 0.4em;
  background-color: var(--primary-color-dark);
  color: white;
  text-align: center;
  display: block;
  height: 2.625rem;
  width: 1.5rem;
  pointer-events: none;
}

.selector-container > select {
  border: 2px solid var(--primary-color-dark);
  margin-left: 0.5em;
}

.form-input > input:-webkit-autofill,
.selector-container > select:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 2em white inset !important;
  -webkit-text-fill-color: var(--primary-color-dark) !important;
}

.checkout-button-area {
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-top: 1em;
}

.checkout-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.3em;
  margin-left: 4em;
}

.checkout-details-text {
  width: fit-content;
  text-align: center;
  padding: 1em;
  margin: 1em;
}

.checkoutStatusBox {
  border: solid black;
  font-size: 0.9em;
  padding: 0.3em;
  text-align: center;
}

.form-text {
  text-align: center;
}

.form-error-text {
  color: red;
}

.form-pending-text {
  color: var(--primary-color);
}

.form-ok-text {
  color: var(--primary-color-dark);
}

.complete-purchase {
  font-weight: bold;
  padding: 0.5em;
  border-radius: 10px;
  box-shadow: 2px 2px 2px;
}

.complete-purchase:disabled {
  cursor: none;
  padding: 0.5em;
  font-weight: bold;
  color: var(--primary-color);
  background-color: var(--primary-color-dark);
  border-color: var(--primary-color-dark);
}
</style>

<template>
  <div class="checkout-page">
    <section class="checkout-empty" v-if="cart.empty">
      <div class="checkout-empty-content">
        <h2>Cart is empty</h2>
        <span>Please add books to your cart to checkout.</span>
      </div>
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
    </section>
    <section class="checkout-page-body" v-if="!cart.empty">
      <h3 class="checkout-header">Checkout</h3>
      <div class="form-and-info">
        <form @submit.prevent="submitOrder" class="form-details">
          <div class="form-element">
            <div class="form-input">
              <label for="name">Name</label>
              <input
                type="text"
                size="25"
                id="name"
                name="name"
                v-model.lazy="$v.name.$model"
                @blur="$v.name.$touch()"
              />
            </div>
            <CheckoutFieldError field-name="name" :validator="$v" />
          </div>
          <div class="form-element">
            <div class="form-input">
              <label for="address">Address</label>
              <input
                type="text"
                size="25"
                id="address"
                name="address"
                v-model.lazy="$v.address.$model"
                @blur="$v.address.$touch()"
              />
            </div>
            <CheckoutFieldError field-name="address" :validator="$v" />
          </div>
          <div class="form-element">
            <div class="form-input">
              <label for="phone">Phone</label>
              <input
                class="textField"
                type="text"
                size="25"
                id="phone"
                name="phone"
                v-model.lazy="$v.phone.$model"
                @blur="$v.phone.$touch()"
              />
            </div>
            <CheckoutFieldError field-name="phone" :validator="$v" />
          </div>
          <div class="form-element">
            <div class="form-input">
              <label for="email">Email</label>
              <input
                type="email"
                size="25"
                id="email"
                name="email"
                v-model.lazy="$v.email.$model"
                @blur="$v.email.$touch()"
              />
            </div>
            <CheckoutFieldError field-name="email" :validator="$v" />
          </div>
          <div class="form-element">
            <div class="form-input">
              <label for="ccNumber">Credit card</label>
              <input
                type="text"
                size="25"
                id="ccNumber"
                name="ccNumber"
                v-model.lazy="$v.ccNumber.$model"
                @blur="$v.ccNumber.$touch()"
              />
            </div>
            <CheckoutFieldError field-name="ccNumber" :validator="$v" />
          </div>
          <div class="form-element">
            <div class="form-input">
              <label>Exp Date</label>
              <div class="selector-container">
                <select
                  class="selector-dropdown"
                  v-model="$v.ccExpiryMonth.$model"
                >
                  <option
                    v-for="(month, index) in months"
                    :key="index"
                    :value="index + 1"
                  >
                    {{ month }} ({{ index + 1 }})
                  </option>
                </select>
                <div class="selector-icon"><i class="fas fa-sort"></i></div>
              </div>
              <div class="selector-container">
                <select
                  class="selector-dropdown"
                  v-model="$v.ccExpiryYear.$model"
                >
                  <option
                    v-for="(year, index) in 16"
                    :key="index"
                    :value="yearFrom(index)"
                  >
                    {{ yearFrom(index) }}
                  </option>
                </select>
                <div class="selector-icon"><i class="fas fa-sort"></i></div>
              </div>
            </div>
          </div>
          <div class="checkout-button-area">
            <button
              type="submit"
              name="submit"
              class="button complete-purchase"
              :disabled="form.checkoutStatus === 'PENDING'"
              value="Complete Purchase"
            >
              Complete Purchase
            </button>
          </div>
        </form>
        <div class="checkout-details">
          <span class="checkout-details-text">
            Your credit card will be charged:
            <strong>{{
              asDollarsAndCents(cart.subtotal + cart.surcharge)
            }}</strong>
            <br />
            (<strong>{{ asDollarsAndCents(cart.subtotal) }}</strong> +
            <strong>{{ asDollarsAndCents(cart.surcharge) }}</strong> shipping)
          </span>
          <div v-show="form.checkoutStatus !== ''" class="checkoutStatusBox">
            <div
              class="form-text form-error-text"
              v-if="form.checkoutStatus === 'ERROR'"
            >
              Error: Please fix the problems above and try again.
            </div>

            <div
              class="form-text form-pending-text"
              v-else-if="form.checkoutStatus === 'PENDING'"
            >
              Processing...
            </div>

            <div
              class="form-text form-ok-text"
              v-else-if="form.checkoutStatus === 'OK'"
            >
              Order placed...
            </div>
            <div class="form-text form-error-text" v-else>
              An unexpected error occurred, please try again.
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
