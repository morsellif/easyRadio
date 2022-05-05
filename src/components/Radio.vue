<script setup lang="ts">
import { ref } from "vue";
import FavouriteButton from "./FavouriteButton.vue";
defineProps<{ name: string; isLoved: boolean }>();
</script>

<template>
  <li
    class="hover:bg-gray-100 flex border-b border-gray-200 fist:rounded-t-2xl last:border-0 last:rounded-b-2xl"
  >
    <div
      class="font-medium text-xl grow flex flex-row p-3"
      @click="$emit('listenRadio')"
    >
      {{ name }}
    </div>
    <div class="flex justify-end flex-row p-3" @click="$emit('lovedRadio')">
      <FavouriteButton :is-loved="isLoved"></FavouriteButton>
    </div>
  </li>
</template>

<style></style>
