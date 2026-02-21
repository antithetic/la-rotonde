# La Rotonde — TODO & development guide

Goals, quick reference, and tips for day-to-day development.

---

## Current sprint

_Focus for this iteration. Move items to “Goals (short term)” when you commit to them; check off when done._

- [ ] _Add 1–3 priorities here (e.g. “Define `page` and `event` Sanity types”, “Add `/menu` and `/events` routes”, “Add typecheck script to web + studio”)_
- [ ]
- [ ]

**Sprint notes:** _Optional: target date, blockers, or links to issues/PRs._

---

## Goals (short term)

- [ ] **Schema first** — Define Sanity document types (page, event, menu section, etc.) in `packages/sanity/src/schemaTypes/` and wire them into the Studio.
- [ ] **Web routes** — Implement core pages: Menu, Events, About, HiFi, Reservations, Contact, Legal (privacy, terms, accessibility) so nav links resolve.
- [ ] **Content pipeline** — Connect the Astro site to Sanity (client + GROQ) and render at least one content type (e.g. events or pages).
- [ ] **Typecheck everywhere** — Add `typecheck` script to apps (and packages that build) so `pnpm typecheck` is meaningful; fix any type errors.
- [ ] **CI** — Add a GitHub Actions workflow: install, lint, typecheck, build on push/PR to `main` and `develop`.
- [ ] **Deploy** — Get web app on Vercel and Studio on Sanity hosting; document URLs and env in README / `.env.example`.

---

## Goals (medium term)

- [ ] **SEO** — Use `@repo/constants/seo` (meta, Open Graph, JSON-LD) in Base layout and key pages.
- [ ] **Reservations** — Integrate or link to reservation flow (embed, redirect, or API).
- [ ] **Contact & map** — Finalize contact page with real phone/email and correct Google Maps embed from `@repo/constants/contact`.
- [ ] **Content polish** — Replace placeholder copy and assets (logo, OG image, favicon) with final brand assets.
- [ ] **Docs** — Update `apps/web` and `apps/studio` READMEs; add `.env.example` if any env vars are used.

---

## Quick reference

### Commands (from repo root)

| Command | What it does |
|--------|----------------|
| `pnpm i` | Install all workspace dependencies |
| `pnpm dev` | Run all dev servers (Turbo: web + studio) |
| `pnpm build` | Build all apps and their dependency packages |
| `pnpm lint` | Lint (Turbo runs each package’s `lint` if defined) |
| `pnpm typecheck` | Typecheck (Turbo; add `typecheck` script in apps for full coverage) |
| `pnpm format` | Format entire repo with Prettier |

### Run a single app

| Command | App |
|--------|-----|
| `pnpm --filter web dev` | Astro site (default port e.g. 4321) |
| `pnpm --filter studio dev` | Sanity Studio |
| `pnpm --filter web build` | Build web only |
| `pnpm --filter studio build` | Build studio only |
| `pnpm --filter studio deploy` | Deploy Studio to Sanity hosting |

### Important paths

| What | Where |
|------|--------|
| Sanity config & schema | `packages/sanity/src/index.ts`, `packages/sanity/src/schemaTypes/` |
| Sanity project/dataset | `packages/constants/src/sanity.ts` |
| Site metadata, nav, contact, SEO | `packages/constants/src/` |
| Design layouts & components | `packages/design/src/layouts/`, `packages/design/src/components/` |
| UnoCSS config & tokens | `packages/unocss/src/uno.config.ts`, `packages/foundations/src/` |
| Web app entry & layout | `apps/web/src/pages/`, `apps/web/src/layouts/Layout.astro` |

### Import patterns

- **Constants:** `import { SITE, SANITY } from '@repo/constants'` or `from '@repo/constants/site'`, `@repo/constants/nav`, etc.
- **Design:** `import Base from '@repo/design/layouts/Base.astro'`, `import Container from '@repo/design/components/Container.astro'`, `import '@repo/design/styles/main.css'`, `import { cn } from '@repo/design/utils/cn'`.
- **UnoCSS (web):** `import 'virtual:uno.css'` in layout; config from `@repo/unocss` in `astro.config.mjs`.

---

## Conventions

- **Branching** — Prefer short-lived branches; merge into `develop` for integration, then into `main` for release. Keep `main` deployable.
- **Commits** — Use clear messages; optional gitmoji for type (e.g. feat, fix, docs). Avoid large “everything” commits.
- **Constants** — Single source of truth in `@repo/constants`. No duplicate site/nav/contact/hours in apps; Sanity projectId/dataset only in `packages/constants/src/sanity.ts`.
- **Design** — New UI building blocks (layouts, components, tokens) go in `@repo/design`, `@repo/foundations`, or `@repo/unocss` so the web app stays thin.
- **Schema** — All Sanity types live in `packages/sanity/src/schemaTypes/` and are re-exported in `index.ts`; Studio only consumes `@repo/sanity`.

---

## Helpful tips

1. **Symlinks** — Astro’s Vite config uses `followSymlinks: true` so editing a workspace package (e.g. `@repo/design`) triggers reloads in `apps/web`.
2. **Studio config** — Changing `packages/sanity/src/index.ts` or schema types is enough; `apps/studio` has no local schema, only `export { default } from '@repo/sanity'`.
3. **Adding a new constant file** — Add `./newName`: `./src/newName.ts` to `packages/constants/package.json` exports and export from `src/index.ts` if you want the barrel.
4. **Adding a Sanity type** — Create `packages/sanity/src/schemaTypes/myType.ts` with `defineType`, then add to the `schemaTypes` array in `schemaTypes/index.ts`.
5. **New web page** — Add `src/pages/route.astro` (or `src/pages/route/index.astro`). Use `Layout` and `@repo/constants` for nav/SEO as needed.
6. **Format before commit** — Run `pnpm format` so Prettier stays consistent across the monorepo.

---

## Blocked / decisions

- **Reservations** — Decide: external link, embed (e.g. Resy, Tock), or custom form; then implement or link from `/reservations`.
- **Contact details** — Replace placeholder phone/email in `packages/constants/src/contact.ts` with real values when ready.
- **Maps embed** — Replace `embedUrl` placeholder in `contact.ts` with real Google Maps embed URL for the contact page.
- **Typecheck** — Apps don’t define `typecheck` yet; add and fix so CI can enforce.

---

_Update this file as goals and conventions evolve._
