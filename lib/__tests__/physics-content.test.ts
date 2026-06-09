import { describe, expect, it } from "vitest";
import T0 from "@/content/universe-physics/cosmos/T0";
import T1 from "@/content/universe-physics/cosmos/T1";
import T2 from "@/content/universe-physics/cosmos/T2";
import T3 from "@/content/universe-physics/cosmos/T3";
import T4 from "@/content/universe-physics/cosmos/T4";
import T5 from "@/content/universe-physics/cosmos/T5";
import T6 from "@/content/universe-physics/cosmos/T6";
import T7 from "@/content/universe-physics/cosmos/T7";
import P0 from "@/content/universe-physics/physics/P0-classical-mechanics";
import P1 from "@/content/universe-physics/physics/P1-thermodynamics";
import P2 from "@/content/universe-physics/physics/P2-electromagnetism";
import P3 from "@/content/universe-physics/physics/P3-relativity";
import P4 from "@/content/universe-physics/physics/P4-quantum-mechanics";
import P5 from "@/content/universe-physics/physics/P5-atomic-molecular";
import P6 from "@/content/universe-physics/physics/P6-nuclear-particle";
import P7 from "@/content/universe-physics/physics/P7-standard-model";
import P8 from "@/content/universe-physics/physics/P8-frontier";
import type { TierContent } from "@/subjects/physics/lib/content";
import {
  tierContentSchema,
  formatTierIssue,
} from "@/subjects/physics/lib/content-schema";
import { TIER_ORDER } from "@/subjects/physics/lib/tier";
import { PHYSICS_TIER_ORDER } from "@/subjects/physics/lib/physics-tier";
import { detectInitialQuality } from "@/subjects/physics/lib/quality";
import { subsamplePositions, subsample1 } from "@/subjects/physics/lib/lod";

const COSMOS: TierContent[] = [T0, T1, T2, T3, T4, T5, T6, T7];
const PHYSICS: TierContent[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8];
const ALL: TierContent[] = [...COSMOS, ...PHYSICS];

