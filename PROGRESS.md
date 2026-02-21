# La Rotonde — Project progress & milestones

High-level milestones. Check off or date items as you go. **Technical detail for each section lives in [TECH.md](./TECH.md).**

---

## 1. Monorepo foundation

- [x] pnpm workspace (`pnpm-workspace.yaml`) with `apps/*` and `packages/*`
- [x] Turbo config (`turbo.json`) for `build`, `dev`, `lint` (and `typecheck` where applicable)
- [x] Root scripts: `dev`, `build`, `lint`, `typecheck`, `format`
- [x] Shared TypeScript base (`tsconfig.base.json`)
- [x] Prettier + `prettier-plugin-astro` for formatting
- [x] ESLint setup (root and app-specific where needed)

---

## 2. Shared constants & config

- [x] **`@repo/constants`** package with exports for:
  - [x] `site` — name, tagline, description, url, locale, timezone, currency, region, neighborhood, logo paths
  - [x] `nav` — main nav, footer nav, legal links, anchors
  - [x] `contact`, `hours`, `seo`, `social`, `menu`, `events`, `legal`, `hifi`
  - [x] `sanity` — `projectId`, `dataset` for Sanity Studio

---

## 3. Design system & foundations

- [x] **`@repo/fonts`** — Space Grotesk variable font
- [x] **`@repo/foundations`** — design tokens (colors, typography)
- [x] **`@repo/unocss`** — shared UnoCSS config and global styles
- [x] **`@repo/design`** — Astro design package:
  - [x] `Base.astro` layout (HTML shell, meta, title, fonts)
  - [x] `Container.astro` (max-width, padding)
  - [x] Shared styles and utils (`cn`, etc.)

---

## 4. Web app (Astro)

- [x] **`apps/web`** — Astro 5 app
- [x] UnoCSS integration (shared config from `@repo/unocss`)
- [x] Design system integration (`@repo/design`, `@repo/constants`, `@repo/fonts`)
- [x] Root layout (`Layout.astro`) using `Base` + `Container`
- [x] Home page placeholder (`index.astro`)
- [ ] Content-driven pages (Menu, Events, About, HiFi, Reservations, etc.)
- [ ] Sanity content integration (queries, components)
- [ ] Deployment pipeline (e.g. Vercel; URL already in constants)

---

## 5. Sanity Studio

- [x] **`apps/studio`** — Sanity 5 + React 19
- [x] **`@repo/sanity`** — shared Sanity config (defineConfig, projectId, dataset from `@repo/constants`)
- [x] Structure Tool + Vision plugin
- [x] Schema entry point: `packages/sanity/src/schemaTypes/index.ts`
- [x] Studio re-exports config from `@repo/sanity` (`sanity.config.ts`)
- [ ] Document types (e.g. page, event, menu section, artist, etc.)
- [ ] Custom structure/desk configuration if needed
- [ ] Deploy Studio (e.g. `sanity deploy` / Sanity hosting)

---

## 6. CI/CD & quality

- [ ] CI pipeline (e.g. GitHub Actions): install, lint, typecheck, build
- [ ] Branch/PR checks (e.g. `main`, `develop`)
- [ ] Deploy web app (e.g. Vercel)
- [ ] Deploy Sanity Studio (e.g. Sanity’s hosting)
- [ ] Optional: E2E or visual regression tests

---

## 7. Content & features

- [ ] Define and implement Sanity schema types for site content
- [ ] Fetch and render Sanity content in Astro (GROQ, optional Presentation)
- [ ] Menu page (wine, spirits, food — data from constants or Sanity)
- [ ] Events listing and detail pages
- [ ] About / The Bar page
- [ ] HiFi setup page
- [ ] Reservations (link or embed)
- [ ] Contact + map
- [ ] Legal pages (privacy, terms, accessibility)
- [ ] SEO (meta, Open Graph, structured data) using `@repo/constants/seo`

---

## 8. Documentation & polish

- [ ] README per app/package where useful (e.g. `apps/studio`, `apps/web`)
- [ ] Environment variables documented (e.g. `.env.example`)
- [ ] Feature specs or ADRs for major decisions (optional)
- [ ] Final lint/format/typecheck pass and any rule tuning

---

_Adjust checkboxes and add dates as you complete work. See [TECH.md](./TECH.md) for implementation details._
