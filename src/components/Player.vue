<script setup lang="ts">
import Hls from "hls.js";
import PlayerControls from "./PlayerControls.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

defineProps<{ radioName: string; streamUrl: string; type: string }>();
</script>

<script lang="ts">
export default {
  data() {
    return {
      loaded: false,
      mediaRecoveryAttempts: 0,
      id3TagMetadata: null,
      video: null,
      hls: new Hls(),
      playing: true,
      status: false,
    };
  },
  watch: {
    $route(to: any, from: any) {
      this.status = false;
      (this.$refs.media as HTMLMediaElement).pause();
      this.hls.destroy();
      (this.$refs.media as HTMLMediaElement).src = "";

      this.playSound(to.params.streamUrl, to.params.type);
    },
  },
  methods: {
    changePlayback() {
      console.log((this.$refs.media as HTMLMediaElement).paused);
      if ((this.$refs.media as HTMLMediaElement).paused) {
        this.playing = true;
        (this.$refs.media as HTMLMediaElement).play();
      } else {
        this.playing = false;
        (this.$refs.media as HTMLMediaElement).pause();
      }
    },
    playSound(streamUrl: string, type: string) {
      if (Hls.isSupported() && type == "m3u8") {
        this.hls = new Hls();

        this.hls.loadSource(streamUrl);
        this.hls.attachMedia(this.$refs.media as HTMLMediaElement);

        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          (this.$refs.media as HTMLMediaElement).play();
        });
      } else {
        (this.$refs.media as HTMLMediaElement).src = streamUrl;

        (this.$refs.media as HTMLMediaElement).addEventListener(
          "loadedmetadata",
          () => {
            (this.$refs.media as HTMLMediaElement).play();
          }
        );
      }
    },
  },
};
</script>

<template>
  <div
    class="bg-white border border-gray-200 rounded-3xl drop-shadow-md mb-4 p-4"
  >
    <div v-if="status">
      <div class="font-bold text-3xl text-center">{{ radioName }}</div>
      {{ status }}
      <div class="flex justify-center pt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-2 mt-2 mb-2 ml-2"
          viewBox="0 0 512 512"
        >
          <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z"
          />
        </svg>
        <div class="flex ml-1 font-bold">LIVE</div>
      </div>
      <div class="flex justify-center flex-row pt-2" @click="changePlayback()">
        <PlayerControls :playing="playing"></PlayerControls>
      </div>
    </div>
    <PulseLoader v-else></PulseLoader>
  </div>
  <audio ref="media" @canplay="status = true"></audio>
</template>

<style></style>
