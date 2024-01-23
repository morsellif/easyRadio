<script setup lang="ts">
import HeartFilled from './icons/HeartFilledIcon.vue';
import HeartOutline from './icons/HeartOutlineIcon.vue';

defineProps<{ isLoved: boolean }>();
</script>

<template>
	<HeartFilled v-if="isLoved" class="fill-red-500 w-7"></HeartFilled>
	<HeartOutline v-else class="fill-black w-7"></HeartOutline>
</template>
