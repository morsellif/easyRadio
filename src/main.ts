import { createApp } from "vue";
import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationRaw,
} from "vue-router";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart as faHeartSolid,
  faRadio,
  faListUl,
  faPause,
  faPlay,
  faCaretDown,
  faArrowDownAZ,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

library.add(
  faHeartSolid,
  faHeartRegular,
  faRadio,
  faListUl,
  faPause,
  faPlay,
  faCaretDown,
  faArrowDownAZ
);

import Player from "./components/Player.vue";
import PlayerPlaceholder from "./components/PlayerPlaceholder.vue";

import App from "./App.vue";
import "./index.css";

const routes = [
  { name: "home", path: "/", components: { player: PlayerPlaceholder } },
  {
    name: "play",
    path: "/play",
    components: { player: Player },
    props: true,
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (!to.params.streamUrl && !to.params.type) {
        next({ name: "home" });
      }
      next();
    },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
