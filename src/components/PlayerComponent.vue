<script setup lang="ts">
import { useRoute } from 'vue-router';
import { defineProps, ref, watch, onMounted } from 'vue';
import Hls from 'hls.js';
import PlayerControls from './PlayerControls.vue';
import Spinner from './icons/SpinnerIcon.vue';
import Circle from './icons/CircleIcon.vue';

const route = useRoute();
const media = ref<HTMLMediaElement | null>(null);

let hls: Hls;
const playing = ref(true);
const isBuffering = ref(false);

defineProps<{
	radioName: string;
	streamUrl: string;
	type: string;
}>();

function changePlayback() {
	if (media.value!.paused) {
		playing.value = true;
		media.value!.play();
	} else {
		playing.value = false;
		media.value!.pause();
	}
}
function playSound(radioName: string, streamUrl: string, type: string) {
	if (Hls.isSupported() && type == 'm3u8') {
		hls.destroy();
		hls = new Hls();

		hls.loadSource(streamUrl);
		hls.attachMedia(media.value!);

		hls.on(Hls.Events.MANIFEST_PARSED, () => {
			media.value!.play();
		});
	} else {
		media.value!.src = streamUrl;
		media.value!.addEventListener('loadedmetadata', () => {
			media.value!.play();
		});
	}

	if ('mediaSession' in navigator) {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: radioName,
			artist: 'easyRadio',
			album: '',
		});

		navigator.mediaSession.setActionHandler('play', function () {
			changePlayback();
		});
		navigator.mediaSession.setActionHandler('pause', function () {
			changePlayback();
		});
	}
}

onMounted(() => {
	playSound(
		route.params.radioName as string,
		route.params.streamUrl as string,
		route.params.type as string,
	);
});

watch(
	() => route.params,
	(newParams) => {
		isBuffering.value = false;
		media.value!.pause();
		hls.destroy();
		media.value!.src = '';

		playSound(
			newParams.radioName as string,
			newParams.streamUrl as string,
			newParams.type as string,
		);
	},
);
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
	<video ref="media" class="hidden" @canplay="isBuffering = true"></video>
</template>

<style></style>
