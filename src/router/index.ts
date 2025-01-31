// src/router/index.ts
import HomeView from "@/views/HomeView.vue";
import LiveDataView from "@/views/LiveDataView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/live",
      name: "Live Data",
      component: LiveDataView,
    },
  ],
});

export default router;
