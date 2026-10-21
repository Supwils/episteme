import MiniSearch from "minisearch";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SEARCH_INDEX_OPTIONS, SEARCH_INDEX_VERSION, type SearchIndexArtifact } from "../types";

const query = "A".repeat(119) + "𠀀";
const titles = [query, "A".repeat(119) + "𠀁"];
const index = new MiniSearch({ ...SEARCH_INDEX_OPTIONS, idField: "id" });
index.addAll(titles.map((title, id) => ({ id, title, text: "" })));
const artifact: SearchIndexArtifact = {
  v: SEARCH_INDEX_VERSION,
  docs: titles.map((title, id) => ({
    t: title,
    s: "",
    u: `/mathematics/concepts/fixture-${id}`,
    c: "mathematics",
    k: "article",
  })),
  index: index.toJSON(),
};

beforeEach(() => {
  vi.resetModules();
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => artifact }));
});

afterEach(() => vi.unstubAllGlobals());

describe.each(["worker", "main-thread"])("%s title query boundary", (path) => {
  it.each([query, query + "超出"])(
    "uses the final supplementary character to distinguish matching titles",
    async (input) => {
      if (path === "worker") {
        const { handleWorkerRequest } = await import("../worker-runtime");
        const result = await handleWorkerRequest({ type: "search", id: 1, query: input, limit: 5 });
        expect(result.type).toBe("result");
        if (result.type === "result") {
          expect(result.hits.map((hit) => hit.url)).toEqual(["/mathematics/concepts/fixture-0"]);
        }
      } else {
        vi.stubGlobal("Worker", undefined);
        const { createSearchClient } = await import("../client");
        const client = createSearchClient();
        try {
          expect((await client.search(input, 5)).map((hit) => hit.url)).toEqual([
            "/mathematics/concepts/fixture-0",
          ]);
        } finally {
          client.dispose();
        }
      }
    }
  );
});
