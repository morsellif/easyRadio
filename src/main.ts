import { createApp } from 'vue';
import {
	createRouter,
	createWebHistory,
	NavigationGuardNext,
	RouteLocationNormalized,
} from 'vue-router';

import VueGtag from 'vue-gtag';

import Player from './components/PlayerComponent.vue';
import PlayerPlaceholder from './components/PlayerPlaceholder.vue';

import App from './App.vue';
import './index.css';

const routes = [
	{ name: 'home', path: '/', components: { player: PlayerPlaceholder } },
	{
		name: 'play',
		path: '/play',
		components: { player: Player },
		props: true,
		beforeEnter: (
			to: RouteLocationNormalized,
			_from: RouteLocationNormalized,
			next: NavigationGuardNext,
		) => {
			if (!to.params.streamUrl && !to.params.type) {
				return next({ name: 'home' });
			}
			next();
		},
	},
];
const router = createRouter({
	history: createWebHistory(),
	routes,
});

const app = createApp(App);
app.use(VueGtag, { config: { id: import.meta.env.VITE_GTAG_ID } });
app.use(router);
app.mount('#app');
