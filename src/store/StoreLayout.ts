import { defineStore } from "pinia";

export const useStoreLayout = defineStore({
  id: "layoutStore",
  state: () => ({
    appLocale: "es"
  }),
  getters: {
    getAppLocale: (state) => state.appLocale
  },
  actions: {
    changeLocale(dataLocale: string) {
      this.appLocale = dataLocale;
    }
  }
});
