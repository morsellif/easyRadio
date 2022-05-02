<script setup lang="ts">
import Hls from "hls.js";
import PlayerControls from "./PlayerControls.vue";

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
      hls: null,
      playing: true,
    };
  },
  updated() {
    this.playSound();
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
    playSound() {
      if (Hls.isSupported() && this.type == "m3u8") {
        const hls = new Hls();

        hls.loadSource(this.streamUrl);
        hls.attachMedia(this.$refs.media as HTMLMediaElement);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          (this.$refs.media as HTMLMediaElement).play();
        });
      } else {
        (this.$refs.media as HTMLMediaElement).src = this.streamUrl;

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
    <div class="font-bold text-3xl text-center">{{ radioName }}</div>
    {{ streamUrl }}
    <div class="flex justify-center flex-row pt-2" @click="changePlayback()">
      <PlayerControls :playing="playing"></PlayerControls>
    </div>
  </div>
  <audio ref="media"></audio>
</template>

<style></style>
