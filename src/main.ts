import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import Player from "./components/Player.vue";
import PlayerPlaceholder from "./components/PlayerPlaceholder.vue";

import App from "./App.vue";
import "./index.css";

const Home = { template: "<div>Home</div>" };

const routes = [
  { name: "home", path: "/", components: { player: PlayerPlaceholder } },
  { name: "play", path: "/play", components: { player: Player }, props: true },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
