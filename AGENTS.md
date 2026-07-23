# AGENTS.md

This file provides guidance to Claude Code and other coding agents when working with code in this repository. `CLAUDE.md` is a symlink to this file.

## Project status

This is the GTM Alliance marketing landing page (a Colombian freight-forwarding / international logistics company), built with Astro. It is a single-page site (`src/pages/index.astro`) assembled from section components, styled with Tailwind CSS v4, and animated with GSAP + ScrollTrigger. Content and copy are in Spanish.

## Commands

Package manager is pnpm (see `pnpm-workspace.yaml`), run from the repo root.

- `pnpm install` — install dependencies
- `pnpm dev` — start local dev server at `localhost:4321`
- `pnpm build` — build production site to `./dist/`
- `pnpm preview` — preview the production build locally
- `pnpm astro ...` — run Astro CLI commands (e.g. `pnpm astro add`, `pnpm astro check`)

There is no lint or test tooling configured. `pnpm astro check` runs Astro's typechecker against the strict TS config in `tsconfig.json` — run it after changes to `.astro` files' frontmatter/scripts.

### Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Architecture

- **Routing**: file-based under `src/pages/`. Currently a single route, `index.astro`, which composes the page from components in import order (`Hero`, `ClientsCarousel`, `AboutUs`, ...).
- **Layout**: `src/layouts/BaseLayout.astro` wraps every page — handles the `<head>` (SEO meta tags, Open Graph, Twitter Card, canonical URL, JSON-LD `Organization` schema) and renders the persistent `Navbar` and `Footer` around the page's `<slot />`. Pages pass `title`, `description`, `keywords`, and optionally `image`/`type`/`noindex`/`canonicalURL` as props.
- **Sections as components**: each homepage section (`Hero`, `ClientsCarousel`, `AboutUs`, ...) is a self-contained `.astro` file in `src/components/` with its own markup, an `id` used as an in-page anchor (`#inicio`, `#quienes-somos`, etc. — referenced by `Navbar`/`Footer` nav links), and its own scoped `<script>` for animation/interactivity. There is no shared component-composition layer beyond this — sections are added to `index.astro` directly.
- **Styling**: Tailwind CSS v4 via the `@tailwindcss/vite` plugin (configured in `astro.config.mjs`, no separate `tailwind.config.js`). Custom brand tokens are defined with `@theme` in `src/styles/global.css` (`--color-gtm-navy`, `--color-gtm-gold`), used as `text-gtm-navy`, `bg-gtm-gold`, etc. Global styles are imported once, in `BaseLayout.astro`.
- **Typography**: two self-hosted variable fonts, declared via `@font-face` in `src/styles/global.css` and served from `public/fonts/` (no CDN/Google Fonts). `--font-sans` = **Plus Jakarta Sans** (body text — set as the default via `body { font-family: var(--font-sans); }`, so most elements need no extra class). `--font-display` = **Zodiak** (serif) — applied with the `font-display` utility class to headings (`h1`/`h2`/`h3`), the hero's gold emphasis span, uppercase eyebrow/tag labels, and the "GTM ALLIANCE" wordmark in `Navbar`/`Footer`. Follow this split for any new section: body copy stays unstyled (inherits Jakarta), titles/labels/wordmark get `font-display`. `BaseLayout.astro` preloads both variable `woff2` files since the Hero is above the fold.
- **Animation**: `src/scripts/gsap.ts` is the single entry point for GSAP — it registers `ScrollTrigger` once and re-exports `gsap`/`ScrollTrigger`. Any component script must import from `'../scripts/gsap'` rather than importing `gsap` directly, so the plugin registration always happens.
  - Animation pattern used throughout: `gsap.matchMedia()` with two branches — `'(prefers-reduced-motion: no-preference)'` builds the real timeline/tween (and returns a cleanup function that kills the timeline/tween and any ScrollTrigger), and `'(prefers-reduced-motion: reduce)'` just `gsap.set(...)` elements to their final visible state. Follow this pattern for any new animated section.
  - Sections below the fold trigger their timeline off `ScrollTrigger` (`start: 'top 75%'` on the section element); above-the-fold content (Hero) animates immediately on load.
