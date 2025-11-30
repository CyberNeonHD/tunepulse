import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import WorkInProgressView from "../views/WorkInProgressView.vue";
import PulseboardView from "../views/PulseboardView.vue";
import TopTracksView from "../views/TopTracksView.vue";
import TopArtistsView from "../views/TopArtistsView.vue";
import ChangelogView from "../views/ChangelogView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/work-in-progress", name: "wip", component: WorkInProgressView },
  { path: "/pulseboard", name: "pulseboard", component: PulseboardView },
  { path: "/pulseboard/top-tracks", name: "top-tracks", component: TopTracksView },
  { path: "/pulseboard/top-artists", name: "top-artists", component: TopArtistsView },
  { path: "/changelog", name: "changelog", component: ChangelogView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
