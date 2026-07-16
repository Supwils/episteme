export type RiskLevel = "low" | "medium" | "high" | "acute";
export type ScenarioKey = "baseline" | "upside" | "downside";

export type DimensionKey =
  | "growth"
  | "inflation"
  | "fiscal"
  | "debt"
  | "external"
  | "finance"
  | "policy";

export type MacroCase = {
  name: string;
  path: string;
  deepDivePath?: string;
  risk: RiskLevel;
  signal: string;
  detail: string;
  dimensions: Record<DimensionKey, string>;
  scenarios: Record<ScenarioKey, string>;
};

export type MacroScenario = {
  label: string;
  summary: string;
};

export const MACRO_SCENARIOS: Record<ScenarioKey, MacroScenario> = {
  baseline: {
    label: "基准情景",
    summary: "通胀缓慢回落，财政压力仍高，发达经济体低速扩张，新兴经济体分化。",
  },
  upside: {
    label: "上行情景",
    summary: "生产率、能源供给和政策协调改善，实际收入修复，债务压力被增长吸收。",
  },
  downside: {
    label: "下行情景",
    summary: "再通胀、金融条件收紧或地缘冲击叠加，财政空间小的经济体先出现压力。",
  },
};

export const MACRO_DIMENSIONS = [
  { key: "growth", label: "增长" },
  { key: "inflation", label: "通胀" },
  { key: "fiscal", label: "财政" },
  { key: "debt", label: "债务" },
  { key: "external", label: "外部账户" },
  { key: "finance", label: "金融系统" },
  { key: "policy", label: "政策情景" },
] satisfies { key: DimensionKey; label: string }[];

export const ALL_MACRO_DIMENSIONS = MACRO_DIMENSIONS.map((dimension) => dimension.key);

