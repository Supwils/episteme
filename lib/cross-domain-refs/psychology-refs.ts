import type { CrossReference } from "./types";

export const PSYCHOLOGY_REFS: CrossReference[] = [
  {
    fromDomain: "psychology",
    fromId: "cognitive-dissonance",
    fromTitle: "认知失调",
    toDomain: "philosophy",
    toId: "determinism",
    toTitle: "决定论",
    relation: "认知失调理论挑战了理性决定论假设，揭示人类决策中的非理性机制",
  },
  {
    fromDomain: "psychology",
    fromId: "positive-psychology",
    fromTitle: "积极心理学",
    toDomain: "philosophy",
    toId: "eudaimonia",
    toTitle: "幸福论",
    relation: "积极心理学的幸福理论与亚里士多德的幸福论（eudaimonia）一脉相承",
  },
  {
    fromDomain: "psychology",
    fromId: "cognitive-bias",
    fromTitle: "认知偏差",
    toDomain: "human-history",
    toId: "wwii-codebreaking",
    toTitle: "二战密码破译",
    relation: "认知偏差研究揭示了情报分析中系统性误判的心理根源",
  },
  {
    fromDomain: "psychology",
    fromId: "milgram-experiment",
    fromTitle: "米尔格拉姆实验",
    toDomain: "human-history",
    toId: "holocaust",
    toTitle: "大屠杀",
    relation: "米尔格拉姆的服从实验试图解释普通人如何参与大屠杀等暴行",
  },
];
