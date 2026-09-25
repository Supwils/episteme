import { describe, expect, it } from "vitest";
import { EVENTS } from "@/content/human-history/data/events.js";
import { FIGURES } from "@/content/human-history/data/figures.js";
import { HISTORY_HOME_COUNTS, formatHomeYear } from "@/content/human-history/data/home-summary.js";

describe("human-history home summary", () => {
  it("keeps inventory counts synchronized with the canonical datasets", () => {
    expect(HISTORY_HOME_COUNTS).toEqual({
      events: EVENTS.length,
      figures: FIGURES.length,
    });
  });

  it("formats deep-time and historical years consistently", () => {
    expect(formatHomeYear(-300000)).toBe("约300,000年前");
    expect(formatHomeYear(-551)).toBe("公元前551年");
    expect(formatHomeYear(1969)).toBe("公元1969年");
  });
});
