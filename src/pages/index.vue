<script setup lang="ts">
import { ref } from 'vue';
import HeadingComponent from '../components/HeadingComponent.vue';
import RadiosList from '../components/RadiosList.vue';

interface ListeningData {
	radioName: string;
	streamUrl: string;
	type: string;
	tags: string[];
}

const currentlyListeningData = ref<ListeningData>({
	radioName: '',
	streamUrl: '',
	type: '',
	tags: [],
});

function currentlyListening(e: {
	radioName: string;
	streamUrl: string;
	type: string;
}) {
	currentlyListeningData.value.radioName = e.radioName;
	currentlyListeningData.value.streamUrl = e.streamUrl;
	currentlyListeningData.value.type = e.type;
}
</script>

<template>
	<div
		class="container mx-auto max-w-xs h-full rounded-3xl flex flex-col flex-1 relative mb-0 pb-9"
	>
		<HeadingComponent />
		<NuxtPage />
		<RadiosList @listen="currentlyListening" />
	</div>
</template>
