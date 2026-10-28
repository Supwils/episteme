import { describe, expect, it } from "vitest";
import { earthScienceLabInvite } from "../article-lab-invites";
import {
  clampFlux,
  DEFAULT_EVAPOTRANSPIRATION,
  DEFAULT_PRECIPITATION,
  DEFAULT_RUNOFF,
  FLUX_MAX,
  FLUX_MIN,
  FLUX_STEP,
  storageChange,
  storageRegime,
  waterBalance,
} from "../water-balance";

describe("watershed water balance", () => {
  it("stores water when precipitation exceeds evapotranspiration and runoff", () => {
    expect(storageChange(100, 60, 30)).toBe(10);
    expect(storageRegime(10)).toBe("蓄水");
    expect(waterBalance(100, 60, 30).regime).toBe("蓄水");
  });

  it("is even when the three fluxes close", () => {
    expect(storageChange(100, 70, 30)).toBe(0);
    expect(waterBalance(100, 70, 30).regime).toBe("持平");
  });

  it("loses storage when the outgoing fluxes exceed precipitation", () => {
    expect(storageChange(80, 70, 30)).toBe(-20);
    expect(waterBalance(80, 70, 30).regime).toBe("失水");
  });

  it("keeps ΔS additive so P equals ET + R + ΔS", () => {
    const samples = [
      [100, 60, 30],
      [100, 70, 30],
      [80, 70, 30],
      [DEFAULT_PRECIPITATION, DEFAULT_EVAPOTRANSPIRATION, DEFAULT_RUNOFF],
      [FLUX_MIN, FLUX_MIN, FLUX_MIN],
      [FLUX_MAX, FLUX_MAX, FLUX_MAX],
      [FLUX_MAX, FLUX_MIN, FLUX_STEP],
    ] as const;

    for (const [precipitation, evapotranspiration, runoff] of samples) {
      const change = storageChange(precipitation, evapotranspiration, runoff);
      expect(precipitation).toBe(evapotranspiration + runoff + change);
    }
  });

  it("clamps each flux onto 0–200 in steps of 1 before subtracting", () => {
    expect(FLUX_MIN).toBe(0);
    expect(FLUX_MAX).toBe(200);
    expect(FLUX_STEP).toBe(1);
    expect(clampFlux(-12)).toBe(0);
    expect(clampFlux(240)).toBe(200);
    expect(clampFlux(1.2)).toBe(1);
    expect(clampFlux(1.5)).toBe(2);
    expect(clampFlux(Number.NaN)).toBe(0);
    expect(clampFlux(Number.POSITIVE_INFINITY)).toBe(0);

    const row = waterBalance(240, -3, 10.2);
    expect(row).toEqual({
      precipitation: 200,
      evapotranspiration: 0,
      runoff: 10,
      storageChange: 190,
      regime: "蓄水",
    });
    expect(row.precipitation).toBe(row.evapotranspiration + row.runoff + row.storageChange);
  });
});

describe("earth science lab invite", () => {
  it("points only the water-cycle slug at the schematic ledger", () => {
    expect(earthScienceLabInvite("concepts", "water-cycle")).toEqual({
      href: "/earth-science/water-balance-lab",
      label: "水量平衡示意",
      tease: "改降水、蒸散发和径流，看储蓄项怎么变。不是气候预测。",
    });
    expect(earthScienceLabInvite("processes", "water-cycle")?.href).toBe(
      "/earth-science/water-balance-lab"
    );
    expect(earthScienceLabInvite("concepts", "carbon-cycle")).toBeNull();
    expect(earthScienceLabInvite("events", "snowball-earth")).toBeNull();
  });
});
