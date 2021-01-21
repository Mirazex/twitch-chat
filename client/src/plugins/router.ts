import { createRouter, createWebHistory } from "vue-router";

import Homepage from "../pages/Homepage.vue";

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  routes: [
    {
      path: "/",
      component: Homepage,
    },
    {
      path: "/channels/:channelId",
      component: () => import("../pages/Chat.vue"),
    }
  ],
});