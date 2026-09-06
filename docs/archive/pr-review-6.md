# PR Review — #6 feat(api): add rate limiting and validation logging for public endpoints

- **PR**: https://github.com/Supwils/episteme/pull/6
- **Branch**: `cursor/api-protection-c20d` → `main` (DRAFT, MERGEABLE)
- **Author**: Cursor Agent via Supwils
- **Commit**: `fa54a68` (single commit)
- **Diff**: +969 / −12 across 15 files (3 of them unrelated webp binaries)
- **CI**: Quality pass, Build · Bundle budget pass, production deploy skipped (not `main`). Vercel preview succeeded.
- **Reviewed against**: current `main` (session #313 API hardening already landed), sibling draft PR #7, Vercel serverless constraints.
- **Reviewer date**: 2026-09-05

## Summary

PR #6 adds an in-process token-bucket rate limiter (`lib/api-rate-limiter.ts`) and a structured `console.warn` validation logger (`lib/api-validation-logger.ts`), then wires both into four App Router handlers:

| Route                              | Method | Limiter profile               | Claimed limit |
| ---------------------------------- | ------ | ----------------------------- | ------------- |
| `/api/search`                      | GET    | `search`                      | 60/min        |
| `/api/knowledge-frontier`          | POST   | `userProfile`                 | 30/min        |
| `/api/knowledge-frontier/journeys` | POST   | `userProfile` (shared bucket) | 30/min        |
| `/api/learning-targets`            | GET    | `general`                     | 120/min       |

The PR is honest in one important place: the module comment and the PR body admit that each serverless isolate keeps its own `Map`, so the advertised per-IP ceiling is multiplied by instance count. That admission does not make the control useful. On Vercel, in-memory limiting is not a protection layer; it is a per-isolate counter that resets on cold start, does not apply to CDN cache hits (`SEARCH_CACHE_CONTROL` is `public, s-maxage=86400`), and is bypassable if the identifier is the leftmost `x-forwarded-for` hop.

Session #313 already hardened these handlers at the right layer for this codebase: search `limit` parsing, `Object.hasOwn` enum guards, frontier `level` type checks, body field length caps (`knownIds` ≤ 2000, id ≤ 200). There is still no rate limiter on `main`, and there should not be one in app code. DDoS and abusive fan-out belong at Vercel Firewall / Cloudflare.

Sibling draft PR #7 (`cursor/api-correlation-protection-aa43`) reimplements the same two helper files with a different `checkRateLimit` signature, covers more routes, adds request IDs and 100 KB POST body guards, and carries the **same three webp + manifest.json byte-churn files**. The two PRs cannot both land.

Tests: CI is green. Actual new `it()` count is 30 (13 limiter unit + 14 logger unit + 2 search route + 1 frontier route), not the claimed 44 + 24 + 68. `learning-targets` and `journeys` have no new tests. Limiter state is a module singleton with no reset, so the unit test that exhausts the `anonymous` search bucket can flake the existing search route suite depending on Vitest worker reuse.

Unrelated `gen-content-images` output (`public/images/ni-zan-woods-valleys-mount-yu-640.webp`, `visual-culture-bruant-poster-640.webp`, `yingzao-fashi-bracket-section-640.webp`, plus `manifest.json` byte fields) does not belong in an API PR.

## Issues

### 1. In-process token bucket cannot enforce the advertised limits on Vercel

- **Severity**: High
- **File:line**: `lib/api-rate-limiter.ts:39-41`, `lib/api-rate-limiter.ts:99-115`
- **Description**: `InProcessRateLimiter` stores buckets in a process-local `Map`. `limiters.search|userProfile|general` and `lastCleanup` are module-scope singletons. On Vercel Node serverless / Fluid this Map lives in one isolate. Cold start wipes it. Concurrent isolates each allow a full 60/30/120 per IP. The PR documents this as “acceptable for naive abuse.” For a public knowledge site that is the entire threat model the PR claims to address, a control that silently under-enforces is worse than no control: operators will read 429s in logs and believe the edge is protected. Search is additionally cacheable (`app/api/search/route.ts:13`, `app/api/search/route.ts:59`); CDN hits never touch the limiter. Unique `?q=` values miss cache and still scale with isolate count.
- **Suggestion**: Do not merge an app-level limiter. If abusive traffic appears, add a Vercel Firewall / WAF rule (IP + path, challenge or block). Do not add Redis/Upstash for this; the product has no user system and does not need another SaaS.
- **Status**: open

### 2. Client identifier trusts the leftmost `x-forwarded-for` hop

- **Severity**: High
- **File:line**: `lib/api-rate-limiter.ts:119-127`; unit tests in `lib/__tests__/api-rate-limiter.test.ts` (“takes the first IP from x-forwarded-for when comma-separated”)
- **Description**: `extractClientIp` prefers `x-forwarded-for`, splits on comma, and uses the first value. That is the client-supplied end of the chain when the platform appends rather than overwrites. The unit test encodes spoofing as intended behavior. Combined with issue 1, an attacker can (a) rotate fake leftmost IPs to bypass the bucket and (b) insert a new Map entry per spoofed IP. `cleanup()` only deletes buckets whose `lastRefill` is older than `2 * windowMs`, and `checkLimit` updates `lastRefill` on every hit, including denials — so a spray of unique spoofed IPs is not reaped while the spray continues. PR #7 at least prefers `x-real-ip` (platform-set on Vercel). This PR does the opposite.
- **Suggestion**: If any identifier-based limiter is ever added, key only on a platform-owned header (`x-real-ip` / Vercel’s connecting IP), never leftmost XFF. That still does not make in-memory limiting correct (issue 1).
- **Status**: open

### 3. Hard conflict with sibling PR #7; both also share image noise

- **Severity**: High (process / merge)
- **File:line**: both PRs add `lib/api-rate-limiter.ts`, `lib/api-validation-logger.ts`, and patch the same four routes; both also change `public/images/manifest.json` and the same three `*-640.webp` files
- **Description**: `#7` (`feat(api): Request correlation, rate limiting, and body guards`) is a later tranche that redefines `checkRateLimit(identifier, config)` instead of `checkRateLimit(request, limiterType)`, adds `lib/api-request-id.ts`, 100 KB `Content-Length` guards, and more routes (`plan`, `relation-review`, `daily/shuffle`). The helper APIs are incompatible. Git cannot merge both helper files. The identical webp byte deltas (e.g. ni-zan 68954 → 68986) show both agents ran `gen-content-images` and committed non-API churn.
- **Suggestion**: Close #6. Review #7 on its own merits; do not try to rebase one limiter onto the other. Drop the image files from whichever PR remains.
- **Status**: open

### 4. Unrelated generated images committed

- **Severity**: Medium
- **File:line**: `public/images/manifest.json` (three `bytes` fields); `public/images/ni-zan-woods-valleys-mount-yu-640.webp`; `public/images/visual-culture-bruant-poster-640.webp`; `public/images/yingzao-fashi-bracket-section-640.webp`
- **Description**: Byte-size jitter typical of `gen-content-images` / sharp, unrelated to API protection. CI on this branch is green only because the PR committed the new bytes. Landing them on `main` risks idempotency fights with the next `pnpm gen-all` and a guaranteed conflict with #7.
- **Suggestion**: Revert these four files. Never include `public/images/*` in an API PR.
- **Status**: open

### 5. Attacker-controlled query strings written to logs without the sanitizer the PR itself added

- **Severity**: Medium
- **File:line**: `app/api/learning-targets/route.ts:71-80`
- **Description**: On invalid filter, the handler logs `searchParams.get("domain"|"level"|"confidence")` raw. `createSafeMetadata` truncates strings >100 chars and is used on search truncation and frontier parse failures, but not here. Platform URL limits bound the blast radius, but this is still unbounded-by-the-logger, attacker-chosen text in `console.warn`. The 404 path (`:54-60`) logs `targetId.slice(0, 100)`, which is at least capped, but it also treats a normal miss as `validation_failure`.
- **Suggestion**: Do not log 404s. If invalid-filter logs stay, pass values through `createSafeMetadata` or log only “present/absent/rejected-enum”, never the raw string.
- **Status**: open

### 6. Logger fires on success paths and on expected 404s, mislabeled as validation failure

- **Severity**: Medium
- **File:line**: `app/api/search/route.ts:43-54`; `app/api/learning-targets/route.ts:54-60`; `lib/api-validation-logger.ts:19-31`
- **Description**: Search still returns 200 after truncating `q` to 120 chars (existing #313 behavior). The new code additionally `console.warn`s `query_truncated` as `type: "validation_failure"`. Rate-limit 429s are logged under the same type. That is noise, not observability: Vercel will ingest a warn line for every long search box paste and every unknown target id. Engineering rule: no defensive waste.
- **Suggestion**: Log only unexpected failures, or drop the logger. Do not wrap 429/404/successful truncation.
- **Status**: open

### 7. `userProfile` is a shared bucket across two POST routes; naming is SaaS-y

- **Severity**: Medium
- **File:line**: `lib/api-rate-limiter.ts:99-103`; `app/api/knowledge-frontier/route.ts:57-58`; `app/api/knowledge-frontier/journeys/route.ts` (same `checkRateLimit(request, "userProfile")`)
- **Description**: Frontier view and journey-plan POSTs debit the same per-IP bucket. A legitimate local-profile client that loads the frontier then builds journeys can 429 itself at 30 combined requests. Profiles are `X-Profile-Storage: local-only`; there is no user account. The limiter type name `userProfile` fights the product rule against user systems. PR #7 isolates via key prefixes (`frontier:` vs `frontier-journeys:`) and uses different numeric caps.
- **Suggestion**: Do not add this profile. If limits exist at the firewall, attach them per path.
- **Status**: open

### 8. Module singleton is not reset; tests can pollute each other

- **Severity**: Medium
- **File:line**: `lib/api-rate-limiter.ts:99-107`; `lib/__tests__/api-rate-limiter.test.ts` (“handles anonymous fallback consistently”); `app/api/search/__tests__/route.test.ts` existing cases that call `GET` with no IP headers
- **Description**: There is no `resetForTests`. The anonymous-fallback unit test spends 60 tokens on the `search` limiter under key `"anonymous"`. Existing search route tests construct `Request`s without `x-forwarded-for` / `x-real-ip`, so they share that key. If Vitest reuses a worker and the unit file runs first, those tests get 429 instead of 200. CI passed, so this run did not hit the order; it is still a latent flake. Route-level 429 tests also burn 60 real corpus scans / 30 real frontier builds against the singleton — slow, order-dependent, and they do not restore state.
- **Suggestion**: Irrelevant if the limiter is dropped. If kept, export a test-only reset and never exhaust `anonymous` in unit tests that share the module with route tests.
- **Status**: open

### 9. Test and PR-body counts are inflated; two protected routes have zero new tests

- **Severity**: Medium (honesty / coverage)
- **File:line**: PR body “44 tests” / “24 tests” / “+68 new tests”; `docs/archive/API-Protection-Tranche-2.md` (same numbers, plus the self-contradiction “1367 → 1435 projection, but actual is 1367”)
- **Description**: Counted `it(` on the branch: limiter unit 13, logger unit 14, search route +2, frontier route +1 = **30**. `app/api/learning-targets/route.ts` and `app/api/knowledge-frontier/journeys/route.ts` are listed as protected and have no new tests. No test for `cleanup()`, XFF spoof vs `x-real-ip`, IPv6 extraction, or query-truncation logging. 1367 total is consistent with #313’s 1337 + 30, which makes the “+68” claim internally false.
- **Suggestion**: Do not treat CI green as “68 tests of production rate limiting.” The tests prove an in-memory Map in one Node process.
- **Status**: open

### 10. “Swappable Redis” seam does not exist

- **Severity**: Low
- **File:line**: `lib/api-rate-limiter.ts:13-14`, `lib/api-rate-limiter.ts:133-161`
- **Description**: `InProcessRateLimiter` is not exported. Routes call `checkRateLimit(request, limiterType)` which extracts IP, hits the in-process Map, and returns a `NextResponse`. A Redis backend cannot “implement the same `checkLimit` signature without changing route code”; it would replace the whole module. The comment is design fiction.
- **Suggestion**: Delete the claim. Do not add Redis.
- **Status**: open

### 11. IP-mask comment disagrees with code; IPv6 mask is cosmetic

- **Severity**: Low
- **File:line**: `lib/api-validation-logger.ts:34-51`
- **Description**: Comment says “keep first 2 octets for IPv4”; code and tests keep 3 (`203.0.113.*`). IPv6 takes `split(":")[0..3]` and appends `:****`, which mishandles compressed forms (`2001:db8::1`) and IPv4-mapped addresses. Privacy theater next to issue 2, which logs the identifier only after using the unmasked value as a Map key.
- **Suggestion**: Drop the logger, or make the comment match the code. Not worth fixing in isolation.
- **Status**: open

### 12. JSON `error.message` echoed into logs

- **Severity**: Low
- **File:line**: `app/api/knowledge-frontier/route.ts:71-77` (same pattern on `journeys`)
- **Description**: `JSON.parse` failures typically look like `Unexpected token … in JSON at position N` and can include a payload character. Not a secret leak in this API, but it is raw exception text on a warn line the PR advertises as “never logs unbounded bodies.”
- **Suggestion**: Log `reason: "invalid_json"` only.
- **Status**: open

## What is fine

- CI (typecheck, lint, content, unit tests, build, bundle budget) is green on the draft; production deploy correctly skipped.
- Existing success-path JSON and cache headers on valid requests are unchanged.
- No Redis/Upstash, no user accounts, no frontend 429 UI — those non-goals match the repo.
- Session #313’s real hardening (limit parsing, enum `Object.hasOwn`, knownIds caps) is not undone.
- `createSafeMetadata` itself is a small, correct helper (unused in the one log site that needs it).

## Overlap with PR #7

|                  | PR #6                                              | PR #7                                                   |
| ---------------- | -------------------------------------------------- | ------------------------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------- |
| Helpers          | `api-rate-limiter.ts` + `api-validation-logger.ts` | same two + `api-request-id.ts`                          |
| `checkRateLimit` | `(request, "search"                                | "userProfile"                                           | "general") → NextResponse \| null` | `(identifier, {capacity, refillRate, keyPrefix}) → {allowed, remaining, …}` |
| IP               | leftmost XFF, then `x-real-ip`                     | `x-real-ip`, then leftmost XFF, then `cf-connecting-ip` |
| Routes           | 4                                                  | 7 (adds plan, relation-review, daily/shuffle)           |
| Body guard       | none                                               | 100 KB `Content-Length` → 413                           |
| Request ID       | none                                               | `x-request-id` echo                                     |
| Images           | same 3 webp + manifest jitter                      | same                                                    |

#7 is the later, broader tranche and still has the same serverless-limiter architecture problem. Closing #6 does not imply merging #7.

## Verdict

**CLOSE_WITHOUT_MERGE**

This draft should not land on `main`. Pushing `main` is a production deploy; an in-process token bucket would ship as if the public APIs were rate-limited, while every Vercel isolate would enforce its own 60/30/120 and a client-supplied XFF prefix could dodge even that. Session #313 already did the input-boundary work these routes needed. The remaining abuse problem (corpus scans, large POSTs) is an edge/firewall concern, not an App Router concern, and the engineering rules reject defensive waste and SaaS-shaped user plumbing.

Sibling #7 overlaps on the same helper filenames and the same accidental image diffs; keeping #6 open only duplicates review cost. CI green means the unit tests match the in-memory Map, not that production is protected.

**Cherry-pick:** nothing. Do not lift the limiter, the logger, the route wiring, the archive write-up, or the webp churn. If a later change wants bounded invalid-input logs, re-write three lines at the call site; `createSafeMetadata` is not worth extracting from this branch. Real protection, if traffic ever requires it, is a Vercel Firewall rule on `/api/search` and the frontier POSTs — outside this PR.
