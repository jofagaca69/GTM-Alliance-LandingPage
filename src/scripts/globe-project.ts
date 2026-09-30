const DEG = Math.PI / 180;

export const GLOBE_RADIUS = 0.8;

export type Vec3 = [number, number, number];

export function latLonToVec3([lat, lon]: [number, number]): Vec3 {
	const r = lat * DEG;
	const a = lon * DEG - Math.PI;
	const cosR = Math.cos(r);
	return [-cosR * Math.cos(a), Math.sin(r), cosR * Math.sin(a)];
}

export type Camera = {
	phi: number;
	theta: number;
	scale: number;
	offsetX: number;
	offsetY: number;
	cssW: number;
	cssH: number;
};

export type Projected = {
	x: number;
	y: number;
	z: number;
	edgeDistSq: number;
	visible: boolean;
};

export function project(v: Vec3, cam: Camera): Projected {
	const { phi, theta, scale, offsetX, offsetY, cssW, cssH } = cam;
	const cosPhi = Math.cos(phi);
	const sinPhi = Math.sin(phi);
	const cosTheta = Math.cos(theta);
	const sinTheta = Math.sin(theta);

	const c = cosPhi * v[0] + sinPhi * v[2];
	const s = sinPhi * sinTheta * v[0] + cosTheta * v[1] - cosPhi * sinTheta * v[2];
	const z = -sinPhi * cosTheta * v[0] + sinTheta * v[1] + cosPhi * cosTheta * v[2];

	const aspect = cssW / cssH;
	const x = (((c / aspect) * scale + (offsetX * scale) / cssW + 1) / 2) * cssW;
	const y = ((-s * scale + (offsetY * scale) / cssH + 1) / 2) * cssH;

	const edgeDistSq = c * c + s * s;
	const visible = z >= 0 || edgeDistSq >= 0.64;

	return { x, y, z, edgeDistSq, visible };
}

export function arcPoint(
	from: [number, number],
	to: [number, number],
	t: number,
	arcHeight: number,
	markerElevation: number,
): Vec3 {
	const elevated = GLOBE_RADIUS + markerElevation;
	const a = latLonToVec3(from);
	const b = latLonToVec3(to);
	const p0: Vec3 = [a[0] * elevated, a[1] * elevated, a[2] * elevated];
	const p2: Vec3 = [b[0] * elevated, b[1] * elevated, b[2] * elevated];

	const sum: Vec3 = [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
	const len = Math.hypot(sum[0], sum[1], sum[2]);
	const mid: Vec3 = len > 1e-3 ? [sum[0] / len, sum[1] / len, sum[2] / len] : [0, 1, 0];
	const controlR = GLOBE_RADIUS + arcHeight + markerElevation;
	const p1: Vec3 = [mid[0] * controlR, mid[1] * controlR, mid[2] * controlR];

	const u = 1 - t;
	const uu = u * u;
	const tt = t * t;
	const ut2 = 2 * u * t;
	return [
		uu * p0[0] + ut2 * p1[0] + tt * p2[0],
		uu * p0[1] + ut2 * p1[1] + tt * p2[1],
		uu * p0[2] + ut2 * p1[2] + tt * p2[2],
	];
}
