import { createApp } from "vue";
import "@/assets/css/global.css"; // imports the global CSS before all other CSS files
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");

// const PriceFormatter = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
//   minimumFractionDigits: 2,
// });
//
// export const asDollarsAndCents = function (cents: number) {
//   return PriceFormatter.format(cents / 100.0);
// };

//createApp(App).use(router).mount("#app");
