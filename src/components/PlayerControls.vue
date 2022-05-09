<script setup lang="ts">
import { defineProps } from 'vue';
import Play from './icons/PlayIcon.vue';
import Pause from './icons/PauseIcon.vue';

defineProps<{ playing: boolean }>();
</script>

<template>
	<Pause v-if="playing" class="fill-black w-8"></Pause>
	<Play v-else class="fill-black w-8"></Play>
</template>
