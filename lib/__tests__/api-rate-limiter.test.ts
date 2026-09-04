import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit, getClientIdentifier } from "../api-rate-limiter";

describe("api-rate-limiter", () => {
  describe("checkRateLimit", () => {
    beforeEach(() => {
      // Rate limiter uses in-memory state; tests may interact
    });

    it("should allow requests within capacity", () => {
      const result = checkRateLimit("test-client-1", { capacity: 10, refillRate: 1 });
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBeLessThanOrEqual(10);
    });

    it("should deny requests exceeding capacity", () => {
      const config = { capacity: 3, refillRate: 0.1 };
      const client = "test-client-2";

      // Use up capacity
      checkRateLimit(client, config);
      checkRateLimit(client, config);
      checkRateLimit(client, config);

      const result = checkRateLimit(client, config);
      expect(result.allowed).toBe(false);
      expect(result.retryAfter).toBeGreaterThan(0);
    });

    it("should refill tokens over time", async () => {
      const config = { capacity: 5, refillRate: 10 }; // 10 tokens/sec
      const client = "test-client-3";

      // Use 3 tokens
      checkRateLimit(client, config);
      checkRateLimit(client, config);
      checkRateLimit(client, config);

      // Wait 300ms (should refill ~3 tokens)
      await new Promise((resolve) => setTimeout(resolve, 300));

      const result = checkRateLimit(client, config, 3);
      expect(result.allowed).toBe(true);
    });

    it("should use key prefix to isolate buckets", () => {
      const client = "same-client";
      checkRateLimit(client, { capacity: 2, refillRate: 0.1, keyPrefix: "endpoint-a:" });
      checkRateLimit(client, { capacity: 2, refillRate: 0.1, keyPrefix: "endpoint-a:" });

      // Different prefix should have separate bucket
      const result = checkRateLimit(client, {
        capacity: 2,
        refillRate: 0.1,
        keyPrefix: "endpoint-b:",
      });
      expect(result.allowed).toBe(true);
    });

    it("should handle custom cost per request", () => {
      const config = { capacity: 10, refillRate: 1 };
      const client = "test-client-4";

      const result1 = checkRateLimit(client, config, 5);
      expect(result1.allowed).toBe(true);
      expect(result1.remaining).toBeLessThanOrEqual(5);

      const result2 = checkRateLimit(client, config, 6);
      expect(result2.allowed).toBe(false);
    });

    it("should provide resetIn seconds", () => {
      const config = { capacity: 10, refillRate: 2 };
      const client = "test-client-5";

      checkRateLimit(client, config, 6);
      const result = checkRateLimit(client, config);

      expect(result.resetIn).toBeGreaterThan(0);
      expect(typeof result.resetIn).toBe("number");
    });

    it("should cap tokens at capacity during refill", async () => {
      const config = { capacity: 5, refillRate: 10 };
      const client = "test-client-6";

      checkRateLimit(client, config);

      // Wait longer than needed to refill to capacity
      await new Promise((resolve) => setTimeout(resolve, 600));

      const result = checkRateLimit(client, config);
      expect(result.remaining).toBeLessThanOrEqual(5);
    });
  });

  describe("getClientIdentifier", () => {
    it("should extract x-real-ip header", () => {
      const request = new Request("http://localhost", {
        headers: { "x-real-ip": "1.2.3.4" },
      });
      expect(getClientIdentifier(request)).toBe("1.2.3.4");
    });

    it("should extract first IP from x-forwarded-for", () => {
      const request = new Request("http://localhost", {
        headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
      });
      expect(getClientIdentifier(request)).toBe("1.2.3.4");
    });

    it("should extract cf-connecting-ip header", () => {
      const request = new Request("http://localhost", {
        headers: { "cf-connecting-ip": "9.10.11.12" },
      });
      expect(getClientIdentifier(request)).toBe("9.10.11.12");
    });

    it("should prefer x-real-ip over x-forwarded-for", () => {
      const request = new Request("http://localhost", {
        headers: { "x-real-ip": "1.2.3.4", "x-forwarded-for": "5.6.7.8" },
      });
      expect(getClientIdentifier(request)).toBe("1.2.3.4");
    });

    it("should return unknown when no IP headers present", () => {
      const request = new Request("http://localhost");
      expect(getClientIdentifier(request)).toBe("unknown");
    });

    it("should trim whitespace from IP addresses", () => {
      const request = new Request("http://localhost", {
        headers: { "x-forwarded-for": "  1.2.3.4  , 5.6.7.8" },
      });
      expect(getClientIdentifier(request)).toBe("1.2.3.4");
    });
  });
});
