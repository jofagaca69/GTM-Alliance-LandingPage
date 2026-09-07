/**
 * Fuente única de la información de contacto de GTM Alliance. La consumen
 * `Contact.astro`, `Footer.astro`, `DryCargoLine.astro` y el JSON-LD
 * `Organization` de `BaseLayout.astro`.
 */

import type { Locale } from '../i18n/config';
import { useTranslations } from '../i18n/utils';

export const TELEFONO = {
	label: '+57 300 797 4993',
	tel: 'tel:+573007974993',
	numero: '573007974993',
};

export const TELEFONO2 = {
	label: '+57  301 254 3223',
	tel: 'tel:+573012543223',
	numero: '573012543223',
};

/**
 * URL de wa.me con el mensaje pre-cargado en el idioma del visitante
 * (`contact.whatsappMessage` en el diccionario), para que el chat de
 * WhatsApp se abra en español o en inglés según la página desde la que se
 * hizo clic.
 */
export function whatsappHref(numero: string, lang: Locale): string {
	const t = useTranslations(lang);
	return `https://wa.me/${numero}?text=${encodeURIComponent(t.contact.whatsappMessage)}`;
}

export const CORREOS = {
	gerencia: 'gerencia@gtm-alliance.com',
	administracion: 'administracion@gtm-alliance.com',
};

export const SEDE_PRINCIPAL = {
	ciudad: 'Bogotá D.C., Colombia',
	direccion: 'Carrera 110 # 70G-17, Piso 2',
	streetAddress: 'Carrera 110 # 70G-17, Piso 2',
	addressLocality: 'Bogotá D.C.',
	addressRegion: 'Bogotá D.C.',
	addressCountry: 'CO',
};
