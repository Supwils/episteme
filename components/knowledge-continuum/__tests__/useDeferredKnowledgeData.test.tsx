// @vitest-environment happy-dom
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useDeferredKnowledgeData } from "../useDeferredKnowledgeData";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("useDeferredKnowledgeData", () => {
  it("starts code and data loading together only after activation", async () => {
    const preload = vi.fn();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ value: 42 }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() =>
      useDeferredKnowledgeData<{ value: number }>("/api/deferred", preload)
    );

    expect(fetchMock).not.toHaveBeenCalled();
    expect(preload).not.toHaveBeenCalled();
    expect(result.current.status).toBe("idle");

    act(() => result.current.activate());
    expect(preload).toHaveBeenCalledOnce();

    await waitFor(() => expect(result.current.status).toBe("ready"));
    expect(fetchMock).toHaveBeenCalledWith("/api/deferred", { signal: expect.any(AbortSignal) });
    expect(result.current.data).toEqual({ value: 42 });
  });

  it("can retry a failed request without discarding the deferred boundary", async () => {
    const preload = vi.fn();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 503 })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ value: 7 }) });
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() =>
      useDeferredKnowledgeData<{ value: number }>("/api/deferred", preload)
    );
    act(() => result.current.activate());
    await waitFor(() => expect(result.current.status).toBe("error"));

    act(() => result.current.retry());
    await waitFor(() => expect(result.current.status).toBe("ready"));
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result.current.data).toEqual({ value: 7 });
  });
});
