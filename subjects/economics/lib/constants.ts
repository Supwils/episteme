export const ERA_COLORS: Record<string, string> = {
  古典: "#6ad0ff",
  新古典: "#c8a45a",
  现代: "#7aaa8a",
  当代: "#a88adf",
};

export const ERA_BG: Record<string, string> = {
  古典: "rgba(106,208,255,0.08)",
  新古典: "rgba(200,164,90,0.08)",
  现代: "rgba(122,170,138,0.08)",
  当代: "rgba(168,138,223,0.08)",
};

export const ERA_GLOW: Record<string, string> = {
  古典: "rgba(106,208,255,0.12)",
  新古典: "rgba(200,164,90,0.12)",
  现代: "rgba(122,170,138,0.12)",
  当代: "rgba(168,138,223,0.12)",
};

export const CATEGORY_COLORS: Record<string, string> = {
  微观: "#e06c75",
  宏观: "#61afef",
  国际: "#c678dd",
  发展: "#98c379",
  行为: "#e5c07b",
  博弈论: "#56b6c2",
  制度: "#d19a66",
  金融: "#be5046",
};

/**
 * Fixed pedagogical order for the concepts index (基础 → 微观 → 宏观 → 金融
 * → 博弈/行为 → 应用与制度 → 方法). Categories not listed here (future
 * additions) are appended after these, with "其他" always last.
 */
export const CONCEPT_CATEGORY_ORDER: readonly string[] = [
  "宏观经济学入门",
  "微观经济学",
  "微观经济理论",
  "宏观经济学",
  "货币经济学",
  "劳动经济学",
  "劳动经济学与宏观",
  "金融经济学",
  "固定收益",
  "国际金融",
  "市场微观结构",
  "信息经济学",
  "博弈论",
  "博弈论与市场设计",
  "决策理论",
  "行为经济学",
  "产业经济学",
  "发展经济学",
  "经济发展与创新",
  "发展经济学与政治经济学",
  "收入分配与不平等",
  "政治经济学",
  "制度经济学与公共经济学",
  "法律经济学与制度经济学",
  "福利经济学与公共选择",
  "环境经济学",
  "实证经济学方法",
  "应用经济学",
];

/** Order category names by CONCEPT_CATEGORY_ORDER; unknowns after, "其他" last. */
export function orderConceptCategories(categories: Iterable<string>): string[] {
  const rest = new Set(categories);
  const ordered: string[] = [];
  for (const cat of CONCEPT_CATEGORY_ORDER) {
    if (rest.delete(cat)) ordered.push(cat);
  }
  const hasOther = rest.delete("其他");
  const extras = [...rest].sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
  return hasOther ? [...ordered, ...extras, "其他"] : [...ordered, ...extras];
}

/** Accent color for a concept category: exact key, else prefix match, else gold. */
export function conceptCategoryColor(category: string): string {
  if (CATEGORY_COLORS[category]) return CATEGORY_COLORS[category];
  for (const [key, color] of Object.entries(CATEGORY_COLORS)) {
    if (category.includes(key)) return color;
  }
  return "#c8a45a";
}

export const SCHOOL_COLORS: Record<string, string> = {
  古典经济学: "#6ad0ff",
  马克思主义: "#e06c75",
  新古典经济学: "#c8a45a",
  凯恩斯主义: "#61afef",
  货币主义: "#e5c07b",
  供给学派: "#98c379",
  新制度经济学: "#d19a66",
  行为经济学: "#c678dd",
  博弈论: "#56b6c2",
  奥地利学派: "#a88adf",
};

export const PRODUCT_EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

export const SECTION_ICONS: Record<string, string> = {
  economists: "👤",
  theories: "📖",
  concepts: "💡",
  "case-studies": "📊",
  schools: "🏛",
  simulations: "🎮",
  debates: "⚖",
  dialogues: "💬",
  "knowledge-base": "📚",
};
