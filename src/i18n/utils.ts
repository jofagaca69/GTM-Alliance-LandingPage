import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from './config';
import es from './es';
import en from './en';
import type { Dictionary } from './es';

const dictionaries: Record<Locale, Dictionary> = { es, en };

/**
 * Resuelve el locale a partir de una URL, leyendo el primer segmento del
 * pathname (`/en/pqrsd/` → `'en'`). Sirve de respaldo de `Astro.currentLocale`,
 * que en `routing.prefixDefaultLocale: false` puede venir `undefined` fuera
 * del árbol de páginas (p. ej. dentro de un `<script>` de servidor).
 */
export function getLocale(url: URL): Locale {
	const [first] = url.pathname.split('/').filter(Boolean);
	return first && isLocale(first) ? first : DEFAULT_LOCALE;
}

export function useTranslations(lang: Locale): Dictionary {
	return dictionaries[lang];
}

/**
 * Quita el prefijo de idioma de un pathname, si lo tiene.
 * `/en/pqrsd/` → `/pqrsd/`, `/pqrsd/` → `/pqrsd/`.
 */
export function stripLocale(pathname: string): string {
	const segments = pathname.split('/');
	const first = segments[1];
	if (first && isLocale(first) && first !== DEFAULT_LOCALE) {
		return '/' + segments.slice(2).join('/');
	}
	return pathname;
}

/**
 * Antepone el prefijo de idioma a una ruta interna, respetando el hash.
 * Uso pensado para los `href` de navegación (`/#congelados`, `/pqrsd/`), no
 * para URLs externas. El español no lleva prefijo (`prefixDefaultLocale: false`).
 *
 *   localizePath('/#congelados', 'en')  → '/en/#congelados'
 *   localizePath('/pqrsd/', 'en')       → '/en/pqrsd/'
 *   localizePath('/pqrsd/', 'es')       → '/pqrsd/'
 */
export function localizePath(path: string, lang: Locale): string {
	if (lang === DEFAULT_LOCALE) return path;

	const hashIndex = path.indexOf('#');
	const base = hashIndex === -1 ? path : path.slice(0, hashIndex);
	const hash = hashIndex === -1 ? '' : path.slice(hashIndex);

	if (base === '' || base === '/') {
		return `/${lang}/${hash}`;
	}

	return `/${lang}${base}${hash}`;
}

/**
 * Construye las URLs absolutas equivalentes en cada idioma para un pathname
 * dado, usadas en los `<link rel="alternate" hreflang="...">` de `BaseLayout`.
 */
export function alternateURLs(pathname: string, site: URL): Record<Locale, string> {
	const bare = stripLocale(pathname);
	const result = {} as Record<Locale, string>;

	for (const locale of LOCALES) {
		result[locale] = new URL(localizePath(bare, locale), site).href;
	}

	return result;
}