export const MACRO_CASES: MacroCase[] = [
  {
    name: "美国",
    path: "/economics/case-studies/us-macro-diagnosis-2026",
    deepDivePath: "/economics/case-studies/us-fiscal-path-treasury-market-2026",
    risk: "high",
    signal: "财政赤字、利息支出和国债期限溢价是核心变量。",
    detail:
      "美国的缓冲来自美元体系、深国债市场和科技投资，但财政路径、预算政治和服务通胀会决定软着陆是否稳定。",
    dimensions: {
      growth: "消费与科技投资韧性强",
      inflation: "服务与住房粘性仍关键",
      fiscal: "赤字高，利息支出上升",
      debt: "美元与国债深度提供缓冲",
      external: "经常账户赤字由美元体系吸收",
      finance: "市场深，但估值与期限溢价敏感",
      policy: "软着陆、再通胀或财政争议",
    },
    scenarios: {
      baseline: "温和降息、增长放缓但不失速，财政赤字维持高位。",
      upside: "生产率和劳动供给改善，期限溢价稳定，赤字路径有可信锚。",
      downside: "通胀反复、长端利率上行、预算僵局放大市场波动。",
    },
  },
  {
    name: "中国",
    path: "/economics/case-studies/china-macro-diagnosis-2026",
    deepDivePath: "/economics/case-studies/china-property-local-finance-financial-system-2026",
    risk: "high",
    signal: "地产链、地方财政和低通胀预期是同一资产负债表问题。",
    detail:
      "中国仍有制造体系和政策动员能力，但需求修复取决于居民收入预期、地方化债透明度和房地产抵押品重估。",
    dimensions: {
      growth: "地产退潮，制造与服务接力",
      inflation: "低通胀反映需求偏弱",
      fiscal: "地方财政与土地收入承压",
      debt: "债务更多在地方和企业部门",
      external: "制造出口强，外部摩擦上升",
      finance: "银行体系稳，但抵押品重估",
      policy: "再平衡、化债与需求修复",
    },
    scenarios: {
      baseline: "政策托底制造和基建，消费修复偏慢，低通胀压力延续。",
      upside: "房地产企稳、地方化债推进、公共服务改善带动居民信心。",
      downside: "资产价格继续下行，地方财政和银行风险相互强化。",
    },
  },
  {
    name: "欧元区",
    path: "/economics/case-studies/euro-area-macro-diagnosis-2026",
    deepDivePath: "/economics/case-studies/euro-area-fiscal-rules-energy-transition-2026",
    risk: "medium",
    signal: "统一货币、分散财政和能源转型投资之间需要再平衡。",
    detail:
      "欧元区的关键不是单一增长率，而是财政规则能否在债务纪律、能源安全、国防和产业投资之间留出空间。",
    dimensions: {
      growth: "能源冲击后温和修复",
      inflation: "核心通胀回落但工资滞后",
      fiscal: "财政规则重新约束成员国",
      debt: "南北债务空间差异明显",
      external: "经常账户改善依赖能源价格",
      finance: "银行较稳，主权利差需监测",
      policy: "降息、财政整顿与产业转型",
    },
    scenarios: {
      baseline: "通胀回落、低速增长、财政规则逐步恢复约束。",
      upside: "能源互联、绿色投资和资本市场联盟提高生产率。",
      downside: "能源价格再冲击或主权利差扩大，财政与投资同时受压。",
    },
  },
  {
    name: "日本",
    path: "/economics/case-studies/japan-macro-diagnosis-2026",
    deepDivePath: "/economics/case-studies/japan-yield-normalization-aging-fiscal-2026",
    risk: "medium",
    signal: "工资-物价循环和国债收益率正常化决定政策空间。",
    detail:
      "日本的高债务风险不是突然违约，而是利率正常化、老龄化财政支出和金融机构久期风险之间的慢变量。",
    dimensions: {
      growth: "人口约束下靠工资与投资",
      inflation: "工资-物价循环仍在确认",
      fiscal: "老龄化支出长期刚性",
      debt: "本币债务高但国内持有深",
      external: "日元与能源进口影响账面",
      finance: "收益率正常化考验银行与债券",
      policy: "渐进退出超宽松或再宽松",
    },
    scenarios: {
      baseline: "工资温和改善，央行渐进正常化，财政压力长期存在。",
      upside: "企业投资和工资形成更稳定循环，实际收入改善。",
      downside: "日元急贬或收益率跳升，金融机构估值压力加大。",
    },
  },
  {
    name: "印度",
    path: "/economics/case-studies/india-macro-diagnosis-2026",
    deepDivePath: "/economics/case-studies/india-growth-employment-constraints-2026",
    risk: "medium",
    signal: "高增长能否转化为就业、税基和城市公共品，是诊断重点。",
    detail:
      "印度的机会来自人口、基础设施和数字公共基础设施，约束来自就业质量、食品通胀、能源进口和联邦财政能力。",
    dimensions: {
      growth: "高增长与基础设施投资并行",
      inflation: "食品价格牵动总体通胀",
      fiscal: "联邦财政整顿仍需持续",
      debt: "本币债务为主，利息负担不轻",
      external: "油价与资本流入决定压力",
      finance: "银行修复后信贷周期回升",
      policy: "投资驱动、就业吸纳与改革",
    },
    scenarios: {
      baseline: "高增长延续，但就业吸纳和通胀篮子仍限制政策。",
      upside: "制造业、服务出口和城市公共品形成更强就业链。",
      downside: "油价、食品价格或资本流出同时冲击卢比和通胀。",
    },
  },
  {
    name: "资源出口国",
    path: "/economics/case-studies/commodity-exporters-macro-diagnosis-2026",
    deepDivePath:
      "/economics/case-studies/commodity-exporters-fiscal-rules-sovereign-wealth-funds-2026",
    risk: "high",
    signal: "价格周期会同时进入财政、汇率、银行和政治分配。",
    detail:
      "资源不是命运。财政规则、主权财富基金、汇率弹性和非资源部门投资，决定资源收入是缓冲器还是风险源。",
    dimensions: {
      growth: "取决于商品周期与投资纪律",
      inflation: "汇率与食品能源传导快",
      fiscal: "收入顺周期，规则质量关键",
      debt: "景气期降债，低价期再杠杆",
      external: "贸易条件决定经常账户摆动",
      finance: "主权基金和外储提供缓冲",
      policy: "储蓄规则、汇率弹性、多元化",
    },
    scenarios: {
      baseline: "商品价格分化，财政纪律决定缓冲厚度。",
      upside: "繁荣期储蓄并投资非资源部门，外汇缓冲增强。",
      downside: "价格回落、汇率贬值和补贴承诺同时压缩财政。",
    },
  },
  {
    name: "低收入债务国",
    path: "/economics/case-studies/low-income-debt-countries-macro-diagnosis-2026",
    deepDivePath: "/economics/case-studies/low-income-debt-restructuring-development-finance-2026",
    risk: "acute",
    signal: "外币债务、进口刚性和弱税基会把外部冲击变成财政危机。",
    detail:
      "低收入债务国真正脆弱之处不是一个债务率，而是外币融资、短期限、粮食能源进口和公共品缺口叠加。",
    dimensions: {
      growth: "人口红利受基础设施制约",
      inflation: "粮食、燃料与汇率冲击强",
      fiscal: "税基窄，补贴与利息挤压支出",
      debt: "外币债务与再融资风险突出",
      external: "进口刚性，资本流入脆弱",
      finance: "银行浅，主权风险传导快",
      policy: "重组、援助、税收与公共品",
    },
    scenarios: {
      baseline: "增长潜力仍在，但债务服务和进口账单压缩财政空间。",
      upside: "债务重组、援助和税收能力改善，公共投资恢复。",
      downside: "汇率贬值、资本外流和粮食能源冲击同步发生。",
    },
  },
];
