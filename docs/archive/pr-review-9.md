# PR #9 Review — test: add health endpoint and random redirect smoke tests

- **PR**: https://github.com/Supwils/episteme/pull/9
- **Branch**: `cursor/health-smoke-tests-93eb` (DRAFT, `MERGEABLE`)
- **Base**: `main`
- **Review date**: 2026-09-05
- **Diffstat**: +721 / −36 across 21 files; unique-to-this-PR commit is only `e2e/smoke.spec.ts` (+46/−9)

## Summary

This is not a smoke-only PR. Head `17e6a44c` sits on `50cbdfae`, which is the entire payload of [PR #8](https://github.com/Supwils/episteme/pull/8) (`feat(build): add atomic writes and health endpoint`). `#8` is still **open + draft**, so the stack has a base, but merging `#9` would land `#8` as well: `GET /api/health`, `lib/atomic-write.ts`, every `gen-*` write path, a new English/Chinese mix doc, and three regenerated WebP variants.

The unique commit (`17e6a44c`) adds two Playwright cases to `e2e/smoke.spec.ts`:

1. **`/api/health` smoke** — `page.goto("/api/health")`, assert 200 and `artifacts.*.ok`. This test **cannot pass on current `main`**. There is no health route in `app/api/` (existing handlers are daily / search / continuum / frontier / learning-targets / og). CLAUDE.md’s API inventory does not include health. Vercel has no custom readiness probe. The route should not exist; therefore this smoke must not land.
2. **`/random` Location-header smoke** — intended to pin the CJK `ERR_INVALID_CHAR` regression. That bug is **already fixed on `main`** (`fb3b5a6f`, `toRedirectLocation` in `lib/random-article.ts`). Main already has:
   - production smoke requiring final 200 + article-depth path (`e2e/smoke.spec.ts:17-24`);
   - a unit test that encodes **every** pool URL and asserts ASCII (`lib/__tests__/random-article.test.ts:67-75`).

The new random test is **not strictly stronger**. Playwright `page.goto` follows redirects and returns the **last** response, so the 3xx/`Location` branch is dead. It also relaxes the status assertion from `200` to `{200,301,302,303,307,308}` and never forces a CJK destination.

CI on the PR: `Typecheck · Lint · Content · Test` pass (3m21s), `Build · Bundle budget` pass (5m4s, includes `test:e2e:smoke` — green only because `/api/health` exists on this branch). Native Vercel Git previews failed (expected; `vercel.json` disables git deploy on `main` because of serverless symlink dedup; PR previews still fire and fail the same way). `Deploy to Vercel (production)` correctly skipped.

## Issues

### 1. High — `e2e/smoke.spec.ts:4-29` — Health smoke depends on a route that should not exist

**Description.** `test("health endpoint validates generated indexes")` navigates to `/api/health` and requires HTTP 200 plus `body.ok === true`. That route is introduced by stacked commit `50cbdfae` (`app/api/health/route.ts`). On current `main` this test 404s. Project constraints: do not add smoke that depends on a health route that should not exist. Vercel does not use custom readiness probes (PR #8’s own body says so). CLAUDE.md lists the API surface as daily · search · learning-targets · knowledge-continuum · knowledge-frontier · og — no health.

**Suggestion.** Drop this test. Do not merge `/api/health`. Artifact freshness is already gated by CI `pnpm gen-all` + dirty-tree check and by `check-content` / search-index unit tests.

**Status.** open

### 2. High — `app/api/health/route.ts:27-73` and `:83-161` — Health handler reads TS sources from `process.cwd()`; will not work as a production probe

**Description.** The handler `readFileSync`s `public/search-index.json`, `lib/wiki-link-index.ts`, and `lib/backlinks-index.ts` relative to `process.cwd()`. Those `.ts` files are compile inputs; production serverless sees bundled JS. `next.config.ts` traces corpus files only for `/api/search` and `/search` (`outputFileTracingIncludes`, lines 69–75) — **nothing traces `/api/health`**. Local `next start` in a full checkout (CI smoke) still has the source tree, so the new smoke is green in GitHub Actions and red/503 as a real Vercel readiness check. It also parses multi-megabyte artifacts on every unauthenticated GET (search-index ~2.8MB, backlinks ~1.8MB) — a public DoS footgun for a probe nobody will call.

**Suggestion.** Do not ship this endpoint. If a future orchestrator needs readiness, check files at **build** time (CI already does) rather than at request time against source paths.

**Status.** open

### 3. Medium — `e2e/smoke.spec.ts:31-48` — Location-header assertion is dead code; test is weaker than main

**Description.** `page.goto("/random", { waitUntil: "commit" })` follows redirects. Playwright returns the **final** document response (the article, status 200), not the 307. The branch `if (status && status >= 300 && status < 400)` therefore never runs, so `headers()["location"]` is never inspected. Nested `if (location)` would also swallow a 3xx with a missing header. Compared with main’s smoke (`e2e/smoke.spec.ts:17-24`):

| Check                     | `main`                             | PR #9                     |
| ------------------------- | ---------------------------------- | ------------------------- |
| Final status              | must be 200                        | 200 **or** any 3xx        |
| Article-depth path        | yes                                | yes (same)                |
| Not `/daily` or `/random` | yes                                | yes (same)                |
| ASCII `Location`          | n/a (unit-tested for **all** URLs) | intended, but unreachable |
| CJK destination forced    | n/a (unit pool includes CJK)       | no; `/random` is random   |

The original production failure was Node `ERR_INVALID_CHAR` → **500**. Main’s `expect(status).toBe(200)` already catches that. `fb3b5a6f` added `toRedirectLocation` plus `makes every pool URL safe for a Location header`, which is a stronger pin than one random e2e hit.

**Suggestion.** Do not replace the main test with this version. A header-level e2e, if ever wanted, must use `page.request.get("/random", { maxRedirects: 0 })` (or `request.get`), assert 307, then ASCII `Location`. Even then it is optional given the exhaustive unit test.

**Status.** open

### 4. Medium — PR stacks `#8` in full; title/body understate the merge

**Description.** Git: `origin/main..HEAD` = `50cbdfae` + `17e6a44c`. Unique vs `#8` = only `17e6a44c` (smoke.spec.ts). Files that would land include `app/api/health/**`, `lib/atomic-write.ts`, ten `scripts/gen-*` edits, `docs/build-health-documentation.md`, and three `public/images/*-640.webp` plus `manifest.json` byte-count churn. The PR title is `test: add health endpoint and random redirect smoke tests`; the body offers “merge this PR instead of #8”. That would smuggle a product API and generator rewrite under a test label.

**Suggestion.** Close. Do not merge as a substitute for `#8`. `#8` should be reviewed (and likely closed) on its own merits.

**Status.** open

### 5. Low — `public/images/manifest.json` + 3 WebP binaries — unrelated generator noise

**Description.** `ni-zan-woods-valleys-mount-yu-640.webp`, `visual-culture-bruant-poster-640.webp`, `yingzao-fashi-bracket-section-640.webp` and their manifest `bytes` fields change by tens of bytes. No image pipeline work is claimed. Typical sharp non-determinism from an incidental `gen-content-images` run.

**Suggestion.** Revert these four files if any of this stack is rewritten.

**Status.** open

### 6. Low — `app/api/health/route.ts:67-70` — Backlinks `getCount` regex is wrong

**Description.** `BACKLINKS_INDEX[^{]*\{([^}]+)\}` stops at the first nested `}` (`{ url, title }`). Reported `count` is ~1, not ~1951. Smoke only checks `count > 0` when present, so a bogus 1 still passes. Wiki-link count (`:51-54`) happens to work because that object is flat.

**Suggestion.** Moot if the endpoint is dropped. Do not treat the smoke `count > 0` loop as coverage of index integrity.

**Status.** open

### 7. Low — `app/api/health/__tests__/route.test.ts:89` (and other `__setMock*` calls) — `as any` without comment

**Description.** CLAUDE.md §10 forbids `any` / `@ts-ignore` without a reason comment. The fs mock helpers are not on the `node:fs` type, so the tests cast `(mockFs as any)` throughout.

**Status.** open

### 8. Low — `scripts/gen-philo-index.ts:17,71-72` — leftover `writeFileSync` import; dynamic import with a lying comment

**Description.** Line 17 still imports `writeFileSync`. Line 71 comment says `// Import at top of file` immediately above an inline `await import("../lib/atomic-write.js")`. Other gens use a static import.

**Status.** open

### 9. Low — `docs/build-health-documentation.md` — new doc not in the docs map; mixed EN title

**Description.** Title `# Build & Health Pipeline`. Repo rule: all `.md` docs in Chinese. Not linked from `docs/README.md`. `docs/` is `paths-ignore` for CI, so this would not even deploy, but it still should not land with the rest of `#8`.

**Status.** open

## CI

| Check                                                  | Result                                                                   |
| ------------------------------------------------------ | ------------------------------------------------------------------------ |
| Typecheck · Lint · Content · Test                      | pass (3m21s)                                                             |
| Build · Bundle budget (includes `pnpm test:e2e:smoke`) | pass (5m4s)                                                              |
| Deploy to Vercel (production)                          | skipped (PR, correct)                                                    |
| Vercel Git preview (`episteme` + `universe-knowledge`) | fail — native git deploy, known symlink issue; not a defect of this diff |

Smoke is green **on this branch** because `/api/health` exists in the same tree. That is not evidence the tests are valid on `main`.

## Cherry-pick

**Do not cherry-pick `17e6a44c`.**

- The commit is a single-file smoke edit, but it **includes the health test**. Applied to `main` it would fail CI (`/api/health` 404).
- The random half is **not strictly stronger** than `main` (`e2e/smoke.spec.ts:17-24` + `lib/__tests__/random-article.test.ts:67-75`). The only new claim (ASCII `Location`) does not execute under Playwright `page.goto`.
- A hypothetical rewrite using `page.request.get("/random", { maxRedirects: 0 })` would be independent of `/api/health` and could live in a tiny follow-up. It is still optional: `fb3b5a6f` already exhaustively unit-tests encoding, and the existing smoke already fails on the 500 that the CJK bug produced.

Atomic-write (`lib/atomic-write.ts` + gen-\* rewires) is `#8`’s problem, not this PR’s unique value. Do not pull it in via `#9`.

## Verdict

**CLOSE_WITHOUT_MERGE**

This draft is `#8` plus two smokes. The health smoke must not land because `/api/health` should not exist (no Vercel probe, not in the API inventory, reads untraced TS sources, public multi-MB parse). The random smoke does not actually inspect `Location` (Playwright follows redirects) and is weaker or equal to what `main` already runs after `fb3b5a6f`. Merging would also drag in generator rewrites, an unused readiness endpoint, and unrelated WebP churn under a `test:` title. Close `#9`; do not use it as a vehicle to land `#8`. Leave main’s `/random` smoke as-is.
