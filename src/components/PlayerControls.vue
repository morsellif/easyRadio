<script setup lang="ts">
import { ref } from "vue";
import Play from "./icons/Play.vue";
import Pause from "./icons/Pause.vue";

defineProps<{ playing: boolean }>();
</script>

<template>
  <Pause v-if="playing" class="fill-black w-8"></Pause>
  <Play v-if="!playing" class="fill-black w-8"></Play>
</template>
