// @vitest-environment happy-dom
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { GraphRenderer } from "@/lib/graph-engine";
import { isFiniteTransform, useGraphInteractions } from "../useGraphInteractions";

function setup(zoom: number, offsetX: number, offsetY: number) {
  const setTransform = vi.fn();
  const container = document.createElement("div");
  Object.defineProperty(container, "clientWidth", { value: 800 });
  Object.defineProperty(container, "clientHeight", { value: 600 });
  const setZoom = vi.fn();
  const setOffsetX = vi.fn();
  const setOffsetY = vi.fn();

  const { result } = renderHook(() =>
    useGraphInteractions([], [], new Set(), zoom, offsetX, offsetY, -1, null, false, {
      canvasRef: { current: null },
      containerRef: { current: container },
      rendererRef: { current: { setTransform } as unknown as GraphRenderer },
      positionsRef: { current: new Map() },
      cancelAnimRef: { current: null },
      searchInputRef: { current: null },
      setHoveredNodeId: vi.fn(),
      setSelectedNodeId: vi.fn(),
      setSearchQuery: vi.fn(),
      setZoom,
      setOffsetX,
      setOffsetY,
      setFocusedNodeIndex: vi.fn(),
      setCursorPos: vi.fn(),
      setShowMinimap: vi.fn(),
      nodeDomainMap: new Map(),
      filteredNodes: [],
      isMobile: false,
    })
  );
  return { result, setTransform, setZoom, setOffsetX, setOffsetY };
}

describe("useGraphInteractions transform sync", () => {
  it("zoom buttons keep offset state in step with the renderer", () => {
    const { result, setTransform, setZoom, setOffsetX, setOffsetY } = setup(1, 100, 50);

    act(() => result.current.handleZoomIn());

    // The world point under the viewport centre (300, 250) stays put.
    expect(setTransform).toHaveBeenCalledWith(1.25, 25, -12.5);
    expect(setZoom).toHaveBeenCalledWith(1.25);
    expect(setOffsetX).toHaveBeenCalledWith(25);
    expect(setOffsetY).toHaveBeenCalledWith(-12.5);
  });

  it("minimap navigation updates offset state, not just the renderer", () => {
    const { result, setTransform, setOffsetX, setOffsetY } = setup(2, 0, 0);

    act(() => result.current.handleMinimapNavigate(100, 50));

    expect(setTransform).toHaveBeenCalledWith(2, 200, 200);
    expect(setOffsetX).toHaveBeenCalledWith(200);
    expect(setOffsetY).toHaveBeenCalledWith(200);
  });

  it("drops a non-finite minimap target instead of blanking the graph", () => {
    const { result, setTransform, setOffsetX } = setup(1, 0, 0);

    act(() => result.current.handleMinimapNavigate(Number.NaN, 10));

    expect(setTransform).not.toHaveBeenCalled();
    expect(setOffsetX).not.toHaveBeenCalled();
  });
});

describe("isFiniteTransform", () => {
  it("rejects NaN, infinite and non-positive scales", () => {
    expect(isFiniteTransform(1, 0, 0)).toBe(true);
    expect(isFiniteTransform(Number.NaN, 0, 0)).toBe(false);
    expect(isFiniteTransform(1, Infinity, 0)).toBe(false);
    expect(isFiniteTransform(0, 0, 0)).toBe(false);
  });
});
