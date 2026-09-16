export type ScoreCaseId = "alpha" | "beta";
export type ScorePartId = "opportunity" | "language" | "guess" | "construct";

export const SCORE_CASES: readonly {
  id: ScoreCaseId;
  label: string;
  total: number;
  tease: string;
}[] = [
  {
    id: "alpha",
    label: "示意分数甲",
    total: 78,
    tease: "看起来不错。点开看有多少不是目标构念。",
  },
  {
    id: "beta",
    label: "示意分数乙",
    total: 54,
    tease: "看起来更低。低的部分也可能是介质，不是不会。",
  },
];

export const SCORE_PARTS: readonly {
  id: ScorePartId;
  label: string;
  alpha: number;
  beta: number;
  tease: string;
}[] = [
  {
    id: "opportunity",
    label: "机会",
    alpha: 18,
    beta: 8,
    tease: "谁练过相近题型。不是能力本质。",
  },
  {
    id: "language",
    label: "语言介质",
    alpha: 12,
    beta: 22,
    tease: "题目用的语言和表征。便利若在证书处作废，这里会变大。",
  },
  {
    id: "guess",
    label: "猜测与速度",
    alpha: 10,
    beta: 6,
    tease: "限时与选项格式带来的噪声。",
  },
  {
    id: "construct",
    label: "目标构念",
    alpha: 38,
    beta: 18,
    tease: "测验声称要推断的那一部分。仍是推断，不是照片。",
  },
];

export function scoreCaseById(id: ScoreCaseId) {
  return SCORE_CASES.find((item) => item.id === id)!;
}

export function scorePartValue(part: (typeof SCORE_PARTS)[number], id: ScoreCaseId) {
  return id === "alpha" ? part.alpha : part.beta;
}
