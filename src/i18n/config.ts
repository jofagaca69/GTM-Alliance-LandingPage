export const LOCALES = ['es', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

type LocaleMeta = {
	short: string;
	label: string;
	htmlLang: string;
	ogLocale: string;
	hreflang: string;
	schemaLanguage: string;
};

export const LOCALE_META: Record<Locale, LocaleMeta> = {
	es: {
		short: 'ES',
		label: 'Español',
		htmlLang: 'es',
		ogLocale: 'es_CO',
		hreflang: 'es',
		schemaLanguage: 'es-CO',
	},
	en: {
		short: 'EN',
		label: 'English',
		htmlLang: 'en',
		ogLocale: 'en_US',
		hreflang: 'en',
		schemaLanguage: 'en-US',
	},
};

export function isLocale(value: string): value is Locale {
	return (LOCALES as readonly string[]).includes(value);
}
