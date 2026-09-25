export const HISTORY_HOME_COUNTS = {
  events: 100,
  figures: 202,
};

export function formatHomeYear(year) {
  if (year <= -10000) return `约${Math.abs(year).toLocaleString()}年前`;
  if (year < 0) return `公元前${Math.abs(year)}年`;
  if (year === 0) return "公元元年";
  return `公元${year}年`;
}
