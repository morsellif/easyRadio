<script setup lang="ts">
import Loved from "./icons/Loved.vue";
import NotLoved from "./icons/NotLoved.vue";

defineProps<{ isLoved: boolean }>();
</script>

<template>
  <Loved v-if="isLoved"></Loved>
  <NotLoved v-if="!isLoved"></NotLoved>
</template>
