export type MaterialRegionId = "andes" | "west-africa" | "oceania" | "east-asia" | "near-east";

export const MATERIAL_REGIONS: readonly {
  id: MaterialRegionId;
  label: string;
  cx: number;
  cy: number;
  note: string;
}[] = [
  {
    id: "andes",
    label: "安第斯纺织",
    cx: 70,
    cy: 118,
    note: "示意的是博物馆与民族志里反复出现的高地织物传统，不是某座遗址的坐标。",
  },
  {
    id: "west-africa",
    label: "西非铜铸",
    cx: 118,
    cy: 86,
    note: "贝宁铜饰板进入欧洲馆藏，是掠夺与展览史，不是风格的自然分布。",
  },
  {
    id: "oceania",
    label: "大洋洲航海",
    cx: 196,
    cy: 108,
    note: "舟、绳索与导航知识常被写成“原始航海”。能核对的是航海技术与殖民收藏。",
  },
  {
    id: "east-asia",
    label: "东亚釉陶",
    cx: 178,
    cy: 58,
    note: "窑址与贸易陶瓷出现在港口和沉船清单里。类型学标签不是族群本质。",
  },
  {
    id: "near-east",
    label: "近东楔形",
    cx: 142,
    cy: 62,
    note: "泥板与印章进入博物馆，是发掘许可、分享协议与战争流失共同造成的。",
  },
];
