import MiniSearch from "minisearch";
import { describe, expect, it } from "vitest";
import { loadEngine } from "../engine";
import { SEARCH_INDEX_OPTIONS, type SearchIndexArtifact } from "../types";

describe("loadEngine url guard", () => {
  it("omits a document whose url is not a same-origin path", () => {
    const index = new MiniSearch({ ...SEARCH_INDEX_OPTIONS, idField: "id" });
    index.addAll([
      { id: 0, title: "alphaunique", text: "" },
      { id: 1, title: "betaunique", text: "" },
    ]);
    const artifact: SearchIndexArtifact = {
      v: 1,
      docs: [
        { t: "alphaunique", s: "", u: "//evil.example/a/b", c: "physics", k: "article" },
        { t: "betaunique", s: "", u: "/physics/concepts/entropy", c: "physics", k: "article" },
      ],
      index: index.toJSON(),
    };
    expect(
      loadEngine(artifact)
        .search("betaunique", 10)
        .map((hit) => hit.url)
    ).toEqual(["/physics/concepts/entropy"]);
    expect(loadEngine(artifact).search("alphaunique", 10)).toEqual([]);
  });
});
