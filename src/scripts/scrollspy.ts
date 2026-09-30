import { ScrollTrigger } from './gsap';

/**
 * Scrollspy de la navegación: marca con `[data-active]` el enlace de la
 * sección que el usuario está viendo, simultáneamente en el header
 * (escritorio + panel móvil) y en el footer.
 *
 * Decisiones:
 * - NO va dentro de `gsap.matchMedia()`. El resaltado es *estado*, no
 *   decoración: debe funcionar igual con `prefers-reduced-motion: reduce`.
 * - La línea de activación coincide con el `scroll-padding-top` de `html`
 *   (`6rem` en `global.css`), que es donde el navegador deja el inicio de la
 *   sección tras saltar a un ancla. Se lee del CSS computado para no
 *   duplicar la constante.
 * - Las secciones sin entrada en el nav (`#clientes`) no se registran: gana
 *   siempre la última sección con entrada cuyo borde superior ya cruzó la
 *   línea, así que al pasar por `#clientes` sigue activo `Inicio`.
 * - ScrollTrigger solo actúa de planificador: `onToggle` recalcula el
 *   ganador desde los rects, de modo que carga inicial, scroll hacia abajo,
 *   hacia arriba y `refresh()` comparten un único camino de código.
 */

type SpySection = { id: string; el: HTMLElement };

const SELECTOR = '[data-nav-link], [data-nav-group]';

/** Ids que representa un elemento espiable (uno, o varios en un grupo). */
function targetsOf(el: HTMLElement): string[] {
	return (el.dataset.navLink ?? el.dataset.navGroup ?? '').split(' ').filter(Boolean);
}

function activationLine(): number {
	const raw = getComputedStyle(document.documentElement).scrollPaddingTop;
	const parsed = Number.parseFloat(raw);
	return Number.isFinite(parsed) ? parsed : 0;
}

/** Secciones referenciadas por el nav que existen en esta ruta, en orden de documento. */
function collectSections(links: HTMLElement[]): SpySection[] {
	const ids = new Set<string>();
	links.forEach((el) => targetsOf(el).forEach((id) => ids.add(id)));

	return [...ids]
		.map((id) => ({ id, el: document.getElementById(id) }))
		.filter((entry): entry is SpySection => entry.el !== null)
		.sort((a, b) =>
			a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
		);
}

export function initScrollSpy(): () => void {
	const links = [...document.querySelectorAll<HTMLElement>(SELECTOR)];
	const sections = collectSections(links);

	// Rutas sin secciones espiables (o sin nav): no-op limpio.
	if (sections.length === 0) return () => {};

	let current = '';

	function paint(id: string) {
		if (id === current) return;
		current = id;

		links.forEach((el) => {
			const active = targetsOf(el).includes(id);
			el.toggleAttribute('data-active', active);

			// `aria-current="page"` solo en enlaces reales: el botón del
			// desplegable no es un enlace y no debe anunciarse como página actual.
			if (el.dataset.navLink === undefined) return;
			if (active) el.setAttribute('aria-current', 'page');
			else el.removeAttribute('aria-current');
		});
	}

	function update() {
		const line = activationLine() + 1;
		let winner = sections[0].id;
		for (const section of sections) {
			if (section.el.getBoundingClientRect().top <= line) winner = section.id;
		}
		paint(winner);
	}

	const triggers = sections.map((section) =>
		ScrollTrigger.create({
			trigger: section.el,
			start: () => `top top+=${activationLine()}`,
			end: () => `bottom top+=${activationLine()}`,
			onToggle: update,
		}),
	);

	ScrollTrigger.addEventListener('refresh', update);
	update();

	return () => {
		ScrollTrigger.removeEventListener('refresh', update);
		triggers.forEach((trigger) => trigger.kill());
	};
}
