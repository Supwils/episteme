# API Protection Tranche 3 — Implementation Summary

## Overview

Extended API protection infrastructure with request correlation, rate limiting, and body size guards across all remaining public API routes.

## Changes

### New Helpers (3 files)

1. **`lib/api-request-id.ts`**
   - `getRequestId(request)`: Extract or generate correlation ID from headers
   - `withRequestId(requestId, headers)`: Merge request ID into response headers
   - Reads `x-request-id` or `x-correlation-id` headers, generates UUID fallback

2. **`lib/api-rate-limiter.ts`**
   - Token bucket rate limiting with in-memory state
   - `checkRateLimit(identifier, config, cost)`: Check and consume tokens
   - `getClientIdentifier(request)`: Extract IP from Vercel/Cloudflare headers
   - Automatic bucket cleanup every 5 minutes
   - Returns allowed/remaining/resetIn/retryAfter

3. **`lib/api-validation-logger.ts`**
   - `logValidationError(context, errors)`: Structured validation failure logging
   - `logRateLimitHit(context, retryAfter)`: Rate limit hit logging
   - Includes timestamp, requestId, endpoint, clientId in all logs

### Protected Routes (7 routes)

All routes now include:

- Request correlation ID extraction and echo
- Rate limiting with 429 + Retry-After headers
- Validation error logging with context
- Body size guards for POST routes (100KB limit)

| Route                                     | Method | Rate Limit              | Notes                                |
| ----------------------------------------- | ------ | ----------------------- | ------------------------------------ |
| `/api/search`                             | GET    | 60/min (1/sec refill)   | High-traffic public search           |
| `/api/learning-targets`                   | GET    | 100/min (2/sec refill)  | Heavier computation                  |
| `/api/knowledge-frontier`                 | POST   | 30/min (0.5/sec refill) | User profile data, body guard        |
| `/api/knowledge-frontier/plan`            | POST   | 20/min (0.3/sec refill) | Expensive planning, body guard       |
| `/api/knowledge-frontier/journeys`        | POST   | 15/min (0.2/sec refill) | Multi-plan generation, body guard    |
| `/api/knowledge-frontier/relation-review` | POST   | 30/min (0.5/sec refill) | Relation graph traversal, body guard |
| `/api/daily/shuffle`                      | GET    | 40/min (0.5/sec refill) | Shuffle re-rolls                     |

### Static Routes (Not Protected)

- `/api/daily` — Static with 1hr ISR
- `/api/knowledge-continuum/*` — Static with 24hr ISR
- `/api/knowledge-confluences/[id]` — Static with 24hr ISR, limited params

## Tests

### Helper Tests (28 tests)

- `lib/__tests__/api-request-id.test.ts` (9 tests)
  - Header extraction (x-request-id, x-correlation-id)
  - UUID generation fallback
  - Header merging

- `lib/__tests__/api-rate-limiter.test.ts` (13 tests)
  - Token consumption and refill
  - Rate limit enforcement
  - Client identification
  - Bucket isolation with key prefixes
  - Custom cost per request
  - Token cap at capacity

- `lib/__tests__/api-validation-logger.test.ts` (6 tests)
  - Validation error logging
  - Rate limit hit logging
  - Structured log format

### API Route Tests (17 tests)

- `app/api/__tests__/search.test.ts` (5 tests)
  - Request ID echo
  - Rate limiting enforcement
  - Query truncation

- `app/api/__tests__/knowledge-frontier.test.ts` (7 tests)
  - Valid request handling
  - Body size limit enforcement
  - Invalid JSON rejection
  - Invalid filter structure
  - Rate limiting
  - knownIds array validation
  - Custom request ID echo

- `app/api/__tests__/knowledge-frontier-plan.test.ts` (5 tests)
  - Body size limit
  - Invalid JSON
  - Invalid structure
  - Rate limiting
  - Request ID inclusion

## Test Results

- **Total**: 1382 tests passing (up from 1337)
- **New tests**: 45 tests (28 helper + 17 API route)
- **Typecheck**: Clean
- **Lint**: Clean (no warnings)

## Rate Limit Bucket Design

Rate limits use different key prefixes to isolate buckets:

- `search:` — General search queries
- `learning-targets:` — Learning target lookups
- `frontier:` — Main frontier view
- `frontier-plan:` — Gap plan generation
- `frontier-journeys:` — Multi-journey planning
- `frontier-review:` — Relation review
- `daily-shuffle:` — Daily re-shuffles

This prevents one endpoint's usage from affecting another's limits for the same IP.

## Body Size Guards

All POST routes now check `Content-Length` header before parsing JSON:

- Limit: 100KB (100,000 bytes)
- Response: 413 Payload Too Large
- Prevents heavy parsing of oversized payloads
- Falls back to Next.js default limits (typically 4MB)

## Next Steps / Out of Scope

Not implemented (as per user instructions):

- Redis-backed distributed rate limiting
- Frontend error boundaries for 429 responses
- MDX corpus expansion
- Search ranking rewrites
- New product features

Potential future enhancements:

- Prometheus metrics export from rate limiter
- Distributed rate limiting with Redis/Vercel KV
- Per-user authentication-based rate limits
- Dynamic rate limit adjustment based on load

## Deployment Notes

- All helpers are pure server-side (no client bundle impact)
- Rate limiter state is in-memory per serverless instance
- Cleanup runs every 5 minutes, removes buckets idle >10 minutes
- No database or external dependencies required
- Works with Vercel/Cloudflare IP headers out of the box

## Files Changed

- 7 API route handlers (protection added)
- 3 new helper modules
- 3 new test files (helpers)
- 3 new test files (API routes)
- Generated files from `pnpm gen-all` (search-stats.json, corpus, etc.)
