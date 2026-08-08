/**
 * Fuente única de la información de contacto de GTM Alliance. La consumen
 * `Contact.astro`, `Footer.astro`, `DryCargoLine.astro` y el JSON-LD
 * `Organization` de `BaseLayout.astro`.
 */

export const TELEFONO = {
	label: '+57 300 797 4993',
	href: 'tel:+573007974993',
	whatsapp: 'https://wa.me/573007974993',
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
