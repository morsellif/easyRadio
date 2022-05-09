<script setup lang="ts">
import { defineProps } from 'vue';
import Hls from 'hls.js';
import PlayerControls from './PlayerControls.vue';
import Spinner from './icons/SpinnerIcon.vue';
import Circle from './icons/CircleIcon.vue';

defineProps<{
	radioName: string;
	streamUrl: string;
	type: string;
}>();
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
			isBuffering: false,
		};
	},
	watch: {
		$route(to: any) {
			this.isBuffering = false;
			(this.$refs.media as HTMLMediaElement).pause();
			this.hls.destroy();
			(this.$refs.media as HTMLMediaElement).src = '';

			this.playSound(to.params.streamUrl, to.params.type);
		},
	},
	mounted() {
		this.playSound(
			this.$route.params.streamUrl as string,
			this.$route.params.type as string,
		);
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
			if (Hls.isSupported() && type == 'm3u8') {
				this.hls = new Hls();

				this.hls.loadSource(streamUrl);
				this.hls.attachMedia(this.$refs.media as HTMLMediaElement);

				this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
					(this.$refs.media as HTMLMediaElement).play();
				});
			} else {
				(this.$refs.media as HTMLMediaElement).src = streamUrl;

				(this.$refs.media as HTMLMediaElement).addEventListener(
					'loadedmetadata',
					() => {
						(this.$refs.media as HTMLMediaElement).play();
					},
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
		<div>
			<div class="font-bold text-3xl text-center">{{ radioName }}</div>
			<div v-if="isBuffering" class="flex justify-center pt-2">
				<Circle class="w-2 animate-ping"></Circle>
				<div class="flex ml-2 font-bold">LIVE</div>
			</div>
			<div v-else class="flex justify-center pt-2">
				<Spinner class="w-5 animate-spin"></Spinner>
				<div class="flex ml-2 font-bold">BUFFERING</div>
			</div>
			<div class="flex justify-center flex-row pt-2" @click="changePlayback()">
				<PlayerControls :playing="playing"></PlayerControls>
			</div>
		</div>
	</div>
	<audio ref="media" @canplay="isBuffering = true"></audio>
</template>

<style></style>
