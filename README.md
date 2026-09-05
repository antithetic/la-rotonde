# La Rotonde

Website for **La Rotonde**, a HiFi music and social club.

This is a [pnpm](https://pnpm.io) + [Turborepo](https://turbo.build) monorepo. The public site is an [Astro](https://astro.build) app; content is managed in [Sanity Studio](https://www.sanity.io). The two apps are scaffolded but not connected yet — the frontend still ships the Astro starter page, and the Studio schema is empty.

## Repository layout

```text
la-rotonde/
├── apps/
│   ├── frontend/   # Astro 7 site
│   └── studio/     # Sanity Studio (project kzqf9i5y, dataset production)
├── packages/       # Shared packages (none yet)
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

Workspace packages live under `apps/*` and `packages/*`.

## Prerequisites

- [Node.js](https://nodejs.org) 22.12 or later (required by the frontend)
- [pnpm](https://pnpm.io) 11.5 or later — the root `package.json` `devEngines` field will download a matching pnpm if needed

## Getting started

From the repository root:

```sh
pnpm install
pnpm dev
```

`pnpm dev` starts both apps through Turbo:

| App      | Command (from root)          | Local URL             |
| -------- | ---------------------------- | --------------------- |
| Frontend | `pnpm --filter frontend dev` | http://localhost:4321 |
| Studio   | `pnpm --filter studio dev`   | http://localhost:3333 |

To preview a production frontend build:

```sh
pnpm --filter frontend build
pnpm --filter frontend preview
```

## Scripts

Root scripts (run from the repository root):

| Script        | Description                         |
| ------------- | ----------------------------------- |
| `pnpm dev`    | Start all workspace `dev` tasks     |
| `pnpm build`  | Build all workspace apps            |
| `pnpm format` | Format the repo with Prettier       |
| `pnpm lint`   | Lint the repo with Oxlint (`--fix`) |

Useful frontend scripts (`apps/frontend`):

| Script         | Description                   |
| -------------- | ----------------------------- |
| `pnpm astro …` | Pass through to the Astro CLI |

Useful Studio scripts (`apps/studio`):

| Script                | Description                     |
| --------------------- | ------------------------------- |
| `pnpm start`          | Serve a production Studio build |
| `pnpm deploy`         | Deploy Studio to Sanity         |
| `pnpm deploy-graphql` | Deploy the Sanity GraphQL API   |

## Apps

### Frontend (`apps/frontend`)

Astro 7 site using the official Basics template. Pages live in `src/pages`, shared chrome in `src/layouts`, and components in `src/components`. TypeScript is strict (`astro/tsconfigs/strict`). There is no Sanity client, adapter, or content query yet.

### Studio (`apps/studio`)

Sanity Studio 6 for the **La Rotonde** project (`kzqf9i5y` / `production`). Plugins: Structure and Vision. Document types are registered in `schemaTypes/index.ts` (currently an empty list). Auto-updates are enabled in `sanity.cli.ts`. The workspace package name is `studio`.

## Tooling

- **pnpm workspaces** — install and run from the repo root
- **Turborepo** — orchestrates `dev` and `build`; build outputs are `dist/**`
- **Prettier** — `prettier-plugin-astro`, single quotes, no semicolons
- **Oxlint** — TypeScript, Unicorn, React, and OXC plugins; correctness rules are errors
