import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { handleWorkerRequest } from "../worker-runtime";

const artifactJson = readFileSync("public/search-index.json", "utf-8");

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("handleWorkerRequest", () => {
  it("rejects malformed payloads without loading the index", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(handleWorkerRequest(null)).resolves.toEqual({
      type: "error",
      message: "invalid search request",
    });
    await expect(handleWorkerRequest({ type: "pwn" })).resolves.toEqual({
      type: "error",
      message: "invalid search request",
    });
    await expect(
      handleWorkerRequest({ type: "search", id: 1, query: 12, limit: 5 })
    ).resolves.toEqual({
      type: "error",
      id: 1,
      message: "invalid search request",
    });
    await expect(
      handleWorkerRequest({ type: "search", id: 1, query: "熵", limit: Number.NaN })
    ).resolves.toEqual({
      type: "error",
      id: 1,
      message: "invalid search request",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("loads the real index and returns title hits", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => JSON.parse(artifactJson) as unknown,
      })
    );

    const ready = await handleWorkerRequest({ type: "warmup" });
    expect(ready).toEqual({ type: "ready" });

    const result = await handleWorkerRequest({
      type: "search",
      id: 7,
      query: "热力学",
      limit: 5,
    });
    expect(result.type).toBe("result");
    if (result.type !== "result") return;
    expect(result.id).toBe(7);
    expect(result.hits.length).toBeGreaterThan(0);
    expect(result.hits[0]!.url.startsWith("/")).toBe(true);
  });

  it("clamps an oversized limit instead of scanning the whole index", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => JSON.parse(artifactJson) as unknown,
      })
    );

    const result = await handleWorkerRequest({
      type: "search",
      id: 3,
      query: "热力学",
      limit: 9999,
    });
    expect(result.type).toBe("result");
    if (result.type !== "result") return;
    expect(result.hits.length).toBeLessThanOrEqual(50);
  });
});
