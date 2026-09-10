/**
 * Diccionario en español — fuente de la forma para el resto de idiomas.
 * `en.ts` se tipa contra `Dictionary` (`typeof es`), así que a cualquier clave
 * que falte o sobre en inglés `pnpm astro check` la reporta como error de tipos.
 *
 * Agrupado por componente, en el mismo orden en que aparecen en `index.astro`.
 */

const es = {
	common: {
		languageSwitcherLabel: 'Cambiar idioma',
		openMenu: 'Abrir menú',
		closeMenu: 'Cerrar menú',
	},

	nav: {
		inicio: 'Inicio',
		nuestrosProductos: 'Nuestros Productos',
		congelados: {
			label: 'Congelados',
			tag: 'Línea de Frío',
			description: 'Congelados con tu propia marca, en alianza con Coldfood.',
		},
		cargaSeca: {
			label: 'Carga Seca',
			tag: 'Línea Seca',
			description: 'Exportación multi-industria. Próximamente Medellín.',
		},
		servicios: {
			label: 'Servicios',
			tag: 'Comercio Exterior',
			description: 'Transporte, agenciamiento aduanero, almacenaje, seguros y asesoría integral.',
		},
		porQueElegirnos: 'Por qué elegirnos',
		contacto: 'Contacto',
		ariaDesktop: 'Principal',
		ariaMobile: 'Principal (móvil)',
	},

	hero: {
		titleLead: 'Tu aliado estratégico en ',
		titleHighlight: 'exportaciones desde Colombia.',
		subtitle:
			'En GTM Alliance llevamos la producción colombiana al mundo. Trabajamos directamente con agricultores y fabricantes, procesamos junto a Coldfood la línea de congelados y consolidamos carga seca de diferentes marcas según la necesidad de cada cliente. Todo con calidad certificada, trazabilidad completa y soluciones logísticas que hacen tu exportación más eficiente y competitiva.',
		ctaPrimary: 'Solicitar Asesoría',
		ctaSecondary: 'Explorar Soluciones',
	},

	clients: {
		eyebrow: 'Nuestros aliados',
		title: 'Alianzas estratégicas',
		alts: {
			coldfood: 'Coldfood — aliado de GTM Alliance en procesamiento y exportación de alimentos congelados',
			cls: 'CLS Logistic Solutions SAS — aliado de GTM Alliance en soluciones logísticas',
			logicx: 'logicx, Agencia de Aduanas Nivel 2 — aliado de GTM Alliance en agenciamiento aduanero',
			artico: 'ARTICO — aliado de GTM Alliance en transporte de carga refrigerada',
			presservac: 'PRESSERVAC — aliado de GTM Alliance en transporte de carga refrigerada',
			weexp: 'WEEXPORT — aliado de GTM Alliance en exportación de productos colombianos',
			one: 'ONE — aliado de GTM Alliance en exportación de productos colombianos',
		},
	},

	frozen: {
		alianza: 'En alianza con Coldfood',
		titleLead: 'LINEA DE',
		titleHighlight: 'CONGELADOS',
		intro:
			'De la mano de Coldfood, desarrollamos soluciones en productos congelados para distribuidores, importadores y marcas privadas, llevando la calidad del campo colombiano a mercados internacionales.',
		cta: 'Solicitar cotización',
		heroFabricaAlt:
			'Planta Coldfood: empaques de mora, papa criolla, yuca y tajadas de plátano en la línea de producción de GTM Alliance',
		heroProductAlt:
			'Productos Coldfood precocidos: croquetas de yuca, mix de ajiaco y tostones, con el campo colombiano de fondo',
		pasos: [
			{ titulo: 'Productores colombianos', descripcion: 'Materias primas de calidad.' },
			{ titulo: 'Procesamiento especializado', descripcion: 'Calidad y congelación controlada.' },
			{ titulo: 'Marca privada o propia', descripcion: 'Empaques adaptados a tu mercado.' },
			{ titulo: 'Exportación internacional', descripcion: 'Logística para mercados internacionales.' },
		],
		portafolioEyebrow: 'Nuestro portafolio',
		portafolioTitle: 'Nuestras líneas de productos',
		portafolioVerMas: 'Ver más...',
		lineaLabel: (label: string) => `Línea ${label}`,
		lineas: [
			{
				label: 'Frescos',
				descriptor: 'Productos seleccionados y congelados para conservar su sabor, textura y calidad natural.',
				alt: 'Productos frescos de la línea GTM Alliance: yuca, plátano verde, lulo y mora empacados con marca propia',
				productos: ['Yuca', 'Plátano Verde', 'Lulo', 'Mora', 'Guayaba'],
			},
			{
				label: 'Prefritos',
				descriptor:
					'Productos con valor agregado, elaborados para ofrecer practicidad, textura y sabor en cada preparación.',
				alt: 'Productos precocidos de la línea GTM Alliance: croquetas y francesa de yuca, tajadas, plátanos maduros y tostones empacados con marca propia',
				productos: ['Yuca Croqueta', 'Yuca Francesa', 'Tajadas', 'Plátanos Maduros', 'Tostones'],
			},
			{
				label: 'Precocidos',
				descriptor:
					'Prácticos y listos para preparar, conservando el sabor y las características tradicionales de cada producto.',
				alt: 'Productos congelados de la línea GTM Alliance: papa criolla, yuca stick, arracacha y mixes de vegetales empacados con marca propia',
				productos: ['Papa Criolla', 'Yuca Stick', 'Arracacha', 'Mix de Sancocho', 'Mix de Ajiaco'],
			},
		],
	},

	dryCargo: {
		heroImgAlt: 'Línea de carga seca — consolidación y exportación GTM Alliance',
		heroMultimarcaAlt:
			'Consolidación multimarca GTM Alliance: productos colombianos listos para exportar sin fronteras',
		heroProductosAlt:
			'Productos colombianos consolidados por GTM Alliance: café, snacks y bebidas icónicas para exportación',
		titleLead: 'LINEA DE',
		titleHighlight: 'CARGA SECA',
		introLead: 'Consolidamos productos de múltiples',
		introTrail: 'fabricantes en un solo embarque internacional.',
		cta: 'Solicitar cotización',
		portafolioVerMas: 'Ver más...',
		stepperTitle: 'Así funciona GTM',
		prevAriaLabel: 'Paso anterior',
		nextAriaLabel: 'Paso siguiente',
		trackAriaLabel: 'Proceso de consolidación de carga seca',
		pasos: [
			{ titulo: 'Compra a fabricantes aliados', descripcion: 'Negociamos directamente con múltiples fabricantes colombianos.' },
			{ titulo: 'Recepción en nuestra bodega', descripcion: 'Recibimos y verificamos la mercancía en nuestras instalaciones especializadas.' },
			{ titulo: 'Etiquetado según país destino', descripcion: 'Adaptamos el etiquetado e información a las normativas de cada mercado.' },
			{ titulo: 'Embalaje especializado', descripcion: 'Usamos el empaque adecuado para proteger cada producto durante el transporte.' },
			{ titulo: 'Consolidación de carga', descripcion: 'Agrupamos diferentes productos de varios proveedores en un solo envío.' },
			{ titulo: 'Gestión documental y aduanera', descripcion: 'Nos encargamos de toda la documentación, permisos e inspecciones.' },
			{ titulo: 'Exportación internacional', descripcion: 'Coordinamos el transporte internacional hasta el puerto de destino.' },
		],
		marcasTitle: 'Marcas colombianas que consolidamos',
	},

	services: {
		eyebrow: 'Servicios',
		title: 'Soluciones Integrales en Comercio Exterior',
		intro:
			'Cobertura integral para cada etapa de tu operación de comercio exterior, desde el transporte hasta la asesoría normativa.',
		items: {
			transporteInternacional: {
				title: 'Transporte Internacional',
				description:
					'Movemos tu carga por vía marítima, aérea y terrestre, eligiendo la ruta más eficiente para cada operación de importación o exportación.',
				alt: 'Contenedores y buque de carga para transporte internacional marítimo, aéreo y terrestre',
			},
			agenciamientoAduanero: {
				title: 'Agenciamiento Aduanero',
				description:
					'Gestionamos trámites, documentación y cumplimiento normativo ante las autoridades aduaneras para que tu mercancía cruce fronteras sin contratiempos.',
				alt: 'Gestión documental de agenciamiento aduanero y cumplimiento normativo',
			},
			almacenajeDistribucion: {
				title: 'Almacenaje y Distribución',
				description:
					'Bodegaje especializado en frío y carga seca, con picking, empaque y despacho listos para la siguiente etapa de tu cadena logística.',
				alt: 'Bodega de almacenaje y distribución para carga refrigerada y carga seca',
			},
			consolidacionCarga: {
				title: 'Consolidación de Carga',
				description:
					'Agrupamos envíos de distintos orígenes en una sola operación, reduciendo costos y tiempos de tránsito sin perder trazabilidad.',
				alt: 'Consolidación y manejo especializado de carga para exportación',
			},
			seguroMercancias: {
				title: 'Seguro de Mercancías',
				description:
					'Cobertura frente a daños, pérdidas o retrasos durante el transporte, para que tu carga llegue protegida a su destino.',
				alt: 'Seguro de mercancías con cobertura total durante el transporte internacional',
			},
			asesoriaComercioExterior: {
				title: 'Asesoría en Comercio Exterior',
				description:
					'Acompañamiento estratégico en cada decisión de exportación e importación, desde la normativa aplicable hasta el mejor modo de transporte.',
				alt: 'Asesoría estratégica en comercio exterior e importación-exportación',
			},
		},
	},

	whyChooseUs: {
		eyebrow: 'Por qué elegirnos',
		title: 'Experiencia y respaldo que abren fronteras',
		intro:
			'Llevamos lo mejor de Colombia a los mercados que más lo valoran, con el respaldo de certificaciones internacionales y presencia activa en el sector.',
		mapaAlt:
			'Mapa de rutas comerciales de GTM Alliance: Colombia conectada con Estados Unidos, México, Europa y Centroamérica',
		experienciaTitle: 'desarrollados',
		experienciaTitlePrefix: 'Mercados',
		
		mercados: [
			{ nombre: 'Estados Unidos', descripcion: 'Alianzas y operaciones con clientes en todo el país.' },
			{ nombre: 'México', descripcion: 'Presencia estratégica y relaciones comerciales sólidas.' },
			{ nombre: 'Europa', descripcion: 'Exportando calidad colombiana a mercados exigentes.' },
		],
		certificacionesTitle: 'Certificaciones',
		certificacionesSubtitle: 'Respaldan nuestra calidad.',
		certificaciones: [
			{ nombre: 'INVIMA', descripcion: 'Registro Sanitario Colombiano', alt: 'Logo de INVIMA, Registro Sanitario Colombiano' },
			{ nombre: 'FDA', descripcion: 'Food and Drug Administration', alt: 'Logo de la FDA, Food and Drug Administration de Estados Unidos' },
		],
		eventosTitle: 'Presentes en los eventos más importantes del sector',
		eventos: [
			{
				nombre: 'Corferias, Bogotá.',
				etiqueta: 'Alimentec',
				descripcion: 'Participamos activamente conectando oportunidades y generando valor.',
				alt: 'Alimentec 2026 en Corferias, Bogotá',
			},
			{
				nombre: 'ProColombia.',
				etiqueta: 'Macrorrueda',
				descripcion: 'Fortalecemos la industria colombiana y abrimos nuevos mercados.',
				alt: 'Pantalla y letrero de la Macrorrueda  2026 en el recinto ferial',
			},
		],
		proximamenteLabel: 'Próximamente',
		americasAlt: 'Americas Food & Beverage Show — World Trade Center Miami',
		americasNombre: 'Americas Food & Beverage Show',
		americasLugar: 'Miami Beach Convention Center',
		pilaresTitlePrefix: '¿Por qué elegir',
		pilaresTitleHighlight: 'GTM Alliance',
		pilaresTitleSuffix: '?',
		pilares: [
			{ titulo: 'Consolidación de carga', descripcion: 'Unificamos múltiples productos en un solo embarque, optimizando costos y tiempos de entrega.' },
			{ titulo: 'Desarrollo de marca propia', descripcion: 'Creamos y adaptamos productos con tu marca, cumpliendo los estándares de cada mercado.' },
			{ titulo: 'Experiencia internacional', descripcion: 'Conocemos los mercados, cumplimos sus requisitos y entregamos confianza.' },
			{ titulo: 'Gestión integral de exportación', descripcion: 'Nos encargamos de todo el proceso: documentación, permisos, logística y entrega puerta a puerto.' },
		],
		chips: [
			{ label: 'Calidad garantizada' },
			{ label: 'Cadena de frío controlada' },
			{ label: 'Cumplimiento normativo' },
			{ label: 'Relaciones a largo plazo' },
			{ label: 'Soluciones a la medida de tu negocio' },
		],
	},

	contact: {
		eyebrow: 'Contacto',
		title: 'Conversemos sobre tus necesidades logísticas',
		intro: 'Estamos listos para acompañarte en tus proyectos de comercio exterior y exportación.',
		whatsappMessage: 'Hola, me gustaría solicitar más información.',
		cards: {
			sede: { label: 'Sede' },
			telefono: { label: 'Teléfono' },
			gerencia: { label: 'Gerencia' },
			administracion: { label: 'Administración' },
		},
		ctaWhatsapp: 'Escribir por WhatsApp',
		form: {
			heading: 'Envíanos un mensaje',
			intro: 'Completa este formulario y te responderemos con una solución a medida para tu operación.',
			nombreLabel: 'Nombre Completo*',
			nombrePlaceholder: 'Tu nombre',
			emailLabel: 'Email*',
			emailPlaceholder: 'tu@email.com',
			telefonoLabel: 'Teléfono*',
			telefonoPlaceholder: '+57 300 000 0000',
			mensajeLabel: 'Mensaje',
			mensajePlaceholder: 'Cuéntanos sobre tu proyecto, carga o destino...',
			submit: 'Enviar mensaje',
			sending: 'Enviando...',
			statusDefault: 'Responderemos en menos de 24 horas.',
			statusSending: 'Enviando tu mensaje...',
			statusSuccess: 'Mensaje enviado correctamente. Gracias por contactarnos.',
			statusErrorPrefix: 'No pudimos enviar tu mensaje.',
			statusErrorFallback: 'No se pudo enviar el mensaje.',
			statusErrorUnexpected: 'Respuesta inesperada del servicio.',
			statusMissingKey: 'Falta la clave de Web3Forms. Configúrala en src/data/contact-form.ts.',
		},
		privacyModal: {
			eyebrow: 'Tratamiento de datos',
			title: 'Confirmar envío del mensaje',
			body: 'Al enviar este formulario autorizas que GTM Alliance procese tus datos para responder tu solicitud, gestionar la información de contacto y atender tu consulta. Tus datos no serán compartidos con terceros sin tu autorización, salvo obligación legal.',
			cancel: 'Cancelar',
			accept: 'Aceptar y enviar',
		},
	},

	footer: {
		tagline:
			'Conectamos tu carga con el mundo. Soluciones integrales en comercio exterior y logística internacional: carga seca, congelados y mercancías especiales por mar, tierra y aire.',
		lineasContactoTitle: 'Líneas de contacto',
		lineasContacto: {
			gerencia: 'Proveedores',
			administracion: 'Comercial',
		},
		sigueenosTitle: 'Síguenos',
		navegacionTitle: 'Navegación',
		oficinasTitle: 'Oficinas de Atención',
		horariosTitle: 'Horarios de atención',
		horarios: [
			{ dias: 'Lun–Vie', horas: '8:00 a.m – 6:00 p.m' },
			{ dias: 'Sábados', horas: '8:00 a.m – 12:00 m' },
			{ dias: 'Dom. y festivos', horas: 'Cerrado' },
		],
		generalTitle: 'General',
		legales: {
			pqrsd: 'Formulario PQRSD',
			tratamientoDatos: 'Política de tratamiento de datos',
			reclamaciones: 'Reclamaciones y no conformidades',
			rse: 'Política RSE',
			eticaCodigo: 'Código de Ética',
			sic: 'Superintendencia de Industria y Comercio',
			estatutoConsumidor: 'Estatuto del consumidor',
		},
		copyright: (year: number) => `© ${year} GTM Alliance. Todos los derechos reservados.`,
		cotizacionCta: 'Solicita una cotización',
	},

	pqrsd: {
		eyebrow: 'PQRSD',
		title: 'Tu voz importa en cada operación',
		intro:
			'En GTM Alliance valoramos tus comentarios, solicitudes y reclamos. Completa este formulario y nos pondremos en contacto contigo para atender tu caso con la mayor celeridad.',
		reportarTitle: '¿Qué puedes reportar?',
		reportarItems: [
			'Petición de información sobre servicios, tiempos o costos.',
			'Quejas o reclamos relacionados con una operación o servicio.',
			'Sugerencias para mejorar la experiencia de nuestros clientes.',
		],
		respuestaTitle: 'Respuesta estimada',
		respuestaBody: 'Responderemos tu solicitud dentro de los tiempos establecidos por nuestra política de atención al cliente.',
		formTitle: 'Formulario de PQRSD',
		form: {
			nombreLabel: 'Nombre completo',
			nombrePlaceholder: 'Tu nombre',
			emailLabel: 'Email',
			emailPlaceholder: 'tu@email.com',
			telefonoLabel: 'Teléfono',
			telefonoPlaceholder: '+57 300 000 0000',
			tipoLabel: 'Tipo de solicitud',
			tipoPlaceholder: 'Selecciona una opción',
			tipoOpciones: {
				peticion: 'Petición',
				queja: 'Queja',
				reclamo: 'Reclamo',
				sugerencia: 'Sugerencia',
				solicitudInformacion: 'Solicitud de información',
				incidenciaOperativa: 'Incidencia operativa',
				otro: 'Otro',
			},
			mensajeLabel: 'Mensaje',
			mensajePlaceholder: 'Describe los detalles de tu solicitud',
			submit: 'Enviar solicitud',
			sending: 'Enviando...',
			statusDefault: 'Tu información está segura con nosotros.',
			statusSuccess: '¡Solicitud enviada! Guarda tu número de radicado.',
			statusErrorPrefix: 'No pudimos enviar tu solicitud.',
			statusErrorFallback: 'No se pudo enviar la solicitud.',
			statusErrorUnexpected: 'Respuesta inesperada del servicio.',
			statusMissingKey: 'Falta la clave de Web3Forms. Configúrala en src/data/contact-form.ts.',
			successTitle: 'Solicitud recibida correctamente',
			successBody: 'Guarda tu número de radicado para dar seguimiento a tu caso:',
		},
		privacyModal: {
			title: 'Política de tratamiento de datos',
			body: 'Tus datos serán utilizados únicamente para identificarte, atender tu solicitud y dar seguimiento a tu caso. Puedes solicitar la actualización o eliminación de tus datos en cualquier momento.',
			cancel: 'Cancelar',
			accept: 'Aceptar',
		},
	},

	notFound: {
		eyebrow: 'Error 404',
		title: 'No encontramos esta página',
		body: 'El enlace que seguiste puede estar desactualizado o la página fue movida. Vuelve al inicio para encontrar lo que buscas.',
		cta: 'Volver al inicio',
	},

	seo: {
		home: {
			title: 'Logística Internacional de Carga desde Colombia',
			description:
				'GTM Alliance mueve tu carga seca, congelada y general por mar, tierra y aire con soluciones logísticas confiables y seguras. Solicita tu cotización hoy.',
		},
		pqrsd: {
			title: 'PQRSD',
			description:
				'Formulario de PQRSD de GTM Alliance para peticiones, quejas, reclamos, sugerencias y solicitudes de información.',
		},
		notFound: {
			title: 'Página no encontrada',
			description: 'La página que buscas no existe o fue movida.',
		},
	},

	schema: {
		organizationDescription:
			'Agencia colombiana de comercio exterior y logística internacional: agenciamiento aduanero, transporte marítimo, aéreo y terrestre, almacenaje en frío y carga seca, consolidación de carga, seguro de mercancías y asesoría en comercio exterior.',
		servicios: {
			transporteInternacional: {
				name: 'Transporte Internacional',
				description: 'Transporte internacional de carga marítimo, aéreo y terrestre para operaciones de importación y exportación.',
			},
			agenciamientoAduanero: {
				name: 'Agenciamiento Aduanero',
				description: 'Trámites, normativas y cumplimiento aduanero para operaciones de comercio exterior en Colombia.',
			},
			almacenajeDistribucion: {
				name: 'Almacenaje y Distribución',
				description: 'Almacenaje y distribución especializados para carga refrigerada y carga seca.',
			},
			consolidacionCarga: {
				name: 'Consolidación de Carga',
				description: 'Agrupación y manejo especializado de carga para optimizar costos y tiempos de exportación.',
			},
			seguroMercancias: {
				name: 'Seguro de Mercancías',
				description: 'Cobertura total de seguro para mercancías durante el transporte internacional.',
			},
			asesoriaComercioExterior: {
				name: 'Asesoría en Comercio Exterior',
				description: 'Acompañamiento estratégico y normativo en operaciones de comercio exterior.',
			},
			lineaCongelados: {
				name: 'Línea de Congelados',
				description:
					'Cadena de frío con trazabilidad total del agricultor al destino final, en alianza con Coldfood: compra directa, supervisión en cultivos, procesamiento en plantas certificadas, transporte refrigerado monitoreado y exportación con seguimiento digital.',
			},
			lineaCargaSeca: {
				name: 'Línea de Carga Seca',
				description:
					'Exportación multi-industria de carga seca: almacenaje, picking, empaque, control de inventarios y coordinación logística y aduanera.',
			},
		},
		offerCatalogName: 'Servicios de comercio exterior y logística internacional',
		pqrsdPageName: 'PQRSD | GTM Alliance',
		breadcrumbInicio: 'Inicio',
	},
};

export type Dictionary = typeof es;

export default es;
