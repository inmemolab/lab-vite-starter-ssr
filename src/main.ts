// Import Vue
import { createSSRApp } from "vue";
// Import moment
import moment from "moment";
// Import Store
import { createPinia } from "pinia";
// Import vueuse/head
import { createHead } from "@vueuse/head";
// Import Pinia Persist
import piniaPersist from "pinia-plugin-persist";
// Import App
import App from "@/layouts/App.vue";
// Import Route
import { createRouter } from "@/router";
// Import i18
import { createI18n } from "@/plugins/i18n";
// Import Styles
import "@/assets/custom.scss";
// Export
export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  const head = createHead();
  const store = createPinia();
  const i18n = createI18n();
  // Use Router
  app.use(router);
  // Use vueuse/head
  app.use(head);
  // Set Pinia-Persist
  store.use(piniaPersist);
  // Use Store
  app.use(store);
  // Use i18n
  app.use(i18n);
  // Provide Moment
  app.provide("moment", moment);
  // return
  return { app, router, store };
}
