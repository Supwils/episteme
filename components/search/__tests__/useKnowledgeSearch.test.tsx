// @vitest-environment happy-dom
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useKnowledgeSearch } from "../useKnowledgeSearch";
import type { SearchHit } from "@/lib/search/client";

const titleHit = (url: string, title = url): SearchHit => ({
  title,
  subtitle: "",
  url,
  section: "physics",
  kind: "article",
  score: 1,
});

const searchMock = vi.fn<(q: string, limit?: number) => Promise<SearchHit[]>>();

vi.mock("@/lib/search/client", () => ({
  createSearchClient: () => ({ search: searchMock, dispose: () => {} }),
}));

function mockPhraseApi(hits: unknown[], echo?: string) {
  const fetchMock = vi.fn().mockImplementation((url: string) => {
    const query = new URL(url, "http://localhost").searchParams.get("q") ?? "";
    return Promise.resolve({
      ok: true,
      json: async () => ({ query: echo ?? query, hits }),
    });
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("useKnowledgeSearch", () => {
  it("shows title matches without waiting for the body search", async () => {
    searchMock.mockResolvedValue([titleHit("/a/1", "热力学第二定律")]);
    mockPhraseApi([]);

    const { result } = renderHook(() => useKnowledgeSearch());
    act(() => result.current.setQuery("热力学"));

    await waitFor(() => expect(result.current.titleResults.length).toBe(1));
    expect(result.current.titleResults[0]!.title).toBe("热力学第二定律");
  });

  it("adds body matches once the request returns", async () => {
    searchMock.mockResolvedValue([]);
    mockPhraseApi([
      {
        title: "熵",
        url: "/a/2",
        section: "physics",
        kind: "article",
        snippet: "…熵增…",
        matchStart: 1,
      },
    ]);

    const { result } = renderHook(() => useKnowledgeSearch());
    act(() => result.current.setQuery("熵增"));

    await waitFor(() => expect(result.current.bodyResults.length).toBe(1));
    expect(result.current.bodyResults[0]!.snippet).toBe("…熵增…");
  });

  it("does not repeat an article that already matched by title", async () => {
    searchMock.mockResolvedValue([titleHit("/a/1")]);
    mockPhraseApi([{ title: "x", url: "/a/1", section: "physics", kind: "article", snippet: "s" }]);

    const { result } = renderHook(() => useKnowledgeSearch());
    act(() => result.current.setQuery("热力学"));

    await waitFor(() => expect(result.current.titleResults.length).toBe(1));
    await waitFor(() => expect(result.current.bodyResults).toEqual([]));
  });

  it("discards a body response that answers an older query", async () => {
    searchMock.mockResolvedValue([]);
    // The API always echoes "旧查询", i.e. never the current one.
    mockPhraseApi([{ title: "stale", url: "/a/9", section: "physics", kind: "article" }], "旧查询");

    const { result } = renderHook(() => useKnowledgeSearch());
    act(() => result.current.setQuery("新查询"));

    await waitFor(() => expect(result.current.searching).toBe(false));
    expect(result.current.bodyResults).toEqual([]);
  });

  it("clears results when the query is emptied", async () => {
    searchMock.mockResolvedValue([titleHit("/a/1")]);
    mockPhraseApi([]);

    const { result } = renderHook(() => useKnowledgeSearch());
    act(() => result.current.setQuery("热力学"));
    await waitFor(() => expect(result.current.titleResults.length).toBe(1));

    act(() => result.current.setQuery(""));
    await waitFor(() => expect(result.current.titleResults).toEqual([]));
  });

  it("survives a failed body search and keeps title results", async () => {
    searchMock.mockResolvedValue([titleHit("/a/1")]);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    const { result } = renderHook(() => useKnowledgeSearch());
    act(() => result.current.setQuery("热力学"));

    await waitFor(() => expect(result.current.titleResults.length).toBe(1));
    expect(result.current.bodyResults).toEqual([]);
  });
});
