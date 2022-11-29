<script setup lang="ts">
import HeaderDropdown from "@/components/HeaderDropdown.vue";
import { useCartStore } from "@/stores/CartStore";
</script>

<style scoped>
header {
  background: var(--primary-background-color);
  display: flex;
  justify-content: space-between;
  /*padding: 1em;*/
  flex-wrap: wrap;
  padding-top: 1em;
  padding-bottom: 0.5em;
  gap: 1em;
  border-bottom: 1px solid black;
  /*font-size: 1.25rem;*/
}

.text-logo {
  font-family: var(--title-font-family);
  color: var(--primary-color-dark);
  margin-left: 10px;
}

.searchForm {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.bookstore-logo {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.title-and-search-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.categories-section {
  /* margin: 10px; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.login-section {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.header-dropdown-and-cart {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.search-button {
  border-radius: 100%;
  padding: 0.5em;
  margin: 0.125em;
}

.search-bar {
  width: 300px;
  padding: 0.5em;
  margin: 0.125em;
  border-color: var(--primary-color);
  border-radius: 10px;
  border-style: solid;
}

.cart-count {
  margin-left: 0.15em;
  width: 1.25em;
}

.cart-button {
  display: flex;
  flex-direction: row;
  gap: 0.2em;
  padding: 0.5em;
  margin: 0.125em;
  border-radius: 10px;
}

.login-button {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  border-radius: 10px;
  border-style: solid;
  padding: 0.5em;
  margin: 0.125em;
  /*font: icon;*/
}

.logo-img {
  width: 90px;
  height: auto;
}

@media (max-width: 600px) {
  header {
    flex-direction: column;
  }
}
</style>

<template>
  <header class="container">
    <section class="bookstore-logo">
      <router-link to="/">
        <img
          class="logo-img"
          src="@/assets/images/site/logo.png"
          alt="My Books Place Logo"
        />
      </router-link>
      <div class="text-logo">
        <router-link to="/" style="text-decoration: none"
          ><h3>The</h3>
          <h3>Books</h3>
          <h3>Place</h3>
        </router-link>
      </div>
    </section>
    <section class="title-and-search-bar">
      <form class="searchForm" action="">
        <input
          type="text"
          class="search-bar"
          placeholder="Search Books, Authors...."
        />
        <button type="submit" class="button search-button">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </section>
    <section class="categories-section">
      <header-dropdown> </header-dropdown>
    </section>
    <section class="login-section">
      <div>
        <button class="button login-button">
          <i class="fa-solid fa-user"></i>Shreyas
        </button>
      </div>
    </section>
    <section class="header-dropdown-and-cart">
      <div class="cart-and-login">
        <router-link to="/cart" class="button cart-button">
          <i id="cart-icon" class="fa-solid fa-cart-shopping"></i>
          <span class="fa-solid cart-count">{{ useCartStore().count }}</span>
        </router-link>
      </div>
    </section>
  </header>
</template>
