/**
 * In-memory sliding-window rate limiter for API routes.
 * Single-instance (not distributed); sufficient for serverless function scale.
 */

type BucketKey = string;

interface Bucket {
  tokens: number;
  lastRefill: number;
}

const buckets = new Map<BucketKey, Bucket>();
const CLEANUP_INTERVAL = 300_000; // 5 minutes
let lastCleanup = Date.now();

function cleanup(): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  const cutoff = now - 600_000; // 10 minutes
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.lastRefill < cutoff) buckets.delete(key);
  }
}

export interface RateLimitConfig {
  /** Maximum tokens in the bucket */
  capacity: number;
  /** Tokens refilled per second */
  refillRate: number;
  /** Key prefix for grouping (e.g., "search:", "frontier:") */
  keyPrefix?: string;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number; // seconds until full refill
  retryAfter?: number; // seconds to wait if denied
}

/**
 * Check rate limit using token bucket algorithm.
 * @param identifier - Client identifier (IP or other)
 * @param config - Rate limit configuration
 * @param cost - Token cost for this request (default 1)
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig,
  cost = 1
): RateLimitResult {
  cleanup();

  const key: BucketKey = config.keyPrefix ? `${config.keyPrefix}${identifier}` : identifier;
  const now = Date.now();
  const { capacity, refillRate } = config;

  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { tokens: capacity, lastRefill: now };
    buckets.set(key, bucket);
  }

  // Refill tokens based on elapsed time
  const elapsed = (now - bucket.lastRefill) / 1000;
  const refill = elapsed * refillRate;
  bucket.tokens = Math.min(capacity, bucket.tokens + refill);
  bucket.lastRefill = now;

  const allowed = bucket.tokens >= cost;
  if (allowed) {
    bucket.tokens -= cost;
  }

  const resetIn = Math.ceil((capacity - bucket.tokens) / refillRate);
  const retryAfter = allowed ? undefined : Math.ceil((cost - bucket.tokens) / refillRate);

  return {
    allowed,
    remaining: Math.floor(bucket.tokens),
    resetIn,
    retryAfter,
  };
}

/**
 * Get client identifier from request (IP or fallback).
 */
export function getClientIdentifier(request: Request): string {
  // Vercel/Cloudflare headers in priority order
  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("cf-connecting-ip") ??
    "unknown";
  return ip;
}
