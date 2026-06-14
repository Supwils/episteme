import type { SearchDocument } from "./types";

/** Curiosity subjects map onto the search UI's section keys. */
const SUBJECT_TO_SECTION: Record<string, string> = {
  physics: "physics",
  cosmology: "cosmology",
  mathematics: "mathematics",
  "life-science": "life-science",
  philosophy: "philosophy",
  economics: "economics",
  psychology: "psychology",
  "human-history": "history",
  "computer-science": "computer-science",
  "political-science": "political-science",
};

export function indexCuriosities(
  mod: {
    getAllCuriosities: () => ReadonlyArray<{
      id: string;
      title: string;
      detail: string;
      url?: string;
      subject: string;
    }>;
  } | null
): SearchDocument[] {
  if (!mod) return [];
  return mod.getAllCuriosities().map((c) => ({
    id: `curiosity-${c.subject}-${c.id}`,
    title: c.title,
    subtitle: "奇趣知识",
    content: c.detail,
    section: SUBJECT_TO_SECTION[c.subject] ?? "physics",
    url: c.url ?? "/curiosities",
    type: "entry",
  }));
}
