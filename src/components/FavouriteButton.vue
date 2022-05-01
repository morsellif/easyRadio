<script setup lang="ts">
import Loved from "./icons/Loved.vue";
import NotLoved from "./icons/NotLoved.vue";
import { ref } from "vue";

const loved = ref(false);
</script>

<template>
  <Loved v-if="loved" @click="loved = !loved"></Loved>
  <NotLoved v-if="!loved" @click="loved = !loved"></NotLoved>
</template>
