# La Rotonde — Technical reference

Technical detail for each project milestone. Use with **PROGRESS.md** (checklists) and **TODO.md** (goals & quick reference).

---

## 1. Monorepo foundation

- **Workspace:** `pnpm-workspace.yaml` — `packages: [apps/*, packages/*]`; `onlyBuiltDependencies: [esbuild, sharp]`.
- **Turbo:** `turbo.json` — `build` depends on `^build`, inputs `$TURBO_DEFAULT$` + `.env*`, outputs `dist/**`, `.next/**` (excl. cache). `dev` and `lint` defined; `dev` is `persistent: true`, `cache: false`.
- **Root scripts** (`package.json`): `dev` → `turbo dev`, `build` → `turbo build`, `lint` → `turbo lint`, `typecheck` → `turbo typecheck`, `format` → `prettier --write .`. Package manager: `pnpm@10.15.1`.
- **TypeScript:** `tsconfig.base.json` — `strict: true`, `moduleResolution: bundler`, `module: ESNext`, `target: ESNext`, `allowImportingTsExtensions: true`, `noEmit: true`. Apps/packages extend this; add `"typecheck": "tsc --noEmit"` (or equivalent) in each app/package that should be typechecked so `pnpm typecheck` runs them via Turbo.
- **Prettier:** Root `.prettierrc`; `prettier-plugin-astro` for `.astro` files.
- **ESLint:** Root ESLint 9 + `eslint-plugin-import`, `eslint-plugin-prettier`, `eslint-plugin-simple-import-sort`. Studio has `apps/studio/eslint.config.mjs` and `@sanity/eslint-config-studio`.

---

## 2. Shared constants & config

- **Package:** `packages/constants/package.json` — `name: "@repo/constants"`, `type: "module"`, `exports` map each subpath to `./src/<name>.ts` (e.g. `"."` → `./src/index.ts`, `"./site"` → `./src/site.ts`, `"./sanity"` → `./src/sanity.ts`). `files: ["src"]`.
- **Imports:** Use `@repo/constants`, `@repo/constants/site`, `@repo/constants/nav`, `@repo/constants/contact`, `@repo/constants/hours`, `@repo/constants/seo`, `@repo/constants/social`, `@repo/constants/menu`, `@repo/constants/events`, `@repo/constants/legal`, `@repo/constants/hifi`, `@repo/constants/sanity`.
- **Key files:** `site.ts` (SITE: name, tagline, description, url, locale, timezone, currency, region, neighborhood, logo paths); `contact.ts` (ADDRESS, GEO, CONTACT, formatPhone); `nav.ts` (NAV_MAIN, NAV_FOOTER, NAV_LEGAL, ANCHORS); `seo.ts` (SEO_DEFAULTS, getLocalBusinessSchema(), formatPageTitle); `sanity.ts` (SANITY.projectId, SANITY.dataset — currently `dbn2d3oe`, `production`).

---

## 3. Design system & foundations

- **`@repo/fonts`:** `packages/fonts` — dependency `@fontsource-variable/space-grotesk`. Exports `./src/index.ts`, `./src/space-grotesk.ts`. Used in design Base layout via `import '@repo/fonts/space-grotesk'`.
- **`@repo/foundations`:** `packages/foundations` — `src/colors.ts` (tokens: color.primary, background-light, background-dark, borderRadius), `src/typography.ts`. Exports `.` and `./colors`. Consumed by `@repo/unocss` for theme (e.g. `tokens.color.primary`).
- **`@repo/unocss`:** `packages/unocss` — `src/uno.config.ts` (defineConfig with presetWind4, presetAttributify, presetIcons, presetTypography, presetWebFonts; theme from foundations; transformerDirectives, transformerVariantGroup), `src/styles/globals.css`. Exports `.` (config) and `./styles` (globals). Web app uses `import sharedConfig from '@repo/unocss'` and `UnoCSS(sharedConfig)` in `astro.config.mjs`.
- **`@repo/design`:** `packages/design` — peer `astro@^5.17.1`; deps: `@repo/fonts`, `@repo/unocss`, `@repo/foundations`, `@repo/constants`. Exports: `./components/*` → `./src/components/*`, `./layouts/*` → `./src/layouts/*`, `./styles/*` → `./src/styles/*`, `./utils/*` → `./src/utils/*`. Key files: `layouts/Base.astro` (doctype, lang, meta, viewport, favicons, title from SITE), `components/Container.astro` (class `brutal-container` with `@apply max-w-2xl mx-auto px-4`), `utils/cn.ts` (class merging for conditional classes).

---

## 4. Web app (Astro)

- **App:** `apps/web` — `astro@^5.17.1`, deps: `@repo/design`, `@repo/fonts`, `@repo/constants`; devDeps: `@repo/unocss`, `@unocss/astro`, `unocss`. Scripts: `dev` (astro dev), `build` (astro build), `preview` (astro preview).
- **Config:** `astro.config.mjs` — `integrations: [UnoCSS(sharedConfig)]` with `sharedConfig` from `@repo/unocss`; Vite `server.watch.followSymlinks: true` for workspace packages.
- **Layout:** `src/layouts/Layout.astro` — imports `virtual:uno.css`, `@repo/design/styles/main.css`, `Base`, `Container`, `SITE` from `@repo/constants/site`; wraps slot in `<Base title={...}><Container><slot /></Container></Base>`.
- **Home:** `src/pages/index.astro` — uses Layout, single `<h1 class="text-3xl font-bold">Hello World</h1>`.
- **Next steps:** Add routes under `src/pages/` (e.g. `menu.astro`, `events/index.astro`, `about.astro`, `hifi.astro`, `reservations.astro`, `contact.astro`, `legal/privacy.astro`). Add Sanity client and GROQ queries; optional `@sanity/astro` or fetch in frontmatter. SITE.url is `https://la-rotonde-web.vercel.app` — configure Vercel project and connect repo for deploy.

