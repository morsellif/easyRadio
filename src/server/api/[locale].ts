import type { LocaleMessages, DefineLocaleMessage } from 'vue-i18n';

const locales: LocaleMessages<DefineLocaleMessage> = {
	it: {
		live: 'Diretta',
		buffering: 'Caricamento',
		preferred: 'Preferite',
		all: 'Tutte',
		radios: 'Radio',
		search: 'Ricerca radio...',
		serachPlaceholder1Line: 'Comincia a digitare.',
		serachPlaceholder2Line: 'Le radio suggerite appariranno qui.',
		contribute: 'Contribuisci su',
		startBy: 'Seleziona una radio.',
	},
	en: {
		live: 'Live',
		buffering: 'Buffering',
		preferred: 'Preferred',
		all: 'All',
		radios: 'Radios',
		search: 'Search for radios...',
		serachPlaceholder1Line: 'Start typing.',
		serachPlaceholder2Line: 'Results will appear here.',
		contribute: 'Contribute on',
		startBy: 'Start by selecting a radio.',
	},
};

export default defineEventHandler((event) => {
	const locale = event.context.params?.locale;
	if (locale == null) {
		return {};
	}

	return locales[locale] || {};
});
