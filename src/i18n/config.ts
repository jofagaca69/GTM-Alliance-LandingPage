/**
 * Configuración de idiomas del sitio. Coherente con `i18n` en `astro.config.mjs`
 * (`defaultLocale: 'es'`, `routing.prefixDefaultLocale: false`): el español no
 * lleva prefijo de ruta (`/`, `/pqrsd/`) y el inglés siempre lo lleva (`/en/`,
 * `/en/pqrsd/`).
 */

export const LOCALES = ['es', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

type LocaleMeta = {
	/** Etiqueta corta para el switch de idioma (ES / EN). */
	short: string;
	/** Nombre completo para `aria-label`/`title`. */
	label: string;
	/** Valor de `<html lang="...">`. */
	htmlLang: string;
	/** Valor de `og:locale`. */
	ogLocale: string;
	/** Código de idioma para `hreflang` y `inLanguage` en JSON-LD. */
	hreflang: string;
	/** Locale con región para `inLanguage` en JSON-LD (coherente con `sitemap()` en astro.config.mjs). */
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
