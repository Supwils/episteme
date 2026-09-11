import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { handleWorkerRequest } from "../worker-runtime";

const artifactJson = readFileSync("public/search-index.json", "utf-8");

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("handleWorkerRequest", () => {
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
});
