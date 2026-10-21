import MiniSearch from "minisearch";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SEARCH_INDEX_OPTIONS, SEARCH_INDEX_VERSION, type SearchIndexArtifact } from "../types";

const { readIndex } = vi.hoisted(() => ({ readIndex: vi.fn() }));

vi.mock("node:fs", () => ({ readFileSync: readIndex }));
vi.mock("../corpus-store", () => ({
  getPhraseCorpus: async () => ({ corpus: { text: "", offsets: [] }, docs: [] }),
}));

const index = new MiniSearch({ ...SEARCH_INDEX_OPTIONS, idField: "id" });
index.add({ id: 0, title: "热力学", text: "" });
const artifact: SearchIndexArtifact = {
  v: SEARCH_INDEX_VERSION,
  docs: [
    {
      t: "热力学",
      s: "",
      u: "/universe-physics/physics/thermodynamics",
      c: "universe-physics",
      k: "article",
    },
  ],
  index: index.toJSON(),
};
const artifactJson = JSON.stringify(artifact);

beforeEach(() => {
  vi.resetModules();
  readIndex.mockReset();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => vi.restoreAllMocks());

describe("server title search recovery", () => {
  it("retries after a temporary file read failure and caches the recovered engine", async () => {
    readIndex
      .mockImplementationOnce(() => {
        throw new Error("EMFILE: too many open files");
      })
      .mockReturnValue(artifactJson);
    const { searchEverything } = await import("../server");

    expect((await searchEverything("热力学")).titleResults).toEqual([]);
    expect((await searchEverything("热力学")).titleResults[0]?.title).toBe("热力学");
    expect((await searchEverything("热力学")).titleResults[0]?.title).toBe("热力学");
    expect(readIndex).toHaveBeenCalledTimes(2);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it("recovers when an initially unreadable artifact is replaced with valid JSON", async () => {
    readIndex.mockReturnValueOnce("{").mockReturnValue(artifactJson);
    const { searchEverything } = await import("../server");

    expect((await searchEverything("热力学")).titleResults).toEqual([]);
    expect((await searchEverything("热力学")).titleResults[0]?.title).toBe("热力学");
    expect(readIndex).toHaveBeenCalledTimes(2);
  });

  it("loads a healthy artifact once across concurrent searches", async () => {
    readIndex.mockReturnValue(artifactJson);
    const { searchEverything } = await import("../server");

    const results = await Promise.all(Array.from({ length: 3 }, () => searchEverything("热力学")));
    expect(results.every((result) => result.titleResults[0]?.title === "热力学")).toBe(true);
    expect(readIndex).toHaveBeenCalledTimes(1);
  });
});