- **Static assets**: images, videos, logos, and favicons live in `public/` and are referenced by absolute path (e.g. `/logo.svg`, `/videos/hero-cargo-ship.mp4`).
- **Interactive UI without a framework**: `Navbar.astro` implements the mobile menu toggle and desktop dropdown with a plain inline `<script>` (vanilla DOM APIs, no React/Vue/Svelte integration is installed). Follow this approach for simple interactivity rather than introducing a UI framework.

## Conventions

- Indentation is tabs; strings use single quotes; statements end with semicolons (matches the existing `.astro`/`.ts` files — no Prettier/ESLint config is present, so match surrounding style by hand).
- Section components use a `<section id="...">` root so the id can be linked from the navbar/footer; keep new sections consistent with this anchor-link pattern.
- Copy, labels, and comments are written in Spanish, matching the site's target audience.

## Content & information architecture

The client supplied a full content brief (`Pagina Web.docx`) laying out the site as 7 sections/pages. Build new sections following the existing pattern — a `<section id="...">` anchor wired into `Navbar.astro`/`Footer.astro` nav links — and keep copy in Spanish, matching the client's wording below.

1. **Inicio** (`#inicio` → `Hero.astro`, done)
   Headline: "Soluciones Integrales en Comercio Exterior y Logística Internacional." Positioning: empresa especializada en procesamiento, comercialización y exportación de productos alimenticios, con operaciones logísticas en carga seca, congelados y mercancías especiales. 5 pilares: trazabilidad total, desarrollo de marca para clientes internacionales, exportación de carga seca multi-industria, logística internacional con cobertura global, cumplimiento aduanero y normativo.

2. **Quiénes Somos** (`#quienes-somos` → `AboutUs.astro`, done — mission/vision/objetivos already match the brief verbatim).

3. **Línea de Congelados** (`#congelados` — not yet built)
   Alliance with **Coldfood** for processed/frozen food. 5-step traceability chain to present as a timeline/process: compra directa al agricultor → supervisión en cultivos → procesamiento y producción (Coldfood, plantas certificadas/BPM) → transporte refrigerado (monitoreo en tiempo real) → exportación y entrega final (seguimiento digital del contenedor). Also offers **brand development for clients** (diseño de marca, identidad visual, empaques y etiquetas, adaptación normativa del país destino) — tagline "Tu producto, tu marca, nuestra logística." Product line: frutas congeladas, verduras congeladas, mezclas vegetales, proteínas congeladas, productos agrícolas procesados, alimentos listos para exportación. Differentiators: trazabilidad total, plantas certificadas, cadena de frío monitoreada, desarrollo de marca, estándares internacionales, cumplimiento normativo/sanitario, capacidad de producción escalable.

4. **Línea de Carga Seca** (`#carga-seca` — not yet built; note "Próximamente Medellín")
   Products/client industries exported: Alimentec (alimenticios secos/procesados), Bocadillos (dulces típicos), Universal (consumo masivo), Aluminios Medellín (láminas/perfiles industriales), Barriles Ahumadores. Services: almacenaje especializado, picking/empaque/despacho, control de inventarios en tiempo real, procesamiento según especificaciones del cliente, coordinación logística y aduanera. Slogan: "Eficiencia y confianza para tu operación internacional."

5. **Servicios** (`#servicios` — not yet built)
   Transporte internacional (marítimo, aéreo, terrestre), agenciamiento aduanero, almacenaje y distribución (frío y carga seca), consolidación de carga, seguro de mercancías, asesoría en comercio exterior. Commitment line: "Excelencia, puntualidad y transparencia en cada operación."

6. **Portal de Clientes** (not yet built — likely out of scope for this static marketing site)
   Authenticated client area: tracking de envíos en tiempo real, documentación digital, reportes y estadísticas, asistencia personalizada, historial de operaciones. This implies auth + backend data, unlike the rest of the static site — flag scope/architecture with the user before starting rather than assuming it belongs in this Astro project as-is.

7. **Contacto** (`#contacto` — not yet built)
   Bogotá, Colombia · info@gtmalliance.com · +57 310 000 0000

### Known content gaps to reconcile

- `Footer.astro` currently has placeholder contact info (México, `+52 (999) 999-9999`) — should be updated to Bogotá, Colombia / `info@gtmalliance.com` / `+57 310 000 0000` per the brief.
- `BaseLayout.astro`'s `orgSchema` JSON-LD has an empty `sameAs` and no `address` — update alongside the footer once contact/social data is finalized.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
