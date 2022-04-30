<script setup lang="ts">
import { ref } from "vue";
import PlayerControls from "./PlayerControls.vue";
</script>

<template>
  <div
    class="bg-white border border-gray-200 rounded-3xl drop-shadow-md mb-4 p-4"
  >
    <div class="font-bold text-3xl text-center">Radio 24</div>
    <div class="flex justify-center flex-row pt-2">
      <PlayerControls></PlayerControls>
    </div>
  </div>
</template>

<style></style>
