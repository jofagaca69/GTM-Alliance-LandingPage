# AGENTS.md

This file provides guidance to Claude Code and other coding agents when working with code in this repository. `CLAUDE.md` is a symlink to this file.

## Project status

This is an Astro site scaffolded from the `minimal` starter template and not yet customized — `src/pages/index.astro` still contains the default placeholder markup. There is no component library, styling system, or content collection set up yet; these will be introduced as the actual GTM Alliance landing page is built out.

## Commands

Package manager is pnpm (see `pnpm-workspace.yaml`), run from the repo root.

- `pnpm install` — install dependencies
- `pnpm dev` — start local dev server at `localhost:4321`
- `pnpm build` — build production site to `./dist/`
- `pnpm preview` — preview the production build locally
- `pnpm astro ...` — run Astro CLI commands (e.g. `pnpm astro add`, `pnpm astro check`)

There is no lint or test tooling configured yet. `pnpm astro check` runs Astro's typechecker against the strict TS config in `tsconfig.json`.

### Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Architecture

- Routing is file-based: any `.astro` or `.md` file placed under `src/pages/` becomes a route matching its file path (see [routing guide](https://docs.astro.build/en/guides/routing/)).
- `src/components/` doesn't exist yet but is the conventional location for Astro/React/Vue/Svelte components once added.
- Static assets (images, favicons, etc.) go in `public/` and are served as-is from the site root.
- `astro.config.mjs` currently has no integrations or adapters configured — add framework integrations (React, Tailwind, etc.) here via `astro add` as they're introduced.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
