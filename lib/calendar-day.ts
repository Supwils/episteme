/**
 * "Today" for every daily pick on the site. The readers are in China and the
 * servers run in UTC, so reading the server's own calendar would show yesterday
 * from 00:00 to 08:00 Beijing time — and every 历史上的今天 pool is keyed by
 * month/day, so the wrong day means the wrong events, not just a stale label.
 */
export const SITE_TIME_ZONE = "Asia/Shanghai";

export interface CalendarDay {
  year: number;
  month: number;
  day: number;
}

const PARTS = new Intl.DateTimeFormat("en-CA", {
  timeZone: SITE_TIME_ZONE,
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

export function calendarDay(date: Date = new Date()): CalendarDay {
  const parts = PARTS.formatToParts(date);
  const read = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  return { year: read("year"), month: read("month"), day: read("day") };
}

/** YYYYMMDD as a number: one seed per site day. */
export function calendarSeed(date: Date = new Date()): number {
  const { year, month, day } = calendarDay(date);
  return year * 10000 + month * 100 + day;
}

/** YYYY-MM-DD in the site's time zone. */
export function calendarDateString(date: Date = new Date()): string {
  const { year, month, day } = calendarDay(date);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** The modern Beijing calendar has a fixed UTC+08:00 midnight. */
export function millisecondsUntilNextCalendarDay(date: Date = new Date()): number {
  const start = Date.parse(`${calendarDateString(date)}T00:00:00+08:00`);
  return start + 86_400_000 - date.getTime();
}
