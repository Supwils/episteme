const CALENDAR_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"] as const;

function calendarParts(dateStr: string) {
  const match = CALENDAR_DATE.exec(dateStr);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  )
    return null;
  return { year, month, day, date };
}

export function formatDisplayDate(dateStr: string): string {
  const parts = calendarParts(dateStr);
  return parts ? `${parts.year}年${parts.month}月${parts.day}日` : dateStr;
}

export function getWeekday(dateStr: string): string {
  const parts = calendarParts(dateStr);
  return parts ? `星期${WEEKDAYS[parts.date.getUTCDay()]}` : "";
}
