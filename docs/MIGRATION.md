# Monorepo Migration Plan

> **注意**：本文件为早期英文草稿，已归档。  
> **当前迁移规范**请参阅 [`docs/迁移计划.md`](./docs/迁移计划.md)（中文，持续更新）。  
> **当前任务清单**请参阅 [`docs/任务清单.md`](./docs/任务清单.md)。

---

This document tracks the migration of existing standalone projects into the Turborepo workspace under `apps/`.

---

## Current State

| App | Location | Framework | Language | Status |
|-----|----------|-----------|----------|--------|
| universe-physics | `universe-physics/` | Next.js 16, React Three Fiber | TypeScript | Active development (Phase 0) |
| human-history | `human-history/website/` | Vite 8 (Rolldown) | JavaScript | Stable SPA |

### universe-physics Tech Stack
- Next.js 16, App Router
- React Three Fiber + Three.js + Postprocessing
- Framer Motion, GSAP
- Tailwind CSS v4, TypeScript
- Vitest + Testing Library

### human-history/website Tech Stack
- Vite 8 with Rolldown `advancedChunks` code-splitting
- GSAP ^3.15
- Plain JavaScript SPA with `historyApiFallback`
- Domain-chunked data files: `data/scholarly/`, `data/figures/`, `data/details/`

---

## Target Structure

```
universe-knowledge/
├── apps/
│   ├── universe-physics/   ← source moved from universe-physics/
│   └── human-history/      ← migrated from human-history/website/ (Vite → Next.js)
├── packages/
│   └── ui/                 ← shared component library (@universe/ui)
├── package.json            ← workspace root (workspaces: ["apps/*", "packages/*"])
├── turbo.json
└── pnpm-workspace.yaml
```

---

## Migration Steps

### Step 1 — Workspace Root (done by parallel agent)
- Create root `package.json` with `workspaces: ["apps/*", "packages/*"]`
- Create `turbo.json` with pipeline definitions for `build`, `dev`, `lint`, `test`
- Create `pnpm-workspace.yaml`

### Step 2 — universe-physics: Move Source into apps/

**Prerequisites**: Workspace root is confirmed working.

1. Copy all files from `universe-physics/` into `apps/universe-physics/`:
   ```bash
   cp -r universe-physics/. apps/universe-physics/
   ```
2. The `apps/universe-physics/package.json` already exists (created in workspace prep). Merge/overwrite the one copied from the original if needed.
3. Remove original directory:
   ```bash
   rm -rf universe-physics/
   ```
4. From monorepo root, run:
   ```bash
   pnpm install
   pnpm --filter @universe/universe-physics dev
   ```
5. Verify `http://localhost:3000` loads correctly.

**Caution**:
- The original `package.json` uses `"dev": "next dev -p 3033"`. The workspace version uses `--turbopack` and drops the explicit port. Restore `-p 3033` if port conflicts arise in the monorepo.
- `pnpm.onlyBuiltDependencies` (`esbuild`, `sharp`, `unrs-resolver`) must remain in the app-level `package.json` or be hoisted to root.

### Step 3 — packages/ui: Create Shared Package

Before `@universe/universe-physics` can be installed, `packages/ui` must exist:

1. Scaffold:
   ```bash
   mkdir -p packages/ui && cd packages/ui
   pnpm init
   ```
2. Set `"name": "@universe/ui"` in `packages/ui/package.json`.
3. Export shared components (buttons, layouts, typography tokens, etc.).
4. Run `pnpm install` from root to link the workspace reference.

### Step 4 — human-history: Migrate Vite → Next.js inside apps/human-history/

**Prerequisites**: `apps/universe-physics` is stable in the workspace.

1. Scaffold Next.js 15 app:
   ```bash
   cd apps/human-history
   pnpm create next-app@latest . --typescript --tailwind --app
   ```
2. Port SPA route structure to `app/` directories.
3. Replace Vite `advancedChunks` lazy imports with Next.js `dynamic()` or route-based splitting.
4. Port GSAP usage into `'use client'` components.
5. Test build: `pnpm --filter @universe/human-history build`.
6. Once confirmed, remove `human-history/website/`:
   ```bash
   rm -rf human-history/website/
   ```

---

## Caution / Risk Register

| Risk | Mitigation |
|------|-----------|
| Port conflict (universe-physics used 3033) | Add `-p 3033` back to `dev` script or configure in `turbo.json` |
| Vite `advancedChunks` has no direct Next.js equivalent | Evaluate `dynamic()` + route segments; re-benchmark bundle size |
| GSAP `registerPlugin` runs on server in Next.js | Wrap in `'use client'` directive; use `useEffect` for registration |
| `pnpm.onlyBuiltDependencies` may not hoist correctly | Keep in app-level `package.json`; test with `pnpm install --frozen-lockfile` |
| `human-history/website` still has users/deployments | Do NOT delete until new Next.js deployment is verified in production |
| `@universe/ui` does not exist yet | universe-physics will fail `pnpm install` until packages/ui is scaffolded |

---

## Completed

- [x] `apps/universe-physics/package.json` — workspace package config created
- [x] `apps/human-history/package.json` — workspace package config created (Vite deps retained + Next.js 15 added)
- [x] `apps/universe-physics/README.md` — migration instructions
- [x] `apps/human-history/README.md` — migration instructions + Vite→Next.js plan
- [ ] Root `package.json` (workspaces) — pending parallel agent
- [ ] `packages/ui` scaffold
- [ ] Source files moved into `apps/universe-physics/`
- [ ] human-history Next.js migration
