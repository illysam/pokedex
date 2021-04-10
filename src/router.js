import { createWebHistory, createRouter } from "vue-router";
import Main from "./views/Main.vue";
import Pokemon from "./views/Pokemon.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/pokemon/:name/",
    name: "pokemon",
    component: Pokemon,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;