<template>
  <h1>{{ msg }}</h1>
  <button @click="inc">Count</button>
  <p>{{ count }}</p>
  {{ $t("msg-count") }}
</template>

<script setup lang="ts">
  import { ref } from "vue";
  // import { useI18n } from "vue-i18n";
  defineProps<{ msg: string }>();
  const count = ref(0);
  // const { t } = useI18n();
  const inc = () => count.value++;
</script>
