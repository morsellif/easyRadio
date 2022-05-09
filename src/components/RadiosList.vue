/* eslint-disable vue/no-use-v-if-with-v-for */
<script setup lang="ts">
import Radio from './RadioRow.vue';
import Dropdown from './DropdownComponent.vue';
import radios from '../assets/radios.json';
</script>

<script lang="ts">
declare interface ComponentData {
	lovedRadios: string[];
	filter: string;
}

export default {
	emits: ['listen'],
	data(): ComponentData {
		return {
			lovedRadios: [],
			filter: 'All',
		};
	},
	computed: {
		sortByPreferred(): Array<string> {
			return Object.keys(radios).sort((a, b) => {
				if (this.lovedRadios.includes(a)) {
					return -1;
				}
				if (this.lovedRadios.includes(b)) {
					return 1;
				}

				return 0;
			});
		},
	},
	mounted() {
		const exists = localStorage.getItem('lovedRadios');
		if (exists) {
			this.lovedRadios = JSON.parse(exists);
		}
	},
	methods: {
		listen(radioName: string, streamUrl: string, type: string) {
			this.$emit('listen', { radioName, streamUrl, type });
		},
		isLoved(radioName: string) {
			return (
				this.lovedRadios.findIndex((element) => element === radioName) !== -1
			);
		},
		loveGateway(radioName: string) {
			if (this.isLoved(radioName)) {
				this.unlove(radioName);
			} else {
				this.love(radioName);
			}
		},
		love(radioName: string) {
			// TODO:
			this.lovedRadios.push(radioName);
			this.save();
		},
		unlove(radioName: string) {
			const toUnlove = this.lovedRadios.findIndex(
				(element) => element === radioName,
			);
			if (toUnlove > -1) {
				this.lovedRadios.splice(toUnlove, 1);
			}
			this.save();
		},
		save() {
			localStorage.setItem('lovedRadios', JSON.stringify(this.lovedRadios));
		},
		filterRadios(e: string) {
			this.filter = e;
		},
	},
};
</script>

<template>
	<ul class="bg-white border border-gray-200 rounded-3xl drop-shadow-md">
		<li
			class="flex p-3 border-b border-gray-200 fist:rounded-t-lg last:border-0 last:rounded-b-lg"
		>
			<div class="flex font-bold text-3xl grow flex-row">Radios</div>
			<Dropdown class="flex justify-end" @filter="filterRadios"></Dropdown>
		</li>
		<div v-if="filter === 'All'">
			<Radio
				v-for="index in sortByPreferred"
				:key="index"
				:class="[
					$route.params.radioName === index
						? 'bg-gray-200'
						: 'hover:bg-gray-100',
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
		</div>
		<div v-if="filter === 'Preferred'">
			<Radio
				v-for="index in lovedRadios"
				:key="index"
				:class="[
					$route.params.radioName === index
						? 'bg-gray-200'
						: 'hover:bg-gray-100',
				]"
				:name="index"
				:is-loved="isLoved(index)"
				class="cursor-pointer"
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
		</div>
	</ul>
</template>

<style></style>
