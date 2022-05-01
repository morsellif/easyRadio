<script setup lang="ts">
import { ref } from "vue";
import Play from "./Play.vue";
import Pause from "./Pause.vue";

const playing = ref(false);
</script>

<template>
  <Pause v-if="playing" @click="playing = !playing"></Pause>
  <Play v-if="!playing" @click="playing = !playing"></Play>
</template>
