# apps/universe-physics — Workspace Entry Point

This directory is the Turborepo workspace entry for the `@universe/universe-physics` app.

## Current Status

The actual source code lives at the project root under `universe-physics/`. This `apps/universe-physics/` directory exists only to register the package in the monorepo workspace (`apps/*` glob) until the code migration is complete.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Renderer**: React Three Fiber + Three.js
- **Animation**: Framer Motion, GSAP
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Test**: Vitest + Testing Library

## Migration Plan

Once the root-level `workspace` tooling is confirmed working, the contents of `universe-physics/` will be moved into this directory and this file will be updated to reflect standalone operation.

Steps:
1. Copy all source files from `../../universe-physics/` into this directory.
2. Remove the top-level `universe-physics/` directory.
3. Run `pnpm install` from the monorepo root to re-link dependencies.
4. Verify `pnpm --filter @universe/universe-physics dev` starts correctly.

## Shared Package

This app depends on `@universe/ui` (workspace:*). The `packages/ui` package must be built before running this app in production mode.
