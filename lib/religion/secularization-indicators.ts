export type IndicatorId = "practice" | "identity" | "privilege";
export type SampleId = "us-rls" | "west-europe";

export type IndicatorSeries = {
  id: IndicatorId;
  label: string;
  note: string;
  source: string;
  bars: readonly { label: string; value: number }[];
  facts?: readonly string[];
};

export const SAMPLES: readonly { id: SampleId; label: string }[] = [
  { id: "us-rls", label: "美国皮尤 RLS" },
  { id: "west-europe", label: "西欧皮尤 2018" },
];

export const INDICATOR_LABELS: readonly { id: IndicatorId; label: string }[] = [
  { id: "practice", label: "参与" },
  { id: "identity", label: "认同" },
  { id: "privilege", label: "制度特权" },
];

const US_PRACTICE: IndicatorSeries = {
  id: "practice",
  label: "参与",
  note: "同一份 2023–24 年宗教景观研究，切的是出席频率，不是时间序列。2007、2014 年电话调查的每周出席率不能直接对比（皮尤说明了模式转换）。",
  source: "Pew Research Center, 2023–24 Religious Landscape Study（2025-02）",
  bars: [
    { label: "每周至少一次", value: 25 },
    { label: "每月至少一次", value: 33 },
    { label: "很少 / 从不", value: 49 },
  ],
};

const US_IDENTITY: IndicatorSeries = {
  id: "identity",
  label: "认同",
  note: "仍自称某传统的人口比例。基督徒份额 2007 年 78%、2014 年 71%、2023–24 年 62%；无宗教身份同期 16% → 23% → 29%，近年走平。",
  source: "Pew RLS 2007 / 2014 / 2023–24",
  bars: [
    { label: "2007 基督徒", value: 78 },
    { label: "2014 基督徒", value: 71 },
    { label: "2023–24 基督徒", value: 62 },
  ],
};

const US_PRIVILEGE: IndicatorSeries = {
  id: "privilege",
  label: "制度特权",
  note: "这是法律事实，不是信仰强度。美国联邦层面没有国教；税收豁免和公立学校里的宗教表达是另一套诉讼史。",
  source: "美国宪法第一修正案；Engel v. Vitale (1962)",
  bars: [],
  facts: [
    "联邦不得确立国教，也不得禁止宗教活动的自由行使。",
    "1962 年 Engel v. Vitale：公立学校官方祷告被判违宪。",
    "宗教团体的税收待遇仍在，不能写成「宗教已经退出制度」。",
  ],
};

const EU_PRACTICE: IndicatorSeries = {
  id: "practice",
  label: "参与",
  note: "十五国中位：每月至少礼拜一次约 22%。意大利最高（43%），英国约 18%。参与低，不等于没有人仍自称基督徒。",
  source: "Pew Research Center, Being Christian in Western Europe（2018-05）",
  bars: [
    { label: "十五国中位·每月", value: 22 },
    { label: "意大利·每月", value: 43 },
    { label: "英国·每月", value: 18 },
  ],
};

const EU_IDENTITY: IndicatorSeries = {
  id: "identity",
  label: "认同",
  note: "仍自称某传统可以远高于出席。英国：每月礼拜的基督徒 18%，名义基督徒 55%。荷兰是少数无宗教身份（48%）超过基督徒（41%）的国家。",
  source: "Pew, Being Christian in Western Europe（2018）",
  bars: [
    { label: "英国·每月礼拜基督徒", value: 18 },
    { label: "英国·名义基督徒", value: 55 },
    { label: "荷兰·无宗教身份", value: 48 },
  ],
};

const EU_PRIVILEGE: IndicatorSeries = {
  id: "privilege",
  label: "制度特权",
  note: "国教、教会税与学校课程席位是法律安排。瑞典 2000 年、挪威 2012 年先后削弱国教地位；英格兰国教会仍是法定国教。",
  source: "各国政教立法（示意，不是普查）",
  bars: [],
  facts: [
    "英格兰国教会至今仍是法定国教。",
    "瑞典教会与国家在 2000 年分离。",
    "挪威 2012 年修宪，弱化路德宗的国教地位。",
  ],
};

const SERIES: Record<SampleId, Record<IndicatorId, IndicatorSeries>> = {
  "us-rls": {
    practice: US_PRACTICE,
    identity: US_IDENTITY,
    privilege: US_PRIVILEGE,
  },
  "west-europe": {
    practice: EU_PRACTICE,
    identity: EU_IDENTITY,
    privilege: EU_PRIVILEGE,
  },
};

export function indicatorById(id: IndicatorId) {
  return SERIES["us-rls"][id];
}

export function indicatorSeries(sample: SampleId, id: IndicatorId) {
  return SERIES[sample][id];
}
