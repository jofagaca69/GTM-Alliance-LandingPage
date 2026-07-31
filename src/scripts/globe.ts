import createGlobe from 'cobe';
import type { COBEOptions, Globe as CobeGlobe } from 'cobe';
import { gsap, ScrollTrigger } from './gsap';
import { ARCS, KEYFRAMES, MARKERS, focusAngles, toCobeOffset, unwrapChain } from './globe-routes';
import { debounce, getDpr } from './utils';

type GlobeState = {
	phi: number;
	theta: number;
	scale: number;
	offsetX: number;
	offsetY: number;
	opacity: number;
	/** Rotación idle actual (rad), derivada de driftPhase/driftAmp. Nunca se tweenea directamente. */
	drift: number;
	/** Fase (rad) del vaivén idle. Se integra en el rAF, nunca se tweenea. */
	driftPhase: number;
	/** Amplitud (rad) del vaivén idle — sí se tweenea por ScrollTrigger. */
	driftAmp: number;
};

/** Velocidad angular (rad/s) de la fase del vaivén idle. Periodo ≈ 25 s. */
const DRIFT_OMEGA = 0.25;

type GlobeFrame = Omit<GlobeState, 'drift' | 'driftPhase'>;

function hasWebGL(): boolean {
	try {
		const probe = document.createElement('canvas');
		return !!(probe.getContext('webgl2') || probe.getContext('webgl'));
	} catch {
		return false;
	}
}

