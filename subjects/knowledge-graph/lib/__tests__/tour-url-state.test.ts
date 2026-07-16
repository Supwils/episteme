import { describe, expect, it } from "vitest";
import { buildTourUrl, resolveTourUrlState } from "../tour-url-state";

const tours = [
  { id: "modern-macro-diagnosis", stepCount: 5 },
  { id: "macro-politics-psychology", stepCount: 13 },
];

describe("resolveTourUrlState", () => {
  it("resolves a valid tour and converts the public step to a zero-based index", () => {
    const result = resolveTourUrlState(
      new URLSearchParams("tourId=macro-politics-psychology&step=3"),
      tours
    );

    expect(result).toEqual({
      state: { tourId: "macro-politics-psychology", stepIndex: 2 },
      needsNormalization: false,
    });
  });

  it("defaults a missing step to the first step and requests canonicalization", () => {
    const result = resolveTourUrlState(new URLSearchParams("tourId=modern-macro-diagnosis"), tours);

    expect(result).toEqual({
      state: { tourId: "modern-macro-diagnosis", stepIndex: 0 },
      needsNormalization: true,
    });
  });

  it("clamps an out-of-range step", () => {
    const result = resolveTourUrlState(
      new URLSearchParams("tourId=modern-macro-diagnosis&step=99"),
      tours
    );

    expect(result).toEqual({
      state: { tourId: "modern-macro-diagnosis", stepIndex: 4 },
      needsNormalization: true,
    });
  });

  it("rejects an unknown tour", () => {
    expect(resolveTourUrlState(new URLSearchParams("tourId=unknown&step=2"), tours)).toEqual({
      state: null,
      needsNormalization: true,
    });
  });

  it("removes an orphaned step parameter", () => {
    expect(resolveTourUrlState(new URLSearchParams("step=2"), tours)).toEqual({
      state: null,
      needsNormalization: true,
    });
  });
});

describe("buildTourUrl", () => {
  it("preserves unrelated query parameters when selecting a step", () => {
    expect(
      buildTourUrl("/knowledge-graph", new URLSearchParams("source=home"), {
        tourId: "modern-macro-diagnosis",
        stepIndex: 1,
      })
    ).toBe("/knowledge-graph?source=home&tourId=modern-macro-diagnosis&step=2");
  });

  it("removes only tour parameters when clearing", () => {
    expect(
      buildTourUrl(
        "/knowledge-graph",
        new URLSearchParams("source=home&tourId=modern-macro-diagnosis&step=2"),
        null
      )
    ).toBe("/knowledge-graph?source=home");
  });
});
