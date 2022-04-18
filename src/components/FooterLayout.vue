<template>
  <div>&copy; 2020-{{ currentYear }}</div>
</template>
<script setup lang="ts">
  const currentYear = new Date().getFullYear();
</script>
