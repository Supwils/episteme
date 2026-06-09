import { describe, expect, it } from "vitest";
import { formatDistance, formatNumber, formatScaleMeters, toSuperscript } from "./format";
import { METERS_PER_AU, METERS_PER_LY } from "./coords";

describe("toSuperscript", () => {
  it("maps digits and minus to Unicode superscripts", () => {
    expect(toSuperscript(0)).toBe("⁰");
    expect(toSuperscript(26)).toBe("²⁶");
    expect(toSuperscript(-3)).toBe("⁻³");
  });
});

describe("formatNumber", () => {
  it("uses scientific notation for very large numbers", () => {
    expect(formatNumber(8.8e26)).toMatch(/× 10²⁶/);
  });

  it("uses scientific notation for very small numbers", () => {
    expect(formatNumber(1e-4)).toMatch(/× 10⁻⁴/);
  });

  it("uses locale formatting in the normal range", () => {
    expect(formatNumber(1234.567)).toBe("1,234.57");
    expect(formatNumber(0)).toBe("0");
  });

  it("handles non-finite input gracefully", () => {
    expect(formatNumber(NaN)).toBe("—");
    expect(formatNumber(Infinity)).toBe("—");
  });
});

describe("formatDistance", () => {
  it("formats 1 AU in AU", () => {
    expect(formatDistance(METERS_PER_AU, "AU")).toBe("1 AU");
  });

  it("formats 4.24 ly in ly (Proxima Centauri)", () => {
    expect(formatDistance(4.24 * METERS_PER_LY, "ly")).toBe("4.24 ly");
  });
});

describe("formatScaleMeters", () => {
  it("renders mantissa × 10^exp m", () => {
    expect(formatScaleMeters(8.8e26)).toBe("8.8 × 10²⁶ m");
  });

  it("returns em-dash for non-positive inputs", () => {
    expect(formatScaleMeters(0)).toBe("—");
    expect(formatScaleMeters(NaN)).toBe("—");
  });
});
