import { NextResponse } from "next/server";

/**
 * Lightweight in-process rate limiter for serverless functions.
 *
 * Token-bucket implementation keyed by IP. Limits are best-effort without Redis —
 * each function instance maintains its own counter state. When the workload
 * spawns multiple serverless instances, total throughput may exceed the configured
 * per-IP limit by a factor equal to the instance count. This is acceptable for
 * protection against naive abuse; dedicated DDoS/botnet attacks require upstream
 * infrastructure (Vercel Edge, Cloudflare Workers, etc.).
 *
 * Design is swappable: a future Redis-backed limiter can implement the same
 * `checkLimit` signature without changing route code.
 */

interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

interface RateLimiterConfig {
  /**
   * Max requests allowed per window from a single IP.
   */
  maxRequests: number;

  /**
   * Time window in milliseconds.
   */
  windowMs: number;

  /**
   * Token refill rate per millisecond (computed from maxRequests / windowMs).
   */
  refillRate: number;
}

class InProcessRateLimiter {
  private buckets = new Map<string, TokenBucket>();
  private config: RateLimiterConfig;

  constructor(maxRequests: number, windowMs: number) {
    this.config = {
      maxRequests,
      windowMs,
      refillRate: maxRequests / windowMs,
    };
  }

  /**
   * Check if the request should be allowed. Returns true if allowed, false if rate limit exceeded.
   * When false, the caller should respond with 429 and include retryAfterMs in the response.
   */
  checkLimit(identifier: string): { allowed: boolean; retryAfterMs?: number } {
    const now = Date.now();
    let bucket = this.buckets.get(identifier);

    if (!bucket) {
      bucket = { tokens: this.config.maxRequests - 1, lastRefill: now };
      this.buckets.set(identifier, bucket);
      return { allowed: true };
    }

    // Refill tokens based on elapsed time
    const elapsed = now - bucket.lastRefill;
    const tokensToAdd = elapsed * this.config.refillRate;
    bucket.tokens = Math.min(this.config.maxRequests, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return { allowed: true };
    }

    // Calculate retry-after: time needed to accumulate 1 token
    const tokensNeeded = 1 - bucket.tokens;
    const retryAfterMs = Math.ceil(tokensNeeded / this.config.refillRate);

    return { allowed: false, retryAfterMs };
  }

  /**
   * Periodic cleanup to prevent unbounded memory growth.
   * Remove buckets that haven't been touched in 2x the window duration.
   */
  cleanup(): void {
    const now = Date.now();
    const threshold = now - this.config.windowMs * 2;
    for (const [key, bucket] of this.buckets.entries()) {
      if (bucket.lastRefill < threshold) {
        this.buckets.delete(key);
      }
    }
  }
}

// Shared limiters for different endpoint profiles
const limiters = {
  search: new InProcessRateLimiter(60, 60_000), // 60 req/min for search
  userProfile: new InProcessRateLimiter(30, 60_000), // 30 req/min for profile endpoints
  general: new InProcessRateLimiter(120, 60_000), // 120 req/min for other public endpoints
};

// Periodic cleanup every 5 minutes (only runs when a request arrives)
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 5 * 60_000;

function maybeCleanup(): void {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL) {
    Object.values(limiters).forEach((limiter) => limiter.cleanup());
    lastCleanup = now;
  }
}

/**
 * Extract client IP from request headers.
 * Vercel provides x-forwarded-for and x-real-ip; fallback to a safe anonymous key.
 */
export function extractClientIp(request: Request): string {
  const headers = request.headers;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can be a comma-separated list; take the first (original client)
    return forwarded.split(",")[0]?.trim() || "anonymous";
  }
  return headers.get("x-real-ip") || "anonymous";
}

/**
 * Check rate limit for a request. Returns null if allowed, or a NextResponse with 429 if exceeded.
 */
export function checkRateLimit(
  request: Request,
  limiterType: keyof typeof limiters = "general"
): NextResponse | null {
  maybeCleanup();

  const ip = extractClientIp(request);
  const limiter = limiters[limiterType];
  const result = limiter.checkLimit(ip);

  if (!result.allowed) {
    const retryAfterSeconds = Math.ceil((result.retryAfterMs || 0) / 1000);
    return NextResponse.json(
      {
        error: "Rate limit exceeded",
        message: "Too many requests. Please try again later.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
        },
      }
    );
  }

  return null;
}
