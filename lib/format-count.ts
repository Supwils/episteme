const DIGITS = "零一二三四五六七八九";

/** Keep the existing Chinese navigation labels; larger totals stay numeric. */
export function formatChineseCount(count: number): string {
  if (count >= 0 && count < 10) return DIGITS[count]!;
  if (count >= 10 && count < 100) {
    const tens = Math.floor(count / 10);
    const ones = count % 10;
    return `${tens === 1 ? "" : DIGITS[tens]}十${ones ? DIGITS[ones] : ""}`;
  }
  return String(count);
}
