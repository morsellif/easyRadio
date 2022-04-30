<script setup lang="ts">
import Radio from "./Radio.vue";
import radios from "./../assets/radios.json";
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <ul class="bg-white border border-gray-200 rounded-3xl">
    <li
      class="flex p-3 border-b border-gray-200 fist:rounded-t-lg last:border-0 last:rounded-b-lg"
    >
      <div class="font-bold text-3xl">Radios</div>
    </li>
    <Radio v-for="(radio, index) in radios" :name="index"></Radio>
  </ul>
</template>

<style></style>
