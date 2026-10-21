import { describe, expect, it } from "vitest";
import { parseControlPosition } from "../control-position";

const fallback = { x: 12, y: 34 };

describe("parseControlPosition", () => {
  it("keeps a finite stored point", () => {
    expect(parseControlPosition(JSON.stringify({ x: 40, y: 80 }), fallback)).toEqual({
      x: 40,
      y: 80,
    });
  });

  it("rejects non-finite coordinates and corrupt JSON", () => {
    expect(parseControlPosition(JSON.stringify({ x: 1e309, y: 10 }), fallback)).toEqual(fallback);
    expect(parseControlPosition('{"x":null,"y":10}', fallback)).toEqual(fallback);
    expect(parseControlPosition("not-json", fallback)).toEqual(fallback);
    expect(parseControlPosition(null, fallback)).toEqual(fallback);
  });
});
