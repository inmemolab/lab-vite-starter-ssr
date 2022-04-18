<template>
  <div>
    <router-link to="/home">Home</router-link>
  </div>
  <div>
    <router-link to="/about">About</router-link>
  </div>
  <HelloWorld :msg="$t('hello')" />
  <component :is="route.meta.layout || 'div'">
    <RouterView />
  </component>
  <FooterLayout />
</template>

<script setup lang="ts">
  // import { useI18n } from "vue-i18n";
  import { useRoute } from "vue-router";
  import { useHead } from "@vueuse/head";
  import HelloWorld from "@/components/HelloWorld.vue";
  import FooterLayout from "@/components/FooterLayout.vue";
  const route = useRoute();
  // const { t } = useI18n();
  useHead({
    title: "Default title",
    meta: [
      {
        name: "description",
        content: "This is a DEFAULT description"
      },
      {
        name: "kewords",
        content: "vite,vue,head"
      }
    ]
  });
</script>
