import { describe, expect, it } from "vitest";
import { formatDisplayDate, getWeekday } from "../daily-selector";

describe("daily calendar labels", () => {
  it("formats a real calendar day without padding the month or day", () => {
    expect(formatDisplayDate("2026-10-05")).toBe("2026年10月5日");
    const weekday = new Date(2026, 9, 5).getDay();
    expect(getWeekday("2026-10-05")).toBe(`星期${"日一二三四五六"[weekday]}`);
  });

  it("does not print NaN or undefined for a date that is not on the calendar", () => {
    expect(formatDisplayDate("nope")).toBe("nope");
    expect(formatDisplayDate("2026-02-31")).toBe("2026-02-31");
    expect(getWeekday("nope")).toBe("");
    expect(getWeekday("2026-02-31")).toBe("");
    expect(getWeekday("2026-10-05")).not.toContain("undefined");
  });
});
