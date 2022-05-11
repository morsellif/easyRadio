<script setup lang="ts">
import { defineProps } from 'vue';
import ListUlIcon from './icons/ListUlIcon.vue';

defineProps<{
	isSearching: boolean;
	searchResults: string[];
}>();
</script>

<template>
	<li v-if="isSearching && searchResults.length <= 0" class="p-7">
		<div class="text-xl text-center font-bold text-slate-200">
			<ListUlIcon
				class="fill-slate-200 w-40 align-middle block m-auto mb-3"
			></ListUlIcon>
			Start typing. <br />Results will appear here.
		</div>
	</li>
</template>
