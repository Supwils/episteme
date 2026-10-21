// A reader-facing name already written in the same text, beside the Latin form.
// Unknown ids stay unchanged so a label is never invented.

const CJK = /[\u4e00-\u9fff]/;

function normalizeLatin(value: string): string {
  return value.toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}

function cjkCount(value: string): number {
  return [...value].filter((char) => CJK.test(char)).length;
}

function foldToken(token: string): string {
  return token
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/oe/g, "o")
    .replace(/ue/g, "u")
    .replace(/ae/g, "a");
}

function latinTokens(value: string): string[] {
  return value
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .split(" ")
    .filter(Boolean)
    .map(foldToken);
}

const NAME_PARTICLE = new Set(["von", "van", "de", "da", "di", "del", "la", "le", "st"]);

function isGivenName(token: string): boolean {
  return /^[a-z]{3,14}$/.test(token) && !NAME_PARTICLE.has(token);
}

function startsWithNeedle(inside: string, needle: string): boolean {
  const words = latinTokens(inside);
  const need = latinTokens(needle);
  if (need.length === 0 || words.length === 0) return false;
  const lastStart = Math.min(3, words.length - need.length);
  for (let start = 0; start <= lastStart; start += 1) {
    const prefix = words.slice(0, start);
    if (prefix.some((token) => !isGivenName(token) && !NAME_PARTICLE.has(token))) continue;
    if (need.every((token, index) => words[start + index] === token)) return true;
  }
  // "de Rham" is stored as derham. Abbreviations such as QR do not join into a surname.
  if (need.length !== 1 || !need[0]) return false;
  let compact = "";
  for (const word of words) {
    if (!/^[a-z]+$/.test(word)) break;
    compact += word;
    if (compact === need[0]) return true;
    if (compact.length > need[0].length) return false;
  }
  return false;
}

function personName(run: string): string {
  const trimmed = run.split(/[的与和及由将让向是为把被从对家]/u).pop() ?? run;
  return trimmed.trim();
}

/** Names written directly before a parenthesis. Conflicting names return null. */
function namesBeside(text: string, needle: string): Set<string> | null {
  let bestLength = -1;
  const found = new Set<string>();
  const pattern = /([\u4e00-\u9fff·・]{1,16})\*{0,2}\s*[（(]\s*([^）)]{1,120})/g;
  for (const match of text.matchAll(pattern)) {
    const name = personName(match[1] ?? "");
    const inside = normalizeLatin(match[2] ?? "");
    if (cjkCount(name) < 2 || cjkCount(name) > 10 || !startsWithNeedle(inside, needle)) continue;
    const specificity = latinTokens(inside).length;
    if (specificity > bestLength) {
      bestLength = specificity;
      found.clear();
      found.add(name);
    } else if (specificity === bestLength) {
      found.add(name);
    }
  }
  if (found.size > 1) return null;
  return found;
}

/** Chinese name written immediately before a parenthesis that contains `latin`. */
export function chineseNameBesideLatin(text: string, latin: string): string | null {
  const needle = normalizeLatin(latin);
  if (!needle || CJK.test(latin)) return null;

  const full = namesBeside(text, needle);
  if (full === null) return null;
  if (full.size === 1) return [...full][0] ?? null;

  // "Simon Kuznets" can be written as （Kuznets）. Slugs stay on the full token.
  const parts = needle.split(" ");
  const surname = parts.length === 2 ? parts[1] : "";
  if (!surname || surname.length < 5) return null;
  const bySurname = namesBeside(text, surname);
  if (bySurname === null || bySurname.size !== 1) return null;
  return [...bySurname][0] ?? null;
}
