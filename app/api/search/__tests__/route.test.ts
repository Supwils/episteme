import { describe, expect, it, vi } from "vitest";
import { GET, SEARCH_CACHE_CONTROL } from "@/app/api/search/route";
import { MIN_HAN_QUERY } from "@/lib/search/phrase";
import * as corpusStore from "@/lib/search/corpus-store";

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

  it.each(["q=熵&q=引力", "q=熵&limit=5&limit=50"])(
    "rejects repeated query parameters instead of picking one silently (%s)",
    async (queryString) => {
      const response = await GET(new Request(`http://localhost/api/search?${queryString}`));
      expect(response.status).toBe(400);
      await expect(response.json()).resolves.toEqual({ error: "Duplicate query parameter" });
    }
  );

  it("does not let the CDN cache an empty fallback corpus", async () => {
    const spy = vi.spyOn(corpusStore, "getPhraseCorpus").mockResolvedValue({
      corpus: { text: "", offsets: [] },
      docs: [],
    });
    try {
      const response = await GET(new Request("http://localhost/api/search?q=热力学"));
      expect(response.status).toBe(200);
      expect(response.headers.get("cache-control")).toBe("private, no-store");
    } finally {
      spy.mockRestore();
    }
  });
});
