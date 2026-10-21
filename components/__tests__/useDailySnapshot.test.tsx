// @vitest-environment happy-dom
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDailySnapshot } from "../useDailySnapshot";

const BEFORE = { date: "2026-12-31", label: "旧内容" };
const AFTER = { date: "2027-01-01", label: "新内容" };
function response(value = AFTER, delay = "86400000") {
  return new Response(JSON.stringify(value), { headers: { "X-Daily-Refresh-After": delay } });
}
function fixture(initial = BEFORE) {
  return renderHook(() => useDailySnapshot(initial, "/api/daily"));
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date", "setTimeout", "clearTimeout", "performance"] });
  vi.setSystemTime(new Date("2026-12-31T15:59:59Z"));
  vi.spyOn(document, "hidden", "get").mockReturnValue(false);
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("daily snapshot lifetime", () => {
  it("uses the SSR snapshot through hydration and replaces the whole value at Beijing midnight", async () => {
    const fetcher = vi.fn<typeof fetch>(() => Promise.resolve(response()));
    vi.stubGlobal("fetch", fetcher);
    const { result } = fixture();
    expect(result.current.snapshot).toEqual(BEFORE);
    expect(fetcher).not.toHaveBeenCalled();
    await act(() => vi.advanceTimersByTimeAsync(1000));
    expect(result.current.snapshot).toEqual(AFTER);
    expect(fetcher).toHaveBeenCalledOnce();
    expect(fetcher.mock.calls[0]?.[1]).toMatchObject({ cache: "no-store" });
  });

  it("repairs an old ISR snapshot immediately after hydration", async () => {
    vi.setSystemTime(new Date("2026-12-31T16:30:00Z"));
    const fetcher = vi.fn<typeof fetch>(() => Promise.resolve(response()));
    vi.stubGlobal("fetch", fetcher);
    const { result } = fixture();
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(result.current.snapshot).toEqual(AFTER);
    expect(fetcher).toHaveBeenCalledOnce();
  });

  it("keeps a failed midnight refresh consistent and retries without a request loop", async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(new Response(null, { status: 503 }))
      .mockImplementation(() => Promise.resolve(response()));
    vi.stubGlobal("fetch", fetcher);
    const { result } = fixture();
    await act(() => vi.advanceTimersByTimeAsync(1000));
    expect(result.current.snapshot).toEqual(BEFORE);
    expect(result.current.loading).toBe(false);
    await act(() => vi.advanceTimersByTimeAsync(29_999));
    expect(fetcher).toHaveBeenCalledOnce();
    await act(() => vi.advanceTimersByTimeAsync(1));
    expect(result.current.snapshot).toEqual(AFTER);
  });

  it("rechecks the day when a suspended tab becomes visible", async () => {
    const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    const fetcher = vi.fn<typeof fetch>(() => Promise.resolve(response()));
    vi.stubGlobal("fetch", fetcher);
    const { result } = fixture();
    await act(() => vi.advanceTimersByTimeAsync(2000));
    expect(fetcher).not.toHaveBeenCalled();
    hidden.mockReturnValue(false);
    await act(async () => document.dispatchEvent(new Event("visibilitychange")));
    expect(result.current.snapshot).toEqual(AFTER);
  });

  it("does not let a delayed previous-day shuffle overwrite a newer daily snapshot", async () => {
    let finish!: (value: Response) => void;
    const delayed = new Promise<Response>((resolve) => {
      finish = resolve;
    });
    const fetcher = vi
      .fn<typeof fetch>()
      .mockReturnValueOnce(delayed)
      .mockImplementation(() => Promise.resolve(response()));
    vi.stubGlobal("fetch", fetcher);
    const { result } = fixture();
    let pending!: Promise<unknown>;
    act(() => {
      pending = result.current.load("/api/daily/shuffle?offset=1");
    });
    await act(() => vi.advanceTimersByTimeAsync(1000));
    expect(result.current.snapshot).toEqual(AFTER);
    expect(fetcher.mock.calls[0]?.[1]?.signal?.aborted).toBe(true);
    await act(async () => {
      finish(response(BEFORE));
      await pending;
    });
    expect(result.current.snapshot).toEqual(AFTER);
    expect(result.current.isDefault).toBe(true);
  });

  it("aborts requests and clears both timers on unmount", async () => {
    const fetcher = vi.fn<typeof fetch>(() => new Promise<Response>(() => {}));
    vi.stubGlobal("fetch", fetcher);
    const { result, unmount } = fixture();
    act(() => {
      void result.current.load();
    });
    const signal = fetcher.mock.calls[0]?.[1]?.signal;
    unmount();
    expect(signal?.aborted).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("keeps a user's roll when RSC sends another default object for the same day", async () => {
    const rolled = { ...BEFORE, label: "用户换的一组" };
    vi.stubGlobal(
      "fetch",
      vi.fn<typeof fetch>(() => Promise.resolve(response(rolled, "1000")))
    );
    const { result, rerender } = renderHook(
      ({ initial }) => useDailySnapshot(initial, "/api/daily"),
      {
        initialProps: { initial: BEFORE },
      }
    );
    await act(async () => {
      await result.current.load("/api/daily/shuffle?offset=1");
    });
    rerender({ initial: { ...BEFORE } });
    expect(result.current.snapshot).toEqual(rolled);
    expect(result.current.isDefault).toBe(false);
  });

  it("bounds an unresponsive refresh and keeps its snapshot until a retry succeeds", async () => {
    const fetcher = vi.fn<typeof fetch>(
      (_, options) =>
        new Promise((_, reject) => {
          options?.signal?.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError"))
          );
        })
    );
    vi.stubGlobal("fetch", fetcher);
    const { result } = fixture();
    await act(() => vi.advanceTimersByTimeAsync(16_000));
    expect(fetcher.mock.calls[0]?.[1]?.signal?.aborted).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.snapshot).toEqual(BEFORE);
    fetcher.mockImplementation(() => Promise.resolve(response()));
    await act(() => vi.advanceTimersByTimeAsync(30_000));
    expect(result.current.snapshot).toEqual(AFTER);
  });

  it.each(["", "NaN", "-1", "86400001"])(
    "rejects invalid server refresh duration %j",
    async (delay) => {
      vi.stubGlobal(
        "fetch",
        vi.fn<typeof fetch>(() => Promise.resolve(response(AFTER, delay)))
      );
      const { result } = fixture();
      await act(() => vi.advanceTimersByTimeAsync(1000));
      expect(result.current.snapshot).toEqual(BEFORE);
      expect(result.current.loading).toBe(false);
    }
  );
});
