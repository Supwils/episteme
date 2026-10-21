export const OG_TITLE_LIMIT = 200;
export const OG_DESCRIPTION_LIMIT = 120;

export function takeCodePoints(value: string, limit: number): string {
  return Array.from(value).slice(0, limit).join("");
}

export function ogText(value: string, limit: number, ellipsis = false): string {
  const clean = value
    .replace(/[\u0000-\u001F\u007F-\u009F\u2028\u2029]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const points = Array.from(clean);
  return points.slice(0, limit).join("") + (ellipsis && points.length > limit ? "…" : "");
}
