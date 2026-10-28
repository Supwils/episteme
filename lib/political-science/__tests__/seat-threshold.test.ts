import { describe, expect, it } from "vitest";
import { politicalScienceLabInvite } from "../article-lab-invites";
import { seatThreshold, vetoGate } from "../seat-threshold";

describe("seat and veto counts", () => {
  it("puts the simple line at 51 and the two-thirds line at 67 when N is 100", () => {
    const row = seatThreshold(100, 0);
    expect(row.simpleLine).toBe(51);
    expect(row.twoThirdsLine).toBe(67);
    expect(row.simplePasses).toBe(false);
    expect(row.twoThirdsPasses).toBe(false);
  });

  it("lets 66 clear a simple majority and miss two thirds", () => {
    const row = seatThreshold(100, 66);
    expect(row.yes).toBe(66);
    expect(row.simplePasses).toBe(true);
    expect(row.twoThirdsPasses).toBe(false);
  });

  it("lets 67 clear both lines", () => {
    const row = seatThreshold(100, 67);
    expect(row.simplePasses).toBe(true);
    expect(row.twoThirdsPasses).toBe(true);
  });

  it("blocks a bill unless every veto player agrees", () => {
    expect(vetoGate(3, 2)).toEqual({ players: 3, agreed: 2, passes: false });
    expect(vetoGate(3, 3)).toEqual({ players: 3, agreed: 3, passes: true });
  });
});

describe("political science lab invite", () => {
  it("points the two articles at the lab and ignores an unrelated slug", () => {
    const invite = {
      href: "/political-science/seat-threshold-lab",
      label: "席位与否决示意",
      tease: "改赞成票和否决者人数，看议案过不过。不是选举预测。",
    };
    expect(politicalScienceLabInvite("concepts", "checks-and-balances")).toEqual(invite);
    expect(politicalScienceLabInvite("concepts", "accountability")).toEqual(invite);
    expect(politicalScienceLabInvite("institutions", "electoral-systems")).toBeNull();
  });
});
