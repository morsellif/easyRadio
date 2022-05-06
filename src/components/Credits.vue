<script setup lang="ts">
import Loved from "./icons/Loved.vue";
import HeartFilled from "./icons/HeartFilled.vue";
</script>

<template>
  <div
    class="bg-white border border-gray-200 rounded-3xl drop-shadow-md mb-4 mt-4 p-2 text-center"
  >
    <div class="flex flex-column bg-white border-1">
      <div class="inline-block align-middle grow self-center font-bold">
        Made with
        <HeartFilled class="inline ml-2 mr-2 w-7 fill-red-500"></HeartFilled> by
        <a
          target="_blank"
          class="underline underline-offset-4"
          href="https://github.com/morsellif/easyRadio"
          >Francesco.</a
        >
      </div>
    </div>
  </div>
</template>
