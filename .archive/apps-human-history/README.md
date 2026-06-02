# apps/human-history — Workspace Entry Point

This directory is the Turborepo workspace entry for the `@universe/human-history` app.

## Current Status

The actual source code lives at `human-history/website/` (a Vite 8 project). This `apps/human-history/` directory registers the package in the monorepo workspace until code migration is complete.

## Tech Stack (current — Vite)

- **Bundler**: Vite 8 (Rolldown / advancedChunks code-splitting)
- **Animation**: GSAP ^3.15
- **Language**: Plain JavaScript (no TypeScript yet)
- **Routing**: client-side SPA with `historyApiFallback`

## Migration Plan: Vite → Next.js

The goal is to migrate `human-history/website` to a Next.js 15 app under this directory.

### Why migrate?

- Align with `@universe/universe-physics` (also Next.js) for shared tooling and `packages/ui` reuse.
- Better SSR / ISR support for content-heavy history pages.
- Unified Turborepo pipeline (`turbo build`, `turbo dev`).

### Migration Steps

1. **Scaffold Next.js app** inside this directory:
   ```
   pnpm create next-app@latest . --typescript --tailwind --app
   ```
2. **Port route structure** — map current SPA routes to Next.js App Router `app/` directories.
3. **Port Vite code-split data files** — move `data/scholarly/`, `data/figures/`, `data/details/` into `app/` or `lib/` and replace lazy Vite chunks with Next.js `dynamic()` imports or route segments.
4. **Replace `historyApiFallback`** — no longer needed; Next.js handles routing natively.
5. **Port GSAP animations** — keep as-is; GSAP works with React / Next.js.
6. **Remove `vite.config.js`** after confirming build parity.
7. Run `pnpm --filter @universe/human-history build` and verify output.

### Caution Points

- The Vite config uses `rolldown` `advancedChunks.codeSplitting` (Vite 8 API). Next.js uses webpack/Turbopack — chunk strategy will differ and must be re-evaluated.
- Do **not** delete `human-history/website/` until the Next.js port is confirmed working in production.
- GSAP `gsap.registerPlugin()` calls must run client-side; wrap in `'use client'` components.
