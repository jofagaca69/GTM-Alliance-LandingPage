import { ScrollTrigger } from './gsap';

type SpySection = { id: string; el: HTMLElement };

const SELECTOR = '[data-nav-link], [data-nav-group]';

function targetsOf(el: HTMLElement): string[] {
	return (el.dataset.navLink ?? el.dataset.navGroup ?? '').split(' ').filter(Boolean);
}

function activationLine(): number {
	const raw = getComputedStyle(document.documentElement).scrollPaddingTop;
	const parsed = Number.parseFloat(raw);
	return Number.isFinite(parsed) ? parsed : 0;
}

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

	if (sections.length === 0) return () => {};

	let current = '';

	function paint(id: string) {
		if (id === current) return;
		current = id;

		links.forEach((el) => {
			const active = targetsOf(el).includes(id);
			el.toggleAttribute('data-active', active);

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
