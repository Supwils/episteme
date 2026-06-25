import type MiniSearch from "minisearch";
import type { SearchDocument } from "@/lib/search-index";

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
  | "chemistry";

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
};

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

export interface SearchResult {
  doc: SearchDocument;
  score: number;
  titleMatches: string[];
  subtitleMatches: string[];
  contentMatches: string[];
}

export interface SearchEngine {
  index: MiniSearch<SearchDocument>;
  documents: SearchDocument[];
}
