/**
 * 学科印（T-DESIGN-01e）：22 个领域各一方印，取代 emoji 与零散的内联图标。
 * 字形轮廓由 `pnpm gen-seal-glyphs` 从 Noto Serif SC Black（OFL）提取到
 * seal-glyphs.generated.ts，渲染不依赖读者装了什么字体，也不下载网页字体。
 * 改了这里的字，要重跑生成脚本；测试会拦住缺字形的印。
 */
export const DOMAIN_SEALS = {
  "universe-physics": { char: "物", name: "物理学" },
  cosmology: { char: "宙", name: "宇宙学" },
  "earth-science": { char: "地", name: "地球科学" },
  chemistry: { char: "化", name: "化学" },
  "life-science": { char: "生", name: "生命科学" },
  medicine: { char: "医", name: "医学与公共卫生" },
  psychology: { char: "心", name: "心理学" },
  linguistics: { char: "语", name: "语言学" },
  education: { char: "教", name: "教育学" },
  sociology: { char: "社", name: "社会学" },
  economics: { char: "经", name: "经济学" },
  "political-science": { char: "政", name: "政治学" },
  law: { char: "法", name: "法学" },
  "human-history": { char: "史", name: "人类历史" },
  anthropology: { char: "人", name: "人类学与考古" },
  religion: { char: "宗", name: "宗教学" },
  philosophy: { char: "哲", name: "哲学思想" },
  arts: { char: "艺", name: "艺术、建筑与美学" },
  literature: { char: "文", name: "文学与叙事" },
  mathematics: { char: "数", name: "数学与逻辑" },
  "computer-science": { char: "算", name: "计算机科学" },
  engineering: { char: "工", name: "工程与技术" },
} as const satisfies Record<string, { char: string; name: string }>;

export type SealDomain = keyof typeof DOMAIN_SEALS;

export function isSealDomain(id: string): id is SealDomain {
  return Object.hasOwn(DOMAIN_SEALS, id);
}

/** 站印「格致」：双字，右起竖读（先右列「格」，再左列「致」），与传统印文一致。 */
export const BRAND_SEAL = { chars: ["格", "致"], name: "Episteme · 格致" } as const;

/** Every character the generator must extract. */
export function sealCharacters(): string[] {
  return [
    ...new Set([...Object.values(DOMAIN_SEALS).map((seal) => seal.char), ...BRAND_SEAL.chars]),
  ];
}
