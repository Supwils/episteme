import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { GET } from "../route";
import type { NextResponse } from "next/server";

// Mock fs module
vi.mock("node:fs", () => {
  let mockFiles: Record<string, string> = {};
  let mockStats: Record<string, { size: number }> = {};
  let throwOnRead: Set<string> = new Set();
  let throwOnStat: Set<string> = new Set();

  return {
    existsSync: vi.fn((path: string) => {
      const normalizedPath = path.replace(process.cwd() + "/", "");
      return normalizedPath in mockFiles;
    }),
    readFileSync: vi.fn((path: string, encoding?: string) => {
      const normalizedPath = path.replace(process.cwd() + "/", "");
      if (throwOnRead.has(normalizedPath)) {
        throw new Error("Read failed");
      }
      const content = mockFiles[normalizedPath];
      if (content === undefined) {
        throw new Error("File not found");
      }
      return content;
    }),
    statSync: vi.fn((path: string) => {
      const normalizedPath = path.replace(process.cwd() + "/", "");
      if (throwOnStat.has(normalizedPath)) {
        throw new Error("Stat failed");
      }
      const stat = mockStats[normalizedPath];
      if (!stat) {
        throw new Error("File not found");
      }
      return stat;
    }),
    // Export helpers for tests
    __setMockFiles: (files: Record<string, string>) => {
      mockFiles = files;
    },
    __setMockStats: (stats: Record<string, { size: number }>) => {
      mockStats = stats;
    },
    __setThrowOnRead: (paths: string[]) => {
      throwOnRead = new Set(paths);
    },
    __setThrowOnStat: (paths: string[]) => {
      throwOnStat = new Set(paths);
    },
    __reset: () => {
      mockFiles = {};
      mockStats = {};
      throwOnRead.clear();
      throwOnStat.clear();
    },
  };
});

const mockFs = await import("node:fs");

const VALID_SEARCH_INDEX = JSON.stringify({
  v: 1,
  docs: [
    { t: "Article 1", u: "/article-1", c: "domain", k: "article" },
    { t: "Article 2", u: "/article-2", c: "domain", k: "article" },
  ],
  index: {},
});

const VALID_WIKI_INDEX = `// Generated
export const WIKI_LINK_INDEX = {
  "article-1": "/domain/article-1",
  "article-2": "/domain/article-2"
};
export function resolveWikiLink(slug: string) { return WIKI_LINK_INDEX[slug]; }
`;

const VALID_BACKLINKS = `// Generated
export const BACKLINKS_INDEX = {
  "/domain/article-1": [{ url: "/domain/article-2", title: "Article 2" }]
};
export function getBacklinks(url: string) { return BACKLINKS_INDEX[url] || []; }
`;

