// @vitest-environment happy-dom
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
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
  cleanup();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
  vi.useRealTimers();
});

describe("useKnowledgeSearch", () => {
  it("clears old title and body matches while a replacement query is pending", async () => {
    searchMock.mockResolvedValue([titleHit("/old-title")]);
    const fetchMock = mockPhraseApi([
      { title: "旧正文", url: "/old-body", section: "physics", kind: "article" },
    ]);
    const { result } = renderHook(() => useKnowledgeSearch());
    act(() => result.current.setQuery("旧查询"));
    await waitFor(() => expect(result.current.searching).toBe(false));
    expect(result.current.titleResults).toHaveLength(1);
    expect(result.current.bodyResults).toHaveLength(1);
    searchMock.mockReturnValue(new Promise(() => {}));
    fetchMock.mockReturnValue(new Promise(() => {}));
    act(() => result.current.setQuery("新查询"));
    expect(result.current.searching).toBe(true);
    expect(result.current.titleResults).toEqual([]);
    expect(result.current.bodyResults).toEqual([]);
  });

  it.each(["replace", "clear", "unmount"])(
    "aborts the in-flight body request on %s",
    async (action) => {
      searchMock.mockResolvedValue([]);
      let signal: AbortSignal | undefined;
      const fetchMock = vi.fn().mockImplementation((_url: string, init?: RequestInit) => {
        signal = init?.signal ?? undefined;
        return new Promise((_resolve, reject) => {
          signal?.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError"))
          );
        });
      });
      vi.stubGlobal("fetch", fetchMock);
      const { result, unmount } = renderHook(() => useKnowledgeSearch());
      act(() => result.current.setQuery("旧查询"));
      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
      const oldSignal = signal;
      await act(async () => {
        if (action === "unmount") unmount();
        else result.current.setQuery(action === "replace" ? "新查询" : "");
      });
      expect(oldSignal?.aborted).toBe(true);
      if (action !== "unmount") expect(result.current.searching).toBe(action === "replace");
    }
  );

  it("does not send a request cancelled before the debounce expires", async () => {
    vi.useFakeTimers();
    searchMock.mockResolvedValue([]);
    const fetchMock = mockPhraseApi([]);
    const { result } = renderHook(() => useKnowledgeSearch());
    act(() => result.current.setQuery("旧查询"));
    await act(async () => vi.advanceTimersByTimeAsync(179));
    act(() => result.current.setQuery(""));
    await act(async () => vi.advanceTimersByTimeAsync(500));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.current.searching).toBe(false);
  });

  it("keeps loading until a slow title search finishes after the body tier", async () => {
    let release!: (hits: SearchHit[]) => void;
    searchMock.mockReturnValue(
      new Promise<SearchHit[]>((resolve) => {
        release = resolve;
      })
    );
    mockPhraseApi([{ title: "正文命中", url: "/body", section: "physics", kind: "article" }]);
    const { result } = renderHook(() => useKnowledgeSearch());
    act(() => result.current.setQuery("热力学"));
    await waitFor(() => expect(result.current.bodyResults).toHaveLength(1));
    expect(result.current.searching).toBe(true);
    await act(async () => release([titleHit("/title")]));
    expect(result.current.searching).toBe(false);
    expect(result.current.titleResults).toHaveLength(1);
  });

  it("keeps loading while only the body tier is pending", async () => {
    searchMock.mockResolvedValue([titleHit("/title")]);
    let release!: (value: { ok: false }) => void;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(
        new Promise((resolve) => {
          release = resolve;
        })
      )
    );
    const { result } = renderHook(() => useKnowledgeSearch());
    act(() => result.current.setQuery("热力学"));
    await waitFor(() => expect(result.current.titleResults).toHaveLength(1));
    expect(result.current.searching).toBe(true);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    await act(async () => release({ ok: false }));
    expect(result.current.searching).toBe(false);
  });

  it("clears loading and ignores title completion after the query is emptied", async () => {
    let release!: (hits: SearchHit[]) => void;
    searchMock.mockReturnValue(
      new Promise<SearchHit[]>((resolve) => {
        release = resolve;
      })
    );
    mockPhraseApi([]);
    const { result } = renderHook(() => useKnowledgeSearch());
    act(() => result.current.setQuery("热力学"));
    expect(result.current.searching).toBe(true);
    act(() => result.current.setQuery(""));
    expect(result.current.searching).toBe(false);
    await act(async () => release([titleHit("/stale")]));
    expect(result.current.titleResults).toEqual([]);
    expect(result.current.searching).toBe(false);
  });

  it("settles a failed title search without losing body matches", async () => {
    searchMock.mockRejectedValue(new Error("index search failed"));
    mockPhraseApi([{ title: "正文命中", url: "/body", section: "physics", kind: "article" }]);
    const { result } = renderHook(() => useKnowledgeSearch());
    act(() => result.current.setQuery("热力学"));
    await waitFor(() => expect(result.current.bodyResults).toHaveLength(1));
    expect(result.current.searching).toBe(false);
    expect(result.current.titleResults).toEqual([]);
  });

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

    await waitFor(() => expect(result.current.searching).toBe(false));
    expect(result.current.titleResults.map((h) => h.url)).toEqual(["/a/1"]);
    expect(result.current.bodyResults).toEqual([]);
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

    await waitFor(() => expect(result.current.searching).toBe(false));
    expect(result.current.titleResults).toHaveLength(1);
    expect(result.current.bodyResults).toEqual([]);
  });
});
