import { describe, expect, it } from "vitest";
import { MAX_ANIMATED_GRAPH_ELEMENTS, shouldAnimateGraphEntrance } from "../initial-render-policy";

describe("shouldAnimateGraphEntrance", () => {
  it("keeps staged entrance animation for focused and filtered graphs", () => {
    expect(shouldAnimateGraphEntrance(500, 900, false)).toBe(true);
    expect(shouldAnimateGraphEntrance(800, MAX_ANIMATED_GRAPH_ELEMENTS - 800, false)).toBe(true);
  });

  it("renders dense graphs in one frame to protect interaction latency", () => {
    expect(shouldAnimateGraphEntrance(1_381, 3_486, false)).toBe(false);
    expect(shouldAnimateGraphEntrance(800, MAX_ANIMATED_GRAPH_ELEMENTS - 799, false)).toBe(false);
  });

  it("disables entrance motion when the user requests reduced motion", () => {
    expect(shouldAnimateGraphEntrance(20, 30, true)).toBe(false);
  });
});
