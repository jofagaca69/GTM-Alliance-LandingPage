/**
 * Fuente única de la información de contacto de GTM Alliance. La consumen
 * `Contact.astro`, `Footer.astro`, `DryCargoLine.astro` y el JSON-LD
 * `Organization` de `BaseLayout.astro`.
 */

const WHATSAPP_MAS_INFO = 'Hola, me gustaría solicitar más información.';

export const TELEFONO = {
	label: '+57 300 797 4993',
	tel: 'tel:+573007974993',
	href: `https://wa.me/573007974993?text=${encodeURIComponent(WHATSAPP_MAS_INFO)}`,
	whatsapp: `https://wa.me/573007974993?text=${encodeURIComponent(WHATSAPP_MAS_INFO)}`,
};

export const TELEFONO2 = {
	label: '+57  301 254 3223',
	tel: 'tel:+573012543223',
	href: `https://wa.me/573012543223?text=${encodeURIComponent(WHATSAPP_MAS_INFO)}`,
	whatsapp: `https://wa.me/573012543223?text=${encodeURIComponent(WHATSAPP_MAS_INFO)}`,
};

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
