import { describe, expect, it } from "vitest";
import {
  graphViewUrlKey,
  parseGraphViewUrlState,
  writeGraphViewUrlState,
} from "../graph-view-url-state";

describe("graph view URL state", () => {
  it("restores a spatial angle and keeps it normalized", () => {
    expect(
      parseGraphViewUrlState(
        new URLSearchParams("layout=spatial&spatialAngle=306&spatialFront=computer-science")
      )
    ).toEqual({
      layoutMode: "spatial",
      spatialRotation: -54,
      spatialLevel: null,
    });
  });

  it("uses a valid front domain when the angle is absent", () => {
    expect(
      parseGraphViewUrlState(new URLSearchParams("layout=spatial&spatialFront=computer-science"))
    ).toEqual({
      layoutMode: "spatial",
      spatialRotation: -54,
      spatialLevel: null,
    });
  });

  it("rejects unknown layout, domain and non-finite angle values", () => {
    expect(
      parseGraphViewUrlState(
        new URLSearchParams("layout=orbital&spatialAngle=Infinity&spatialFront=unknown")
      )
    ).toEqual({
      layoutMode: null,
      spatialRotation: 0,
      spatialLevel: null,
    });
  });

  it("writes spatial state and stage without removing route and article parameters", () => {
    const result = writeGraphViewUrlState(
      new URLSearchParams("tourId=modern-macro-diagnosis&step=2&level=4"),
      "spatial",
      -53.6,
      "computer-science",
      4
    );

    expect(result.toString()).toBe(
      "tourId=modern-macro-diagnosis&step=2&layout=spatial&spatialAngle=-54&spatialFront=computer-science&spatialLevel=4"
    );
  });

  it("removes spatial-only parameters for another layout", () => {
    const result = writeGraphViewUrlState(
      new URLSearchParams(
        "layout=spatial&spatialAngle=-54&spatialFront=computer-science&spatialLevel=4&focus=node"
      ),
      "cognitive",
      0,
      null
    );

    expect(result.toString()).toBe("layout=cognitive&focus=node");
  });

  it("builds a key from only graph-view parameters", () => {
    expect(
      graphViewUrlKey(
        new URLSearchParams(
          "layout=spatial&spatialAngle=-54&spatialFront=computer-science&spatialLevel=4&step=3"
        )
      )
    ).toBe("spatial|-54|computer-science|4");
  });

  it("restores only valid spatial stages", () => {
    expect(
      parseGraphViewUrlState(
        new URLSearchParams("layout=spatial&spatialFront=medicine&spatialLevel=5")
      ).spatialLevel
    ).toBe(5);
    expect(
      parseGraphViewUrlState(
        new URLSearchParams("layout=spatial&spatialFront=medicine&spatialLevel=9")
      ).spatialLevel
    ).toBeNull();
  });
});
