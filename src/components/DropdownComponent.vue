<script setup lang="ts">
import HeartFilled from './icons/HeartFilledIcon.vue';
import ListUl from './icons/ListUlIcon.vue';
import CaretDown from './icons/CaretDownIcon.vue';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { ref, defineEmits, onMounted } from 'vue';
import { get, set } from './../utils/localStorage';

const filterName = ref('All');
const emit = defineEmits(['filter']);

function filter(newFilterName: string) {
	filterName.value = newFilterName;
	set('filter', newFilterName);
	emit('filter', filterName.value);
}

onMounted(() => {
	let savedFilter = get('filter');
	if (savedFilter === null) {
		set('filter', 'All');
		savedFilter = get('filter');
	}
	filterName.value = savedFilter as string;
	emit('filter', filterName.value);
});
</script>

<template>
	<div class="top-2 text-right">
		<Menu as="div" class="inline-block text-left">
			<div>
				<MenuButton
					class="inline-flex w-full border-gray-500 border justify-center rounded-3xl px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
				>
					<div class="text-sm">{{ filterName }}</div>
					<CaretDown class="w-3 ml-3 fill-black"></CaretDown>
				</MenuButton>
			</div>

			<transition
				enter-active-class="transition duration-100 ease-out"
				enter-from-class="transform scale-95 opacity-0"
				enter-to-class="transform scale-100 opacity-100"
				leave-active-class="transition duration-75 ease-in"
				leave-from-class="transform scale-100 opacity-100"
				leave-to-class="transform scale-95 opacity-0"
			>
				<MenuItems
					class="absolute right-3 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-3xl bg-white drop-shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
				>
					<div class="px-1 py-1">
						<MenuItem v-slot="{ active }">
							<button
								:class="{
									'bg-gray-100': active,
								}"
								class="group flex w-full items-center rounded-3xl px-2 py-2 text-sm text-gray-900"
								@click="filter('Preferred')"
							>
								<HeartFilled class="ml-1 mr-3 w-7 fill-red-500"></HeartFilled
								>Preferred
							</button>
						</MenuItem>
						<MenuItem v-slot="{ active }">
							<button
								:class="{
									'bg-gray-100': active,
								}"
								class="group flex w-full items-center rounded-3xl px-2 py-2 text-sm text-gray-900"
								@click="filter('All')"
							>
								<ListUl class="ml-2 mr-4 w-5"></ListUl>All
							</button>
						</MenuItem>
					</div>
				</MenuItems>
			</transition>
		</Menu>
	</div>
</template>
