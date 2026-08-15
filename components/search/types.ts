export type Section =
  | "physics"
  | "history"
  | "philosophy"
  | "life-science"
  | "economics"
  | "psychology"
  | "cosmology"
  | "mathematics"
  | "computer-science"
  | "political-science"
  | "earth-science"
  | "medicine"
  | "chemistry"
  | "sociology"
  | "linguistics"
  | "law"
  | "arts"
  | "engineering";

export const SECTION_META: Record<Section, { label: string; color: string }> = {
  physics: { label: "宇宙物理", color: "#6ad0ff" },
  history: { label: "人类历史", color: "#c8a45a" },
  philosophy: { label: "哲学思想", color: "#a88adf" },
  "life-science": { label: "生命科学", color: "#4a9e6f" },
  economics: { label: "经济学", color: "#e8b84a" },
  psychology: { label: "心理学", color: "#d4789c" },
  cosmology: { label: "宇宙学", color: "#7eb8da" },
  mathematics: { label: "数学", color: "#5fb3a3" },
  "computer-science": { label: "计算机科学", color: "#4f9cf0" },
  "political-science": { label: "政治学", color: "#c25b5b" },
  "earth-science": { label: "地球科学", color: "#4f9d76" },
  medicine: { label: "医学与公共卫生", color: "#d9544d" },
  chemistry: { label: "化学", color: "#e08a3c" },
  sociology: { label: "社会学", color: "#b07cc6" },
  linguistics: { label: "语言学", color: "#6fa8c7" },
  law: { label: "法学", color: "#a8843c" },
  arts: { label: "艺术", color: "#b0785a" },
  engineering: { label: "工程", color: "#8a919e" },
};

/** Order results are listed in. Every key of SECTION_META must appear — a
 *  section missing here is a section whose articles are unreachable by search. */
export const SEARCH_SECTIONS: Section[] = Object.keys(SECTION_META) as Section[];

export const TYPE_LABELS: Record<string, string> = {
  thinker: "思想家",
  school: "流派",
  ism: "主义",
  concept: "概念",
  question: "问题",
  experiment: "实验",
  dialogue: "对话",
  species: "物种",
  scientist: "科学家",
  extinction: "灭绝事件",
  event: "历史事件",
  figure: "历史人物",
  simulation: "模拟",
  article: "知识库",
  cosmos: "宇宙层级",
  physics: "物理分支",
  era: "地质时代",
  timeline: "生命历程",
  page: "页面",
  economist: "经济学家",
  theory: "经济理论",
  phenomenon: "心理现象",
  disorder: "心理障碍",
  psychologist: "心理学家",
  knowledgeBase: "知识库",
  frontier: "研究前沿",
  entry: "条目",
};

/** One row in the results list, from either tier. */
export interface SearchResult {
  title: string;
  subtitle: string;
  url: string;
  section: string;
  kind: string;
  /** Prose around the match. Present only for body-phrase hits. */
  snippet?: string;
  /** Where the match starts inside `snippet`. */
  matchStart?: number;
}

/** Display order shared by SearchResults (visual grouping) and GlobalSearch
 *  (keyboard navigation) — the two must walk the same sequence, or arrow keys
 *  jump across the screen. Title hits group by domain in SEARCH_SECTIONS order
 *  (score order within a group), body hits trail in one group. */
export function orderResultsForDisplay(
  titleResults: SearchResult[],
  bodyResults: SearchResult[]
): SearchResult[] {
  const bySection = new Map<Section, SearchResult[]>();
  for (const result of titleResults) {
    const section = result.section as Section;
    if (!(section in SECTION_META)) continue;
    const bucket = bySection.get(section);
    if (bucket) bucket.push(result);
    else bySection.set(section, [result]);
  }
  return [...SEARCH_SECTIONS.flatMap((section) => bySection.get(section) ?? []), ...bodyResults];
}
