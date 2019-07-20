import Vue from "vue";
import Router from "vue-router";
import CardSelect from "./views/CardSelect.vue";
import Game from "./views/Game.vue";
import End from "./views/End.vue";
import store from "@/store";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: CardSelect
    },

    {
      path: "/game",
      name: "game",
      component: Game,
      beforeEnter(to, from, next) {
        if (!store.state.inGame) {
          next({ name: "home" });
        } else {
          next();
        }
      }
    },

    {
      path: "/end",
      name: "end",
      component: End
    }
  ]
});
