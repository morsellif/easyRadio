<script setup lang="ts">
import { ref } from "vue";
import FavouriteButton from "./FavouriteButton.vue";
defineProps<{ name: string }>();
</script>

<template>
  <li
    class="hover:bg-gray-100 flex p-3 border-b border-gray-200 fist:rounded-t-2xl last:border-0 last:rounded-b-2xl"
  >
    <div class="font-medium text-xl flex flex-row">{{ name }}</div>
    <div class="flex justify-end grow flex-row">
      <FavouriteButton></FavouriteButton>
    </div>
  </li>
</template>

<style></style>
