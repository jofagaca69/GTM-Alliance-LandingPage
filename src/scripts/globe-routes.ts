import type { Arc, Marker } from 'cobe';

const DEG = Math.PI / 180;

export function focusAngles(lat: number, lon: number) {
	return {
		phi: Math.PI - (lon * DEG - Math.PI / 2),
		theta: lat * DEG,
	};
}

export function unwrapChain(phis: number[]): number[] {
	const TWO_PI = Math.PI * 2;
	const out = [phis[0]];
	for (let i = 1; i < phis.length; i++) {
		let d = (phis[i] - out[i - 1]) % TWO_PI;
		if (d > Math.PI) d -= TWO_PI;
		if (d < -Math.PI) d += TWO_PI;
		out.push(out[i - 1] + d);
	}
	return out;
}

export function toCobeOffset(pxX: number, pxY: number, scale: number): [number, number] {
	return [(2 * pxX) / scale, (2 * pxY) / scale];
}

const PLACES = {
	shanghai: { lat: 31.2304, lon: 121.4737 },
	miami: { lat: 25.7617, lon: -80.1918 },
	bogota: { lat: 4.711, lon: -74.0721 },
	cartagena: { lat: 10.391, lon: -75.4794 },
	rotterdam: { lat: 51.9244, lon: 4.4777 },
	medellin: { lat: 6.2442, lon: -75.5812 },
	panama: { lat: 8.9824, lon: -79.5199 },
} as const;

const GOLD: [number, number, number] = [0.831, 0.647, 0.216];
const SKY: [number, number, number] = [0.44, 0.72, 0.95];

export const MARKERS: Marker[] = [
	{ location: [PLACES.panama.lat, PLACES.panama.lon], size: 0.1, color: GOLD },
	{ location: [PLACES.medellin.lat, PLACES.medellin.lon], size: 0.07, color: GOLD },
	{ location: [PLACES.cartagena.lat, PLACES.cartagena.lon], size: 0.06, color: GOLD },
	{ location: [PLACES.shanghai.lat, PLACES.shanghai.lon], size: 0.08, color: SKY },
	{ location: [PLACES.miami.lat, PLACES.miami.lon], size: 0.08, color: SKY },
	{ location: [PLACES.rotterdam.lat, PLACES.rotterdam.lon], size: 0.08, color: SKY },
];

export type RouteMode = 'air' | 'sea';

export type Route = Arc & {
	id: string;
	mode: RouteMode;
	speed: number;
	count: number;
};

export const ROUTES: Route[] = [
	{
		id: 'cn-co',
		from: [PLACES.shanghai.lat, PLACES.shanghai.lon],
		to: [PLACES.bogota.lat, PLACES.bogota.lon],
		color: SKY,
		mode: 'sea',
		speed: 0.045,
		count: 2,
	},
	{
		id: 'us-co',
		from: [PLACES.miami.lat, PLACES.miami.lon],
		to: [PLACES.bogota.lat, PLACES.bogota.lon],
		color: SKY,
		mode: 'air',
		speed: 0.1,
		count: 1,
	},
	{
		id: 'co-eu',
		from: [PLACES.cartagena.lat, PLACES.cartagena.lon],
		to: [PLACES.rotterdam.lat, PLACES.rotterdam.lon],
		color: GOLD,
		mode: 'sea',
		speed: 0.045,
		count: 2,
	},
	{
		id: 'co-med',
		from: [PLACES.bogota.lat, PLACES.bogota.lon],
		to: [PLACES.medellin.lat, PLACES.medellin.lon],
		color: GOLD,
		mode: 'air',
		speed: 0.1,
		count: 1,
	},
];

export const ARCS: Arc[] = ROUTES.map(({ from, to, color }) => ({ from, to, color }));

type GlobeKeyframe = {
	trigger: string | null;
	focus: { lat: number; lon: number };
	offsetX: number;
	offsetY: number;
	scale: number;
	driftAmp: number;
	opacity: number;
};

export const KEYFRAMES: GlobeKeyframe[] = [
	{
		trigger: null,
		focus: PLACES.bogota,
		offsetX: 0.24,
		offsetY: 0,
		scale: 1.0,
		driftAmp: 0.12,
		opacity: 0.95,
	},
	{
		trigger: '#clientes',
		focus: PLACES.shanghai,
		offsetX: -0.22,
		offsetY: 0.03,
		scale: 1.1,
		driftAmp: 0.03,
		opacity: 0.85,
	},
	{
		trigger: '#quienes-somos',
		focus: PLACES.miami,
		offsetX: 0.24,
		offsetY: 0,
		scale: 1.15,
		driftAmp: 0,
		opacity: 0.8,
	},
	{
		trigger: '#servicios',
		focus: PLACES.panama,
		offsetX: -0.24,
		offsetY: 0,
		scale: 1.22,
		driftAmp: 0,
		opacity: 0.78,
	},
	{
		trigger: '#congelados',
		focus: PLACES.rotterdam,
		offsetX: 0.24,
		offsetY: -0.03,
		scale: 1.3,
		driftAmp: 0,
		opacity: 0.72,
	},
	{
		trigger: '#carga-seca',
		focus: PLACES.medellin,
		offsetX: -0.24,
		offsetY: 0,
		scale: 1.4,
		driftAmp: 0,
		opacity: 0.72,
	},
	{
		trigger: '#por-que-elegirnos',
		focus: PLACES.miami,
		offsetX: 0.22,
		offsetY: 0,
		scale: 1.25,
		driftAmp: 0.04,
		opacity: 0.7,
	},
	{
		trigger: '#contacto',
		focus: PLACES.bogota,
		offsetX: 0.2,
		offsetY: 0,
		scale: 1.15,
		driftAmp: 0.06,
		opacity: 0.82,
	},
	{
		trigger: 'footer',
		focus: PLACES.bogota,
		offsetX: 0,
		offsetY: 0,
		scale: 0.92,
		driftAmp: 0.16,
		opacity: 0.9,
	},
];
