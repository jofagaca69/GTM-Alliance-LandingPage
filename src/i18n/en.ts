import type { Dictionary } from './es';

/**
 * English dictionary. Typed against `Dictionary` (`typeof es`), so a missing
 * or extra key here is a type error caught by `pnpm astro check` — no
 * separate translation test needed.
 */
const en: Dictionary = {
	common: {
		languageSwitcherLabel: 'Change language',
		openMenu: 'Open menu',
		closeMenu: 'Close menu',
	},

	nav: {
		inicio: 'Home',
		nuestrosProductos: 'Our Products',
		congelados: {
			label: 'Frozen Foods',
			tag: 'Cold Line',
			description: 'Frozen products under your own brand, in partnership with Coldfood.',
		},
		cargaSeca: {
			label: 'Dry Cargo',
			tag: 'Dry Line',
			description: 'Multi-industry export. Coming soon to Medellín.',
		},
		servicios: {
			label: 'Services',
			tag: 'Foreign Trade',
			description: 'Transport, customs brokerage, warehousing, insurance and full advisory.',
		},
		porQueElegirnos: 'Why Choose Us',
		contacto: 'Contact',
		ariaDesktop: 'Main',
		ariaMobile: 'Main (mobile)',
	},

	hero: {
		titleLead: 'Your strategic partner for ',
		titleHighlight: 'exports from Colombia.',
		subtitle:
			'At GTM Alliance we take Colombian production to the world. We work directly with farmers and manufacturers, process our frozen line together with Coldfood, and consolidate dry cargo from different brands based on each client\'s needs. All backed by certified quality, full traceability and logistics solutions that make your export more efficient and competitive.',
		ctaPrimary: 'Request Advice',
		ctaSecondary: 'Explore Solutions',
	},

	clients: {
		eyebrow: 'Our partners',
		title: 'Strategic partnerships',
		alts: {
			coldfood: 'Coldfood — GTM Alliance partner in processing and export of frozen foods',
			cls: 'CLS Logistic Solutions SAS — GTM Alliance partner in logistics solutions',
			logicx: 'logicx, Level 2 Customs Agency — GTM Alliance partner in customs brokerage',
			artico: 'ARTICO — GTM Alliance partner in refrigerated cargo transport',
			presservac: 'PRESSERVAC — GTM Alliance partner in refrigerated cargo transport',
			weexp: 'WEEXPORT — GTM Alliance partner in export of Colombian products',
			one: 'ONE — GTM Alliance partner in export of Colombian products',
		},
	},

	frozen: {
		alianza: 'In partnership with Coldfood',
		titleLead: 'FROZEN',
		titleHighlight: 'FOODS LINE',
		intro:
			'Together with Coldfood, we develop frozen food solutions for distributors, importers and private brands, bringing the quality of the Colombian countryside to international markets.',
		cta: 'Request a quote',
		cadenaFrioAlt:
			'Coldfood and GTM Alliance cold chain: from Colombian farming to the certified plant and the export container',
		pasos: [
			{ titulo: 'Colombian producers', descripcion: 'Quality raw materials.' },
			{ titulo: 'Specialized processing', descripcion: 'Controlled quality and freezing.' },
			{ titulo: 'Private or own brand', descripcion: 'Packaging adapted to your market.' },
			{ titulo: 'International export', descripcion: 'Logistics for international markets.' },
		],
		portafolioEyebrow: 'Our portfolio',
		portafolioTitle: 'Our product lines',
		portafolioVerMas: 'See more...',
		lineaLabel: (label: string) => `${label} Line`,
		lineas: [
			{
				label: 'Fresh',
				descriptor: 'Selected, frozen products that preserve their natural flavor, texture and quality.',
				alt: 'Fresh products from the GTM Alliance line: cassava, green plantain, lulo and blackberry packed under a private label',
				productos: ['Cassava', 'Green Plantain', 'Lulo', 'Blackberry', 'Guava'],
			},
			{
				label: 'Pre-fried',
				descriptor: 'Value-added products, made to offer convenience, texture and flavor in every preparation.',
				alt: 'Pre-cooked products from the GTM Alliance line: cassava croquettes and fries, slices, ripe plantains and tostones packed under a private label',
				productos: ['Cassava Croquette', 'Cassava Fries', 'Slices', 'Ripe Plantains', 'Tostones'],
			},
			{
				label: 'Pre-cooked',
				descriptor: 'Practical and ready to prepare, preserving the flavor and traditional characteristics of each product.',
				alt: 'Frozen products from the GTM Alliance line: creole potato, cassava sticks, arracacha and vegetable mixes packed under a private label',
				productos: ['Creole Potato', 'Cassava Sticks', 'Arracacha', 'Sancocho Mix', 'Ajiaco Mix'],
			},
		],
	},

	dryCargo: {
		heroImgAlt: 'Dry cargo line — GTM Alliance consolidation and export',
		titleLead: 'Dry',
		titleHighlight: 'Cargo Line',
		introLead: 'We consolidate products from multiple',
		introTrail: 'manufacturers into a single international shipment.',
		stepperTitle: 'How GTM works',
		prevAriaLabel: 'Previous step',
		nextAriaLabel: 'Next step',
		trackAriaLabel: 'Dry cargo consolidation process',
		pasos: [
			{ titulo: 'Purchase from partner manufacturers', descripcion: 'We negotiate directly with multiple Colombian manufacturers.' },
			{ titulo: 'Receiving at our warehouse', descripcion: 'We receive and verify the goods at our specialized facilities.' },
			{ titulo: 'Labeling per destination country', descripcion: 'We adapt labeling and information to each market\'s regulations.' },
			{ titulo: 'Specialized packaging', descripcion: 'We use the right packaging to protect every product during transport.' },
			{ titulo: 'Cargo consolidation', descripcion: 'We group different products from several suppliers into a single shipment.' },
			{ titulo: 'Documentation and customs management', descripcion: 'We handle all documentation, permits and inspections.' },
			{ titulo: 'International export', descripcion: 'We coordinate international transport to the destination port.' },
		],
		marcasTitle: 'Colombian brands we consolidate',
	},

	services: {
		eyebrow: 'Services',
		title: 'Comprehensive Foreign Trade Solutions',
		intro: 'Full coverage for every stage of your foreign trade operation, from transport to regulatory advisory.',
		items: {
			transporteInternacional: {
				title: 'International Transport',
				description:
					'We move your cargo by sea, air and land, choosing the most efficient route for every import or export operation.',
				alt: 'Containers and cargo ship for international sea, air and land transport',
			},
			agenciamientoAduanero: {
				title: 'Customs Brokerage',
				description:
					'We manage procedures, documentation and regulatory compliance with customs authorities so your goods cross borders without setbacks.',
				alt: 'Document management for customs brokerage and regulatory compliance',
			},
			almacenajeDistribucion: {
				title: 'Warehousing and Distribution',
				description:
					'Specialized cold and dry cargo warehousing, with picking, packing and dispatch ready for the next stage of your supply chain.',
				alt: 'Warehousing and distribution facility for refrigerated and dry cargo',
			},
			consolidacionCarga: {
				title: 'Cargo Consolidation',
				description:
					'We group shipments from different origins into a single operation, reducing costs and transit times without losing traceability.',
				alt: 'Consolidation and specialized handling of cargo for export',
			},
			seguroMercancias: {
				title: 'Cargo Insurance',
				description:
					'Coverage against damage, loss or delay during transport, so your cargo arrives protected at its destination.',
				alt: 'Cargo insurance with full coverage during international transport',
			},
			asesoriaComercioExterior: {
				title: 'Foreign Trade Advisory',
				description:
					'Strategic support for every import and export decision, from applicable regulations to the best mode of transport.',
				alt: 'Strategic advisory in foreign trade and import-export',
			},
		},
	},

	whyChooseUs: {
		eyebrow: 'Why Choose Us',
		title: 'Experience and backing that open borders',
		intro:
			'We take the best of Colombia to the markets that value it most, backed by international certifications and an active presence in the industry.',
		mapaAlt: 'Map of GTM Alliance trade routes: Colombia connected with the United States, Mexico, Europe and Central America',
		experienciaTitle: 'Developed ',
		experienciaTitlePrefix: 'Markets',
		
		mercados: [
			{ nombre: 'United States', descripcion: 'Partnerships and operations with clients across the country.' },
			{ nombre: 'Mexico', descripcion: 'Strategic presence and solid business relationships.' },
			{ nombre: 'Europe', descripcion: 'Exporting Colombian quality to demanding markets.' },
		],
		certificacionesTitle: 'Certifications',
		certificacionesSubtitle: 'They back our quality.',
		certificaciones: [
			{ nombre: 'INVIMA', descripcion: 'Colombian Health Registry', alt: 'INVIMA logo, Colombian Health Registry' },
			{ nombre: 'FDA', descripcion: 'Food and Drug Administration', alt: 'FDA logo, United States Food and Drug Administration' },
		],
		eventosTitle: 'Present at the industry\'s most important events',
		eventos: [
			{
				nombre: 'Corferias, Bogotá.',
				etiqueta: 'Alimentec',
				descripcion: 'We actively participate, connecting opportunities and creating value.',
				alt: 'Alimentec 2026 at Corferias, Bogotá',
			},
			{
				nombre: 'ProColombia.',
				etiqueta: 'Macrorrueda',
				descripcion: 'We strengthen Colombian industry and open new markets.',
				alt: 'Screen and sign for the 2026 Macrorrueda at the trade fair venue',
			},
		],
		proximamenteLabel: 'Coming soon',
		americasAlt: 'Americas Food & Beverage Show — World Trade Center Miami',
		americasNombre: 'Americas Food & Beverage Show',
		americasLugar: 'Miami Beach Convention Center',
		pilaresTitlePrefix: 'Why choose',
		pilaresTitleHighlight: 'GTM Alliance',
		pilaresTitleSuffix: '?',
		pilares: [
			{ titulo: 'Cargo consolidation', descripcion: 'We combine multiple products into a single shipment, optimizing costs and delivery times.' },
			{ titulo: 'Private brand development', descripcion: 'We create and adapt products under your brand, meeting the standards of each market.' },
			{ titulo: 'International experience', descripcion: 'We know the markets, meet their requirements and deliver confidence.' },
			{ titulo: 'Full export management', descripcion: 'We handle the whole process: documentation, permits, logistics and door-to-port delivery.' },
		],
		chips: [
			{ label: 'Guaranteed quality' },
			{ label: 'Controlled cold chain' },
			{ label: 'Regulatory compliance' },
			{ label: 'Long-term relationships' },
			{ label: 'Solutions tailored to your business' },
		],
	},

	contact: {
		eyebrow: 'Contact',
		title: 'Let\'s talk about your logistics needs',
		intro: 'We are ready to support you in your foreign trade and export projects.',
		whatsappMessage: 'Hi, I would like to request more information.',
		cards: {
			sede: { label: 'Office' },
			telefono: { label: 'Phone' },
			gerencia: { label: 'Management' },
			administracion: { label: 'Administration' },
		},
		ctaWhatsapp: 'Message us on WhatsApp',
		form: {
			heading: 'Send us a message',
			intro: 'Fill out this form and we will get back to you with a tailored solution for your operation.',
			nombreLabel: 'Full Name*',
			nombrePlaceholder: 'Your name',
			emailLabel: 'Email*',
			emailPlaceholder: 'you@email.com',
			telefonoLabel: 'Phone*',
			telefonoPlaceholder: '+1 000 000 0000',
			mensajeLabel: 'Message',
			mensajePlaceholder: 'Tell us about your project, cargo or destination...',
			submit: 'Send message',
			sending: 'Sending...',
			statusDefault: 'We will respond within 24 hours.',
			statusSending: 'Sending your message...',
			statusSuccess: 'Message sent successfully. Thank you for contacting us.',
			statusErrorPrefix: 'We could not send your message.',
			statusErrorFallback: 'The message could not be sent.',
			statusErrorUnexpected: 'Unexpected response from the service.',
			statusMissingKey: 'Missing Web3Forms key. Configure it in src/data/contact-form.ts.',
		},
		privacyModal: {
			eyebrow: 'Data processing',
			title: 'Confirm message submission',
			body: 'By submitting this form you authorize GTM Alliance to process your data to respond to your request, manage your contact information and handle your inquiry. Your data will not be shared with third parties without your authorization, except where legally required.',
			cancel: 'Cancel',
			accept: 'Accept and send',
		},
	},

	footer: {
		tagline:
			'We connect your cargo with the world. Comprehensive foreign trade and international logistics solutions: dry cargo, frozen goods and special merchandise by sea, land and air.',
		lineasContactoTitle: 'Contact lines',
		lineasContacto: {
			gerencia: 'Providers',
			administracion: 'Commercial',
		},
		sigueenosTitle: 'Follow us',
		navegacionTitle: 'Navigation',
		oficinasTitle: 'Service Offices',
		horariosTitle: 'Business hours',
		horarios: [
			{ dias: 'Mon–Fri', horas: '8:00 am – 6:00 pm' },
			{ dias: 'Saturdays', horas: '8:00 am – 12:00 pm' },
			{ dias: 'Sun. & holidays', horas: 'Closed' },
		],
		generalTitle: 'General',
		legales: {
			pqrsd: 'PQRSD Form',
			tratamientoDatos: 'Personal Data Processing Policy',
			reclamaciones: 'Complaints and Non-Conformities',
			rse: 'CSR Policy',
			eticaCodigo: 'Code of Ethics',
			sic: 'Superintendency of Industry and Commerce',
			estatutoConsumidor: 'Consumer Statute',
		},
		copyright: (year: number) => `© ${year} GTM Alliance. All rights reserved.`,
		cotizacionCta: 'Request a quote',
	},

	pqrsd: {
		eyebrow: 'PQRSD',
		title: 'Your voice matters in every operation',
		intro:
			'At GTM Alliance we value your comments, requests and complaints. Fill out this form and we will get in touch with you to handle your case as quickly as possible.',
		reportarTitle: 'What can you report?',
		reportarItems: [
			'A request for information about services, timelines or costs.',
			'Complaints or claims related to an operation or service.',
			'Suggestions to improve our customers\' experience.',
		],
		respuestaTitle: 'Estimated response time',
		respuestaBody: 'We will respond to your request within the timeframes set by our customer service policy.',
		formTitle: 'PQRSD Form',
		form: {
			nombreLabel: 'Full name',
			nombrePlaceholder: 'Your name',
			emailLabel: 'Email',
			emailPlaceholder: 'you@email.com',
			telefonoLabel: 'Phone',
			telefonoPlaceholder: '+1 000 000 0000',
			tipoLabel: 'Request type',
			tipoPlaceholder: 'Select an option',
			tipoOpciones: {
				peticion: 'Request',
				queja: 'Complaint',
				reclamo: 'Claim',
				sugerencia: 'Suggestion',
				solicitudInformacion: 'Information request',
				incidenciaOperativa: 'Operational incident',
				otro: 'Other',
			},
			mensajeLabel: 'Message',
			mensajePlaceholder: 'Describe the details of your request',
			submit: 'Submit request',
			sending: 'Sending...',
			statusDefault: 'Your information is safe with us.',
			statusSuccess: 'Request sent! Save your case number.',
			statusErrorPrefix: 'We could not send your request.',
			statusErrorFallback: 'The request could not be sent.',
			statusErrorUnexpected: 'Unexpected response from the service.',
			statusMissingKey: 'Missing Web3Forms key. Configure it in src/data/contact-form.ts.',
			successTitle: 'Request received successfully',
			successBody: 'Save your case number to follow up on your request:',
		},
		privacyModal: {
			title: 'Personal Data Processing Policy',
			body: 'Your data will be used solely to identify you, handle your request and follow up on your case. You may request the update or deletion of your data at any time.',
			cancel: 'Cancel',
			accept: 'Accept',
		},
	},

	notFound: {
		eyebrow: '404 Error',
		title: 'We could not find this page',
		body: 'The link you followed may be outdated or the page may have moved. Go back to the home page to find what you\'re looking for.',
		cta: 'Back to home',
	},

	seo: {
		home: {
			title: 'International Cargo Logistics from Colombia',
			description:
				'GTM Alliance moves your dry, frozen and general cargo by sea, land and air with reliable, secure logistics solutions. Request your quote today.',
		},
		pqrsd: {
			title: 'PQRSD',
			description:
				'GTM Alliance PQRSD form for requests, complaints, claims, suggestions and information requests.',
		},
		notFound: {
			title: 'Page not found',
			description: 'The page you are looking for does not exist or has been moved.',
		},
	},

	schema: {
		organizationDescription:
			'Colombian foreign trade and international logistics agency: customs brokerage, sea, air and land transport, cold and dry cargo warehousing, cargo consolidation, cargo insurance and foreign trade advisory.',
		servicios: {
			transporteInternacional: {
				name: 'International Transport',
				description: 'International sea, air and land cargo transport for import and export operations.',
			},
			agenciamientoAduanero: {
				name: 'Customs Brokerage',
				description: 'Procedures, regulations and customs compliance for foreign trade operations in Colombia.',
			},
			almacenajeDistribucion: {
				name: 'Warehousing and Distribution',
				description: 'Specialized warehousing and distribution for refrigerated and dry cargo.',
			},
			consolidacionCarga: {
				name: 'Cargo Consolidation',
				description: 'Specialized cargo grouping and handling to optimize export costs and timelines.',
			},
			seguroMercancias: {
				name: 'Cargo Insurance',
				description: 'Full insurance coverage for cargo during international transport.',
			},
			asesoriaComercioExterior: {
				name: 'Foreign Trade Advisory',
				description: 'Strategic and regulatory support for foreign trade operations.',
			},
			lineaCongelados: {
				name: 'Frozen Foods Line',
				description:
					'Full-traceability cold chain from farmer to final destination, in partnership with Coldfood: direct purchase, crop supervision, processing in certified plants, monitored refrigerated transport and export with digital tracking.',
			},
			lineaCargaSeca: {
				name: 'Dry Cargo Line',
				description:
					'Multi-industry dry cargo export: warehousing, picking, packing, inventory control and logistics and customs coordination.',
			},
		},
		offerCatalogName: 'Foreign trade and international logistics services',
		pqrsdPageName: 'PQRSD | GTM Alliance',
		breadcrumbInicio: 'Home',
	},
};

export default en;
