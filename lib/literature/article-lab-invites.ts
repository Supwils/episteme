import type { LabInviteData } from "@/lib/lab-invite";

const NARRATIVE: LabInviteData = {
  href: "/literature/narrative-graph",
  label: "叙事结构图谱",
  tease: "用守株待兔四件情节事件，对照故事次序与讲述次序。",
};

const METER: LabInviteData = {
  href: "/literature/meter-lab",
  label: "格律与音步实验室",
  tease: "数五言、七言与英语抑扬五音步的停顿，不是给诗打分。",
};

const MAP: LabInviteData = {
  href: "/literature/world-map",
  label: "世界文学时空地图",
  tease: "在教学分期里点选几条叙事传统。椭圆不是地球。",
};

const TRANSLATION: LabInviteData = {
  href: "/literature/translation-comparator",
  label: "译本比较器",
  tease: "并置两段公有领域译文，看节奏和关键词怎样被改写。",
};

const BY_SLUG: Record<string, LabInviteData> = {
  "what-is-a-story": NARRATIVE,
  "plot-character-conflict": NARRATIVE,
  "time-and-narrative-order": NARRATIVE,
  "meter-and-the-line": METER,
  "metaphor-and-image": METER,
  "epic-as-public-memory": MAP,
  "world-literature-as-a-market": MAP,
  "translation-as-rewriting": TRANSLATION,
  "generated-text-and-authorship": TRANSLATION,
  "copyright-and-the-public-domain": TRANSLATION,
  "llm-training-corpus-litigation": TRANSLATION,
  "computational-literary-studies-replication": NARRATIVE,
};

const BY_SECTION: Record<string, LabInviteData> = {
  "narrative-basics": NARRATIVE,
  "poetics-and-form": METER,
  "world-traditions": MAP,
  "theory-and-method": NARRATIVE,
  "reading-and-reception": TRANSLATION,
  "contemporary-edges": TRANSLATION,
  frontier: TRANSLATION,
};

export function literatureLabInvite(section: string, slug: string): LabInviteData {
  return BY_SLUG[slug] ?? BY_SECTION[section] ?? NARRATIVE;
}
