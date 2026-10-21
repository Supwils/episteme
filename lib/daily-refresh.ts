import { millisecondsUntilNextCalendarDay } from "./calendar-day";

export const DAILY_REFRESH_HEADER = "X-Daily-Refresh-After";

export function dailyResponseHeaders(now: Date): Record<string, string> {
  return {
    "Cache-Control": "no-store",
    [DAILY_REFRESH_HEADER]: String(millisecondsUntilNextCalendarDay(now)),
  };
}
