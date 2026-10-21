import { chineseNameBesideLatin } from "@/lib/reader-person-label";

const LEADING =
  /^(?:这个说法出自|它长出了|美联储前主席|精神科医生|耶鲁大学历史学家|合作者|研究者|后来|关于)/u;

function tokens(value: string): string[] {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[_-]+/g, " ")
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function startsWithName(inside: string, latin: string): boolean {
  const words = tokens(inside);
  const need = tokens(latin);
  if (need.length === 0 || need.length > words.length) return false;
  return need.every((token, index) => words[index] === token);
}

function isJointMismatch(run: string, inside: string, latin: string, label: string): boolean {
  const pieces = run
    .split(/[和与及]/u)
    .map((part) => part.trim())
    .filter(Boolean);
  if (pieces.length < 2) return false;
  const last = pieces[pieces.length - 1] ?? "";
  if (!last.includes(label)) return true;
  const latins = inside.split(/\s*(?:&| and )\s*/i);
  return !startsWithName(latins[latins.length - 1] ?? "", latin);
}

function glossesName(inside: string, latin: string): boolean {
  return inside
    .split(/\s*(?:&| and )\s*/i)
    .some((part) => startsWithName(part.replace(/,.*/, ""), latin));
}

function nameBesideFull(text: string, latin: string, label: string): boolean {
  const pattern = /([\u4e00-\u9fff·・]{1,16})\*{0,2}\s*[（(]\s*([^）)]{1,120})/g;
  for (const match of text.matchAll(pattern)) {
    const inside = match[2] ?? "";
    if (!glossesName(inside, latin)) continue;
    const run = match[1] ?? "";
    if (!run.includes(label)) continue;
    if (isJointMismatch(run, inside, latin, label)) continue;
    return true;
  }
  return false;
}

function usable(label: string): string | null {
  const trimmed = label.replace(LEADING, "").replace(/^[·・]+/u, "");
  if ([...trimmed].filter((char) => /[\u4e00-\u9fff]/u.test(char)).length < 2) return null;
  if (/[了这个已经可能无需最终导致]/u.test(trimmed)) return null;
  if (/论$|模型|定理|定律|拍卖/u.test(trimmed)) return null;
  return trimmed;
}

/** Chinese form only when this article already writes it beside the full Latin name. */
export function readerKeyFigureLabel(text: string, latin: string): string {
  const beside = chineseNameBesideLatin(text, latin);
  if (!beside || /[\u4e00-\u9fff]/u.test(latin)) return latin;
  const name = usable(beside);
  if (!name || !nameBesideFull(text, latin, beside.replace(/^[·・]+/u, ""))) return latin;
  return name;
}
