export const DPR_CAP = 2;

/** devicePixelRatio del navegador, acotado para no reventar el presupuesto de píxeles en pantallas HiDPI. */
export function getDpr(): number {
	return Math.min(window.devicePixelRatio || 1, DPR_CAP);
}

export function debounce<T extends (...args: never[]) => void>(fn: T, wait: number) {
	let timer = 0;
	return (...args: Parameters<T>) => {
		window.clearTimeout(timer);
		timer = window.setTimeout(() => fn(...args), wait);
	};
}
