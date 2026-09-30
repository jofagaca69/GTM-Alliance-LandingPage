# GTM Alliance — Landing Page

Sitio web corporativo de **GTM Alliance** (comercio exterior y logística internacional): https://gtm-alliance.com

Sitio estático bilingüe (español / inglés) con secciones de servicios, Carga Seca, Carga Congelada, globo interactivo de rutas, clientes, contacto y formulario PQRSD.

---

## Guía rápida para el cliente

Casi todo el contenido se edita en archivos de texto, sin tocar el diseño. Después de cualquier cambio hay que volver a generar y publicar el sitio (ver [Despliegue](#despliegue)).

| Quiero cambiar… | Dónde |
| :-- | :-- |
| Textos del sitio en español | `src/i18n/es.ts` |
| Textos del sitio en inglés | `src/i18n/en.ts` |
| Teléfonos, correos, dirección | `src/data/contact.ts` |
| Menú de navegación | `src/data/nav.ts` |
| Catálogo de Congelados (PDF) | Reemplazar `public/docs/catalogo-congelados-2026.pdf` conservando el nombre |
| Políticas y documentos del pie de página | `public/docs/` (`politica-rse.pdf`, `codigo-etica.pdf`, `politica-tratamiento-datos-personales.pdf`, `reclamaciones-y-no-conformidades.pdf`), conservando el nombre |
| Logos de clientes / marcas | `src/assets/logos/` |
| Imágenes de secciones | `src/assets/` (y subcarpetas `servicios/`, `eventos/`, `congelados/`, `flags/`) |
| Correo que recibe los formularios | Panel de [Web3Forms](https://web3forms.com/) (la clave está en `src/data/contact-form.ts`) |

### Activar el botón de catálogo de Carga Seca
Actualmente el botón está **oculto** porque aún no hay PDF. Para activarlo:
1. Copiar el PDF a `public/docs/` (por ejemplo `catalogo-carga-seca.pdf`).
2. En `src/components/DryCargoLine.astro`, asignar la ruta a `CATALOGO_PDF` (por ejemplo `'/docs/catalogo-carga-seca.pdf'`) en lugar de `null`.

---

## Stack

- [Astro](https://astro.build) 7 (sitio estático) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) 4
- [GSAP](https://gsap.com) (animaciones) y [cobe](https://github.com/shuding/cobe) (globo)
- `@astrojs/sitemap`, `sharp` (optimización de imágenes)
- Node **≥ 22.12** y [pnpm](https://pnpm.io)

## Comandos

Ejecutar desde la raíz del proyecto:

| Comando | Acción |
| :-- | :-- |
| `pnpm install` | Instala dependencias |
| `pnpm dev` | Servidor de desarrollo en `http://localhost:4321` |
| `pnpm build` | Genera el sitio de producción en `./dist/` |
| `pnpm preview` | Sirve localmente el contenido de `dist/` |
| `pnpm astro check` | Revisa tipos y errores en archivos `.astro`/`.ts` |

## Estructura

```text
├── public/                 Archivos servidos tal cual
│   ├── docs/               PDFs (catálogo, políticas)
│   ├── fonts/              Plus Jakarta Sans, Zodiak
│   ├── robots.txt, site.webmanifest, favicons
│   └── 49fa145d-….txt      Archivo de verificación de dominio (no borrar)
└── src/
    ├── assets/             Imágenes optimizadas por Astro
    ├── components/         Secciones (Hero, Services, Globe, Contact, Footer…)
    │   └── pages/          Contenido de páginas (HomePage, PqrsdPage), compartido por es/en
    ├── data/               Contacto, navegación, config de formularios
    ├── i18n/               Diccionarios es/en y utilidades de idioma
    ├── layouts/            BaseLayout (SEO, metadatos, JSON-LD)
    ├── pages/              Rutas (es en raíz, en en /en)
    ├── scripts/            Lógica del globo, GSAP, scrollspy, DotGrid
    └── styles/global.css   Estilos globales y tokens de Tailwind
```

## Idiomas y rutas

| Ruta | Página |
| :-- | :-- |
| `/` · `/en/` | Inicio (es · en) |
| `/pqrsd` · `/en/pqrsd` | Peticiones, quejas, reclamos, sugerencias y denuncias |
| `/404` | Página de error |

El español es el idioma por defecto (sin prefijo). Para añadir textos, agregar la misma clave en `es.ts` y `en.ts`.

## Formularios

Los formularios de **Contacto** y **PQRSD** se envían a [Web3Forms](https://web3forms.com/) desde el navegador. La `access_key` es pública por diseño y está en `src/data/contact-form.ts`, junto con los asuntos de los correos. El formulario PQRSD genera un número de radicado con formato `PQRSD-AAAAMMDD-XXXX`. El correo de destino se configura en el panel de Web3Forms, no en el código.

## SEO

- Sitemap automático (`sitemap-index.xml`, con `es-CO` y `en-US`) y `robots.txt`.
- Metadatos, Open Graph y JSON-LD (`Organization`) en `src/layouts/BaseLayout.astro`.
- Favicons y `site.webmanifest` en `public/`.

## Despliegue

El resultado de `pnpm build` es la carpeta `dist/` (HTML/CSS/JS estático). Se puede publicar en cualquier hosting estático (Vercel, Netlify, Cloudflare Pages, cPanel, etc.) subiendo el contenido de `dist/` o conectando el repositorio con el comando de build `pnpm build` y directorio de salida `dist`. El dominio configurado en `astro.config.mjs` (`site`) es `https://gtm-alliance.com`.
