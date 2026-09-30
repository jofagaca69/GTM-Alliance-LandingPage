/**
 * Configuración de Web3Forms.
 * El correo de destino lo define Web3Forms al crear el access_key
 * (no se envía en el POST). Ver https://web3forms.com/
 */
export const CONTACT_FORM_CONFIG = {
	accessKey: 'e630ba10-c30e-4bb4-85fc-5d64c7825f6a',
	fromName: 'GTM Alliance',
	contact: {
		subject: 'Nuevo mensaje de contacto — gtm-alliance.com',
	},
	pqrsd: {
		subject: 'Nueva solicitud PQRSD — gtm-alliance.com',
		radicadoPrefix: 'PQRSD',
	},
};

/** Consecutivo de radicado para PQRSD (generado en el cliente al enviar). */
export function generateNumeroRadicado(date = new Date()): string {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, '0');
	const d = String(date.getDate()).padStart(2, '0');
	const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();

	return `${CONTACT_FORM_CONFIG.pqrsd.radicadoPrefix}-${y}${m}${d}-${suffix}`;
}
