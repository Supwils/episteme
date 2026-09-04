import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { checkRateLimit, extractClientIp } from "../api-rate-limiter";

describe("extractClientIp", () => {
  it("extracts IP from x-forwarded-for header", () => {
    const request = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.42" },
    });
    expect(extractClientIp(request)).toBe("203.0.113.42");
  });

  it("takes the first IP from x-forwarded-for when comma-separated", () => {
    const request = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.42, 198.51.100.17" },
    });
    expect(extractClientIp(request)).toBe("203.0.113.42");
  });

  it("falls back to x-real-ip when x-forwarded-for is missing", () => {
    const request = new Request("http://localhost", {
      headers: { "x-real-ip": "198.51.100.17" },
    });
    expect(extractClientIp(request)).toBe("198.51.100.17");
  });

  it("returns 'anonymous' when both headers are missing", () => {
    const request = new Request("http://localhost");
    expect(extractClientIp(request)).toBe("anonymous");
  });

  it("handles empty x-forwarded-for gracefully", () => {
    const request = new Request("http://localhost", {
      headers: { "x-forwarded-for": "" },
    });
    expect(extractClientIp(request)).toBe("anonymous");
  });
});

describe("checkRateLimit", () => {
  beforeEach(() => {
    // Reset time to get predictable test behavior
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-04T14:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows requests under the limit", () => {
    const request = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.1" },
    });

    // General limiter: 120 req/min
    for (let i = 0; i < 60; i++) {
      const result = checkRateLimit(request, "general");
      expect(result).toBeNull();
    }
  });

  it("blocks requests exceeding the limit and returns 429", () => {
    const request = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.2" },
    });

    // Search limiter: 60 req/min
    for (let i = 0; i < 60; i++) {
      checkRateLimit(request, "search");
    }

    const blocked = checkRateLimit(request, "search");
    expect(blocked).not.toBeNull();
    expect(blocked?.status).toBe(429);
    expect(blocked?.headers.get("Retry-After")).toBeTruthy();
  });

  it("includes Retry-After header with correct value", async () => {
    const request = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.3" },
    });

    // Exhaust search limit (60 req/min)
    for (let i = 0; i < 60; i++) {
      checkRateLimit(request, "search");
    }

    const blocked = checkRateLimit(request, "search");
    expect(blocked?.headers.get("Retry-After")).toBeTruthy();
    const retryAfter = Number(blocked?.headers.get("Retry-After"));
    expect(retryAfter).toBeGreaterThan(0);
    expect(retryAfter).toBeLessThanOrEqual(60); // Should be within 1 minute
  });

  it("returns error JSON with helpful message", async () => {
    const request = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.4" },
    });

    // Exhaust limit
    for (let i = 0; i < 60; i++) {
      checkRateLimit(request, "search");
    }

    const blocked = checkRateLimit(request, "search");
    const body = await blocked?.json();
    expect(body).toEqual({
      error: "Rate limit exceeded",
      message: "Too many requests. Please try again later.",
    });
  });

  it("refills tokens over time", () => {
    const request = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.5" },
    });

    // Use all tokens
    for (let i = 0; i < 60; i++) {
      checkRateLimit(request, "search");
    }

    // Should be blocked
    expect(checkRateLimit(request, "search")).not.toBeNull();

    // Advance time by 30 seconds (should refill 30 tokens)
    vi.advanceTimersByTime(30_000);

    // Should allow 30 more requests
    for (let i = 0; i < 30; i++) {
      const result = checkRateLimit(request, "search");
      expect(result).toBeNull();
    }

    // 31st should be blocked
    expect(checkRateLimit(request, "search")).not.toBeNull();
  });

  it("isolates different IPs", () => {
    const request1 = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.10" },
    });
    const request2 = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.11" },
    });

    // Exhaust limit for IP1
    for (let i = 0; i < 60; i++) {
      checkRateLimit(request1, "search");
    }
    expect(checkRateLimit(request1, "search")).not.toBeNull();

    // IP2 should still be allowed
    expect(checkRateLimit(request2, "search")).toBeNull();
  });

  it("respects different limiter types", () => {
    const request = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.20" },
    });

    // userProfile: 30 req/min
    for (let i = 0; i < 30; i++) {
      const result = checkRateLimit(request, "userProfile");
      expect(result).toBeNull();
    }

    // 31st should be blocked
    expect(checkRateLimit(request, "userProfile")).not.toBeNull();
  });

  it("handles anonymous fallback consistently", () => {
    const request1 = new Request("http://localhost");
    const request2 = new Request("http://localhost");

    // Both get 'anonymous' as identifier
    expect(extractClientIp(request1)).toBe("anonymous");
    expect(extractClientIp(request2)).toBe("anonymous");

    // They share the same bucket
    for (let i = 0; i < 60; i++) {
      checkRateLimit(request1, "search");
    }

    // request2 should now be blocked (shares bucket with request1)
    expect(checkRateLimit(request2, "search")).not.toBeNull();
  });
});
