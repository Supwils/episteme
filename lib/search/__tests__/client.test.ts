// @vitest-environment happy-dom
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createSearchClient, loadArtifact } from "../client";
import { SEARCH_INDEX_URL, SEARCH_INDEX_VERSION } from "../types";

const artifactJson = readFileSync("public/search-index.json", "utf-8");

function mockFetch(body: string, ok = true) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok,
    json: async () => JSON.parse(body) as unknown,
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("loadArtifact", () => {
  it("fetches the generated index", async () => {
    const fetchMock = mockFetch(artifactJson);
    const artifact = await loadArtifact();
    expect(fetchMock).toHaveBeenCalledWith(SEARCH_INDEX_URL, expect.anything());
    expect(artifact.v).toBe(SEARCH_INDEX_VERSION);
  });

  it("rejects an index built by an incompatible generator", async () => {
    mockFetch(JSON.stringify({ v: SEARCH_INDEX_VERSION + 1, docs: [], index: {} }));
    await expect(loadArtifact()).rejects.toThrow(/version/i);
  });

  it("rejects a failed response instead of parsing an error page", async () => {
    mockFetch("{}", false);
    await expect(loadArtifact()).rejects.toThrow();
  });
});

describe("createSearchClient without a Worker", () => {
  it("still answers queries on the main thread", async () => {
    vi.stubGlobal("Worker", undefined);
    mockFetch(artifactJson);

    const client = createSearchClient();
    const hits = await client.search("热力学", 5);

    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0]!.url.startsWith("/")).toBe(true);
  });

  it("loads the index once no matter how many queries arrive", async () => {
    vi.stubGlobal("Worker", undefined);
    const fetchMock = mockFetch(artifactJson);

    const client = createSearchClient();
    await Promise.all([client.search("熵", 5), client.search("引力", 5), client.search("演化", 5)]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("reports no results rather than throwing when the index cannot load", async () => {
    vi.stubGlobal("Worker", undefined);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    const client = createSearchClient();
    await expect(client.search("熵", 5)).resolves.toEqual([]);
  });
});
