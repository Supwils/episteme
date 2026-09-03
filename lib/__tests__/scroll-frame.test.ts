// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { subscribeToScrollFrame, type ScrollFrameSnapshot } from "../scroll-frame";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("subscribeToScrollFrame", () => {
  it("shares one passive listener and one layout snapshot per animation frame", () => {
    const frames = new Map<number, FrameRequestCallback>();
    let nextFrameId = 0;
    const requestFrame = vi.fn((callback: FrameRequestCallback) => {
      nextFrameId += 1;
      frames.set(nextFrameId, callback);
      return nextFrameId;
    });
    const cancelFrame = vi.fn((frameId: number) => frames.delete(frameId));
    vi.stubGlobal("requestAnimationFrame", requestFrame);
    vi.stubGlobal("cancelAnimationFrame", cancelFrame);

    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
    Object.defineProperty(window, "innerHeight", { value: 500, configurable: true });
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 1_500,
      configurable: true,
    });

    const addListener = vi.spyOn(window, "addEventListener");
    const removeListener = vi.spyOn(window, "removeEventListener");
    const firstSnapshots: ScrollFrameSnapshot[] = [];
    const secondSnapshots: ScrollFrameSnapshot[] = [];
    const unsubscribeFirst = subscribeToScrollFrame((snapshot) => firstSnapshots.push(snapshot));
    const unsubscribeSecond = subscribeToScrollFrame((snapshot) => secondSnapshots.push(snapshot));

    expect(addListener.mock.calls.filter(([type]) => type === "scroll")).toHaveLength(1);

    Object.defineProperty(window, "scrollY", { value: 500, configurable: true });
    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("scroll"));
    expect(requestFrame).toHaveBeenCalledTimes(1);

    frames.get(1)?.(16);
    expect(firstSnapshots.at(-1)).toEqual({ progress: 0.5, scrollY: 500 });
    expect(secondSnapshots.at(-1)).toEqual({ progress: 0.5, scrollY: 500 });

    unsubscribeFirst();
    unsubscribeSecond();
    expect(removeListener.mock.calls.filter(([type]) => type === "scroll")).toHaveLength(1);
    expect(cancelFrame).not.toHaveBeenCalled();
  });
});