---

## 5. Sanity Studio

- **Studio app:** `apps/studio` — `sanity@^5.11.0`, `@sanity/vision@^5.11.0`, `react@^19.1`, `react-dom@^19.1`, `styled-components@^6.1.18`; deps: `@repo/constants`, `@repo/sanity`. Scripts: `dev` (sanity dev), `start` (sanity start), `build` (sanity build), `deploy` (sanity deploy), `deploy-graphql` (sanity graphql deploy), `lint` (oxlint). `sanity.config.ts` is a single line: `export { default } from '@repo/sanity'`.
- **Shared config:** `packages/sanity/src/index.ts` — `defineConfig({ name: 'la-rotonde', title: SITE.name, projectId: SANITY.projectId, dataset: SANITY.dataset, plugins: [structureTool(), visionTool()], schema: { types: schemaTypes } })`. Schema types imported from `./schemaTypes`.
- **Schema:** `packages/sanity/src/schemaTypes/index.ts` — currently `export const schemaTypes = []`. Add types here (e.g. `defineType` for page, event, menuSection, artist) and export as array; register in Sanity schema docs.
- **CLI:** `apps/studio/sanity.cli.ts` — projectId/dataset for CLI commands (should align with `@repo/constants/sanity`).
- **Deploy:** From repo root, `pnpm --filter studio deploy` (or `cd apps/studio && pnpm deploy`). First run may prompt for login and hostname.

---

## 6. CI/CD & quality

- **CI:** Add `.github/workflows/ci.yml` (or similar): checkout, setup pnpm (e.g. `pnpm/action-setup` with version from `packageManager`), `pnpm i --frozen-lockfile`, `pnpm lint`, `pnpm typecheck`, `pnpm build`. Run on push to `main`/`develop` and on pull_request. Ensure each app that should be built has a `build` script and Turbo has correct `outputs` (e.g. `apps/web` → `dist/`).
- **Web deploy:** Vercel — connect GitHub repo, root directory `apps/web` (or monorepo with root in repo and build command `pnpm build` / `pnpm --filter web build`). Set env vars if needed.
- **Studio deploy:** Sanity hosting — after `sanity deploy`, use the provided URL (e.g. `https://<project>.sanity.studio`) and optionally add CORS/origin in Sanity project settings for front-end domain.
- **Tests:** No test runner yet. To add: choose runner (e.g. Vitest for unit, Playwright for E2E), add scripts to root and relevant apps, run in CI.

---

## 7. Content & features

- **Schema:** In `packages/sanity/src/schemaTypes/` add files (e.g. `page.ts`, `event.ts`, `menuSection.ts`) using `defineType`/`defineField`; export from `index.ts` as `schemaTypes` array. Consider: `page` (title, slug, body/portable text, SEO), `event` (title, date, description, image, slug), `menuSection` (title, items array), `artist` if needed for HiFi.
- **Astro + Sanity:** Create Sanity client (e.g. in `apps/web` or a small `@repo/sanity-client`): use `projectId` and `dataset` from `@repo/constants/sanity`. In pages/layouts, run GROQ in frontmatter and pass data to components. Optional: `@sanity/astro` or Presentation for live preview.
- **Pages:** Map to nav: Menu (`/menu` — use `@repo/constants/menu` or Sanity), Events (`/events`, `/events/[slug]`), About (`/about`), HiFi (`/hifi` — `@repo/constants/hifi`), Reservations (`/reservations`), Contact (`/contact` — use CONTACT, ADDRESS, GEO; optional map embed), Legal (`/legal/privacy`, `/legal/terms`, `/legal/accessibility`).
- **SEO:** Use `SEO_DEFAULTS`, `formatPageTitle`, `getLocalBusinessSchema()` from `@repo/constants/seo` in Base layout or per-page; add `<meta>`, Open Graph tags, and `<script type="application/ld+json">` with JSON-LD.

---

## 8. Documentation & polish

- **READMEs:** `apps/web/README.md` — replace Astro boilerplate with app-specific intro, scripts (`pnpm dev` from root vs from `apps/web`), env vars, deploy link. `apps/studio/README.md` — keep or shorten Sanity intro; add projectId/dataset source (`@repo/constants`), deploy command. Optionally add short README in `packages/design`, `packages/sanity` for consumers.
- **Env:** If you introduce env vars (e.g. `PUBLIC_SANITY_PROJECT_ID` override, analytics IDs), add `.env.example` at root or per app listing names and example values; document in README. Do not commit `.env`.
- **Typecheck:** Add `"typecheck": "tsc --noEmit"` to `apps/web`, `apps/studio`, and any package that has a `tsconfig.json` with `noEmit: true`, so `pnpm typecheck` runs across the repo. Fix any reported errors and optionally enable stricter options.
