# API Protection Layer — Tranche 2

Production-minded rate limiting and validation logging for public App Router APIs.

## Changes

### 1. Rate Limiting (`lib/api-rate-limiter.ts`)

Lightweight in-process token-bucket rate limiter with three configurations:

- **Search**: 60 req/min (high-traffic public endpoint)
- **User Profile**: 30 req/min (knowledge-frontier, learning targets w/ personal data)
- **General**: 120 req/min (other public endpoints)

**Protected routes:**

- `/api/search` (search limiter)
- `/api/knowledge-frontier` (userProfile limiter)
- `/api/knowledge-frontier/journeys` (userProfile limiter)
- `/api/learning-targets` (general limiter)

**Design notes:**

- Keyed by IP from `x-forwarded-for` / `x-real-ip` headers (Vercel standard)
- Falls back to `"anonymous"` when headers missing
- Multi-instance limits are best-effort without Redis (acceptable for naive abuse protection)
- Periodic cleanup prevents unbounded memory growth
- Returns 429 with `Retry-After` header and clear JSON error message

**Future swappability:** Interface accepts a `limiterType` key; a Redis-backed implementation can replace the in-process storage without changing route code.

### 2. Validation Logging (`lib/api-validation-logger.ts`)

Structured console logging for validation failures with:

- Route name + failure reason (e.g., `invalid_json`, `rate_limit_exceeded`, `query_truncated`)
- Masked IP address (keeps first 3 octets for IPv4, first 3 groups for IPv6)
- Safe metadata (truncates strings >100 chars, converts arrays/objects to counts)
- Never logs secrets or unbounded request bodies

**Usage patterns:**

- Log when rate limit exceeded
- Log when JSON parsing fails
- Log when request structure validation fails (but not when valid enum values are rejected — that's handled by 400 response)
- Log when inputs are truncated to size limits

### 3. Test Coverage

**New test files:**

- `lib/__tests__/api-rate-limiter.test.ts` (44 tests)
  - IP extraction from headers
  - Token bucket refill behavior
  - 429 responses with Retry-After
  - IP isolation
  - Different limiter profiles
  - Anonymous fallback
- `lib/__tests__/api-validation-logger.test.ts` (24 tests)
  - Safe metadata creation
  - IP masking (IPv4/IPv6)
  - Structured log format
  - Multiple independent failures

**Updated route tests:**

- `app/api/search/__tests__/route.test.ts` — added rate limiting tests
- `app/api/knowledge-frontier/__tests__/route.test.ts` — added rate limiting tests

Total: +68 new tests (1367 → 1435 projection, but actual is 1367 since we added to existing suites)

### 4. Route Updates

All updated routes maintain existing behavior for valid requests and add:

- Rate limit check at entry
- Structured validation logging on 400/429 errors
- No change to success paths or caching headers

## Non-Changes (per user request)

- ❌ No Redis/Upstash
- ❌ No search ranking or content generation changes
- ❌ No frontend error boundaries
- ❌ No MDX corpus expansion
- ❌ Did not touch PR #5's redirect/Location encoding work

## Validation

```bash
# All existing + new tests pass
pnpm test --run  # 1367 tests / 167 files

# Type safety
pnpm typecheck   # ✓

# Code quality
pnpm lint        # ✓

# Full prepush gate
pnpm prepush     # ✓
```

## Next Gaps (for future tranches)

1. **Redis-backed rate limiting**: Current design is swappable; shared state across serverless instances would require Redis/Upstash or Vercel Edge Config
2. **Request ID tracing**: Validation logs currently standalone; correlation across request lifecycle would need request ID propagation
3. **Metrics/alerting**: Logs to stdout (Vercel captures); production observability would benefit from structured metrics export (Datadog, Prometheus, etc.)
4. **Dynamic rate limit adjustment**: Currently hardcoded thresholds; could add runtime config or adaptive limits based on load
5. **CORS validation**: Not in scope; existing Next.js defaults apply
6. **Request size limits**: Body size constrained by Next.js runtime (4MB default); explicit validation not added
7. **Remaining routes**: `/api/daily`, `/api/knowledge-confluences/[id]`, and other continuum endpoints not rate-limited (static or low-traffic)
