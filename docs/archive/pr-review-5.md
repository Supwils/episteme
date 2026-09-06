# PR #5 review — Add comprehensive API validation and redirect encoding tests

- **PR**: https://github.com/Supwils/episteme/pull/5
- **Branch**: `cursor/harden-redirects-apis-d7da` (OPEN, not draft)
- **Base**: `main` @ `4987dcfc` (`fix(site): harden release paths`) — this is current local main
- **Head**: `6c8c2755` (Cursor Agent, 2026-09-04)
- **Size**: +628 / −177 across 14 files (1 production code file, 9 test files, 4 unrelated image artifacts)
- **CI**: quality job green; **Build · Bundle budget red** (Lighthouse `ECONNREFUSED 127.0.0.1:33409` after bundle-check). Deploy job skipped.
- **Mergeable (GitHub)**: MERGEABLE. Repo policy still forbids GitHub PR merge onto `main`.

## Summary

This is a Cursor background-agent “hardening” PR opened on top of session #313, which already landed the real work: `Object.hasOwn` enum-key guards, search blank-limit + repeated-`q` page normalization, OG PNG + prototype-key tests, frontier non-scalar `level` rejection, learning-target inherited-key tests, and CJK `Location` encoding via `toRedirectLocation()`.

The only production code change is a no-op rewrite of `searchParams.get("q")` with a comment. Two existing high-value test files are **replaced wholesale** with shallower 400-status suites, deleting #313 regressions. Several new tests are vacuous (`if (status === 200)`, `try/catch` swallow, fake `redirect()` throw, secrets-leak substring scan). The PR also commits three regenerated 640px webp variants and `manifest.json` byte-count churn unrelated to redirects or APIs. PR body overclaims “85 new tests” and coverage of journeys / relation-review that are not in the diff.

Do not merge. Do not cherry-pick the commit.

## Issues

### 1. Replaces #313 frontier tests with a weaker, partly invalid suite

- **Severity**: bug
- **File**: `app/api/knowledge-frontier/__tests__/route.test.ts:6`
- **Description**: The PR rewrites the entire file. Main already covers inherited filter keys (`__proto__` / `constructor` / `toString`), non-scalar `level` objects/arrays, numeric+string levels, catalog snapshot `nodeCount`, mastered-state transition, oversized profiles, and pagination — including success-path `Cache-Control: private, no-store` and `X-Profile-Storage: local-only`. The replacement `validPayload` sets `status: "未解决"`, which is not a key of `KNOWLEDGE_FRONTIER_STATUS_META` (`mastered` | `ready` | `blocked` in `lib/knowledge-frontier.ts:4`). The cache-header test then does `if (response.status === 200) { … } else { expect([400, 404, 500]).toContain(response.status) }` (lines 131–148), so the success-path headers are never asserted and any error status passes. Unused `beforeEach` import.
- **Suggestion**: Keep main’s file. If extra 400 cases are wanted (invalid JSON, mixed-type `knownIds`), add them beside the existing tests with a real `status: "ready"`.
- **Status**: open

### 2. Replaces #313 learning-targets tests, drops inherited-key and catalog-equivalence coverage

- **Severity**: bug
- **File**: `app/api/learning-targets/__tests__/route.test.ts:1`
- **Description**: Main’s file asserts `Object.hasOwn` rejection for `domain`/`confidence` prototype keys, exact 404 body, and that `domain=sociology&level=4&confidence=direct` returns the same ids as `searchKnowledgeBranchTargets` (with a comment explaining why cell emptiness must not be asserted). The PR deletes all of that and substitutes existence checks (`toHaveProperty("results")`), a looser 404 `toContain`, and a “secrets leak” scan for `VERCEL_TOKEN` / `NODE_ENV` / `process.env` in catalog JSON (lines 64–76). That scan cannot fail unless an article title happens to contain those strings; it would then be a false failure. Session #313 `T-HARDEN-07` already put `Object.hasOwn` in `app/api/learning-targets/route.ts:24-27`.
- **Suggestion**: Keep main’s file. Do not land the secrets-leak test.
- **Status**: open

