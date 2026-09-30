import type { Locale } from '../i18n/config';
import { useTranslations, localizePath } from '../i18n/utils';

export type NavChild = {
	id: string;
	label: string;
	href: string;
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

export function groupTargets(group: NavGroup): string {
	return group.children.map((child) => child.id).join(' ');
}