/** Arranca el globo de fondo. Devuelve un disposer para limpiar todo. */
export function initGlobe(): () => void {
	const layer = document.getElementById('globe-layer');
	const canvasEl = document.getElementById('globe-canvas') as HTMLCanvasElement | null;
	if (!layer || !canvasEl) return () => {};
	const canvas = canvasEl;

	if (!hasWebGL()) {
		layer.classList.add('globe-fallback');
		canvas.remove();
		return () => {};
	}

	const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
	const smallQuery = window.matchMedia('(max-width: 767px)');
	const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4;

	if ((navigator.hardwareConcurrency ?? 8) <= 2) {
		layer.classList.add('globe-fallback');
		canvas.remove();
		return () => {};
	}

	let cssW = layer.clientWidth;
	let cssH = layer.clientHeight;
	let dpr = getDpr();

	// mapSamples se hornea en createGlobe y no se puede cambiar con update().
	const mapSamples = smallQuery.matches || lowPower ? 8000 : 16000;

	// Resolver los keyframes a ángulos una sola vez, con camino corto.
	const angles = KEYFRAMES.map((k) => focusAngles(k.focus.lat, k.focus.lon));
	const phis = unwrapChain(angles.map((a) => a.phi));

	/** Resuelve los keyframes a valores absolutos con el damping móvil ya
	 * aplicado, para que cada tramo tenga un `from`/`to` explícito (nunca
	 * dependiente del estado vivo) y el keyframe inicial use el mismo damping
	 * que el resto. */
	function resolveKeyframes(desktop: boolean): GlobeFrame[] {
		const amp = desktop ? 1 : 0.35;
		return KEYFRAMES.map((kf, i) => ({
			phi: phis[i],
			theta: angles[i].theta,
			scale: desktop ? kf.scale : 1 + (kf.scale - 1) * 0.4,
			offsetX: kf.offsetX * amp,
			offsetY: kf.offsetY * amp,
			opacity: desktop ? kf.opacity : kf.opacity * 0.7,
			driftAmp: kf.driftAmp,
		}));
	}

	const initialFrames = resolveKeyframes(!smallQuery.matches);
	const state: GlobeState = {
		...initialFrames[0],
		drift: 0,
		driftPhase: 0,
		driftAmp: reduceMotionQuery.matches ? 0 : initialFrames[0].driftAmp,
	};

	const options: COBEOptions = {
		width: cssW,
		height: cssH,
		devicePixelRatio: dpr,
		phi: state.phi,
		theta: state.theta,
		dark: 1,
		diffuse: 1.15,
		mapSamples,
		mapBrightness: 4.2,
		mapBaseBrightness: 0.03,
		baseColor: [0.13, 0.2, 0.31],
		markerColor: [0.831, 0.647, 0.216],
		glowColor: [0.16, 0.26, 0.4],
		markers: MARKERS,
		arcs: ARCS,
		arcColor: [0.831, 0.647, 0.216],
		arcWidth: 0.35,
		arcHeight: 0.28,
		markerElevation: 0.01,
		scale: state.scale,
		offset: [0, 0],
		opacity: state.opacity,
		context: { alpha: true, antialias: false, powerPreference: 'low-power' },
	};

	const globe: CobeGlobe = createGlobe(canvas, options);

	let firstFrameDone = false;
	function render() {
		globe.update({
			phi: state.phi + state.drift,
			theta: state.theta,
			scale: state.scale,
			offset: toCobeOffset(state.offsetX * cssW, state.offsetY * cssH, state.scale),
			opacity: state.opacity,
		});
		if (!firstFrameDone) {
			firstFrameDone = true;
			canvas.classList.replace('opacity-0', 'opacity-100');
		}
	}

	// cobe v2 no trae loop de animación propio: lo manejamos aquí.
	let raf = 0;
	let last = performance.now();
	function frame(now: number) {
		raf = requestAnimationFrame(frame);
		const dt = Math.min((now - last) / 1000, 0.05);
		last = now;
		state.driftPhase += DRIFT_OMEGA * dt;
		state.drift = state.driftAmp * Math.sin(state.driftPhase);
		render();
	}

	function start() {
		if (raf) return;
		last = performance.now();
		raf = requestAnimationFrame(frame);
	}
	function stop() {
		if (!raf) return;
		cancelAnimationFrame(raf);
		raf = 0;
	}

	const onResize = () => {
		cssW = layer.clientWidth;
		cssH = layer.clientHeight;
		dpr = getDpr();
		globe.update({ width: cssW, height: cssH, devicePixelRatio: dpr });
		if (!raf) render();
	};
	const debouncedResize = debounce(onResize, 200);
	window.addEventListener('resize', debouncedResize, { passive: true });
	window.addEventListener('orientationchange', debouncedResize, { passive: true });

	const onVisibility = () => (document.hidden ? stop() : start());
	document.addEventListener('visibilitychange', onVisibility);

	const onLoad = () => ScrollTrigger.refresh();
	window.addEventListener('load', onLoad, { once: true });

	const mm = gsap.matchMedia();

	mm.add(
		{
			motion: '(prefers-reduced-motion: no-preference)',
			desktop: '(min-width: 768px)',
		},
		(ctx) => {
			const conditions = ctx.conditions as { motion: boolean; desktop: boolean };
			if (!conditions.motion) return;

			start();
			const frames = resolveKeyframes(conditions.desktop);
			Object.assign(state, frames[0]);
			const tweens = KEYFRAMES.slice(1)
				.map((kf, i) => {
					if (!kf.trigger) return null;
					const el = document.querySelector(kf.trigger);
					if (!el) return null;
					return gsap.fromTo(
						state,
						{ ...frames[i] },
						{
							...frames[i + 1],
							ease: 'none',
							immediateRender: false,
							scrollTrigger: {
								trigger: el,
								start: 'top 75%',
								end: 'top 45%',
								scrub: 0.8,
								invalidateOnRefresh: true,
							},
						},
					);
				})
				.filter((t): t is gsap.core.Tween => t !== null);

			return () => {
				tweens.forEach((t) => {
					t.scrollTrigger?.kill();
					t.kill();
				});
			};
		},
	);

	mm.add('(prefers-reduced-motion: reduce)', () => {
		state.driftAmp = 0;
		state.drift = 0;
		requestAnimationFrame(render);
	});

	return () => {
		mm.revert();
		stop();
		window.removeEventListener('resize', debouncedResize);
		window.removeEventListener('orientationchange', debouncedResize);
		window.removeEventListener('load', onLoad);
		document.removeEventListener('visibilitychange', onVisibility);
		globe.destroy();
	};
}
