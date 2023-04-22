<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import FavouriteButton from './FavouriteButton.vue';

defineProps<{
	name: string;
	isLoved: boolean;
}>();

defineEmits(['listenRadio', 'lovedRadio']);
</script>

<template>
	<div
		class="flex border-b border-gray-200 fist:rounded-t-2xl last:border-0 last:rounded-b-3xl"
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
	</div>
</template>

<style></style>
