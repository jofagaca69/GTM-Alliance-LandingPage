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
	},
};