### 3. Redirect “encoding audit” never exercises production code

- **Severity**: bug
- **File**: `lib/__tests__/redirects-encoding.test.ts:10`
- **Description**: Four tests, none of which import `toRedirectLocation` from `lib/random-article.ts`. (1) Lines 10–23 throw a hand-rolled error when a local string has non-ASCII; `redirect()` is not called. (2) Lines 25–32 test `encodeURI`, not the production helper (which uses per-segment `encodeURIComponent(decodeURIComponent(...))`). (3) Lines 34–71 reimplement that helper inline, so a breakage in `toRedirectLocation` would not fail this file. (4) Lines 73–87 hard-code five ASCII paths and assert `redirect(path)` throws — Next’s `redirect()` always throws `NEXT_REDIRECT`, so this does not test encoding. The list is incomplete versus actual `redirect()` call sites (`app/human-history/eras/page.tsx`, tier fallbacks, `/random`). Main already has the real contract in `lib/__tests__/random-article.test.ts:67` (`every pool URL is ASCII-safe and idempotent`) plus `app/random/page.tsx:8`.
- **Suggestion**: Do not add this file. The production helper and its tests already exist.
- **Status**: open

### 4. Vacuous cache-header tests that skip their only assertion

- **Severity**: bug
- **File**: `app/api/knowledge-frontier/__tests__/plan.test.ts:70`
- **Description**: Uses `targetId: "nonexistent"` so the handler returns 404 (`app/api/knowledge-frontier/plan/route.ts:51-52`). The test then wraps the header asserts in `if (response.status === 200)`, which never runs. Existing `app/api/knowledge-frontier/plan/__tests__/route.test.ts:13-39` already asserts `private, no-store` and `local-only` on a **real** target (`political-science:security-dilemma-war-peace`) with a versioned payload. Same pattern in `app/api/knowledge-confluences/__tests__/[id].test.ts:15-29`: requests `id: "test-id"`, which 404s (`dynamicParams: false` catalog), swallows errors in `try/catch`, and only checks headers on 200. If it did run, `toContain("max-age=86400")` would match as a substring of actual `s-maxage=86400` while `max-age` is 3600 (`lib/knowledge-continuum-payload.ts:7-8`). Main already has the exact ISR contract in `app/api/knowledge-confluences/[id]/__tests__/route.test.ts:18-52`.
- **Suggestion**: Drop both new files. They duplicate and weaken existing tests.
- **Status**: open

### 5. Search API “fix” is a comment-only no-op; page-level repeated-q already landed

- **Severity**: suggestion
- **File**: `app/api/search/route.ts:26`
- **Description**: Diff is `const query = (searchParams.get("q") ?? "").slice(0, MAX_QUERY_LENGTH)` split into `qParam` + comment “use first value only”. `URLSearchParams.get` already returns the first value. Repeated `q` on the **page** was `T-HARDEN-20`: `app/search/page.tsx:57-59`, `app/search/__tests__/page.test.tsx:16-32` (including 121-char truncation), and `e2e/smoke.spec.ts:4-15`. API limit bounds, blank limit, and malformed limit are already in `app/api/search/__tests__/route.test.ts` (`T-HARDEN-01`). New `validation.test.ts` does add truncation / special-char echo / `limit=5.7` → `Math.trunc`, but those are a handful of asserts, not a hardening tranche.
- **Suggestion**: Leave `route.ts` as on main. If truncation/fractional-limit asserts are wanted, add them to the existing `route.test.ts`.
- **Status**: open

### 6. New OG tests duplicate a stronger existing file and do not mock the failure they name

