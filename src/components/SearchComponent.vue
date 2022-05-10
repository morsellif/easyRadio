<script setup lang="ts">
import { defineEmits } from 'vue';
import MagnifyingGlassIcon from './icons/MagnifyingGlassIcon.vue';
import radios from './../assets/radios.json';

const emit = defineEmits(['update:modelValue', 'searching']);

function search(e: Event) {
	let results: string[] = [];
	const { value } = e.target as HTMLInputElement;
	const searchQuery = value.toLowerCase();

	let tmp = '';
	Object.keys(radios).forEach((radio) => {
		tmp = radio.toLowerCase();
		if (tmp.includes(searchQuery)) {
			results.push(radio);
		}
	});

	emit('update:modelValue', results);
}

function stopSerch() {
	emit('update:modelValue', []);
	emit('searching');
}
</script>

<template>
	<li
		class="flex border-b border-gray-200 fist:rounded-t-2xl last:border-0 last:rounded-b-2xl"
	>
		<label class="relative block m-3 w-full">
			<span class="sr-only">Search</span>
			<span class="absolute inset-y-0 left-0 flex items-center pl-2">
				<MagnifyingGlassIcon class="h-5 w-5 fill-black" />
			</span>
			<input
				class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
				placeholder="Search for radios..."
				type="text"
				name="search"
				@keyup="search"
				@focusin="emit('searching')"
				@focusout="stopSerch()"
			/>
		</label>
	</li>
</template>
