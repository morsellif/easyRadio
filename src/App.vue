<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Radios from "./components/Radios.vue";
import Player from "./components/Player.vue";
import Heading from "./components/Heading.vue";
</script>

<script lang="ts">
export default {
  data() {
    return {
      currentlyListeningData: {
        radioName: "",
        streamUrl: "",
        type: "",
      },
    };
  },
  methods: {
    currentlyListening(e: {
      radioName: string;
      streamUrl: string;
      type: string;
    }) {
      this.currentlyListeningData.radioName = e.radioName;
      this.currentlyListeningData.streamUrl = e.streamUrl;
      this.currentlyListeningData.type = e.type;
    },
  },
};
</script>

<template>
  <audio id="playme"></audio>
  <div class="container mx-auto max-w-xs rounded-3xl">
    <Heading></Heading>
    <Player
      :radioName="currentlyListeningData.radioName"
      :streamUrl="currentlyListeningData.streamUrl"
      :type="currentlyListeningData.type"
    ></Player>
    <Radios v-on:listen="currentlyListening"></Radios>
  </div>
</template>

<style></style>
