<script setup lang="ts"></script>

<style scoped>
.home-page {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: row;
  border-bottom: 1px solid black;
}

.shop-books-now {
  font-family: var(--title-font-family);
  padding: 0.5em;
  border-radius: 10px;
  box-shadow: 2px 2px 2px;
  cursor: pointer;
}

.cta-container {
  text-align: center;
}

.welcome-text {
  width: 50%;
  margin-top: 1.25rem;
}

.category-image-items div {
  padding: 0.5em 0;
  background: rgba(0, 0, 0, 0.5); /* last # is percent opacity */
  color: white;
  transform: translateY(-2.25em);
  margin-bottom: -2em;
}
</style>
<template>
  <section class="home-page">
    <section class="welcome-text flow-content container">
      <h1 class="tag-line">EXPLORE FOR AMAZING OFFERS</h1>
      <p style="font-weight: bold">
        Find eBooks for anything and everything you like.
      </p>
      <p style="font-weight: bold">
        Get eBooks compatible with all your devices.
      </p>
      <div class="cta-container">
        <router-link to="category/Classics">
          <button class="button shop-books-now">
            <h3>SHOP BOOKS NOW!</h3>
          </button>
        </router-link>
      </div>
    </section>
    <section class="category-images container">
      <div class="category-image-items">
        <img
          :src="require('@/assets/images/categories/ipad-books.jpeg')"
          :alt="'Hero Image'"
        />
      </div>
    </section>
  </section>
</template>
