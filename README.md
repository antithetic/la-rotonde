# La Rotonde

Monorepo for **La Rotonde** — Wine & HiFi Music Bar (Hillcrest, San Diego).

## Overview

- **[Turbo](https://turborepo.org/)** — monorepo tasks and build orchestration  
- **pnpm** v10+ — workspace package manager  
- **[Prettier](https://prettier.io/)** + `prettier-plugin-astro` — formatting (including `.astro`)  
- **ESLint** — linting across apps and packages  

## Apps

| App | Stack | Description |
|-----|--------|-------------|
| **`apps/web`** | [Astro](https://astro.build/) 5, UnoCSS | Public marketing site. Uses `@repo/design`, `@repo/constants`, `@repo/fonts`, `@repo/unocss`. |
| **`apps/studio`** | [Sanity](https://www.sanity.io/) 5, React 19 | Content Studio. Config and schema live in `@repo/sanity`; re-exports from `sanity.config.ts`. |

## Packages

| Package | Purpose |
|---------|--------|
| **`@repo/constants`** | Shared config: site metadata, nav, contact, hours, SEO, menu, events, legal, HiFi, Sanity project/dataset. |
| **`@repo/sanity`** | Sanity config, plugins, and schema types. Consumed by `apps/studio`. |
| **`@repo/design`** | Astro design system: layouts (e.g. `Base.astro`), components (e.g. `Container.astro`), styles, utils. Depends on `@repo/fonts`, `@repo/unocss`, `@repo/foundations`, `@repo/constants`. |
| **`@repo/foundations`** | Design tokens (colors, typography). Uses `@repo/fonts`. |
| **`@repo/fonts`** | Font setup (e.g. Space Grotesk variable). |
| **`@repo/unocss`** | Shared UnoCSS config and global styles for the web app. |

## Scripts (root)

| Script | Action |
|--------|--------|
| `pnpm dev` | Run dev servers (Turbo; e.g. Astro + Sanity) |
| `pnpm build` | Build all apps/packages (Turbo) |
| `pnpm lint` | Lint (Turbo) |
| `pnpm typecheck` | TypeScript typecheck (Turbo) |
| `pnpm format` | Format codebase with Prettier |

## Project structure

```
la-rotonde/
├── apps/
│   ├── studio/     # Sanity Content Studio
│   └── web/        # Astro site
├── packages/
│   ├── constants/  # Site/config constants
│   ├── design/     # Astro design system
│   ├── foundations/# Design tokens
│   ├── fonts/      # Font definitions
│   ├── sanity/     # Sanity config & schema
│   └── unocss/     # UnoCSS shared config
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.base.json
```

## Development

1. **Install:** `pnpm i`  
2. **Run everything:** `pnpm dev` (from root)  
3. **Web only:** `pnpm --filter web dev`  
4. **Studio only:** `pnpm --filter studio dev`  

Schema types are defined in `packages/sanity/src/schemaTypes/`. Studio uses `@repo/constants` for `projectId` and `dataset` (see `packages/constants/src/sanity.ts`).

---

See **PROGRESS.md** for milestones and roadmap.
