import { describe, expect, it } from "vitest";
import { psychologyLabInvite } from "../article-lab-invites";
import {
  balancedAccuracy,
  detectionRates,
  inverseNormal,
  normalCdf,
  recoveredCriterion,
  recoveredSeparation,
} from "../signal-detection";

describe("equal-variance signal detection", () => {
  it("matches the standard normal at a few known points", () => {
    expect(normalCdf(0)).toBeCloseTo(0.5, 4);
    expect(normalCdf(1)).toBeCloseTo(0.8413, 3);
    expect(normalCdf(-1)).toBeCloseTo(0.1587, 3);
    expect(inverseNormal(0.5)).toBeCloseTo(0, 4);
    expect(inverseNormal(normalCdf(1.2))).toBeCloseTo(1.2, 2);
  });

  it("keeps recovered sensitivity fixed while the criterion moves both rates", () => {
    const liberal = detectionRates(1, -1);
    const neutral = detectionRates(1, 0);
    const conservative = detectionRates(1, 1);

    expect(liberal.hit).toBeGreaterThan(neutral.hit);
    expect(neutral.hit).toBeGreaterThan(conservative.hit);
    expect(liberal.falseAlarm).toBeGreaterThan(neutral.falseAlarm);
    expect(neutral.falseAlarm).toBeGreaterThan(conservative.falseAlarm);

    for (const rates of [liberal, neutral, conservative]) {
      expect(recoveredSeparation(rates.hit, rates.falseAlarm)).toBeCloseTo(1, 2);
      expect(recoveredCriterion(rates.hit, rates.falseAlarm)).toBeCloseTo(rates.criterion, 2);
      expect(rates.hit + rates.miss).toBeCloseTo(1, 6);
      expect(rates.falseAlarm + rates.correctRejection).toBeCloseTo(1, 6);
    }

    expect(balancedAccuracy(liberal.hit, liberal.falseAlarm)).not.toBeCloseTo(
      balancedAccuracy(neutral.hit, neutral.falseAlarm),
      2
    );
  });

  it("raises sensitivity without requiring the criterion to move", () => {
    const weak = detectionRates(0.5, 0);
    const strong = detectionRates(2, 0);
    expect(recoveredSeparation(strong.hit, strong.falseAlarm)).toBeCloseTo(2, 2);
    expect(recoveredSeparation(strong.hit, strong.falseAlarm)).toBeGreaterThan(
      recoveredSeparation(weak.hit, weak.falseAlarm)
    );
    expect(strong.hit).toBeGreaterThan(weak.hit);
    expect(strong.falseAlarm).toBeLessThan(weak.falseAlarm);
  });
});

describe("psychology lab invite", () => {
  it("points the two signal-detection articles at the schematic", () => {
    expect(psychologyLabInvite("methods", "psychophysics-and-signal-detection")?.href).toBe(
      "/psychology/signal-detection-lab"
    );
    expect(psychologyLabInvite("phenomena", "perception-physiology")?.href).toBe(
      "/psychology/signal-detection-lab"
    );
    expect(psychologyLabInvite("experiments", "miller-1956")).toBeNull();
  });
});
