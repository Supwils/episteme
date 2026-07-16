export type LanguageOrder = "SOV" | "SVO" | "VSO" | "predicate-first" | "flexible";
export type MorphologyProfile =
  | "isolating"
  | "agglutinative"
  | "fusional"
  | "polysynthetic"
  | "mixed";
export type LanguageModality = "spoken" | "signed";
export type LanguageMapDimension = "wordOrder" | "morphology" | "modality";

export type LanguageProfile = {
  id: string;
  name: string;
  localName: string;
  family: string;
  branch: string;
  macroarea: string;
  longitude: number;
  latitude: number;
  wordOrder: LanguageOrder;
  morphology: MorphologyProfile;
  modality: LanguageModality;
  feature: string;
  caution: string;
};

export const LANGUAGE_ORDER_LABELS: Record<LanguageOrder, string> = {
  SOV: "主—宾—谓",
  SVO: "主—谓—宾",
  VSO: "谓—主—宾",
  "predicate-first": "述语居首",
  flexible: "语序较灵活",
};

export const MORPHOLOGY_LABELS: Record<MorphologyProfile, string> = {
  isolating: "偏分析型",
  agglutinative: "偏黏着型",
  fusional: "偏屈折型",
  polysynthetic: "多式综合",
  mixed: "混合剖面",
};

export const LANGUAGE_PROFILES: readonly LanguageProfile[] = [
  {
    id: "mandarin",
    name: "官话",
    localName: "普通话 / Mandarin",
    family: "汉藏语系",
    branch: "汉语族",
    macroarea: "东亚",
    longitude: 116,
    latitude: 35,
    wordOrder: "SVO",
    morphology: "isolating",
    modality: "spoken",
    feature: "声调、量词和语序共同组织语法关系。",
    caution: "“汉语”内部差异很大，此点仅代表官话样本。",
  },
  {
    id: "hindi",
    name: "印地语",
    localName: "हिन्दी",
    family: "印欧语系",
    branch: "印度—雅利安语支",
    macroarea: "南亚",
    longitude: 78,
    latitude: 24,
    wordOrder: "SOV",
    morphology: "fusional",
    modality: "spoken",
    feature: "后置词、性数一致与完成体分裂格配置。",
    caution: "语序是默认倾向，信息结构可驱动换位。",
  },
  {
    id: "tamil",
    name: "泰米尔语",
    localName: "தமிழ்",
    family: "达罗毗荼语系",
    branch: "南部达罗毗荼语支",
    macroarea: "南亚",
    longitude: 80,
    latitude: 10,
    wordOrder: "SOV",
    morphology: "agglutinative",
    modality: "spoken",
    feature: "格、时体和人称标记可以连接成较长词形。",
    caution: "口语与正式书面变体存在显著分工。",
  },
  {
    id: "arabic",
    name: "阿拉伯语",
    localName: "العربية",
    family: "亚非语系",
    branch: "闪语族",
    macroarea: "西亚与北非",
    longitude: 42,
    latitude: 25,
    wordOrder: "VSO",
    morphology: "fusional",
    modality: "spoken",
    feature: "辅音词根与模式交织，书面标准语与地方变体分工。",
    caution: "VSO 是古典/标准语的重要模式，实际口语常见 SVO。",
  },
  {
    id: "swahili",
    name: "斯瓦希里语",
    localName: "Kiswahili",
    family: "尼日尔—刚果语系",
    branch: "班图语支",
    macroarea: "东非",
    longitude: 38,
    latitude: -6,
    wordOrder: "SVO",
    morphology: "agglutinative",
    modality: "spoken",
    feature: "名词类别一致跨越名词、形容词与动词。",
    caution: "地区变体与接触语形成连续谱，不宜只看课本标准语。",
  },
  {
    id: "yoruba",
    name: "约鲁巴语",
    localName: "Yorùbá",
    family: "尼日尔—刚果语系",
    branch: "德福伊语支",
    macroarea: "西非",
    longitude: 4,
    latitude: 8,
    wordOrder: "SVO",
    morphology: "isolating",
    modality: "spoken",
    feature: "声调承担词汇与语法对立，词形变化相对有限。",
    caution: "与斯瓦希里语同属大语系，但类型剖面差异明显。",
  },
  {
    id: "turkish",
    name: "土耳其语",
    localName: "Türkçe",
    family: "突厥语系",
    branch: "乌古斯语支",
    macroarea: "西亚",
    longitude: 35,
    latitude: 39,
    wordOrder: "SOV",
    morphology: "agglutinative",
    modality: "spoken",
    feature: "元音和谐约束连续后缀的形式。",
    caution: "默认语序可因旧新信息和焦点而调整。",
  },
  {
    id: "basque",
    name: "巴斯克语",
    localName: "Euskara",
    family: "孤立语言",
    branch: "无已证实近亲",
    macroarea: "西欧",
    longitude: -2,
    latitude: 43,
    wordOrder: "SOV",
    morphology: "agglutinative",
    modality: "spoken",
    feature: "格标记丰富，及物动词呈作格—绝对格对齐。",
    caution: "孤立只表示尚无可证实亲缘，不表示“原始”或“不变”。",
  },
  {
    id: "irish",
    name: "爱尔兰语",
    localName: "Gaeilge",
    family: "印欧语系",
    branch: "凯尔特语族",
    macroarea: "西欧",
    longitude: -8,
    latitude: 53,
    wordOrder: "VSO",
    morphology: "fusional",
    modality: "spoken",
    feature: "谓语常居句首，词首辅音交替标记多种语法关系。",
    caution: "与印地语有远系亲缘，却具有不同的基本语序。",
  },
  {
    id: "japanese",
    name: "日语",
    localName: "日本語",
    family: "日琉语系",
    branch: "日语支",
    macroarea: "东亚",
    longitude: 139,
    latitude: 36,
    wordOrder: "SOV",
    morphology: "agglutinative",
    modality: "spoken",
    feature: "助词标记语法与话题，谓语位于分句末端。",
    caution: "与土耳其语类型相似，不构成已证实语系关系。",
  },
  {
    id: "tagalog",
    name: "他加禄语",
    localName: "Tagalog",
    family: "南岛语系",
    branch: "菲律宾语群",
    macroarea: "东南亚",
    longitude: 121,
    latitude: 14,
    wordOrder: "predicate-first",
    morphology: "mixed",
    modality: "spoken",
    feature: "语态系统选择哪个参与者与谓词形态核心对应。",
    caution: "用英语式“主语”直接概括其语态会丢失重要区别。",
  },
  {
    id: "warlpiri",
    name: "瓦尔皮里语",
    localName: "Warlpiri",
    family: "帕马—纽干语系",
    branch: "恩加尔基语群",
    macroarea: "澳洲",
    longitude: 132,
    latitude: -22,
    wordOrder: "flexible",
    morphology: "agglutinative",
    modality: "spoken",
    feature: "丰富格标记使名词短语可被信息结构重排。",
    caution: "“自由语序”不是任意排列，语用与韵律仍有约束。",
  },
  {
    id: "quechua",
    name: "南部克丘亚语",
    localName: "Runasimi",
    family: "克丘亚语系",
    branch: "Quechua II",
    macroarea: "安第斯",
    longitude: -72,
    latitude: -14,
    wordOrder: "SOV",
    morphology: "agglutinative",
    modality: "spoken",
    feature: "后缀序列表达格、人称和证据性等意义。",
    caution: "克丘亚是语言群，不同地区变体不应被压成单一系统。",
  },
  {
    id: "navajo",
    name: "纳瓦霍语",
    localName: "Diné bizaad",
    family: "阿萨巴斯卡—埃雅克—特林吉特语系",
    branch: "南部阿萨巴斯卡语支",
    macroarea: "北美",
    longitude: -109,
    latitude: 36,
    wordOrder: "SOV",
    morphology: "polysynthetic",
    modality: "spoken",
    feature: "动词模板整合主客体、时体语气和分类词根。",
    caution: "线性语序只是剖面之一，大量句法信息在动词内部。",
  },
  {
    id: "american-sign-language",
    name: "美国手语",
    localName: "ASL",
    family: "法国手语语系",
    branch: "ASL 语群",
    macroarea: "北美",
    longitude: -77,
    latitude: 39,
    wordOrder: "flexible",
    morphology: "mixed",
    modality: "signed",
    feature: "手形、位置、运动、朝向和非手动作同时组织空间语法。",
    caution: "ASL 不是英语的手势编码，其谱系也不由地理邻近自动决定。",
  },
] as const;

