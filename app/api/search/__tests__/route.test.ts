import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { GET, SEARCH_CACHE_CONTROL } from "@/app/api/search/route";
import { MIN_HAN_QUERY } from "@/lib/search/phrase";

interface Body {
  query: string;
  hits: {
    title: string;
    url: string;
    section: string;
    snippet: string;
    matchStart: number;
    exact: boolean;
  }[];
}

const call = async (query: string, extra = "") => {
  const response = await GET(
    new Request(`http://localhost/api/search?q=${encodeURIComponent(query)}${extra}`)
  );
  return { response, body: (await response.json()) as Body };
};

describe("GET /api/search", () => {
  it("finds articles by a phrase from the middle of their prose", async () => {
    const { response, body } = await call("热力学第二定律");
    expect(response.status).toBe(200);
    expect(body.hits.length).toBeGreaterThan(0);
    expect(body.hits.every((h) => h.url.startsWith("/"))).toBe(true);
  });

  it("returns the phrase in context, positioned for highlighting", async () => {
    const { body } = await call("自然选择");
    const hit = body.hits[0]!;
    expect(hit.snippet).toContain("自然选择");
    expect(hit.snippet.slice(hit.matchStart, hit.matchStart + 4)).toBe("自然选择");
  });

  it("is cacheable — the corpus only changes when a deployment does", async () => {
    const { response } = await call("热力学");
    expect(response.headers.get("cache-control")).toBe(SEARCH_CACHE_CONTROL);
  });

  it("rejects a query below the minimum length instead of scanning", async () => {
    const { response, body } = await call("熵".repeat(MIN_HAN_QUERY - 1));
    expect(response.status).toBe(200);
    expect(body.hits).toEqual([]);
  });

  it("treats a missing query as empty rather than failing", async () => {
    const response = await GET(new Request("http://localhost/api/search"));
    expect(response.status).toBe(200);
    expect(((await response.json()) as Body).hits).toEqual([]);
  });

  it("caps the number of hits a caller can request", async () => {
    const { body } = await call("知识", "&limit=9999");
    expect(body.hits.length).toBeLessThanOrEqual(50);
  });

  it.each(["", "&limit=", "&limit=%20%20"])(
    "uses the default result limit when missing or blank (%s)",
    async (extra) => {
      const { body } = await call("知识", extra);
      const { body: explicit } = await call("知识", "&limit=20");
      expect(explicit.hits).toHaveLength(20);
      expect(body.hits).toEqual(explicit.hits);
    }
  );

  it.each(["0", "-5"])("retains the lower bound for an explicit limit of %s", async (limit) => {
    const { body } = await call("知识", `&limit=${limit}`);
    expect(body.hits).toHaveLength(1);
  });

  it("ignores a malformed limit instead of returning nothing", async () => {
    const { body } = await call("热力学第二定律", "&limit=abc");
    expect(body.hits.length).toBeGreaterThan(0);
  });

  it("echoes the query so a client can discard stale responses", async () => {
    const { body } = await call("熵增");
    expect(body.query).toBe("熵增");
  });

  describe("rate limiting", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-09-04T14:00:00.000Z"));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("returns 429 when rate limit is exceeded", async () => {
      const ip = "203.0.113.100";
      // Search limiter: 60 req/min
      for (let i = 0; i < 60; i++) {
        const response = await GET(
          new Request(`http://localhost/api/search?q=test`, {
            headers: { "x-forwarded-for": ip },
          })
        );
        expect(response.status).toBe(200);
      }

      // 61st request should be blocked
      const blocked = await GET(
        new Request(`http://localhost/api/search?q=test`, {
          headers: { "x-forwarded-for": ip },
        })
      );
      expect(blocked.status).toBe(429);
      expect(blocked.headers.get("Retry-After")).toBeTruthy();

      const body = (await blocked.json()) as { error: string; message: string };
      expect(body.error).toBe("Rate limit exceeded");
    });

    it("isolates rate limits by IP", async () => {
      const ip1 = "203.0.113.101";
      const ip2 = "203.0.113.102";

      // Exhaust limit for IP1
      for (let i = 0; i < 60; i++) {
        await GET(
          new Request(`http://localhost/api/search?q=test`, {
            headers: { "x-forwarded-for": ip1 },
          })
        );
      }

      // IP1 should be blocked
      const blocked = await GET(
        new Request(`http://localhost/api/search?q=test`, {
          headers: { "x-forwarded-for": ip1 },
        })
      );
      expect(blocked.status).toBe(429);

      // IP2 should still be allowed
      const allowed = await GET(
        new Request(`http://localhost/api/search?q=test`, {
          headers: { "x-forwarded-for": ip2 },
        })
      );
      expect(allowed.status).toBe(200);
    });
  });
});
