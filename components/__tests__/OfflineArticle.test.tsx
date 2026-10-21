// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { OfflineArticle } from "@/components/article/OfflineArticle";

const url = "/philosophy/thinkers/socrates";
let worker: EventTarget & { controller: { postMessage: ReturnType<typeof vi.fn> } | null };

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubEnv("NODE_ENV", "production");
  worker = Object.assign(new EventTarget(), { controller: { postMessage: vi.fn() } });
  Object.defineProperty(navigator, "serviceWorker", { configurable: true, value: worker });
  vi.spyOn(navigator, "onLine", "get").mockReturnValue(true);
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  vi.spyOn(performance, "getEntriesByType").mockReturnValue([]);
  window.history.replaceState(null, "", url);
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  Reflect.deleteProperty(navigator, "serviceWorker");
  Reflect.deleteProperty(navigator, "connection");
  vi.unstubAllEnvs();
  vi.useRealTimers();
});

describe("committed article offline preparation", () => {
  it("delays preparation and cancels when a reader moves on immediately", () => {
    const { unmount } = render(<OfflineArticle url={url} />);
    vi.advanceTimersByTime(1000);
    expect(worker.controller!.postMessage).not.toHaveBeenCalled();
    unmount();
    vi.advanceTimersByTime(1000);
    expect(worker.controller!.postMessage).not.toHaveBeenCalled();
  });

  it("sends one companion request for the committed article", () => {
    render(<OfflineArticle url={url} />);
    vi.advanceTimersByTime(1500);
    expect(worker.controller!.postMessage).toHaveBeenCalledWith({
      type: "episteme:retain-article",
      path: url,
    });
    document.dispatchEvent(new Event("visibilitychange"));
    vi.advanceTimersByTime(1500);
    expect(worker.controller!.postMessage).toHaveBeenCalledOnce();
  });

  it("waits for the first controlling worker", () => {
    const controller = worker.controller;
    worker.controller = null;
    render(<OfflineArticle url={url} />);
    vi.advanceTimersByTime(1500);
    worker.controller = controller;
    worker.dispatchEvent(new Event("controllerchange"));
    vi.advanceTimersByTime(1500);
    expect(controller!.postMessage).toHaveBeenCalledOnce();
  });

  it("does not request query variants or a different current article", () => {
    window.history.replaceState(null, "", url + "?draft=1");
    const { rerender } = render(<OfflineArticle url={url} />);
    vi.advanceTimersByTime(1500);
    rerender(<OfflineArticle url="/philosophy/thinkers/plato" />);
    vi.advanceTimersByTime(1500);
    expect(worker.controller!.postMessage).not.toHaveBeenCalled();
  });

  it("skips a hard navigation already handled by the worker", () => {
    vi.mocked(performance.getEntriesByType).mockReturnValue([
      { name: window.location.href, workerStart: 1 } as PerformanceNavigationTiming,
    ]);
    render(<OfflineArticle url={url} />);
    vi.advanceTimersByTime(1500);
    expect(worker.controller!.postMessage).not.toHaveBeenCalled();
  });

  it("respects data saving and never starts while offline", () => {
    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: { saveData: true },
    });
    const { unmount } = render(<OfflineArticle url={url} />);
    vi.advanceTimersByTime(1500);
    unmount();
    Reflect.deleteProperty(navigator, "connection");
    vi.spyOn(navigator, "onLine", "get").mockReturnValue(false);
    render(<OfflineArticle url={url} />);
    vi.advanceTimersByTime(1500);
    expect(worker.controller!.postMessage).not.toHaveBeenCalled();
  });

  it("waits while hidden and retries after reconnecting", () => {
    const visible = vi.mocked(Object.getOwnPropertyDescriptor(document, "visibilityState")!.get!);
    visible.mockReturnValue("hidden");
    render(<OfflineArticle url={url} />);
    vi.advanceTimersByTime(1500);
    expect(worker.controller!.postMessage).not.toHaveBeenCalled();
    visible.mockReturnValue("visible");
    document.dispatchEvent(new Event("visibilitychange"));
    vi.advanceTimersByTime(1500);
    window.dispatchEvent(new Event("online"));
    vi.advanceTimersByTime(1500);
    expect(worker.controller!.postMessage).toHaveBeenCalledTimes(2);
  });
});
