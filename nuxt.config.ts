export default defineNuxtConfig({
	modules: [
		'@pinia/nuxt',
		// '@pinia-plugin-persistedstate/nuxt',
		'@vueuse/nuxt',
		'@nuxt/devtools',
		'@nuxtjs/i18n',
	],
	/* piniaPersistedstate: {
		storage: 'localStorage',
	}, */
	build: {},
	nitro: {
		preset: 'vercel',
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	i18n: {
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
		locales: [
			{
				code: 'en',
				file: 'en-US.js',
			},
			{
				code: 'it',
				file: 'it-IT.js',
			},
		],
		strategy: 'no_prefix',
		lazy: true,
		langDir: 'lang/',
		defaultLocale: 'en',
	},
	typescript: {},
	css: ['~/assets/css/main.css'],
	srcDir: './src/',
	app: {
		head: {
			title: 'laSpesa',
			meta: [{ name: 'description', content: '' }],
		},
	},
	ssr: true,
});
