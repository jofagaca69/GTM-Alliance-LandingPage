/**
 * Fuente única de la navegación del sitio. La consumen el header de
 * escritorio, el panel móvil y la columna «Navegación» del footer.
 *
 * `id` es el id de la sección en el DOM del home (sin `#`) y es también la
 * clave que usa el scrollspy (`data-nav-link` / `data-nav-group`, ver
 * `src/scripts/scrollspy.ts`). Es el mismo en los dos idiomas porque las
 * secciones del DOM no se traducen de id, solo de contenido. Los `href` se
 * generan con `localizePath()` para que apunten a `/` o `/en/` según
 * corresponda, y siempre van con `/` delante para que los enlaces funcionen
 * desde rutas que no son el home (p. ej. `/pqrsd`).
 */

import type { Locale } from '../i18n/config';
import { useTranslations, localizePath } from '../i18n/utils';

export type NavChild = {
	id: string;
	label: string;
	href: string;
	/** Etiqueta corta en mayúsculas del panel desplegable de escritorio. */
	tag: string;
	description: string;
};

export type NavLink = {
	kind: 'link';
	id: string;
	label: string;
	href: string;
};

export type NavGroup = {
	kind: 'group';
	/** Id sintético del grupo: no corresponde a ninguna sección del DOM. */
	id: string;
	label: string;
	children: NavChild[];
};

export type NavItem = NavLink | NavGroup;

export function getNavItems(lang: Locale): NavItem[] {
	const t = useTranslations(lang);

	return [
		{ kind: 'link', id: 'inicio', label: t.nav.inicio, href: localizePath('/#inicio', lang) },
		{
			kind: 'group',
			id: 'nuestros-servicios',
			label: t.nav.nuestrosProductos,
			children: [
				{
					id: 'congelados',
					label: t.nav.congelados.label,
					href: localizePath('/#congelados', lang),
					tag: t.nav.congelados.tag,
					description: t.nav.congelados.description,
				},
				{
					id: 'carga-seca',
					label: t.nav.cargaSeca.label,
					href: localizePath('/#carga-seca', lang),
					tag: t.nav.cargaSeca.tag,
					description: t.nav.cargaSeca.description,
				},
				{
					id: 'servicios',
					label: t.nav.servicios.label,
					href: localizePath('/#servicios', lang),
					tag: t.nav.servicios.tag,
					description: t.nav.servicios.description,
				},
			],
		},
		{
			kind: 'link',
			id: 'por-que-elegirnos',
			label: t.nav.porQueElegirnos,
			href: localizePath('/#por-que-elegirnos', lang),
		},
		{ kind: 'link', id: 'contacto', label: t.nav.contacto, href: localizePath('/#contacto', lang) },
	];
}

/** Ids que el grupo debe iluminar, listos para `data-nav-group`. */
export function groupTargets(group: NavGroup): string {
	return group.children.map((child) => child.id).join(' ');
}
