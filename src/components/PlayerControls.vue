<script setup lang="ts">
import { ref } from "vue";
import Play from "./icons/Play.vue";
import Pause from "./icons/Pause.vue";

defineProps<{ playing: boolean }>();
</script>

<template>
  <Pause v-if="playing" class="hover:fill-green-90"></Pause>
  <Play v-if="!playing" class="hover:fill-green-90"></Play>
</template>