describe("GET /api/health", () => {
  beforeEach(() => {
    (mockFs as any).__reset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 when all artifacts are healthy", async () => {
    (mockFs as any).__setMockFiles({
      "public/search-index.json": VALID_SEARCH_INDEX,
      "lib/wiki-link-index.ts": VALID_WIKI_INDEX,
      "lib/backlinks-index.ts": VALID_BACKLINKS,
    });
    (mockFs as any).__setMockStats({
      "public/search-index.json": { size: 1000 },
      "lib/wiki-link-index.ts": { size: 500 },
      "lib/backlinks-index.ts": { size: 400 },
    });

    const response = (await GET()) as NextResponse;
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.artifacts).toBeDefined();
    expect(data.artifacts["search-index-v1"]).toEqual({ ok: true, count: 2, size: 1000 });
    expect(data.artifacts["wiki-link-index"].ok).toBe(true);
    expect(data.artifacts["backlinks-index"].ok).toBe(true);
  });

  it("returns 503 when search index is missing", async () => {
    (mockFs as any).__setMockFiles({
      "lib/wiki-link-index.ts": VALID_WIKI_INDEX,
      "lib/backlinks-index.ts": VALID_BACKLINKS,
    });
    (mockFs as any).__setMockStats({
      "lib/wiki-link-index.ts": { size: 500 },
      "lib/backlinks-index.ts": { size: 400 },
    });

    const response = (await GET()) as NextResponse;
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.ok).toBe(false);
    expect(data.artifacts["search-index"]).toEqual({ ok: false, error: "not found" });
  });

  it("returns 503 when JSON is malformed", async () => {
    (mockFs as any).__setMockFiles({
      "public/search-index.json": "not valid json {",
      "lib/wiki-link-index.ts": VALID_WIKI_INDEX,
      "lib/backlinks-index.ts": VALID_BACKLINKS,
    });
    (mockFs as any).__setMockStats({
      "public/search-index.json": { size: 100 },
      "lib/wiki-link-index.ts": { size: 500 },
      "lib/backlinks-index.ts": { size: 400 },
    });

    const response = (await GET()) as NextResponse;
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.ok).toBe(false);
    expect(data.artifacts["search-index"].error).toContain("parse failed");
  });

  it("returns 503 when search index has empty docs", async () => {
    (mockFs as any).__setMockFiles({
      "public/search-index.json": JSON.stringify({ v: 1, docs: [], index: {} }),
      "lib/wiki-link-index.ts": VALID_WIKI_INDEX,
      "lib/backlinks-index.ts": VALID_BACKLINKS,
    });
    (mockFs as any).__setMockStats({
      "public/search-index.json": { size: 100 },
      "lib/wiki-link-index.ts": { size: 500 },
      "lib/backlinks-index.ts": { size: 400 },
    });

    const response = (await GET()) as NextResponse;
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.ok).toBe(false);
    expect(data.artifacts["search-index-v1"]).toEqual({
      ok: false,
      error: "docs array empty",
      size: 100,
    });
  });

  it("returns 503 when wiki-link-index is suspiciously short", async () => {
    (mockFs as any).__setMockFiles({
      "public/search-index.json": VALID_SEARCH_INDEX,
      "lib/wiki-link-index.ts": "export const WIKI_LINK_INDEX = {}; export function resolveWikiLink() {}",
      "lib/backlinks-index.ts": VALID_BACKLINKS,
    });
    (mockFs as any).__setMockStats({
      "public/search-index.json": { size: 1000 },
      "lib/wiki-link-index.ts": { size: 50 },
      "lib/backlinks-index.ts": { size: 400 },
    });

    const response = (await GET()) as NextResponse;
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.ok).toBe(false);
    expect(data.artifacts["wiki-link-index"]).toEqual({
      ok: false,
      error: "suspiciously short",
      size: 50,
    });
  });

  it("returns 503 when file read fails", async () => {
    (mockFs as any).__setMockFiles({
      "public/search-index.json": VALID_SEARCH_INDEX,
      "lib/wiki-link-index.ts": VALID_WIKI_INDEX,
      "lib/backlinks-index.ts": VALID_BACKLINKS,
    });
    (mockFs as any).__setMockStats({
      "public/search-index.json": { size: 1000 },
      "lib/wiki-link-index.ts": { size: 500 },
      "lib/backlinks-index.ts": { size: 400 },
    });
    (mockFs as any).__setThrowOnRead(["public/search-index.json"]);

    const response = (await GET()) as NextResponse;
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.ok).toBe(false);
    expect(data.artifacts["search-index"].error).toContain("parse failed");
  });

  it("includes no-store cache-control on error", async () => {
    (mockFs as any).__setMockFiles({});
    (mockFs as any).__setMockStats({});

    const response = (await GET()) as NextResponse;

    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });

  it("includes no-store cache-control on success", async () => {
    (mockFs as any).__setMockFiles({
      "public/search-index.json": VALID_SEARCH_INDEX,
      "lib/wiki-link-index.ts": VALID_WIKI_INDEX,
      "lib/backlinks-index.ts": VALID_BACKLINKS,
    });
    (mockFs as any).__setMockStats({
      "public/search-index.json": { size: 1000 },
      "lib/wiki-link-index.ts": { size: 500 },
      "lib/backlinks-index.ts": { size: 400 },
    });

    const response = (await GET()) as NextResponse;

    expect(response.headers.get("Cache-Control")).toBe("no-store, must-revalidate");
  });
});
