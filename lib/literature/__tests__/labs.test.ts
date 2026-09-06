import { describe, expect, it } from "vitest";
import { discourseSequence, HARE_EVENTS } from "../narrative-order";
import { groupedSlots, meterById } from "../meter-scan";
import { traditionsInEpoch, TRADITION_NODES } from "../world-traditions-map";
import { translationPairById } from "../translation-pairs";

describe("narrative order", () => {
  it("keeps the same four events in every discourse mode", () => {
    const chrono = discourseSequence("chronological");
    expect(chrono.map((event) => event.id)).toEqual(["till", "hare", "wait", "fail"]);
    const mid = discourseSequence("in-medias-res");
    expect(mid[0]?.id).toBe("wait");
    expect(new Set(mid.map((event) => event.id))).toEqual(
      new Set(HARE_EVENTS.map((event) => event.id))
    );
  });
});

describe("meter scan", () => {
  it("groups five-character lines as two then three", () => {
    const sample = meterById("wuyan");
    const groups = groupedSlots(sample);
    expect(groups.map((group) => group.length)).toEqual([2, 3]);
    expect(sample.slots).toHaveLength(5);
  });

  it("reads the sonnet line as five iambs", () => {
    const sample = meterById("iambic-pentameter");
    expect(groupedSlots(sample)).toHaveLength(5);
    expect(sample.slots.filter((slot) => slot.strong)).toHaveLength(5);
  });
});

describe("world traditions map", () => {
  it("does not place Lu Xun in the ancient band", () => {
    const ids = traditionsInEpoch("ancient").map((node) => node.id);
    expect(ids).toContain("homer");
    expect(ids).not.toContain("luxun");
    expect(TRADITION_NODES.some((node) => node.id === "luxun")).toBe(true);
  });
});

describe("translation pairs", () => {
  it("keeps both Jingye Si versions at four lines", () => {
    const pair = translationPairById("jingyesi");
    expect(pair.sourceLines).toHaveLength(4);
    expect(pair.left.lines).toHaveLength(4);
    expect(pair.right.lines).toHaveLength(4);
  });
});
