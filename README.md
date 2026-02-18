# La Rotonde

Monorepo for **La Rotonde Wine & HiFI Music Bar**

## Overview

This monorepo is currently set up with:

- [Turbo](https://turborepo.org/) for monorepo management and build orchestration
- [Prettier](https://prettier.io/) and [prettier-plugin-astro](https://github.com/withastro/prettier-plugin-astro) for code formatting

### Key Scripts

- `pnpm dev` - Run development servers with Turborepo.
- `pnpm build` - Build all packages/apps.
- `pnpm lint` - Lint the codebase.
- `pnpm typecheck` - Run TypeScript typechecking.
- `pnpm format` - Format the entire codebase with Prettier.

### Project Structure

- Managed by PNPM v10+
- Prettier config supports `.astro` files.
- Common ignore patterns for output, dependencies, and environment files.

---

## TODO

- [ ] Add apps and/or packages to the monorepo
- [ ] Set up CI/CD pipelines
- [ ] Flesh out documentation
- [ ] Add linting rules and configurations
- [ ] Write initial feature specs

_Feel free to update this TODO list as development progresses._
