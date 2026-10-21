// @vitest-environment happy-dom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GraphRenderer } from "../renderer/graph-renderer";
import type { RenderConfig } from "../renderer/types";

const config: RenderConfig = {
  nodeRadius: {},
  domainColors: {},
  edgeColor: "#888",
  backgroundColor: "#000",
  labelFont: "sans-serif",
  labelColor: "#fff",
  highlightColor: "#ff0",
};

describe("graph renderer resize invalidation", () => {
  let renderer: GraphRenderer;
  let canvas: HTMLCanvasElement;
  let notifyResize: () => void;
  let width: number;
  let height: number;
  let frameId: number;
  let pixelRatio: number;
  let frames: Map<number, FrameRequestCallback>;
  const context = {
    setTransform: vi.fn(),
    fillRect: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
  };

  function drawPendingFrame() {
    const pending = frames.entries().next().value;
    expect(pending).toBeDefined();
    const [id, callback] = pending!;
    frames.delete(id);
    callback(performance.now());
  }

  beforeEach(() => {
    width = 640;
    height = 480;
    frameId = 0;
    pixelRatio = 2;
    frames = new Map();
    vi.clearAllMocks();
    vi.spyOn(window, "devicePixelRatio", "get").mockImplementation(() => pixelRatio);
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      frames.set(++frameId, callback);
      return frameId;
    });
    vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
    vi.stubGlobal(
      "ResizeObserver",
      class {
        constructor(callback: () => void) {
          notifyResize = callback;
        }
        observe() {}
        disconnect() {}
      }
    );
    canvas = document.createElement("canvas");
    vi.spyOn(canvas, "getBoundingClientRect").mockImplementation(
      () => new DOMRect(0, 0, width, height)
    );
    // No nodes are needed to observe a complete frame and its scheduling.
    vi.spyOn(canvas, "getContext").mockReturnValue(context as unknown as CanvasRenderingContext2D);
    renderer = new GraphRenderer(canvas, config);
    drawPendingFrame();
  });

  afterEach(() => {
    renderer.destroy();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("keeps the completed frame when the observer reports unchanged dimensions", () => {
    expect(context.fillRect).toHaveBeenCalledTimes(1);
    notifyResize();
    expect(frames.size).toBe(0);
    window.dispatchEvent(new Event("resize"));
    expect(frames.size).toBe(0);
  });

  it("repaints and resizes the backing bitmap after a real container resize", () => {
    width = 800;
    height = 600;
    notifyResize();
    expect([canvas.width, canvas.height]).toEqual([1600, 1200]);
    drawPendingFrame();
    expect(context.fillRect).toHaveBeenLastCalledWith(0, 0, 800, 600);
  });

  it("repaints when the display pixel ratio changes without a CSS resize", () => {
    pixelRatio = 3;
    window.dispatchEvent(new Event("resize"));
    expect([canvas.width, canvas.height]).toEqual([1920, 1440]);
    drawPendingFrame();
    expect(context.setTransform).toHaveBeenLastCalledWith(3, 0, 0, 3, 0, 0);
  });

  it("restores a changed backing bitmap even when the CSS box is unchanged", () => {
    canvas.width = 1;
    notifyResize();
    expect(canvas.width).toBe(1280);
    drawPendingFrame();
  });
});
