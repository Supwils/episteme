import { describe, expect, it } from "vitest";
import { ritualStageById, RITUAL_STAGES } from "../ritual-stages";
import { traditionsInEpoch, TRADITION_NODES } from "../world-map-data";
import { canonPairById } from "../canon-openings";
import { indicatorById } from "../secularization-indicators";

describe("ritual stages", () => {
  it("keeps three named stages in van Gennep order", () => {
    expect(RITUAL_STAGES.map((stage) => stage.id)).toEqual([
      "separation",
      "liminal",
      "aggregation",
    ]);
    expect(ritualStageById("liminal").label).toBe("阈限");
  });
});

describe("world religion map", () => {
  it("does not place pentecostal movement in the ancient band", () => {
    const ids = traditionsInEpoch("ancient").map((node) => node.id);
    expect(ids).toContain("vedic");
    expect(ids).not.toContain("pentecostal");
    expect(TRADITION_NODES.some((node) => node.id === "pentecostal")).toBe(true);
  });
});

describe("canon openings", () => {
  it("returns the Genesis pair with a public-domain source line", () => {
    const pair = canonPairById("genesis");
    expect(pair.text).toContain("起初");
    expect(pair.source).toContain("公有领域");
  });
});

describe("secularization indicators", () => {
  it("keeps practice, identity, and privilege as separate series", () => {
    expect(indicatorById("practice").bars).toHaveLength(3);
    expect(indicatorById("identity").label).toBe("认同");
    expect(indicatorById("privilege").note).toContain("法律事实");
  });
});
