export default defineNuxtConfig({
	modules: [
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@nuxt/devtools',
		// '@nuxtjs/i18n',
	],
	/* piniaPersistedstate: {
		storage: 'localStorage',
	}, */
	build: {},
	nitro: {
		preset: 'vercel-edge',
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	/* i18n: {
		experimental: {
			jsTsFormatResource: true,
		},
		precompile: {
			strictMessage: false,
			escapeHtml: true,
		},
		debug: false,
		detectBrowserLanguage: {
			useCookie: true,
		},
		locales: ['en', 'it'],
		strategy: 'no_prefix',
		defaultLocale: 'en',
	}, */
	typescript: {},
	css: ['~/assets/css/main.css'],
	srcDir: './src/',
	app: {
		head: {
			title: 'easyRadio',
			meta: [
				{
					name: 'description',
					content:
						'Listen to the best italians webradios, all in one simple app.',
				},
				{
					name: 'keywords',
					content:
						'listen, italians, webradio, easy, web app, radio, radio italiane, italiano, radio web',
				},
			],
		},
	},
	ssr: true,
});
