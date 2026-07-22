import { describe, expect, it, vi } from "vitest";
import { drawEdges, drawLabels, type DrawContext } from "../draw-layers";
import type { HighlightState, RenderConfig, RenderEdge, RenderNode } from "../types";

const config: RenderConfig = {
  nodeRadius: {},
  domainColors: {},
  edgeColor: "#fff",
  backgroundColor: "#000",
  labelFont: "sans-serif",
  labelColor: "#fff",
  highlightColor: "#818cf8",
};

const bounds = {
  minX: -100,
  minY: -100,
  maxX: 100,
  maxY: 100,
};

function node(
  id: string,
  importance: number | undefined,
  state: Partial<RenderNode> = {}
): RenderNode {
  return {
    id,
    x: 0,
    y: 0,
    label: id,
    domain: "physics",
    type: "concept",
    radius: 10,
    color: "#fff",
    hovered: false,
    selected: false,
    searchMatched: false,
    alpha: 1,
    importance,
    ...state,
  };
}

function context(
  nodesRef: RenderNode[],
  edgesRef: RenderEdge[],
  highlight: HighlightState
): {
  drawContext: DrawContext;
  fillText: ReturnType<typeof vi.fn>;
  stroke: ReturnType<typeof vi.fn>;
} {
  const fillText = vi.fn();
  const stroke = vi.fn();
  const canvasContext = {
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    arcTo: vi.fn(),
    closePath: vi.fn(),
    stroke,
    fill: vi.fn(),
    fillText,
    measureText: (text: string) => ({ width: text.length * 10 }),
    save: vi.fn(),
    restore: vi.fn(),
  } as unknown as CanvasRenderingContext2D;

  return {
    fillText,
    stroke,
    drawContext: {
      ctx: canvasContext,
      config,
      transform: { scale: 0.2, offsetX: 0, offsetY: 0 },
      highlight,
      nodesRef,
      edgesRef,
      guidesRef: [],
      crossDomainOnly: false,
      markDirty: vi.fn(),
    },
  };
}

describe("semantic graph level-of-detail", () => {
  it("keeps hubs, route nodes, selections and search matches labeled at overview scale", () => {
    const nodes = [
      node("hub", 0.99, { x: -60, y: -60 }),
      node("ordinary", 0.8),
      node("selected", 0.1, { x: 60, y: -60, selected: true }),
      node("searched", 0.1, { x: -60, y: 60, searchMatched: true }),
      node("route", 0.1, { x: 60, y: 60 }),
    ];
    const highlight = {
      nodeIds: new Set(["route"]),
      edgeKeys: new Set<string>(),
      pathNodes: ["route"],
      dimAlpha: 0.3,
    };
    const { drawContext, fillText } = context(nodes, [], highlight);

    drawLabels(drawContext, bounds);

    expect(fillText.mock.calls.map(([label]) => label).sort()).toEqual(
      ["hub", "selected", "searched", "route"].sort()
    );
  });

  it("keeps highlighted and high-importance edges while suppressing overview noise", () => {
    const edges: RenderEdge[] = [
      {
        x1: -10,
        y1: 0,
        x2: 10,
        y2: 0,
        color: "#fff",
        width: 1,
        alpha: 1,
        sourceId: "a",
        targetId: "b",
        importance: 0.4,
      },
      {
        x1: -10,
        y1: 10,
        x2: 10,
        y2: 10,
        color: "#fff",
        width: 1,
        alpha: 1,
        sourceId: "hub-a",
        targetId: "hub-b",
        importance: 0.99,
      },
      {
        x1: -10,
        y1: -10,
        x2: 10,
        y2: -10,
        color: "#fff",
        width: 1,
        alpha: 1,
        sourceId: "route-a",
        targetId: "route-b",
        importance: 0.2,
      },
    ];
    const highlight = {
      nodeIds: new Set(["route-a", "route-b"]),
      edgeKeys: new Set(["route-a->route-b"]),
      pathNodes: ["route-a", "route-b"],
      dimAlpha: 0.3,
    };
    const { drawContext, stroke } = context([], edges, highlight);

    drawEdges(drawContext, bounds);

    expect(stroke).toHaveBeenCalledTimes(2);
  });
});
