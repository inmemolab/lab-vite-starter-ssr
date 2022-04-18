<template>
  <main class="app-layout-default">
    <locale-select />
    - B
    <slot />
  </main>
</template>

<script setup lang="ts">
  import LocaleSelect from "@/components/LocaleSelect.vue";
</script>
