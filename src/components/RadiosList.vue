/* eslint-disable vue/no-use-v-if-with-v-for */
<script setup lang="ts">
import { onMounted, ref, Ref, computed } from 'vue';

import Radio from './RadioRow.vue';
import Dropdown from './DropdownComponent.vue';
import radios from '../assets/radios.json';
import SearchComponent from './SearchComponent.vue';
import SearchPlaceholder from './SearchPlaceholder.vue';

/* DATA */
const lovedRadios: Ref<string[]> = ref([]);
const searchResults: Ref<string[]> = ref([]);
const isSearching = ref(false);
const filter: Ref<string> = ref('All');

/* METHODS */
function parseLovedRadios(data: string) {
	lovedRadios.value = JSON.parse(data);
}

function isLoved(radioName: string) {
	return (
		lovedRadios.value!.findIndex((element) => element === radioName) !== -1
	);
}

function love(radioName: string) {
	lovedRadios.value!.push(radioName);
	save();
}

function unlove(radioName: string) {
	const toUnlove = lovedRadios.value!.findIndex(
		(element) => element === radioName,
	);
	if (toUnlove > -1) {
		lovedRadios.value!.splice(toUnlove, 1);
	}
	save();
}

function save() {
	localStorage.setItem('lovedRadios', JSON.stringify(lovedRadios.value));
}

function filterRadios(e: string) {
	filter.value = e;
}

function loveGateway(radioName: string) {
	if (isLoved(radioName)) {
		unlove(radioName);
	} else {
		love(radioName);
	}
}

function radiosArray(): string[] {
	if (isSearching.value) {
		return searchResults.value;
	}

	return sortByPreferred.value;
}

/* MOUNTED */
onMounted(() => {
	/* load `lovedRadios` from localStorage */
	let exists: string | null = localStorage.getItem('lovedRadios');

	/* if `lovedRadios` does not exists, */
	if (!exists) {
		/* create it */
		localStorage.setItem('lovedRadios', '[]');
		/* load it */
		exists = localStorage.getItem('lovedRadios');
	}

	/* parse string to JSON */
	parseLovedRadios(exists!);
});

/* COMPUTED */
const sortByPreferred = computed<string[]>(() => {
	return Object.keys(radios).sort((a, b) => {
		if (lovedRadios.value!.includes(a)) {
			return -1;
		}
		if (lovedRadios.value!.includes(b)) {
			return 1;
		}

		return 0;
	});
});
</script>

<template>
	<ul class="bg-white border border-gray-200 rounded-3xl drop-shadow-md">
		<li
			class="flex p-3 border-b border-gray-200 fist:rounded-t-lg last:border-0 last:rounded-b-lg"
		>
			<div class="flex font-bold text-3xl grow flex-row">Radios</div>
			<Dropdown class="flex justify-end" @filter="filterRadios"></Dropdown>
		</li>
		<SearchComponent
			v-model="searchResults"
			@searching="isSearching = $event"
		></SearchComponent>
		<SearchPlaceholder
			:is-searching="isSearching"
			:search-results="searchResults"
		></SearchPlaceholder>
		<Radio
			v-for="index in radiosArray()"
			:key="index"
			:class="[
				$route.params.radioName === index ? 'bg-gray-200' : 'hover:bg-gray-100',
			]"
			class="cursor-pointer"
			:is-loved="isLoved(index)"
			:name="index"
			@loved-radio="loveGateway(index)"
			@listen-radio="
				$router.push({
					name: 'play',
					params: {
						radioName: index,
						streamUrl: radios[index].streamUrl,
						type: radios[index].type,
					},
				})
			"
		></Radio>
	</ul>
</template>

<style></style>
