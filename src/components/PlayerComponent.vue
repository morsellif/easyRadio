<script setup lang="ts">
import { ref, watch, onMounted, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import Hls from 'hls.js';
import PlayerControls from './PlayerControls.vue';
import Spinner from './icons/SpinnerIcon.vue';
import Circle from './icons/CircleIcon.vue';

const router = useRouter();
const media = ref<HTMLMediaElement | null>(null);

let hls: Hls | null = null;
const isPlaying = ref(false);
const isBuffering = ref(false);

const props = defineProps<{
	radioName: string;
	streamUrl: string;
	type: string;
}>();

/* check if Hls is supported natively by browser */
function isHlsSupportedNatively() {
	return Boolean(
		media.value!.canPlayType('application/vnd.apple.mpegURL') ||
			media.value!.canPlayType('audio/mpegurl'),
	);
}

function changePlayback() {
	if (media.value!.paused) {
		playMedia();
	} else {
		pauseMedia();
	}
}

function playMedia() {
	media.value!.play();
}

function pauseMedia() {
	media.value!.pause();
}

function playSound() {
	/* is m3u8 and browser does not support HLS natively*/
	if (!isHlsSupportedNatively() && props.type == 'm3u8') {
		/* does browser support Hls.js library? */
		if (Hls.isSupported()) {
			hls?.destroy();
			hls = new Hls();

			hls.loadSource(props.streamUrl);
			hls.attachMedia(media.value!);

			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				playMedia();
				setMediaSession();
			});
		} else {
			/* no player able to play the selected audio stream */
			throw new Error('No player avaible.');
		}
	} else {
		/* is m3u8 and browser supports HLS || is other media */
		media.value!.src = props.streamUrl;
		media.value!.addEventListener('loadedmetadata', () => {
			playMedia();
			setMediaSession();
		});
	}
}

function setMediaSession() {
	if ('mediaSession' in navigator) {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: props.radioName,
			artist: 'easyRadio',
			album: '',
		});

		navigator.mediaSession.setActionHandler('play', function () {
			playMedia();
		});
		navigator.mediaSession.setActionHandler('pause', function () {
			pauseMedia();
		});
		navigator.mediaSession.setActionHandler('stop', function () {
			hls?.destroy();
			hls = null;
			media.value!.src = '';

			router.push({ name: 'home' });
		});
	}
}

onMounted(() => {
	playSound();
});

watch(
	() => [props.radioName, props.streamUrl, props.type],
	() => {
		isBuffering.value = false;
		isPlaying.value = false;
		playSound();
	},
);
</script>

<template>
	<div
		class="bg-white border border-gray-200 rounded-3xl drop-shadow-md mb-4 p-4"
	>
		<div>
			<div class="font-bold text-3xl text-center">
				{{ props.radioName }}
			</div>
			<div v-if="isBuffering" class="flex justify-center pt-2">
				<Circle class="w-2 animate-ping"></Circle>
				<div class="flex ml-2 font-bold">LIVE</div>
			</div>
			<div v-else class="flex justify-center pt-2">
				<Spinner class="w-5 animate-spin"></Spinner>
				<div class="flex ml-2 font-bold">BUFFERING</div>
			</div>
			<div class="flex justify-center flex-row pt-2" @click="changePlayback()">
				<PlayerControls :playing="isPlaying"></PlayerControls>
			</div>
		</div>
	</div>
	<video
		ref="media"
		class="hidden"
		@canplay="isBuffering = true"
		@playing="isPlaying = true"
		@pause="isPlaying = false"
	></video>
</template>

<style></style>
