# PR #8 Review — feat(build): solidify gen-all pipeline with atomic writes & health endpoint

- **PR**: https://github.com/Supwils/episteme/pull/8
- **Branch**: `cursor/gen-all-atomic-health-9f39` (DRAFT, MERGEABLE)
- **Base**: `main` (`4987dcfc`)
- **Head**: `50cbdfae` (single commit, Cursor Agent)
- **Size**: +675 / −27 across 20 files (3 of them unrelated webp binaries)
- **Checks** (as of review): GitHub Actions `quality` + `build` **pass**. Native Vercel git previews for `episteme` / `universe-knowledge` **fail** — this is the known `vercel.json` `git.deploymentEnabled.main = false` gap (PR previews still fire the native integrator, which rejects Next serverless symlink dedupe). Production deploy job correctly skipped. Failures are not evidence for or against this diff.
- **Sibling**: PR #9 (`cursor/health-smoke-tests-93eb`) contains this commit plus Playwright smoke against `/api/health`.

---

## Summary

This PR does two unrelated things: (1) a small `writeFileAtomic()` helper (temp file in the same directory + `renameSync`) wired through most `gen-*` writers; (2) a new public `GET /api/health` that `readFileSync`s `public/search-index.json`, `lib/wiki-link-index.ts`, and `lib/backlinks-index.ts` on every request and 503s if they look wrong.

Atomic per-file replace is a reasonable local-DX patch. Current writers on `main` are plain `writeFileSync` / `writeFile` (`scripts/gen-search-index.ts:191`, `scripts/gen-wiki-links-index.ts:198`, etc.). `pnpm gen-all` is sequential (`package.json` `&&` chain); CI runs it, then typecheck/test/build, and never reads a file while it is being written. The only real race is a developer running `pnpm gen-all` against a live `pnpm dev`. The helper is POSIX-correct for that (same-dir rename, error unlink). It does **not** make the ten-step pipeline atomic, does not `fsync`, and does not gitignore leftover `.tmp-*` files. It also does not belong in `lib/` (Node `fs`, next to modules that have a server-only guard).

The health endpoint should not ship. Production already consumes **committed, bundled** artifacts: wiki/backlink indexes are imported as TypeScript modules; `search-index.json` is read from disk only on routes that declare `outputFileTracingIncludes` (`next.config.ts:69-76` covers `/api/search` and `/search`, not `/api/health`). No existing `app/api/**` route uses `existsSync` / `readFileSync` / `process.cwd()`. Vercel has no custom readiness probe; orchestration is GitHub Actions quality → build → `vercel deploy --prebuilt --archive`. The PR body itself says the endpoint is “optional” / “for future K8s”. That is ops surface without a consumer. Worse, the handler JSON.parses ~4.8 MB (`search-index.json` 2 770 262 + `backlinks-index.ts` 1 755 289 + `wiki-link-index.ts` 248 648 bytes) on every unauthenticated GET with `Cache-Control: no-store`, and its “count” regex dies at the first nested `}` — which the real indexes have.

Also in the commit, and not part of the claim: three regenerated `public/images/*-640.webp` files plus matching `manifest.json` byte counts (sharp non-determinism), and a new `docs/build-health-documentation.md` that is not linked from `docs/README.md`.

---

## Issues (severity, file:line, description, suggestion, status open)

### 1. Health check reads the wrong artifacts at the wrong time

- **Severity**: high
- **File:line**: `app/api/health/route.ts:29-73`, `app/api/health/route.ts:83-116`; contrast `next.config.ts:65-76`
- **Description**: `GET` walks `process.cwd()` and `readFileSync`s three paths, including the TypeScript **sources** `lib/wiki-link-index.ts` and `lib/backlinks-index.ts`. Runtime wiki/backlink use is `import { getBacklinks } from "./backlinks-index"` / `WIKI_LINK_INDEX` — compiled into the server bundle, never opened as `.ts` files. `public/search-index.json` _is_ read from disk on `/search` and `/api/search`, but only because `outputFileTracingIncludes` explicitly lists it; `/api/health` is absent. NFT cannot see `readFileSync(join(root, file.path))` where `file.path` is a loop variable, so the health lambda is likely to 503 on a healthy Vercel deploy (files missing) while `pnpm dev` returns 200. The repo has already documented this class of bug for search (`next.config.ts:65-68`: tracing cannot infer files that nothing imports).
- **Suggestion**: Do not add this route. Artifact integrity is CI’s job (`pnpm gen-all` + `git status --porcelain` empty, then typecheck/test/build). If a probe is ever needed, import the modules and/or reuse the already-traced search loader; do not open `.ts` sources.
- **Status**: open

### 2. Unauthenticated handler parses ~4.8 MB per request

