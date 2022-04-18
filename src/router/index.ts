import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from "vue-router";
// Import layouts
import LayoutDefault from "@/layouts/layoutDefault.vue";
import layoutOther from "@/layouts/layoutOther.vue";

const routes = [
  {
    path: "/",
    component: () => import("../views/HomePage.vue"),
    meta: { layout: LayoutDefault }
  },
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: () => import("../views/HomePage.vue"),
    meta: { layout: LayoutDefault }
  },
  {
    name: "about",
    path: "/about",
    component: () => import("../views/AboutPage.vue"),
    meta: { layout: layoutOther }
  }
];

export function createRouter() {
  const router = _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  });

  return router;
}
