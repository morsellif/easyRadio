<script setup lang="ts">
import Loved from "./Loved.vue";
import NotLoved from "./NotLoved.vue";
import { ref } from "vue";

const loved = ref(false);
</script>

<template>
  <Loved v-if="loved" @click="loved = !loved"></Loved>
  <NotLoved v-if="!loved" @click="loved = !loved"></NotLoved>
</template>
