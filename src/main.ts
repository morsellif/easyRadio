import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import Player from "./components/Player.vue";
import App from "./App.vue";
import "./index.css";

const Home = { template: "<div>Home</div>" };

const routes = [
  { name: "play", path: "/play", components: { player: Player }, props: true },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
