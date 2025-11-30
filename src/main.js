// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// eventuele globale CSS (Tailwind of eigen CSS)
import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");