# PR #7 review — feat(api): Request correlation, rate limiting, and body guards (tranche 3)

- **PR**: https://github.com/Supwils/episteme/pull/7
- **Branch**: `cursor/api-correlation-protection-aa43` → `main` (DRAFT, MERGEABLE)
- **Diff**: +1347 / −25, 1 commit (`067462b`)
- **CI**: quality (typecheck/lint/content/test) pass; build/bundle pass; production deploy skipped (not `main`)
- **Overlap**: sibling draft PR #6 (`cursor/api-protection-c20d`) shares 12 paths, including both helper modules and the same three generated webps
- **Reviewed**: 2026-09-05, against `origin/main` (session #313 already hardened public APIs; no limiter / request-id helpers on main)

Line numbers below refer to the PR head, not `main`.

## Summary

The PR adds three new helpers (`lib/api-request-id.ts`, `lib/api-rate-limiter.ts`, `lib/api-validation-logger.ts`) and wires them into seven public App Router handlers: GET `/api/search`, GET `/api/learning-targets`, GET `/api/daily/shuffle`, and POST `/api/knowledge-frontier` plus `plan` / `journeys` / `relation-review`. Each handler echoes `x-request-id`, returns 429 + `Retry-After` from an in-memory token bucket, and POST routes reject `Content-Length > 100_000` with 413 before `request.json()`. ISR/static routes (`/api/daily`, continuum, confluences) are correctly left alone. Session #313’s existing parsers (`knownIds` cap 2000, query slice 120, `Object.hasOwn` enum checks) are not rewritten.

That framing is larger than the protection it actually buys. The limiter is a process-local `Map` on Vercel serverless isolates, so the configured 15–100 req/min limits are per-instance and reset on cold start. The 413 path never measures the body; it trusts a client-controlled header and no-ops when the header is missing. The request-id helper is the only piece that is small, correct enough, and independently useful.

The PR also collides with draft PR #6: identical helper filenames, overlapping route edits, incompatible APIs (`checkRateLimit(identifier, config)` vs `checkRateLimit(request, limiterType)`), and the same unrelated `public/images/*-640.webp` + `manifest.json` byte-count drift. New route tests live in a new `app/api/__tests__/` tree instead of the existing colocated `app/api/<route>/__tests__/route.test.ts` files that #6 extends. A root English `API_PROTECTION_TRANCHE_3.md` documents the work outside `docs/`.

CI green is real (quality 2m43s, build 4m42s) and does not make the design suitable for `main` (push = production deploy).

## Issues (severity, file:line, description, suggestion, status open)

### 1. High — in-memory limiter is not production protection on Vercel

- **Where**: `lib/api-rate-limiter.ts:1-13`, used from all seven routes (e.g. `app/api/search/route.ts:31-35`, `app/api/daily/shuffle/route.ts:15-19`)
- **Description**: Module-level `const buckets = new Map()` plus on-request cleanup. File comment calls this “sufficient for serverless function scale.” On Vercel each isolate (and typically each route function) has its own map; scale-out multiplies the effective limit; cold start zeroes it. The PR body admits this, then still ships 429 as if the 15–100/min numbers were enforced. `resetIn` is computed and never sent. There is no shared store, no Edge middleware, no WAF hook.
- **Suggestion**: Do not merge this limiter. Abuse controls for this site belong at Vercel/Cloudflare, or in a shared store if a later change really needs application-level quotas. If a best-effort in-process limiter is still wanted, it needs an honest comment and must not duplicate PR #6.
- **Status**: open

### 2. High — 413 body guard trusts `Content-Length` and is skippable

- **Where**: `app/api/knowledge-frontier/route.ts:85-86` (same pattern at `plan/route.ts` ~189–196 of the diff, `journeys/route.ts`, `relation-review/route.ts`)
- **Description**: `if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE)` then 413; otherwise `await request.json()`. Omitting the header, sending a non-numeric value (`NaN > 100000` is false), or lying with a small `Content-Length` skips the guard. Vercel still accepts bodies up to ~4.5MB, so the stated “rejects >100KB payloads with 413 before parsing” is only true for honest clients. Session #313 already caps `knownIds` at 2000×200 chars in `parseRequest`; this header check does not tighten that for an adversarial sender.
- **Suggestion**: Cap actual bytes: `const text = await request.text(); if (text.length > MAX) return 413; JSON.parse(text)`. Put `MAX_BODY_SIZE` in one helper. Add a test that omits `Content-Length` and still 413s.
- **Status**: open

### 3. High — hard overlap with draft PR #6; cannot land both

- **Where**: both PRs add `lib/api-rate-limiter.ts`, `lib/api-validation-logger.ts`, and edit `app/api/search/route.ts`, `learning-targets/route.ts`, `knowledge-frontier/route.ts`, `knowledge-frontier/journeys/route.ts`, plus the same three `public/images/*-640.webp` files and `manifest.json`
- **Description**: APIs diverge. #6: `checkRateLimit(request, "search"|"userProfile"|"general"): NextResponse | null`, IP from `x-forwarded-for` first, IP masking, safe metadata, colocated test updates. #7: `checkRateLimit(identifier, config, cost)`, `x-real-ip` first, unmasked `clientId`, new `app/api/__tests__/*` files, extra request-id + 413. Merging either second will conflict; merging both would double-wrap routes.
- **Suggestion**: Close one. If any limiter work continues, pick a single helper API and rebase the other. Do not keep two drafts that both invent `lib/api-rate-limiter.ts`.
- **Status**: open

### 4. Medium — client-controlled identity keys the limiter

- **Where**: `lib/api-rate-limiter.ts:91-97`
- **Description**: `getClientIdentifier` prefers `x-real-ip`, then first hop of `x-forwarded-for`, then `cf-connecting-ip`, else `"unknown"`. If Vercel does not overwrite incoming `x-real-ip`, every spoofed value is a fresh bucket (limit bypass) and a new Map entry until the 10-minute idle cleanup (`cleanup` at lines 17-24). Tests encode this preference (`lib/__tests__/api-rate-limiter.test.ts` “prefer x-real-ip over x-forwarded-for”). PR #6 reads `x-forwarded-for` first and falls back to `"anonymous"`.
- **Suggestion**: Do not key a production limiter on a spoofable header. If the helper is kept for tests/local only, prefer platform-provided `x-forwarded-for` and bound Map size.
- **Status**: open

### 5. Medium — request-id echoes an unbounded client header

- **Where**: `lib/api-request-id.ts:7-9`
- **Description**: `x-request-id` / `x-correlation-id` are trimmed and returned as-is (else `randomUUID()`). That string is set on every response and passed into `console.warn` logs. No length, charset, or “looks like a UUID/token” check. Useful for correlation; unsafe as a raw echo.
- **Suggestion**: Accept only `[A-Za-z0-9._-]{1,128}` (or similar); otherwise generate. This is the piece worth keeping.
- **Status**: open

### 6. Medium — 413 tests can pass without asserting 413; new files ignore existing suites

- **Where**: `app/api/__tests__/knowledge-frontier-plan.test.ts:22-25`, `app/api/__tests__/knowledge-frontier.test.ts:41-44`; new tree `app/api/__tests__/` vs existing `app/api/search/__tests__/route.test.ts`, `app/api/knowledge-frontier/__tests__/route.test.ts`, `plan/__tests__/route.test.ts`
- **Description**: Both 413 tests wrap expectations in `if (bodyString.length > 100_000)`. If the fixture shrinks, the test is a silent pass. Neither tests missing `Content-Length`. Rate-limit tests fire 25–70 real handlers (`search.test.ts` 70 GETs against the phrase corpus; frontier 35 POSTs; plan 25 POSTs) and only assert `status === 429` count `> 0`. Journeys, relation-review, learning-targets, and daily/shuffle have no new coverage. Limiter module state has no reset; `beforeEach` is empty.
- **Suggestion**: Fail the test if the fixture is not over the limit. Assert 413 with and without the header. Extend the colocated `route.test.ts` files (as #6 does) instead of a parallel tree. Mock or isolate the bucket; do not stampede the catalog 70 times.
- **Status**: open

### 7. Medium — unrelated generated images and a root English report

- **Where**: `public/images/ni-zan-woods-valleys-mount-yu-640.webp`, `visual-culture-bruant-poster-640.webp`, `yingzao-fashi-bracket-section-640.webp`, `public/images/manifest.json`; `API_PROTECTION_TRANCHE_3.md`
- **Description**: Byte-count-only webp/manifest drift is `gen-content-images` noise, identical path set as PR #6, unrelated to API protection. The report lives at repo root in English; project docs are Chinese under `docs/` (one-off reports in `docs/archive/`). It also claims `generated/corpus*` / `search-stats.json` changed; they did not.
- **Suggestion**: Revert the three webps and manifest. Move any write-up to `docs/archive/` in Chinese, or drop it (the PR body already summarizes).
- **Status**: open

### 8. Low — copy-paste surface, dead import, weaker logger than #6

- **Where**: `app/api/search/route.ts:6` (imports unused `logValidationError`); `lib/api-validation-logger.ts:27-35` (unmasked `clientId`, `errors` may include `value`); `lib/api-rate-limiter.ts:2` (“sliding-window” vs token bucket); seven copies of the 429/413 block; `retryAfter!` at e.g. `app/api/daily/shuffle/route.ts:24`
- **Description**: Search never logs truncation (main already slices `q` to 120; #6 does log that). Logger writes full IP. #6 masks IP and truncates metadata. Boilerplate could have been one `guard(request, { limit, maxBody })` returning `NextResponse | null` — #6’s `checkRateLimit` already returns the 429. Unused import is not currently an ESLint error (`eslint.config.mjs` does not enable `no-unused-vars` for app/lib), but it is dead code.
- **Suggestion**: If any of this is rewritten, one helper, masked logs, no unused imports, comment matching the algorithm.
- **Status**: open

## Verdict

**CLOSE_WITHOUT_MERGE**

This is a draft and CI is green, but it should not land on `main`. The bulk of the +1347 is an in-process token bucket that cannot enforce the numbers it prints on Vercel, plus a 413 check that a client can skip by omitting `Content-Length`. Session #313 already bounded these POST bodies in `parseRequest`; this tranche adds a false sense of a second line of defense. Shipping it would also fight PR #6 on the same helper paths and the same generated images.

Cherry-pick:

- **Request ID — yes, as a tiny follow-up.** `lib/api-request-id.ts` (20 lines) plus `withRequestId` on the seven handlers is the only independently useful behavior. Cap incoming header length/charset before echo. Tests in `lib/__tests__/api-request-id.test.ts` are fine.
- **413 body guard — not as written.** The idea (reject oversized JSON before parse) is sound; the header-only implementation is not. Re-do as a byte-count helper with tests that omit `Content-Length`, or skip it and keep the existing parser caps.
- **Limiter — no.** Same serverless isolation problem as #6, worse IP header order, no IP masking, more copy-paste, no shared store. Do not cherry-pick. If naive-abuse 429s are still desired, close both drafts and decide once (WAF / Edge, or one swappable helper — #6’s shape is the less bad of the two, and still not real protection).

Close this PR rather than iterating in place: the unique value is ~20 lines, the rest is overlapping or bypassable, and two open drafts on `lib/api-rate-limiter.ts` are a merge hazard.
