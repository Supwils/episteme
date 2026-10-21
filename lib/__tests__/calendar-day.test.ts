import { describe, expect, it } from "vitest";
import {
  calendarDateString,
  calendarDay,
  calendarSeed,
  millisecondsUntilNextCalendarDay,
} from "../calendar-day";
import { getDailySelected } from "../daily-selector";
import { getDailyKnowledge } from "../daily-knowledge";

// 23:30 UTC on Oct 9 is already 07:30 on Oct 10 in Beijing.
const BEIJING_MORNING = new Date("2026-10-09T23:30:00Z");

describe("calendarDay", () => {
  it("reads the Asia/Shanghai calendar whatever the server's zone", () => {
    expect(calendarDay(BEIJING_MORNING)).toEqual({ year: 2026, month: 10, day: 10 });
    expect(calendarDateString(BEIJING_MORNING)).toBe("2026-10-10");
    expect(calendarSeed(BEIJING_MORNING)).toBe(20261010);
  });

  it("rolls over at Beijing midnight, not UTC midnight", () => {
    expect(calendarDateString(new Date("2026-10-09T15:59:59Z"))).toBe("2026-10-09");
    expect(calendarDateString(new Date("2026-10-09T16:00:00Z"))).toBe("2026-10-10");
  });

  it("drives the daily picks", () => {
    expect(getDailySelected(BEIJING_MORNING).date).toBe("2026-10-10");
    expect(getDailyKnowledge(BEIJING_MORNING).date).toBe("2026-10-10");
  });

  it.each([
    ["2026-12-31T15:59:59.999Z", 1],
    ["2026-12-31T16:00:00.000Z", 86_400_000],
    ["2028-02-28T16:00:00.000Z", 86_400_000],
    ["2028-02-29T15:59:59.999Z", 1],
    ["2026-10-20T00:00:00.000Z", 57_600_000],
  ])("expires at the next Beijing midnight from %s", (date, remaining) => {
    expect(millisecondsUntilNextCalendarDay(new Date(date))).toBe(remaining);
  });
});
