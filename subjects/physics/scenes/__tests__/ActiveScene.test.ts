import { describe, expect, it } from "vitest";
import { sceneLayers } from "../ActiveScene";

const idle = { active: false, kind: null, from: null, to: null, progress: 0 } as const;

describe("sceneLayers", () => {
  it("keeps the destination tier as a stable layer across the end of a dissolve", () => {
    const during = sceneLayers(
      { active: true, kind: "dissolve", from: "T5", to: "T6", progress: 0.9 },
      "T5"
    );
    const after = sceneLayers(idle, "T6");

    expect(during.map((layer) => layer.tier)).toEqual(["T5", "T6"]);
    expect(during[1]?.opacity).toBeCloseTo(0.9);
    expect(after).toEqual([{ tier: "T6", opacity: 1 }]);
  });

  it("holds the source scene during a non-dissolve transition", () => {
    expect(
      sceneLayers({ active: true, kind: "zoom", from: "T2", to: "T3", progress: 0.4 }, "T2")
    ).toEqual([{ tier: "T2", opacity: 1 }]);
  });
});
