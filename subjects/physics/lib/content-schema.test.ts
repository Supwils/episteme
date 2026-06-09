import { describe, expect, it } from "vitest";
import T0 from "@/content/universe-physics/cosmos/T0";
import T1 from "@/content/universe-physics/cosmos/T1";
import T2 from "@/content/universe-physics/cosmos/T2";
import T3 from "@/content/universe-physics/cosmos/T3";
import T4 from "@/content/universe-physics/cosmos/T4";
import T5 from "@/content/universe-physics/cosmos/T5";
import T6 from "@/content/universe-physics/cosmos/T6";
import T7 from "@/content/universe-physics/cosmos/T7";
import type { TierContent } from "./content";
import {
  formatTierIssue,
  sceneMarkerSchema,
  sourceRefSchema,
  tierContentSchema,
} from "./content-schema";
import { TIER_ORDER } from "./tier";

const ALL: TierContent[] = [T0, T1, T2, T3, T4, T5, T6, T7];

describe("TierContent registry", () => {
  it("contains exactly one entry per tier in TIER_ORDER", () => {
    expect(ALL.map((c) => c.tier)).toEqual(TIER_ORDER);
  });

  for (const content of ALL) {
    it(`${content.tier} passes the full Zod schema`, () => {
      const result = tierContentSchema.safeParse(content);
      if (!result.success) {
        const lines = result.error.issues.map((i) => formatTierIssue(content.tier, i));
        throw new Error(`${content.tier} content invalid:\n  ${lines.join("\n  ")}`);
      }
      expect(result.success).toBe(true);
    });
  }
});

describe("sceneMarkerSchema", () => {
  const validMarker = {
    id: "test-marker",
    name: { primary: "测试标记", latin: "Test Marker" },
    position: [0.1, 0.2, 0.3] as [number, number, number],
    description: "long enough description for the test",
    data: [{ label: "k", value: "v" }],
  };

  it("rejects non-finite positions", () => {
    const bad = { ...validMarker, position: [Number.POSITIVE_INFINITY, 0, 0] };
    expect(sceneMarkerSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects positions outside ±10", () => {
    const bad = { ...validMarker, position: [12, 0, 0] };
    expect(sceneMarkerSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects malformed hex colors", () => {
    const bad = { ...validMarker, color: "blue" };
    expect(sceneMarkerSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects ids with uppercase or spaces", () => {
    const bad = { ...validMarker, id: "Bad ID" };
    expect(sceneMarkerSchema.safeParse(bad).success).toBe(false);
  });

  it("accepts a minimal valid marker", () => {
    expect(sceneMarkerSchema.safeParse(validMarker).success).toBe(true);
  });
});

describe("sourceRefSchema", () => {
  it("rejects non-http urls", () => {
    const bad = { label: "X", url: "ftp://nope.example", kind: "paper" as const };
    expect(sourceRefSchema.safeParse(bad).success).toBe(false);
  });
  it("rejects unknown kinds", () => {
    const bad = { label: "X", url: "https://ok.example", kind: "blog" };
    expect(sourceRefSchema.safeParse(bad).success).toBe(false);
  });
});

describe("tierContentSchema cross-field rules", () => {
  const base: TierContent = T0;

  it("flags duplicate marker ids within a tier", () => {
    const dup: TierContent = {
      ...base,
      markers: [base.markers![0]!, { ...base.markers![1]!, id: base.markers![0]!.id }],
    };
    const result = tierContentSchema.safeParse(dup);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message.includes("duplicate"))).toBe(true);
    }
  });

  it("requires at least 4 data cards", () => {
    const trimmed: TierContent = { ...base, dataCards: base.dataCards.slice(0, 3) };
    expect(tierContentSchema.safeParse(trimmed).success).toBe(false);
  });

  it("requires at least 3 narrative sections", () => {
    const trimmed: TierContent = { ...base, narrative: base.narrative.slice(0, 2) };
    expect(tierContentSchema.safeParse(trimmed).success).toBe(false);
  });

  it("requires at least 2 sources", () => {
    const trimmed: TierContent = { ...base, sources: base.sources.slice(0, 1) };
    expect(tierContentSchema.safeParse(trimmed).success).toBe(false);
  });
});
