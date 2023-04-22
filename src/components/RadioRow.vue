<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import FavouriteButton from './FavouriteButton.vue';
import Tag from './Tag.vue';

defineProps<{
	name: string;
	isLoved: boolean;
	tags: string[];
}>();

defineEmits(['listenRadio', 'lovedRadio']);
</script>

<template>
	<li
		class="flex border-b border-gray-200 fist:rounded-t-2xl last:border-0 last:rounded-b-3xl"
	>
		<div
			class="font-medium text-xl grow flex flex-row p-3"
			@click="$emit('listenRadio')"
		>
			<div class="flex flex-col">
				<span>{{ name }}</span>
				<div class="flex flex-row grow-0 space-x-1">
					<Tag v-for="tag in tags" :key="tag">{{ tag }}</Tag>
				</div>
			</div>
		</div>

		<div class="flex justify-end flex-row p-3" @click="$emit('lovedRadio')">
			<FavouriteButton :is-loved="isLoved"></FavouriteButton>
		</div>
	</li>
</template>

<style></style>
