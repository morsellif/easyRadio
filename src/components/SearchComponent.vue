<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import MagnifyingGlassIcon from './icons/MagnifyingGlassIcon.vue';
import radios from './../assets/radios.json';
import XIcon from './icons/XIcon.vue';

const isSearching = ref(false);
const searchValue = ref('');
const emit = defineEmits(['update:modelValue', 'searching']);

function updateSearch() {
	const results: string[] = [];
	const searchQuery = searchValue.value.toLowerCase();

	let tmp = '';
	Object.keys(radios).forEach((radio) => {
		tmp = radio.toLowerCase();
		if (tmp.includes(searchQuery)) {
			results.push(radio);
		}
	});

	emit('update:modelValue', results);
}

function startSearch() {
	isSearching.value = true;
	emit('searching', true);
}

function clear() {
	isSearching.value = false;
	searchValue.value = '';
	emit('update:modelValue', []);
	emit('searching', false);
}
</script>

<template>
	<div
		class="pt-2 flex border-b border-gray-200 fist:rounded-t-2xl last:border-0 last:rounded-b-2xl"
	>
		<div
			:class="{
				'border-sky-500 ring-sky-500 ring-2 pr-9': isSearching,
			}"
			class="border border-slate-300 relative block w-full bg-white rounded-3xl pl-9 shadow-sm sm:text-sm"
		>
			<span class="sr-only">Search</span>
			<span class="absolute inset-y-0 left-0 flex items-center pl-2">
				<MagnifyingGlassIcon class="h-5 w-5 fill-black" />
			</span>
			<input
				v-model="searchValue"
				class="placeholder:italic placeholder:text-slate-400 block focus:outline-none pl-1 py-2 w-full rounded-3xl"
				placeholder="Search for radios..."
				type="text"
				name="search"
				@keyup="updateSearch()"
				@focusin="startSearch()"
			/>
			<span
				v-if="isSearching"
				class="absolute inset-y-0 right-0 flex items-center p-1"
			>
				<button
					class="hover:bg-slate-100 rounded-3xl transition ease-in-out delay-150 p-1"
					@click="clear()"
				>
					<XIcon class="h-5 w-5 fill-slate-500 text-center"></XIcon>
				</button>
			</span>
		</div>
	</div>
</template>
