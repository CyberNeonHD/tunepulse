import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import WorkInProgressView from "../views/WorkInProgressView.vue";
import PulseboardView from "../views/PulseboardView.vue";
import TopTracksView from "../views/TopTracksView.vue";
import TopArtistsView from "../views/TopArtistsView.vue";
import ChangelogView from "../views/ChangelogView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/work-in-progress", name: "wip", component: WorkInProgressView },
  { path: "/pulseboard", redirect: "/" },
  { path: "/pulseboard/top-tracks", redirect: "/" },
  { path: "/pulseboard/top-artists", redirect: "/" },
  { path: "/changelog", name: "changelog", component: ChangelogView },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
