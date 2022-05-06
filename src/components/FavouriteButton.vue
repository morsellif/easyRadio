<script setup lang="ts">
import HeartFilled from "./icons/HeartFilled.vue";
import HeartOutline from "./icons/HeartOutline.vue";

defineProps<{ isLoved: boolean }>();
</script>

<template>
  <HeartFilled class="fill-red-500 w-7" v-if="isLoved"></HeartFilled>
  <HeartOutline class="fill-black w-7" v-if="!isLoved"></HeartOutline>
</template>
