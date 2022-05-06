<script setup lang="ts">
import Loved from "./icons/Loved.vue";
import List from "./icons/List.vue";
import Caret from "./icons/Caret.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
</script>

<script lang="ts">
export default {
  name: "Dropdown",
  data() {
    return {
      filterName: "Filter",
    };
  },
  methods: {
    filter(filterName: string) {
      this.filterName = filterName;
      this.$emit("filter", filterName);
    },
  },
};
</script>

<template>
  <div class="top-2 text-right">
    <Menu as="div" class="inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex w-full border-gray-500 border justify-center rounded-3xl px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <div class="text-sm">{{ filterName }}</div>
          <Caret class="w-3 ml-3"></Caret>
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
          class="absolute right-3 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-3xl bg-white drop-shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                @click="filter('Preferred')"
                :class="{
                  'bg-gray-100': active,
                }"
                class="group flex w-full items-center rounded-3xl px-2 py-2 text-sm text-gray-900"
              >
                <Loved class="ml-1 mr-3 w-5"></Loved>Preferred
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                @click="filter('All')"
                :class="{
                  'bg-gray-100': active,
                }"
                class="group flex w-full items-center rounded-3xl px-2 py-2 text-sm text-gray-900"
              >
                <List class="ml-2 mr-4 w-5"></List>All
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