- **Severity**: high
- **File:line**: `app/api/health/route.ts:115-116`, `app/api/health/route.ts:154-157`
- **Description**: Success path is `Cache-Control: no-store, must-revalidate`. Each hit `JSON.parse`s the full MiniSearch artifact (docs **and** the `index` blob, ~2.77 MB) and slurps 2.0 MB of generated TS, then throws almost all of it away after a structural sniff. No secret, no rate limit, no in-process cache (unlike `lib/search/server.ts:35-50` and `lib/random-article.ts:21-35`, which memoize). A public probe that forces a Node function to parse 5 MB is a cost surface, not a readiness check. The comment at `route.ts:12-13` (“lightweight… without blocking requests”) is false.
- **Suggestion**: Delete the route. A real probe would `stat` + check a tiny committed manifest, or simply hit `/` / `/search`.
- **Status**: open

### 3. No consumer — orchestration already gates deploy

- **Severity**: high
- **File:line**: PR body “Deployment Integration (Optional)”; `.github/workflows/ci.yml` quality → build → deploy; `vercel.json:5-8`
- **Description**: Production deploy is `vercel deploy --prebuilt --archive` after CI. Vercel does not take a custom readiness URL. The PR text admits this and defers to “future K8s / Docker”. This repo is not going to K8s. Sibling PR #9 then makes `/api/health` a Playwright smoke assertion, which would fail production smoke if issue 1 is right — or would always pass a statically baked 200 if Next caches the GET (the handler has no `export const dynamic`, unlike every other `app/api/**` route).
- **Suggestion**: Close the health work (this PR + the health half of #9). Do not add ops surface without a named consumer in `ci.yml` or Vercel.
- **Status**: open

### 4. `getCount` regex is wrong on the real indexes

- **Severity**: medium
- **File:line**: `app/api/health/route.ts:51-54` (wiki), `app/api/health/route.ts:67-70` (backlinks); real data `lib/wiki-link-index.ts:5-7,81-85`, `lib/backlinks-index.ts:10-16`
- **Description**: Both counters are `/NAME[^{]*\{([^}]+)\}/` — first `{` after the export name, then **first** `}`. `WIKI_LINK_INDEX` values are `string | Record<string, string>`; the first nested object is `"amartya-sen": { economics, philosophy, political-science }` at `lib/wiki-link-index.ts:81-85`. `BACKLINKS_INDEX` values are `Backlink[]` of `{ url, title }` objects, so the first `}` is inside the first backlink. Tests pass because fixtures are flat (`app/api/health/__tests__/route.test.ts:78-91`). The PR body’s sample `count: 3186` / `1951` is not what this code returns on main’s files.
- **Suggestion**: Moot if the route is dropped. If kept, count from the imported objects (`Object.keys(WIKI_LINK_INDEX).length`), never with a non-greedy-brace regex.
- **Status**: open

### 5. Unsolicited markdown that oversells the problem

- **Severity**: medium
- **File:line**: `docs/build-health-documentation.md` (new, 115 lines); not referenced from `docs/README.md`
- **Description**: Claims that before atomic writes, gen-all caused “应用启动时解析错误 / 测试中随机失败 / CI 偶发性构建失败” and that atomic writes + health enable “零停机重新部署”. CI never reads generated files concurrently with gen-all. `gen-icons` is listed as part of gen-all’s “10 步”; `scripts/gen-icons.ts` header says it is intentionally **not** in gen-all. The file is a new living doc for a route that should not exist.
- **Suggestion**: Delete. If atomic writes land, one sentence in `docs/CI-CD与渲染策略.md` is enough.
- **Status**: open

### 6. Unrelated image binary churn

- **Severity**: medium
- **File:line**: `public/images/ni-zan-woods-valleys-mount-yu-640.webp`, `visual-culture-bruant-poster-640.webp`, `yingzao-fashi-bracket-section-640.webp`; `public/images/manifest.json` byte fields 68954→68986 / 49878→49854 / 44410→44360
- **Description**: `gen-content-images` still writes webp via `sharp().toFile` (non-atomic). Running gen-all regenerated three 640px variants with slightly different bytes. That is libvips/sharp non-determinism, not an atomic-write fix. Quality’s “gen-all then `git status` must be clean” passed _because_ the churn was committed, which is the wrong reason.
- **Suggestion**: Drop these four files from the commit. Do not mix image lottery into a pipeline PR.
- **Status**: open

### 7. Atomic helper is fine for POSIX, but not production-critical, and slightly incomplete

- **Severity**: low (helper is usable; these are nits if cherry-picked)
- **File:line**: `lib/atomic-write.ts:16-33`; tests `lib/__tests__/atomic-write.test.ts:58-65`; `.gitignore:51-52` (`tmp/` only)
- **Description**:
  - Same-dir temp + `renameSync` is the correct POSIX pattern. This repo’s gen-all targets are macOS + Linux CI + Vercel; Windows replace-via-rename is not required. No `fsync` is acceptable for the stated goal (concurrent readers, not crash durability).
  - `writeFileSync` then `renameSync` without `fsync` still leaves `.tmp-*` next to the target on SIGKILL. Those names are not gitignored (`tmp/` is a directory). An interrupted `pnpm gen-all` dirties `lib/`, `public/`, `generated/` and would fail CI’s porcelain check if such a file were ever committed.
  - Cleanup test writes to `nonexistent/file.txt`, so the temp is never created; `readdirSync(FIXTURES)` cannot fail. It does not prove the `unlinkSync` path.
  - Per-file rename does not snapshot the whole gen-all graph (new `search-index.json` + old `corpus-meta.json` is still possible). Docs claim more than the code delivers.
  - Helper lives in `lib/` with `node:fs`. `lib/__tests__/backlinks-server-only.test.ts` exists because generated indexes in a client module once cost ~40 KB gzip / page. `atomic-write` is unused by the app today, but `lib/` is the wrong folder.
- **Suggestion**: Move to `scripts/atomic-write.ts`. Add `**/.tmp-*` to `.gitignore`. Keep same-dir rename. Do not sell pipeline-atomicity.
- **Status**: open

### 8. Import wiring is inconsistent and one comment is false

- **Severity**: low
- **File:line**: `scripts/gen-philo-index.ts` (dynamic `await import("../lib/atomic-write.js")` plus comment `// Import at top of file`); `scripts/gen-content-images.ts` same dynamic import; `scripts/format-ts.ts` static `from "../lib/atomic-write.js"`; `scripts/gen-search-index.ts` / `scripts/gen-wiki-links-index.ts` static `from "../lib/atomic-write"` (no `.js`)
- **Description**: All of these run under `node --import tsx`, so both forms work. The philo/content-images dynamic import plus “Import at top of file” is leftover agent noise. `gen-kb` and `gen-physics-dialogues` are covered transitively via `format-ts.ts` — that part of the PR body is true.
- **Suggestion**: One static import, same specifier as neighbouring `../lib/...` imports, no dynamic import.
- **Status**: open

---

## Verdict

**CLOSE_WITHOUT_MERGE**

Do not land this PR. The health route is the bulk of the diff and is the wrong layer: production does not re-validate generated files on the request path, CI already refuses a dirty gen-all, and `/api/health` as written would either 503 on Vercel (missing traced files, `.ts` sources not in the lambda) or become a 5 MB public parse on every hit. There is no orchestration consumer; Vercel has no custom probe; PR #9 should not be allowed to promote this URL into `test:e2e:smoke`.

Atomic writes are a small, separable improvement for local `pnpm gen-all` overlapping `pnpm dev`. They do not fix CI flakes (CI does not read while writing) and they do not make the ten-step pipeline atomic. Cherry-pick only that helper — moved out of `lib/`, with `.tmp-*` gitignored and consistent imports — and drop the rest.

Native Vercel preview red Xes are the pre-existing git-integration issue, not a reason to keep or merge this PR.

---

## Cherry-pick recommendation

| Piece                                                   | Action                                                                                                                                                                                                                                                              |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `writeFileAtomic` + `gen-*` / `format-ts.ts` call sites | **Cherry-pick**, after moving the helper to `scripts/atomic-write.ts`, adding `**/.tmp-*` to `.gitignore`, unifying imports, and rewriting the vacuous cleanup test. Skip `gen-icons` / `gen-narration-audio` unless you want them; they are not in `pnpm gen-all`. |
| `app/api/health/**`                                     | **Drop.** No consumer; wrong files; expensive; broken counts; fights `outputFileTracingIncludes`.                                                                                                                                                                   |
| `docs/build-health-documentation.md`                    | **Drop.** Unsolicited living doc; oversells.                                                                                                                                                                                                                        |
| `public/images/*` + `manifest.json`                     | **Drop.** Sharp byte lottery, unrelated.                                                                                                                                                                                                                            |
| PR #9 health smoke                                      | **Do not merge on top of this.** If #9’s `/random` Location-header assertions are independently useful, split them off; do not keep the health commit.                                                                                                              |

Suggested replacement commit (if the helper is still wanted), one line:

`fix(build): write gen-* outputs via same-dir temp+rename`

Body, at most two sentences: readers of JSON/TS during a local `pnpm gen-all` no longer see a truncated file. CI sequencing is unchanged; this is not a readiness probe.