- **Severity**: suggestion
- **File**: `app/api/og/__tests__/route.test.ts:35`
- **Description**: Main already has `app/api/og/__tests__/route.test.tsx` (`T-HARDEN-07`): stubs `fetch` to 503 so font fallback is real, asserts PNG magic bytes, and parameterizes `philosophy` / `unknown` / `__proto__` / `constructor` / `toString`. The new `.ts` file does not stub `fetch`, so “handles font loading failure” (lines 60–65) never forces the catch in `app/api/og/route.tsx:43-47`. “uses Object.hasOwn” (lines 35–41) only asserts HTTP 200. “truncates extremely long descriptions” (lines 51–58) only asserts 200. Chinese title is tested twice.
- **Suggestion**: Do not add `route.test.ts`. Keep `route.test.tsx`.
- **Status**: open

### 7. Daily/shuffle tests mostly assert that JSON has a `date` field

- **Severity**: suggestion
- **File**: `app/api/daily/__tests__/shuffle.test.ts:16`
- **Description**: Offset 0 vs 1 (lines 16–29) and repeated `offset=5&offset=10` (lines 52–60) never check that the offset was applied or that the first value won. Invalid offsets and `offset=999999999` only `toHaveProperty("date")`. `app/api/daily/shuffle/route.ts:10-11` already caps with `Math.abs(Math.trunc(raw)) % 100000`. The ISR / `no-store` header asserts in `route.test.ts:16-23` and `shuffle.test.ts:62-65` are the only checks that match production headers.
- **Suggestion**: If anything is reused, keep the two header asserts and drop the rest, or assert distinct selections / first-offset wins.
- **Status**: open

### 8. Unrelated generated image bytes in a test-only PR

- **Severity**: suggestion
- **File**: `public/images/manifest.json:410`
- **Description**: Three 640px webp variants (`ni-zan-woods-valleys-mount-yu`, `visual-culture-bruant-poster`, `yingzao-fashi-bracket-section`) and their `bytes` fields change by tens of bytes. No content or image-pipeline change is in the PR. This is `gen-content-images` non-determinism. Landing it dirties the image store and can confuse image-rights/budget diffs.
- **Suggestion**: Revert these four files. Never mix generated asset noise into an API-test PR.
- **Status**: open

### 9. PR body overclaims coverage and recommends the wrong follow-ups

- **Severity**: nit
- **File**: PR body (not in tree)
- **Description**: Claims “85 new tests”, journeys + relation-review suites, and “all 1369 tests pass / prepush green”. Diff has no journeys or relation-review files; those routes already have `plan/__tests__/route.test.ts`, `journeys/__tests__/route.test.ts`, `relation-review/__tests__/route.test.ts`. Follow-up list pitches in-memory rate limits, HTML sanitization of error messages, and structured validation logging — none of which fit this site (Vercel serverless has no shared limiter state; no new SaaS surface). CI build job is actually red.
- **Suggestion**: Ignore the body as a source of truth.
- **Status**: open

## Verdict

CLOSE_WITHOUT_MERGE

Session #313 already hardened the same surfaces this PR claims to audit: search repeated-`q` and limit parsing, OG/frontier/learning-targets `Object.hasOwn` enum keys, and CJK `Location` encoding on `/random`. This branch is based on that commit and then **overwrites** the frontier and learning-targets test files with weaker suites, including a `validPayload` whose status key is not in the production enum, so the only success-path header test never runs. The single production diff is a comment around `searchParams.get("q")`. New redirect, OG, confluence, and plan files either reimplement helpers, skip asserts behind `if (status === 200)`, or duplicate stronger tests already on main. Unrelated webp/manifest churn would land for no product reason. GitHub Actions quality is green; the build job failed in Lighthouse (`ECONNREFUSED`), and even a green CI would not justify a GitHub merge onto `main`. Close the PR. Do not merge locally.

Nothing in this commit is worth cherry-picking as a unit. The only non-harmful ideas are three small asserts (API query truncation to 120, fractional `limit` via `Math.trunc`, daily/shuffle cache headers) that can be written in a few lines on the existing test files if a later session wants them — not by taking this patch.
