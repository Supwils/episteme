import { describe, expect, it } from "vitest";
import { perspectiveBox, towardVanishing } from "../perspective";

describe("perspective", () => {
  it("moves a point toward the vanishing point", () => {
    const next = towardVanishing({ x: 0, y: 0 }, { x: 100, y: 0 }, 0.5);
    expect(next.x).toBeCloseTo(50);
    expect(next.y).toBeCloseTo(0);
  });

  it("builds a back face closer to the vanishing point than the front", () => {
    const box = perspectiveBox({ x: 200, y: 40 });
    const frontSpan = box.front[1]!.x - box.front[0]!.x;
    const backSpan = box.back[1]!.x - box.back[0]!.x;
    expect(backSpan).toBeLessThan(frontSpan);
  });
});
