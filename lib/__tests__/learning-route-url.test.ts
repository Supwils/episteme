import { describe, expect, it } from "vitest";
import {
  buildLearningRouteUrl,
  hasLearningRouteUrlState,
  parseLearningRouteUrlState,
  updateLearningRouteSearchParams,
} from "@/lib/learning-route-url";

describe("learning route URL state", () => {
  it("round-trips a filtered target and alternative anchor", () => {
    const params = updateLearningRouteSearchParams(new URLSearchParams("utm_source=test"), {
      mode: "all-nodes",
      filter: { domainId: "philosophy", level: 2, confidence: "contextual" },
      targetId: "philosophy:pragmatism",
      anchorNodeId: "philosophy:philosophy-of-mind",
    });
    expect(params.get("utm_source")).toBe("test");
    expect(hasLearningRouteUrlState(params)).toBe(true);
    expect(parseLearningRouteUrlState(params)).toEqual({
      mode: "all-nodes",
      filter: { domainId: "philosophy", level: 2, confidence: "contextual" },
      targetId: "philosophy:pragmatism",
      anchorNodeId: "philosophy:philosophy-of-mind",
    });
  });

  it("ignores malformed dimensions and orphaned anchors", () => {
    const state = parseLearningRouteUrlState(
      new URLSearchParams(
        "learn=all&learnDomain=unknown&learnLevel=8&learnConfidence=guess&learnAnchor=orphan"
      )
    );
    expect(state).toEqual({
      mode: "all-nodes",
      filter: null,
      targetId: null,
      anchorNodeId: null,
    });
  });

  it("removes learning parameters without disturbing unrelated URL state", () => {
    const url = buildLearningRouteUrl(
      "https://episteme.test/?utm_campaign=continuum&learn=all&learnTarget=old#continuum",
      { mode: "curated", filter: null, targetId: null, anchorNodeId: null }
    );
    expect(url).toBe("https://episteme.test/?utm_campaign=continuum#continuum");
  });
});
