export const KNOWLEDGE_LEVELS = [
  {
    id: 1,
    label: "直觉启蒙",
    shortLabel: "看见与提问",
    description: "从可观察的事物和真实问题出发，建立对世界的好奇与基本分类。",
  },
  {
    id: 2,
    label: "基础语言",
    shortLabel: "概念与规律",
    description: "学习数量、结构、因果、生命、心智与制度等可反复使用的核心概念。",
  },
  {
    id: 3,
    label: "系统解释",
    shortLabel: "机制与反馈",
    description: "把单个概念放进系统，理解相互作用、反馈、演化与历史变化。",
  },
  {
    id: 4,
    label: "方法建模",
    shortLabel: "证据与模型",
    description: "比较证据、建立模型、检验假设，并辨认测量与推断的不确定性。",
  },
  {
    id: 5,
    label: "综合前沿",
    shortLabel: "开放问题",
    description: "跨越学科边界，进入尚无定论、需要多种证据共同回答的研究问题。",
  },
] as const;

export type KnowledgeLevel = (typeof KNOWLEDGE_LEVELS)[number]["id"];

export function parseKnowledgeLevel(value: string | null): KnowledgeLevel | null {
  const level = Number(value);
  return KNOWLEDGE_LEVELS.some((item) => item.id === level) ? (level as KnowledgeLevel) : null;
}
