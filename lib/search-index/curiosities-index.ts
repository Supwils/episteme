import type { CuriositySubject } from "@/lib/curiosities";
import type { Section } from "@/components/search/types";
import type { SearchDocument } from "./types";

function articleHref(url?: string): string | undefined {
  if (!url) return undefined;
  return url.split("/").filter(Boolean).length >= 3 ? url : undefined;
}

/** Curiosity subjects map onto the search UI's section keys. */
const SUBJECT_TO_SECTION: Record<CuriositySubject, Section> = {
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
  chemistry: "chemistry",
  medicine: "medicine",
  "earth-science": "earth-science",
  engineering: "engineering",
  linguistics: "linguistics",
  sociology: "sociology",
  law: "law",
  arts: "arts",
  literature: "literature",
  religion: "religion",
  anthropology: "anthropology",
  education: "education",
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
    section: SUBJECT_TO_SECTION[c.subject as CuriositySubject] ?? "physics",
    url: articleHref(c.url) ?? "/curiosities",
    type: "curiosity",
  }));
}
