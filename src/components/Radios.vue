<script setup lang="ts">
import Radio from "./Radio.vue";
import Dropdown from "./Dropdown.vue";
import radios from "./../assets/radios.json";
</script>

<script lang="ts">
declare interface ComponentData {
  lovedRadios: string[];
}

export default {
  data(): ComponentData {
    return {
      lovedRadios: [],
    };
  },
  methods: {
    listen(radioName: string, streamUrl: string, type: string) {
      this.$emit("listen", { radioName, streamUrl, type });
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
        (element) => element === radioName
      );
      if (toUnlove > -1) {
        this.lovedRadios.splice(toUnlove, 1);
      }
      this.save();
    },
    save() {
      localStorage.setItem("lovedRadios", JSON.stringify(this.lovedRadios));
    },
  },
  mounted() {
    const exists = localStorage.getItem("lovedRadios");
    if (exists) {
      this.lovedRadios = JSON.parse(exists);
    }
    // TODO: get loved radios from localStorage
  },
};
</script>

<template>
  <ul class="bg-white border border-gray-200 rounded-3xl drop-shadow-md">
    <li
      class="flex p-3 border-b border-gray-200 fist:rounded-t-lg last:border-0 last:rounded-b-lg"
    >
      <div class="flex font-bold text-3xl grow flex-row">Radios</div>
      <Dropdown class="flex justify-end"></Dropdown>
    </li>
    <Radio
      v-on:lovedRadio="loveGateway(index)"
      v-on:listen-radio="
        $router.push({
          name: 'play',
          params: {
            radioName: index,
            streamUrl: radio.streamUrl,
            type: radio.type,
          },
        })
      "
      :class="{
        'bg-gray-200': $route.params.radioName === index,
        'hover:bg-gray-100': $route.params.radioName !== index,
      }"
      class="cursor-pointer"
      v-for="(radio, index) in radios"
      :isLoved="isLoved(index)"
      :name="index"
    ></Radio>
  </ul>
</template>

<style></style>
