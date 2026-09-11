import { describe, expect, it } from "vitest";
import { ritualCaseById, ritualStageById, RITUAL_STAGES } from "../ritual-stages";
import { traditionsInEpoch, TRADITION_NODES } from "../world-map-data";
import { canonPairById } from "../canon-openings";
import { indicatorById, indicatorSeries } from "../secularization-indicators";
import { religionLabInvite } from "../article-lab-invites";

describe("ritual stages", () => {
  it("keeps three named stages in van Gennep order", () => {
    expect(RITUAL_STAGES.map((stage) => stage.id)).toEqual([
      "separation",
      "liminal",
      "aggregation",
    ]);
    expect(ritualStageById("liminal").label).toBe("阈限");
  });

  it("keeps public cases without operational instructions", () => {
    const pilgrimage = ritualCaseById("pilgrimage");
    expect(pilgrimage.why).toContain("不是某条路线");
    expect(pilgrimage.stages.liminal).toContain("communitas");
  });
});

describe("world religion map", () => {
  it("does not place pentecostal movement in the ancient band", () => {
    const ids = traditionsInEpoch("ancient").map((node) => node.id);
    expect(ids).toContain("vedic");
    expect(ids).not.toContain("pentecostal");
    expect(TRADITION_NODES.some((node) => node.id === "pentecostal")).toBe(true);
  });

  it("keeps unaffiliated identity on the modern band with a sourced article", () => {
    const nones = TRADITION_NODES.find((node) => node.id === "nones");
    expect(nones?.epoch).toBe("modern");
    expect(nones?.href).toContain("nones-plateau-after-rls");
  });
});

describe("canon openings", () => {
  it("returns the Genesis pair with a public-domain source line", () => {
    const pair = canonPairById("genesis");
    expect(pair.text).toContain("起初");
    expect(pair.source).toContain("公有领域");
    expect(pair.lenses.genre).toContain("叙事");
  });
});

describe("secularization indicators", () => {
  it("keeps practice, identity, and privilege as separate series", () => {
    expect(indicatorById("practice").bars).toHaveLength(3);
    expect(indicatorById("identity").label).toBe("认同");
    expect(indicatorById("privilege").note).toContain("法律事实");
  });

  it("uses Pew RLS identity shares rather than a fake 1950 series", () => {
    const identity = indicatorSeries("us-rls", "identity");
    expect(identity.bars.map((bar) => bar.value)).toEqual([78, 71, 62]);
    expect(indicatorSeries("us-rls", "practice").note).toContain("模式转换");
  });
});

describe("article lab invites", () => {
  it("sends canon articles to the comparator and frontier nones to the chart", () => {
    expect(religionLabInvite("texts-and-canons", "scripture-and-canon").href).toBe(
      "/religion/canon-comparator"
    );
    expect(religionLabInvite("frontier", "nones-plateau-after-rls").href).toBe(
      "/religion/secularization-chart"
    );
    expect(religionLabInvite("religion-and-society", "religion-and-politics").href).toBe(
      "/religion/world-map"
    );
    expect(religionLabInvite("frontier", "cognitive-science-religion-replication").href).toBe(
      "/religion/ritual-lab"
    );
  });
});
