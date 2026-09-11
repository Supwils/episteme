export type IndicatorId = "practice" | "identity" | "privilege";

export const INDICATORS: readonly {
  id: IndicatorId;
  label: string;
  note: string;
  bars: readonly { label: string; value: number }[];
}[] = [
  {
    id: "practice",
    label: "参与",
    note: "示意：每周礼拜/仪式出席。这不是某国真实普查，只用来分开“还做不做”。",
    bars: [
      { label: "1950", value: 72 },
      { label: "1980", value: 48 },
      { label: "2010", value: 31 },
    ],
  },
  {
    id: "identity",
    label: "认同",
    note: "示意：仍自称某传统的人口比例。参与下降时认同可以更慢。",
    bars: [
      { label: "1950", value: 88 },
      { label: "1980", value: 79 },
      { label: "2010", value: 64 },
    ],
  },
  {
    id: "privilege",
    label: "制度特权",
    note: "示意：国教、税收豁免、学校课程席位。这是法律事实，不是信仰强度。",
    bars: [
      { label: "1950", value: 80 },
      { label: "1980", value: 55 },
      { label: "2010", value: 40 },
    ],
  },
];

export function indicatorById(id: IndicatorId) {
  return INDICATORS.find((item) => item.id === id)!;
}
