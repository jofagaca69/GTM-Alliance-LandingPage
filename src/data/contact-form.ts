/**
 * Configuración de Web3Forms.
 * El correo de destino lo define Web3Forms al crear el access_key
 * (no se envía en el POST). Ver https://web3forms.com/
 */
export const CONTACT_FORM_CONFIG = {
	accessKey: 'f428109f-17d9-4806-bf12-29eee74f244a',
	fromName: 'GTM Alliance',
	contact: {
		subject: 'Nuevo mensaje de contacto — gtm-alliance.com',
	},
	pqrsd: {
		subject: 'Nueva solicitud PQRSD — gtm-alliance.com',
	},
};
