/**
 * 图册面板（T-DESIGN-03b）的数据：六簇 × 领域，每行一方学科印、名称、篇数与一句话。
 * 篇数取 generated/site-stats.json（全站唯一计数源），领域与簇取 DOMAINS。
 */
import { DOMAINS } from "@/lib/data";
import { getClustersWithDomains, type DomainClusterId } from "@/lib/domain-clusters";
import type { SealDomain } from "@/lib/design/seals";
import { getDomainStats } from "@/lib/site-stats";

/** 一句话说清这个领域在问什么。短到能放进图册的一行（≤ 16 字）。 */
export const ATLAS_LINES: Record<SealDomain, string> = {
  "universe-physics": "从落体到量子场的自然法则",
  cosmology: "宇宙从哪里来、怎样演化",
  "earth-science": "板块、气候与地球的深时间",
  chemistry: "原子怎样结合成万物",
  "life-science": "生命如何起源与分化",
  medicine: "疾病、身体与群体的健康",
  psychology: "心智如何感知、记忆与决策",
  linguistics: "语言的声音、结构与变迁",
  education: "人怎样学会、又怎样教",
  sociology: "群体、阶层与日常秩序",
  economics: "稀缺之下的选择与市场",
  "political-science": "权力如何被组织与制约",
  law: "规则从何而来、怎样裁判",
  "human-history": "五千年的事件与人物",
  anthropology: "文化、亲属与史前遗存",
  religion: "信仰、经典与宗教社会",
  philosophy: "追问知识、存在与善",
  arts: "看、造与美的判断",
  literature: "故事与诗怎样打动人",
  mathematics: "从计数到证明的形式世界",
  "computer-science": "计算的极限与机器的构造",
  engineering: "把原理变成可靠的结构",
};

export type AtlasDomain = {
  id: SealDomain;
  title: string;
  href: string;
  articles: number;
  line: string;
};

export type AtlasCluster = {
  id: DomainClusterId;
  label: string;
  domains: AtlasDomain[];
};

export const ATLAS: AtlasCluster[] = getClustersWithDomains(DOMAINS).map((cluster) => ({
  id: cluster.id,
  label: cluster.label,
  domains: cluster.domains.map((domain) => ({
    id: domain.id as SealDomain,
    title: domain.title,
    href: `/${domain.id}`,
    articles: getDomainStats(domain.id).articles,
    line: ATLAS_LINES[domain.id as SealDomain],
  })),
}));