describe("physics content schema", () => {
  describe("cosmos tiers", () => {
    it("T0 has ≥12 dataCards", () => {
      expect(T0.dataCards.length).toBeGreaterThanOrEqual(12);
    });
    it("T0 has ≥6 narratives", () => {
      expect(T0.narrative.length).toBeGreaterThanOrEqual(6);
    });
    it("T0 has ≥5 sources", () => {
      expect(T0.sources.length).toBeGreaterThanOrEqual(5);
    });

    it("T1 has ≥4 dataCards", () => {
      expect(T1.dataCards.length).toBeGreaterThanOrEqual(4);
    });
    it("T1 has ≥3 narratives", () => {
      expect(T1.narrative.length).toBeGreaterThanOrEqual(3);
    });
    it("T1 has ≥2 sources", () => {
      expect(T1.sources.length).toBeGreaterThanOrEqual(2);
    });

    it("T2 has ≥4 dataCards", () => {
      expect(T2.dataCards.length).toBeGreaterThanOrEqual(4);
    });
    it("T2 has ≥3 narratives", () => {
      expect(T2.narrative.length).toBeGreaterThanOrEqual(3);
    });
    it("T2 has ≥2 sources", () => {
      expect(T2.sources.length).toBeGreaterThanOrEqual(2);
    });

    it("T3 has ≥4 dataCards", () => {
      expect(T3.dataCards.length).toBeGreaterThanOrEqual(4);
    });
    it("T3 has ≥3 narratives", () => {
      expect(T3.narrative.length).toBeGreaterThanOrEqual(3);
    });
    it("T3 has ≥2 sources", () => {
      expect(T3.sources.length).toBeGreaterThanOrEqual(2);
    });

    it("T4 has ≥4 dataCards", () => {
      expect(T4.dataCards.length).toBeGreaterThanOrEqual(4);
    });
    it("T4 has ≥3 narratives", () => {
      expect(T4.narrative.length).toBeGreaterThanOrEqual(3);
    });
    it("T4 has ≥2 sources", () => {
      expect(T4.sources.length).toBeGreaterThanOrEqual(2);
    });

    it("T5 has ≥4 dataCards", () => {
      expect(T5.dataCards.length).toBeGreaterThanOrEqual(4);
    });
    it("T5 has ≥3 narratives", () => {
      expect(T5.narrative.length).toBeGreaterThanOrEqual(3);
    });
    it("T5 has ≥2 sources", () => {
      expect(T5.sources.length).toBeGreaterThanOrEqual(2);
    });

    it("T6 has ≥4 dataCards", () => {
      expect(T6.dataCards.length).toBeGreaterThanOrEqual(4);
    });
    it("T6 has ≥3 narratives", () => {
      expect(T6.narrative.length).toBeGreaterThanOrEqual(3);
    });
    it("T6 has ≥2 sources", () => {
      expect(T6.sources.length).toBeGreaterThanOrEqual(2);
    });

    it("T7 has ≥4 dataCards", () => {
      expect(T7.dataCards.length).toBeGreaterThanOrEqual(4);
    });
    it("T7 has ≥3 narratives", () => {
      expect(T7.narrative.length).toBeGreaterThanOrEqual(3);
    });
    it("T7 has ≥2 sources", () => {
      expect(T7.sources.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("physics tiers", () => {
    it("P0 has ≥12 dataCards", () => {
      expect(P0.dataCards.length).toBeGreaterThanOrEqual(12);
    });
    it("P1 has ≥12 dataCards", () => {
      expect(P1.dataCards.length).toBeGreaterThanOrEqual(12);
    });
    it("P2 has ≥12 dataCards", () => {
      expect(P2.dataCards.length).toBeGreaterThanOrEqual(12);
    });
    it("P3 has ≥12 dataCards", () => {
      expect(P3.dataCards.length).toBeGreaterThanOrEqual(12);
    });
    it("P4 has ≥12 dataCards", () => {
      expect(P4.dataCards.length).toBeGreaterThanOrEqual(12);
    });
    it("P5 has ≥12 dataCards", () => {
      expect(P5.dataCards.length).toBeGreaterThanOrEqual(12);
    });
    it("P6 has ≥4 dataCards", () => {
      expect(P6.dataCards.length).toBeGreaterThanOrEqual(4);
    });
    it("P7 has ≥12 dataCards", () => {
      expect(P7.dataCards.length).toBeGreaterThanOrEqual(12);
    });
    it("P8 has ≥12 dataCards", () => {
      expect(P8.dataCards.length).toBeGreaterThanOrEqual(12);
    });
  });

  describe("all tiers", () => {
    it("all dataCards have label and value", () => {
      for (const tier of ALL) {
        for (const card of tier.dataCards) {
          expect(card.label.length).toBeGreaterThan(0);
          expect(card.value.length).toBeGreaterThan(0);
        }
      }
    });

    it("all narratives have heading and body", () => {
      for (const tier of ALL) {
        for (const section of tier.narrative) {
          expect(section.heading.length).toBeGreaterThan(0);
          expect(section.body.length).toBeGreaterThan(0);
          for (const paragraph of section.body) {
            expect(paragraph.length).toBeGreaterThan(0);
          }
        }
      }
    });

    it("all sources have label and kind", () => {
      for (const tier of ALL) {
        for (const source of tier.sources) {
          expect(source.label.length).toBeGreaterThan(0);
          expect(["paper", "agency", "encyclopedia"]).toContain(source.kind);
        }
      }
    });

    it("all cosmos tiers pass Zod schema", () => {
      for (const tier of COSMOS) {
        const result = tierContentSchema.safeParse(tier);
        if (!result.success) {
          const lines = result.error.issues.map((i) =>
            formatTierIssue(tier.tier, i)
          );
          throw new Error(
            `${tier.tier} content invalid:\n  ${lines.join("\n  ")}`
          );
        }
        expect(result.success).toBe(true);
      }
    });

    it("all physics tiers have valid structure (label, value, heading, body, sources)", () => {
      for (const tier of PHYSICS) {
        expect(tier.dataCards.length).toBeGreaterThanOrEqual(4);
        expect(tier.narrative.length).toBeGreaterThanOrEqual(3);
        expect(tier.sources.length).toBeGreaterThanOrEqual(2);
        for (const card of tier.dataCards) {
          expect(card.label.length).toBeGreaterThan(0);
          expect(card.value.length).toBeGreaterThan(0);
        }
        for (const section of tier.narrative) {
          expect(section.heading.length).toBeGreaterThan(0);
          expect(section.body.length).toBeGreaterThan(0);
        }
        for (const source of tier.sources) {
          expect(source.label.length).toBeGreaterThan(0);
          expect(["paper", "agency", "encyclopedia"]).toContain(source.kind);
        }
      }
    });

    it("cosmos registry contains exactly one entry per tier in TIER_ORDER", () => {
      expect(COSMOS.map((c) => c.tier)).toEqual(TIER_ORDER);
    });

    it("physics registry contains exactly one entry per tier in PHYSICS_TIER_ORDER", () => {
      expect(PHYSICS.map((c) => c.tier)).toEqual(PHYSICS_TIER_ORDER);
    });
  });
});

describe("quality detection", () => {
  it("returns medium on server (no navigator)", () => {
    expect(detectInitialQuality()).toBe("medium");
  });
});

describe("LOD", () => {
  describe("subsamplePositions", () => {
    it("returns the same array when scale >= 1", () => {
      const positions = new Float32Array([1, 2, 3, 4, 5, 6]);
      expect(subsamplePositions(positions, 1)).toBe(positions);
      expect(subsamplePositions(positions, 1.5)).toBe(positions);
    });

    it("returns correct stride-length output", () => {
      const positions = new Float32Array([
        0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3,
      ]);
      const result = subsamplePositions(positions, 0.5);
      expect(result.length).toBe(6);
      expect(result.length % 3).toBe(0);
    });

    it("returns at least 1 point when scale > 0", () => {
      const positions = new Float32Array([10, 20, 30]);
      const result = subsamplePositions(positions, 0.01);
      expect(result.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("subsample1 (stride-1 arrays)", () => {
    it("returns the same array when scale >= 1", () => {
      const arr = new Float32Array([1, 2, 3, 4]);
      expect(subsample1(arr, 1)).toBe(arr);
      expect(subsample1(arr, 2)).toBe(arr);
    });

    it("subsamples correctly at 0.5 scale", () => {
      const arr = new Float32Array([10, 20, 30, 40]);
      const result = subsample1(arr, 0.5);
      expect(result.length).toBe(2);
    });

    it("returns at least 1 element when scale > 0", () => {
      const arr = new Float32Array([42]);
      const result = subsample1(arr, 0.01);
      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it("matches positions length at same scale", () => {
      const positions = new Float32Array([
        0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5,
      ]);
      const colors = new Float32Array([10, 20, 30, 40, 50, 60]);
      const scale = 0.5;
      const subPos = subsamplePositions(positions, scale);
      const subColors = subsample1(colors, scale);
      const posPoints = subPos.length / 3;
      expect(subColors.length).toBe(posPoints);
    });
  });
});
