import type { Route } from './globe-routes';
import { arcPoint, project, type Camera } from './globe-project';

/**
 * Capa DOM que dibuja aviones y barcos recorriendo los `arcs` del globo.
 * cobe no soporta iconos (sus `arcs` son solo geometría WebGL), así que esta
 * capa reproyecta la misma curva con `globe-project.ts` y posiciona `<span>`
 * absolutos encima del canvas, sincronizados frame a frame con `globe.ts`.
 */

// Avión de papel apuntando a la derecha: una sola forma sólida y gruesa para
// que sobreviva el blur/drop-shadow a ~20px sin perder la silueta.
const PLANE_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12 2 4l7 8-7 8 20-8z"/></svg>';

// Buque de carga apuntando a la derecha: silueta baja y ancha (a diferencia
// del avión, alto y en punta) para que la diferencia sobreviva el blur.
// Casco + un único bloque de puente (contenedores finos se pierden por completo).
const SHIP_SVG =
	'<svg viewBox="0 0 24 24" fill="currentColor">' +
	'<path d="M1 15.5h18l-2.6 4.8a2 2 0 01-1.8 1.1H5.4a2 2 0 01-1.8-1.1L1 15.5z"/>' +
	'<rect x="8" y="9" width="6" height="6.5" rx="1"/>' +
	'</svg>';

const EDGE_FADE = 0.08;
const TRIP_PERIOD = 2; // ida (t: 0→1) + vuelta (t: 1→0)
const HEADING_EPS = 0.008;

function clamp(v: number, min: number, max: number): number {
	return v < min ? min : v > max ? max : v;
}

/** Fracción de opacidad para desvanecer suavemente al llegar/salir de cada extremo de la ruta. */
function edgeFade(t: number): number {
	if (t < EDGE_FADE) return t / EDGE_FADE;
	if (t > 1 - EDGE_FADE) return (1 - t) / EDGE_FADE;
	return 1;
}

/** Posición cíclica de ida y vuelta sobre el arco (t: 0↔1) y el sentido actual. */
function cycle(speed: number, phase: number, clock: number): { t: number; dir: 1 | -1 } {
	let raw = (clock * speed + phase * TRIP_PERIOD) % TRIP_PERIOD;
	if (raw < 0) raw += TRIP_PERIOD;
	return raw <= 1 ? { t: raw, dir: 1 } : { t: TRIP_PERIOD - raw, dir: -1 };
}

type Vehicle = {
	route: Route;
	phase: number;
	el: HTMLSpanElement;
};

export type VehicleLayerOptions = {
	reduceMotion: boolean;
	compact: boolean;
	arcHeight: number;
	markerElevation: number;
};

export type VehicleLayer = {
	update: (cam: Camera, timeSec: number) => void;
	destroy: () => void;
};

export function createVehicleLayer(
	container: HTMLElement,
	routes: Route[],
	opts: VehicleLayerOptions,
): VehicleLayer {
	const size = opts.compact ? 24 : 34;
	const half = size / 2;

	const vehicles: Vehicle[] = [];
	const frag = document.createDocumentFragment();

	for (const route of routes) {
		const [r, g, b] = route.color ?? [1, 1, 1];
		const color = `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
		for (let i = 0; i < route.count; i++) {
			const el = document.createElement('span');
			el.style.cssText =
				`position:absolute;left:0;top:0;width:${size}px;height:${size}px;` +
				`margin-left:-${half}px;margin-top:-${half}px;color:${color};` +
				'will-change:transform,opacity;filter:drop-shadow(0 0 1px rgba(250,248,243,.95));';
			el.innerHTML = route.mode === 'air' ? PLANE_SVG : SHIP_SVG;
			frag.appendChild(el);
			// Fase escalonada: reparte los vehículos de una misma ruta a lo largo del ciclo.
			vehicles.push({ route, phase: (i + 0.5) / route.count, el });
		}
	}
	container.appendChild(frag);

	function update(cam: Camera, timeSec: number) {
		const clock = opts.reduceMotion ? 0 : timeSec;
		const sizeScale = clamp(0.75 + 0.25 * cam.scale, 0.75, 1.15);

		for (const v of vehicles) {
			const { route, phase, el } = v;
			const { t, dir } = cycle(route.speed, phase, clock);

			const p = arcPoint(route.from, route.to, t, opts.arcHeight, opts.markerElevation);
			const proj = project(p, cam);

			const tHead = clamp(t + dir * HEADING_EPS, 0, 1);
			const pHead = arcPoint(route.from, route.to, tHead, opts.arcHeight, opts.markerElevation);
			const projHead = project(pHead, cam);
			const angle = Math.atan2(projHead.y - proj.y, projHead.x - proj.x);

			const opacity = proj.visible ? edgeFade(t) : 0;

			el.style.transform = `translate3d(${proj.x}px, ${proj.y}px, 0) rotate(${angle}rad) scale(${sizeScale})`;
			el.style.opacity = opacity.toFixed(3);
		}
	}

	function destroy() {
		container.replaceChildren();
		vehicles.length = 0;
	}

	return { update, destroy };
}