export const LANGUAGE_MAP_DIMENSION_LABELS: Record<LanguageMapDimension, string> = {
  wordOrder: "基本语序",
  morphology: "形态剖面",
  modality: "信号通道",
};

export const GENEALOGY_TYPE_COMPARISONS = [
  {
    title: "远亲也可以很不同",
    languageIds: ["hindi", "irish"],
    explanation: "印地语与爱尔兰语同属印欧语系，但默认语序分别倾向 SOV 和 VSO。",
  },
  {
    title: "无亲缘也可以很相似",
    languageIds: ["turkish", "japanese"],
    explanation: "土耳其语与日语都倾向 SOV 和黏着形态，这不能单独证明共同祖语。",
  },
  {
    title: "同语系内也有类型距离",
    languageIds: ["swahili", "yoruba"],
    explanation: "两者同属尼日尔—刚果语系，但名词类别和形态组织差异显著。",
  },
] as const;

export const LANDMASS_POLYGONS: readonly (readonly (readonly [number, number])[])[] = [
  [
    [-168, 71],
    [-132, 59],
    [-124, 38],
    [-105, 23],
    [-83, 9],
    [-66, 45],
    [-54, 50],
    [-60, 66],
    [-115, 72],
  ],
  [
    [-82, 12],
    [-62, 6],
    [-45, -16],
    [-58, -40],
    [-67, -55],
    [-75, -36],
    [-81, -4],
  ],
  [
    [-10, 36],
    [-9, 57],
    [28, 72],
    [41, 50],
    [29, 39],
    [8, 38],
  ],
  [
    [-17, 35],
    [16, 33],
    [44, 12],
    [42, -12],
    [23, -35],
    [-3, -29],
    [-17, 2],
  ],
  [
    [30, 41],
    [62, 61],
    [126, 68],
    [170, 60],
    [142, 44],
    [122, 23],
    [103, 2],
    [73, 20],
    [44, 30],
  ],
  [
    [95, 5],
    [118, -5],
    [153, -10],
    [137, -10],
    [108, -8],
  ],
  [
    [113, -12],
    [146, -18],
    [154, -28],
    [145, -38],
    [117, -35],
    [112, -23],
  ],
  [
    [166, -35],
    [178, -38],
    [174, -46],
    [166, -44],
  ],
] as const;

export function projectLanguageCoordinate(longitude: number, latitude: number) {
  return {
    x: ((longitude + 180) / 360) * 100,
    y: ((90 - latitude) / 180) * 100,
  };
}
