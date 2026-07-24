import { describe, expect, it } from "vitest";
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

  it("ignores a malformed limit instead of returning nothing", async () => {
    const { body } = await call("热力学第二定律", "&limit=abc");
    expect(body.hits.length).toBeGreaterThan(0);
  });

  it("echoes the query so a client can discard stale responses", async () => {
    const { body } = await call("熵增");
    expect(body.query).toBe("熵增");
  });
});
