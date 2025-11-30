import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import WorkInProgressView from "../views/WorkInProgressView.vue"; // 👈 nieuw

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/work-in-progress",
    name: "wip",
    component: WorkInProgressView, // 👈 nieuw
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
