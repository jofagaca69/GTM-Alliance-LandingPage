import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from './config';
import es from './es';
import en from './en';
import type { Dictionary } from './es';

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getLocale(url: URL): Locale {
	const [first] = url.pathname.split('/').filter(Boolean);
	return first && isLocale(first) ? first : DEFAULT_LOCALE;
}

export function useTranslations(lang: Locale): Dictionary {
	return dictionaries[lang];
}

export function stripLocale(pathname: string): string {
	const segments = pathname.split('/');
	const first = segments[1];
	if (first && isLocale(first) && first !== DEFAULT_LOCALE) {
		return '/' + segments.slice(2).join('/');
	}
	return pathname;
}

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

export function alternateURLs(pathname: string, site: URL): Record<Locale, string> {
	const bare = stripLocale(pathname);
	const result = {} as Record<Locale, string>;

	for (const locale of LOCALES) {
		result[locale] = new URL(localizePath(bare, locale), site).href;
	}

	return result;
}
