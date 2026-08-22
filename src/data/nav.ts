/**
 * Fuente única de la navegación del sitio. La consumen el header de
 * escritorio, el panel móvil y la columna «Navegación» del footer.
 *
 * `id` es el id de la sección en el DOM del home (sin `#`) y es también la
 * clave que usa el scrollspy (`data-nav-link` / `data-nav-group`, ver
 * `src/scripts/scrollspy.ts`). Los `href` van siempre con `/` delante para
 * que los enlaces funcionen desde rutas que no son el home (p. ej. `/pqrsd`).
 */

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

export const NAV_ITEMS: NavItem[] = [
	{ kind: 'link', id: 'inicio', label: 'Inicio', href: '/#inicio' },
	// { kind: 'link', id: 'quienes-somos', label: 'Quiénes Somos', href: '/#quienes-somos' },
	{
		kind: 'group',
		id: 'nuestros-servicios',
		label: 'Nuestros Productos',
		children: [
			{
				id: 'servicios',
				label: 'Servicios',
				href: '/#servicios',
				tag: 'Comercio Exterior',
				description: 'Transporte, agenciamiento aduanero, almacenaje, seguros y asesoría integral.',
			},
			{
				id: 'congelados',
				label: 'Congelados',
				href: '/#congelados',
				tag: 'Línea de Frío',
				description: 'Congelados con tu propia marca, en alianza con Coldfood.',
			},
			{
				id: 'carga-seca',
				label: 'Carga Seca',
				href: '/#carga-seca',
				tag: 'Línea Seca',
				description: 'Exportación multi-industria. Próximamente Medellín.',
			},
		],
	},
	{ kind: 'link', id: 'por-que-elegirnos', label: 'Por qué elegirnos', href: '/#por-que-elegirnos' },
	{ kind: 'link', id: 'contacto', label: 'Contacto', href: '/#contacto' },
];

/** Ids que el grupo debe iluminar, listos para `data-nav-group`. */
export function groupTargets(group: NavGroup): string {
	return group.children.map((child) => child.id).join(' ');
}
