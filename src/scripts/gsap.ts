import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// El cambio de altura por la barra de URL del navegador móvil no debe
// disparar un refresh en pleno scroll (causa saltos en animaciones scrubbeadas).
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };
