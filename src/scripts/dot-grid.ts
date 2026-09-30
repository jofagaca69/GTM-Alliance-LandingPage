import { debounce, getDpr } from './utils';

const CELL_DESKTOP = 32;
const CELL_MOBILE = 40;
const BASE_RADIUS = 1.1;
const MAX_RADIUS = 2.4;
const BASE_ALPHA = 0.12;
const MAX_ALPHA = 0.75;
const INFLUENCE_RADIUS = 170;
const BASE_COLOR = '28, 47, 74';
const ACCENT_COLOR = '138, 106, 18';
/** Umbral (px) bajo el cual el puntero suavizado se considera "asentado" y se detiene el rAF. */
const SETTLE_EPSILON = 0.1;

/** Arranca el dot grid interactivo de fondo. Devuelve un disposer para limpiar todo. */
export function initDotGrid(): () => void {
	const canvasEl = document.getElementById('dot-grid-canvas') as HTMLCanvasElement | null;
	if (!canvasEl) return () => {};
	const canvas = canvasEl;
	const canvasCtx = canvas.getContext('2d');
	if (!canvasCtx) return () => {};
	const ctx = canvasCtx;

	// Buffer fuera de pantalla: la retícula tenue completa, pintada una sola vez por resize.
	// Por frame solo se repinta (drawImage) más el puñado de puntos bajo el spotlight.
	const baseCanvas = document.createElement('canvas');
	const baseCanvasCtx = baseCanvas.getContext('2d');
	if (!baseCanvasCtx) return () => {};
	const baseCtx = baseCanvasCtx;

	const fineQuery = window.matchMedia('(pointer: fine)');
	const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
	const smallQuery = window.matchMedia('(max-width: 767px)');

	let cssW = window.innerWidth;
	let cssH = window.innerHeight;
	let dpr = getDpr();
	let cell = smallQuery.matches ? CELL_MOBILE : CELL_DESKTOP;

	const pointer = {
		x: 0,
		y: 0,
		targetX: 0,
		targetY: 0,
		active: false,
	};

	function sizeCanvas(target: HTMLCanvasElement, targetCtx: CanvasRenderingContext2D) {
		target.width = Math.round(cssW * dpr);
		target.height = Math.round(cssH * dpr);
		target.style.width = `${cssW}px`;
		target.style.height = `${cssH}px`;
		targetCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
	}

	function paintBase() {
		baseCtx.clearRect(0, 0, cssW, cssH);
		baseCtx.fillStyle = `rgba(${BASE_COLOR}, ${BASE_ALPHA})`;
		const cols = Math.ceil(cssW / cell) + 1;
		const rows = Math.ceil(cssH / cell) + 1;
		for (let row = 0; row < rows; row++) {
			const y = row * cell;
			for (let col = 0; col < cols; col++) {
				const x = col * cell;
				baseCtx.beginPath();
				baseCtx.arc(x, y, BASE_RADIUS, 0, Math.PI * 2);
				baseCtx.fill();
			}
		}
	}

	function draw() {
		ctx.clearRect(0, 0, cssW, cssH);
		ctx.drawImage(baseCanvas, 0, 0, cssW, cssH);

		if (!pointer.active) return;

		// Solo se recorren las celdas dentro del radio de influencia, no la retícula entera.
		const colStart = Math.max(0, Math.floor((pointer.x - INFLUENCE_RADIUS) / cell));
		const colEnd = Math.ceil((pointer.x + INFLUENCE_RADIUS) / cell);
		const rowStart = Math.max(0, Math.floor((pointer.y - INFLUENCE_RADIUS) / cell));
		const rowEnd = Math.ceil((pointer.y + INFLUENCE_RADIUS) / cell);

		for (let row = rowStart; row <= rowEnd; row++) {
			const y = row * cell;
			for (let col = colStart; col <= colEnd; col++) {
				const x = col * cell;
				const dx = x - pointer.x;
				const dy = y - pointer.y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist >= INFLUENCE_RADIUS) continue;

				const t = 1 - dist / INFLUENCE_RADIUS;
				const radius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * t;
				const alpha = BASE_ALPHA + (MAX_ALPHA - BASE_ALPHA) * t;

				ctx.beginPath();
				ctx.arc(x, y, radius, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${ACCENT_COLOR}, ${alpha})`;
				ctx.fill();
			}
		}
	}

	function resize() {
		cssW = window.innerWidth;
		cssH = window.innerHeight;
		dpr = getDpr();
		cell = smallQuery.matches ? CELL_MOBILE : CELL_DESKTOP;
		sizeCanvas(canvas, ctx);
		sizeCanvas(baseCanvas, baseCtx);
		paintBase();
		draw();
	}

	let raf = 0;
	function frame() {
		const ease = reduceMotionQuery.matches ? 1 : 0.15;
		pointer.x += (pointer.targetX - pointer.x) * ease;
		pointer.y += (pointer.targetY - pointer.y) * ease;
		draw();

		const settled =
			Math.abs(pointer.targetX - pointer.x) < SETTLE_EPSILON &&
			Math.abs(pointer.targetY - pointer.y) < SETTLE_EPSILON;

		if (settled) {
			raf = 0;
			return;
		}
		raf = requestAnimationFrame(frame);
	}

	// Solo hay algo que animar en dispositivos con puntero fino (mouse/trackpad);
	// en táctil la retícula queda estática y no se monta ni el loop ni sus listeners.
	function wake() {
		if (raf || !fineQuery.matches) return;
		raf = requestAnimationFrame(frame);
	}
	function stop() {
		if (!raf) return;
		cancelAnimationFrame(raf);
		raf = 0;
	}

	const onPointerMove = (e: PointerEvent) => {
		pointer.targetX = e.clientX;
		pointer.targetY = e.clientY;
		pointer.active = true;
		wake();
	};
	const onPointerLeave = () => {
		pointer.active = false;
		wake();
	};

	const debouncedResize = debounce(resize, 200);

	if (fineQuery.matches) {
		window.addEventListener('pointermove', onPointerMove, { passive: true });
		window.addEventListener('pointerleave', onPointerLeave, { passive: true });
		window.addEventListener('blur', onPointerLeave);
	}
	window.addEventListener('resize', debouncedResize, { passive: true });
	window.addEventListener('orientationchange', debouncedResize, { passive: true });

	const onVisibility = () => (document.hidden ? stop() : wake());
	document.addEventListener('visibilitychange', onVisibility);

	resize();

	return () => {
		stop();
		window.removeEventListener('pointermove', onPointerMove);
		window.removeEventListener('pointerleave', onPointerLeave);
		window.removeEventListener('blur', onPointerLeave);
		window.removeEventListener('resize', debouncedResize);
		window.removeEventListener('orientationchange', debouncedResize);
		document.removeEventListener('visibilitychange', onVisibility);
	};
}
