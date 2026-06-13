import type { SearchDocument } from "./types";

const SUBTYPE_LABEL: Record<string, string> = {
  mathematicians: "数学家",
  theorems: "定理",
  concepts: "概念",
  paradoxes: "悖论",
  dialogues: "对话",
};

export function indexMathematics(
  mathDataMod: {
    MATHEMATICS_DATA: ReadonlyArray<{
      slug: string;
      title: string;
      titleEn: string;
      subtype: string;
      field: string;
    }>;
  } | null
): SearchDocument[] {
  if (!mathDataMod) return [];
  return mathDataMod.MATHEMATICS_DATA.map((m) => ({
    id: `math-${m.subtype}-${m.slug}`,
    title: m.title,
    subtitle: m.titleEn,
    content: `${m.field} · ${SUBTYPE_LABEL[m.subtype] ?? "数学"}`,
    section: "mathematics",
    url: `/mathematics/${m.subtype}/${m.slug}`,
    type: "entry",
  }));
}
