<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Radios from './components/RadiosList.vue';
import Heading from './components/HeadingComponent.vue';
// import Credits from './components/CreditsComponent.vue';
</script>

<script lang="ts">
export default {
	data() {
		return {
			currentlyListeningData: {
				radioName: '',
				streamUrl: '',
				type: '',
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
	<div
		class="container mx-auto max-w-xs h-screen rounded-3xl flex flex-col flex-1 relative mb-0"
	>
		<Heading></Heading>
		<router-view name="player"></router-view>
		<Radios @listen="currentlyListening"></Radios>
		<!-- <Credits></Credits> -->
	</div>
</template>

<style></style>
