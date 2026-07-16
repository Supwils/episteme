import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { GraphNode, GraphEdge } from "./types";

interface MdxEntry {
  slug: string;
  frontmatter: Record<string, unknown>;
  content: string;
}

function findMonorepoRoot(): string {
  let dir = process.cwd();
  for (let i = 0; i < 5; i++) {
    if (fs.existsSync(path.join(dir, "pnpm-workspace.yaml"))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return process.cwd();
}

function readMdxFiles(dir: string): MdxEntry[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.mdx$/, ""), frontmatter: data, content };
    });
}

function extractDescription(content: string): string {
  const lines = content.split("\n");
  let desc = "";
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (desc) break;
      continue;
    }
    if (trimmed.startsWith("#")) continue;
    if (trimmed.startsWith("---")) continue;
    if (trimmed.startsWith("|")) continue;
    if (trimmed.startsWith(">")) continue;
    desc += (desc ? " " : "") + trimmed;
    if (desc.length > 200) break;
  }
  desc = desc.replace(/\*\*(.*?)\*\*/g, "$1");
  desc = desc.replace(/\*(.*?)\*/g, "$1");
  desc = desc.replace(/\[(.*?)\]\(.*?\)/g, "$1");
  if (desc.length > 150) {
    desc = desc.slice(0, 147) + "...";
  }
  return desc;
}

function normalizeEdgeKey(a: string, b: string): string {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

function buildEconomicsGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const root = findMonorepoRoot();

  const economistsData = readMdxFiles(path.join(root, "content/economics/economists"));
  const theoriesData = readMdxFiles(path.join(root, "content/economics/theories"));

  const economistSlugToId = new Map<string, string>();
  const allSlugs = new Set<string>();
  for (const e of economistsData) {
    allSlugs.add(e.slug);
    economistSlugToId.set(e.slug, `economics:${e.slug}`);
  }
  for (const t of theoriesData) {
    allSlugs.add(t.slug);
  }

  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const seenEdges = new Set<string>();

  function addEdge(source: string, target: string, type: GraphEdge["type"], label?: string): void {
    if (source === target) return;
    const key = normalizeEdgeKey(source, target);
    if (seenEdges.has(key)) return;
    seenEdges.add(key);
    edges.push({ source, target, type, label });
  }

  for (const e of economistsData) {
    nodes.push({
      id: `economics:${e.slug}`,
      label: e.frontmatter.title as string,
      domain: "economics",
      type: "economist",
      slug: e.slug,
      era: e.frontmatter.era as string | undefined,
      tags: (e.frontmatter.tags as string[]) ?? [],
      description: extractDescription(e.content),
    });
  }

  for (const t of theoriesData) {
    nodes.push({
      id: `economics:${t.slug}`,
      label: t.frontmatter.title as string,
      domain: "economics",
      type: "theory",
      slug: t.slug,
      tags: (t.frontmatter.tags as string[]) ?? [],
      description: extractDescription(t.content),
    });
  }

  for (const e of economistsData) {
    const id = `economics:${e.slug}`;
    for (const ref of (e.frontmatter.related as string[]) ?? []) {
      if (economistSlugToId.has(ref)) {
        addEdge(id, `economics:${ref}`, "cross-reference");
      }
    }
  }

  for (const t of theoriesData) {
    const theoryId = `economics:${t.slug}`;
    for (const ref of (t.frontmatter.relatedEconomists as string[]) ?? []) {
      if (economistSlugToId.has(ref)) {
        addEdge(theoryId, `economics:${ref}`, "hierarchy", "理论贡献者");
      }
    }
  }

  const macroConcepts: GraphNode[] = [
    {
      id: "economics:macro-diagnostics-matrix-guide",
      label: "宏观诊断矩阵读图手册",
      domain: "economics",
      type: "concept",
      slug: "macro-diagnostics-matrix-guide",
      section: "knowledge-base",
      url: "/economics/knowledge-base/macro-diagnostics-matrix-guide",
      tags: ["宏观经济", "国家诊断", "风险", "情景分析"],
      description: "把增长、通胀、财政、债务、外部账户、金融系统和政策情景连成读图框架。",
    },
    {
      id: "economics:modern-money-fiscal-deficits",
      label: "现代货币、财政赤字与通胀约束",
      domain: "economics",
      type: "concept",
      slug: "modern-money-fiscal-deficits",
      section: "concepts",
      url: "/economics/concepts/modern-money-fiscal-deficits",
      tags: ["货币", "财政赤字", "通胀", "宏观政策"],
      description: "解释主权货币、赤字、通胀和财政空间之间的真实约束。",
    },
    {
      id: "economics:expectations-credibility-policy-transmission",
      label: "预期、可信度与政策传导",
      domain: "economics",
      type: "concept",
      slug: "expectations-credibility-policy-transmission",
      section: "concepts",
      url: "/economics/concepts/expectations-credibility-policy-transmission",
      tags: ["预期", "可信度", "政策传导", "通胀"],
      description: "解释政策声明如何通过预期、可信度、公众信任和制度执行进入真实经济行为。",
    },
    {
      id: "economics:debt-sustainability-macro-framework",
      label: "债务可持续性与宏观框架",
      domain: "economics",
      type: "concept",
      slug: "debt-sustainability-macro-framework",
      section: "concepts",
      url: "/economics/concepts/debt-sustainability-macro-framework",
      tags: ["债务可持续性", "财政政策", "利率", "增长"],
      description: "用 r-g、基本财政余额、币种和期限结构分析国家债务风险。",
    },
    {
      id: "economics:country-macro-diagnostics-forecasting",
      label: "国家宏观诊断与经济预测",
      domain: "economics",
      type: "concept",
      slug: "country-macro-diagnostics-forecasting",
      section: "concepts",
      url: "/economics/concepts/country-macro-diagnostics-forecasting",
      tags: ["经济预测", "国家分析", "宏观数据", "情景分析"],
      description: "以增长、通胀、财政、外部账户和金融系统构建可更新的国家宏观判断。",
    },
    {
      id: "economics:bond-market",
      label: "债券市场",
      domain: "economics",
      type: "concept",
      slug: "bond-market",
      section: "concepts",
      url: "/economics/concepts/bond-market",
      tags: ["债券", "利率", "期限结构", "金融市场"],
      description: "解释债券价格、收益率、期限结构和信用风险如何连接宏观政策。",
    },
    {
      id: "economics:real-estate-economics",
      label: "房地产经济学",
      domain: "economics",
      type: "concept",
      slug: "real-estate-economics",
      section: "concepts",
      url: "/economics/concepts/real-estate-economics",
      tags: ["房地产", "抵押品", "信用周期", "城市经济"],
      description: "分析住房、土地、抵押品、地方财政和金融周期之间的关系。",
    },
    {
      id: "economics:environmental-economics",
      label: "环境经济学",
      domain: "economics",
      type: "concept",
      slug: "environmental-economics",
      section: "concepts",
      url: "/economics/concepts/environmental-economics",
      tags: ["环境", "碳定价", "能源转型", "外部性"],
      description: "研究环境外部性、碳价格、能源转型和公共政策的经济机制。",
    },
    {
      id: "economics:labor-economics",
      label: "劳动经济学",
      domain: "economics",
      type: "concept",
      slug: "labor-economics",
      section: "concepts",
      url: "/economics/concepts/labor-economics",
      tags: ["劳动市场", "工资", "就业", "人力资本"],
      description: "研究就业、工资、技能、人力资本和劳动市场制度如何影响增长与分配。",
    },
    {
      id: "economics:poverty-trap",
      label: "贫困陷阱",
      domain: "economics",
      type: "concept",
      slug: "poverty-trap",
      section: "concepts",
      url: "/economics/concepts/poverty-trap",
      tags: ["贫困", "发展经济学", "公共投资", "债务"],
      description: "解释低收入、低投资、低生产率和弱公共品如何相互强化。",
    },
  ];
  nodes.push(...macroConcepts);

  const macroDiagnostics: GraphNode[] = [
    {
      id: "economics:eurozone-crisis",
      label: "欧债危机",
      domain: "economics",
      type: "concept",
      slug: "eurozone-crisis",
      section: "case-studies",
      url: "/economics/case-studies/eurozone-crisis",
      tags: ["欧元区", "财政紧缩", "欧洲央行", "主权债务"],
      description: "欧元区统一货币与分散财政之间的制度矛盾在主权债务危机中爆发。",
    },
    {
      id: "economics:yen-carry-trade",
      label: "日元套利交易",
      domain: "economics",
      type: "concept",
      slug: "yen-carry-trade",
      section: "case-studies",
      url: "/economics/case-studies/yen-carry-trade",
      tags: ["日元", "利差", "套息交易", "汇率"],
      description: "低利率日元如何成为全球套息交易资金来源，并在波动中放大市场压力。",
    },
    {
      id: "economics:us-macro-diagnosis-2026",
      label: "美国宏观经济诊断（2026）",
      domain: "economics",
      type: "concept",
      slug: "us-macro-diagnosis-2026",
      section: "case-studies",
      url: "/economics/case-studies/us-macro-diagnosis-2026",
      tags: ["美国", "宏观经济", "财政赤字", "美元"],
      description: "以增长、通胀、财政、外部账户和金融系统分析美国 2026 年宏观格局。",
    },
    {
      id: "economics:us-fiscal-path-treasury-market-2026",
      label: "美国财政路径与国债市场（2026）",
      domain: "economics",
      type: "concept",
      slug: "us-fiscal-path-treasury-market-2026",
      section: "case-studies",
      url: "/economics/case-studies/us-fiscal-path-treasury-market-2026",
      tags: ["美国", "财政赤字", "国债市场", "利息支出"],
      description: "追踪美国赤字、净利息支出、国债发行结构和期限溢价的宏观含义。",
    },
    {
      id: "economics:china-macro-diagnosis-2026",
      label: "中国宏观经济诊断（2026）",
      domain: "economics",
      type: "concept",
      slug: "china-macro-diagnosis-2026",
      section: "case-studies",
      url: "/economics/case-studies/china-macro-diagnosis-2026",
      tags: ["中国", "房地产", "地方债务", "产业政策"],
      description: "分析房地产调整、低通胀、地方财政和制造业升级之间的宏观再平衡。",
    },
    {
      id: "economics:china-property-local-finance-financial-system-2026",
      label: "中国地产、地方财政与金融系统（2026）",
      domain: "economics",
      type: "concept",
      slug: "china-property-local-finance-financial-system-2026",
      section: "case-studies",
      url: "/economics/case-studies/china-property-local-finance-financial-system-2026",
      tags: ["中国", "房地产", "地方财政", "金融稳定"],
      description: "把地产调整、土地财政、城投债务和银行体系放在同一资产负债表链条中诊断。",
    },
    {
      id: "economics:euro-area-macro-diagnosis-2026",
      label: "欧元区宏观经济诊断（2026）",
      domain: "economics",
      type: "concept",
      slug: "euro-area-macro-diagnosis-2026",
      section: "case-studies",
      url: "/economics/case-studies/euro-area-macro-diagnosis-2026",
      tags: ["欧元区", "欧洲央行", "财政规则", "能源冲击"],
      description: "从共同货币、分散财政、能源冲击和产业竞争力诊断欧元区。",
    },
    {
      id: "economics:euro-area-fiscal-rules-energy-transition-2026",
      label: "欧元区财政规则与能源转型（2026）",
      domain: "economics",
      type: "concept",
      slug: "euro-area-fiscal-rules-energy-transition-2026",
      section: "case-studies",
      url: "/economics/case-studies/euro-area-fiscal-rules-energy-transition-2026",
      tags: ["欧元区", "财政规则", "能源转型", "产业政策"],
      description: "解释欧元区如何在债务纪律、能源安全和绿色投资之间寻找财政空间。",
    },
    {
      id: "economics:japan-macro-diagnosis-2026",
      label: "日本宏观经济诊断（2026）",
      domain: "economics",
      type: "concept",
      slug: "japan-macro-diagnosis-2026",
      section: "case-studies",
      url: "/economics/case-studies/japan-macro-diagnosis-2026",
      tags: ["日本", "日元", "老龄化", "日本央行"],
      description: "把日本作为高收入、低增速、高债务、强外部资产的老龄化先行案例。",
    },
    {
      id: "economics:japan-yield-normalization-aging-fiscal-2026",
      label: "日本收益率正常化与财政老龄化（2026）",
      domain: "economics",
      type: "concept",
      slug: "japan-yield-normalization-aging-fiscal-2026",
      section: "case-studies",
      url: "/economics/case-studies/japan-yield-normalization-aging-fiscal-2026",
      tags: ["日本", "收益率", "老龄化", "日本央行"],
      description: "分析日本从零利率世界走向正利率世界时，工资、国债和老龄化财政如何联动。",
    },
    {
      id: "economics:india-macro-diagnosis-2026",
      label: "印度宏观经济诊断（2026）",
      domain: "economics",
      type: "concept",
      slug: "india-macro-diagnosis-2026",
      section: "case-studies",
      url: "/economics/case-studies/india-macro-diagnosis-2026",
      tags: ["印度", "人口红利", "就业", "卢比"],
      description: "分析印度高增长、就业质量、食品通胀、财政整顿和外部账户。",
    },
    {
      id: "economics:india-growth-employment-constraints-2026",
      label: "印度增长与就业约束（2026）",
      domain: "economics",
      type: "concept",
      slug: "india-growth-employment-constraints-2026",
      section: "case-studies",
      url: "/economics/case-studies/india-growth-employment-constraints-2026",
      tags: ["印度", "就业", "人口红利", "制造业"],
      description: "追问印度高增长能否转化为大规模好工作、税基和城市公共品。",
    },
    {
      id: "economics:commodity-exporters-macro-diagnosis-2026",
      label: "资源出口国宏观经济诊断（2026）",
      domain: "economics",
      type: "concept",
      slug: "commodity-exporters-macro-diagnosis-2026",
      section: "case-studies",
      url: "/economics/case-studies/commodity-exporters-macro-diagnosis-2026",
      tags: ["资源出口国", "大宗商品", "财政规则", "汇率"],
      description: "解释资源周期、财政规则、汇率、主权财富基金和能源转型的宏观影响。",
    },
    {
      id: "economics:commodity-exporters-fiscal-rules-sovereign-wealth-funds-2026",
      label: "资源出口国财政规则与主权财富基金（2026）",
      domain: "economics",
      type: "concept",
      slug: "commodity-exporters-fiscal-rules-sovereign-wealth-funds-2026",
      section: "case-studies",
      url: "/economics/case-studies/commodity-exporters-fiscal-rules-sovereign-wealth-funds-2026",
      tags: ["资源出口国", "财政规则", "主权财富基金", "大宗商品"],
      description: "解释资源收入如何通过财政规则和主权财富基金转化为稳定公共能力。",
    },
    {
      id: "economics:low-income-debt-countries-macro-diagnosis-2026",
      label: "低收入债务国宏观经济诊断（2026）",
      domain: "economics",
      type: "concept",
      slug: "low-income-debt-countries-macro-diagnosis-2026",
      section: "case-studies",
      url: "/economics/case-studies/low-income-debt-countries-macro-diagnosis-2026",
      tags: ["低收入国家", "债务", "外汇", "气候风险"],
      description: "把债务重组、发展融资、外汇约束和气候冲击纳入低收入国家诊断。",
    },
    {
      id: "economics:low-income-debt-restructuring-development-finance-2026",
      label: "低收入债务国债务重组与发展融资（2026）",
      domain: "economics",
      type: "concept",
      slug: "low-income-debt-restructuring-development-finance-2026",
      section: "case-studies",
      url: "/economics/case-studies/low-income-debt-restructuring-development-finance-2026",
      tags: ["低收入国家", "债务重组", "发展融资", "外币债务"],
      description: "分析低收入债务国如何在重组、优惠融资、税收能力和公共投资之间重建增长空间。",
    },
  ];
  nodes.push(...macroDiagnostics);
  addEdge(
    "economics:modern-money-fiscal-deficits",
    "economics:expectations-credibility-policy-transmission",
    "cross-reference",
    "赤字承诺影响预期"
  );
  addEdge(
    "economics:expectations-credibility-policy-transmission",
    "economics:debt-sustainability-macro-framework",
    "cross-reference",
    "可信度进入债务动态"
  );
  addEdge(
    "economics:expectations-credibility-policy-transmission",
    "economics:country-macro-diagnostics-forecasting",
    "cross-reference",
    "预期变量进入国家诊断"
  );
  addEdge(
    "economics:expectations-credibility-policy-transmission",
    "psychology:inflation-expectations-and-trust",
    "domain-link",
    "公众预期与信任"
  );
  addEdge(
    "economics:expectations-credibility-policy-transmission",
    "political-science:central-bank-communication-public-understanding",
    "domain-link",
    "沟通塑造政策可信度"
  );
  addEdge(
    "economics:debt-sustainability-macro-framework",
    "economics:country-macro-diagnostics-forecasting",
    "cross-reference",
    "成为国家诊断框架"
  );
  addEdge(
    "economics:country-macro-diagnostics-forecasting",
    "economics:macro-diagnostics-matrix-guide",
    "cross-reference",
    "可视化读图方法"
  );
  addEdge(
    "economics:macro-diagnostics-matrix-guide",
    "psychology:inflation-psychology",
    "domain-link",
    "通胀进入预期"
  );
  addEdge(
    "economics:macro-diagnostics-matrix-guide",
    "political-science:fiscal-state",
    "domain-link",
    "财政能力决定政策空间"
  );
  addEdge(
    "economics:modern-money-fiscal-deficits",
    "economics:keynesian-economics",
    "cross-reference",
    "财政政策传统"
  );
  addEdge(
    "economics:debt-sustainability-macro-framework",
    "economics:latin-american-structuralism-dependency",
    "cross-reference",
    "外部约束与债务"
  );
  addEdge(
    "economics:african-development-economics",
    "economics:indian-institutional-economics",
    "cross-reference",
    "全球南方发展比较"
  );
  addEdge(
    "economics:african-development-economics",
    "sociology:global-south-sociology",
    "domain-link",
    "全球南方知识生产"
  );
  addEdge(
    "economics:african-development-economics",
    "political-science:postcolonial-state-building",
    "domain-link",
    "发展依赖国家能力"
  );
  addEdge(
    "economics:indian-institutional-economics",
    "philosophy:modern-chinese-thought",
    "domain-link",
    "非西方现代化比较"
  );
  for (const node of macroDiagnostics) {
    addEdge(
      "economics:country-macro-diagnostics-forecasting",
      node.id,
      "cross-reference",
      "应用诊断框架"
    );
  }
  addEdge(
    "economics:us-macro-diagnosis-2026",
    "economics:modern-money-fiscal-deficits",
    "cross-reference",
    "美元财政空间"
  );
  addEdge(
    "economics:us-macro-diagnosis-2026",
    "economics:us-fiscal-path-treasury-market-2026",
    "cross-reference",
    "财政与国债市场深挖"
  );
  addEdge(
    "economics:us-fiscal-path-treasury-market-2026",
    "economics:bond-market",
    "cross-reference",
    "国债市场结构"
  );
  addEdge(
    "economics:china-macro-diagnosis-2026",
    "economics:debt-sustainability-macro-framework",
    "cross-reference",
    "地方债务与资产负债表"
  );
  addEdge(
    "economics:china-macro-diagnosis-2026",
    "economics:china-property-local-finance-financial-system-2026",
    "cross-reference",
    "地产财政金融链条"
  );
  addEdge(
    "economics:china-property-local-finance-financial-system-2026",
    "economics:real-estate-economics",
    "cross-reference",
    "房地产资产负债表"
  );
  addEdge(
    "economics:euro-area-macro-diagnosis-2026",
    "economics:eurozone-crisis",
    "cross-reference",
    "货币联盟遗产"
  );
  addEdge(
    "economics:euro-area-macro-diagnosis-2026",
    "economics:euro-area-fiscal-rules-energy-transition-2026",
    "cross-reference",
    "财政规则与能源投资"
  );
  addEdge(
    "economics:euro-area-fiscal-rules-energy-transition-2026",
    "economics:environmental-economics",
    "cross-reference",
    "绿色转型经济学"
  );
  addEdge(
    "economics:japan-macro-diagnosis-2026",
    "economics:yen-carry-trade",
    "cross-reference",
    "日元与利差"
  );
  addEdge(
    "economics:japan-macro-diagnosis-2026",
    "economics:japan-yield-normalization-aging-fiscal-2026",
    "cross-reference",
    "正常化与老龄化财政"
  );
  addEdge(
    "economics:japan-yield-normalization-aging-fiscal-2026",
    "economics:bond-market",
    "cross-reference",
    "国债收益率再定价"
  );
  addEdge(
    "economics:india-macro-diagnosis-2026",
    "economics:indian-institutional-economics",
    "cross-reference",
    "制度与增长质量"
  );
  addEdge(
    "economics:india-macro-diagnosis-2026",
    "economics:india-growth-employment-constraints-2026",
    "cross-reference",
    "增长转化为就业"
  );
  addEdge(
    "economics:india-growth-employment-constraints-2026",
    "economics:labor-economics",
    "cross-reference",
    "就业质量与工资"
  );
  addEdge(
    "economics:commodity-exporters-macro-diagnosis-2026",
    "economics:african-development-economics",
    "cross-reference",
    "资源与结构转型"
  );
  addEdge(
    "economics:commodity-exporters-macro-diagnosis-2026",
    "economics:commodity-exporters-fiscal-rules-sovereign-wealth-funds-2026",
    "cross-reference",
    "资源财政制度"
  );
  addEdge(
    "economics:commodity-exporters-fiscal-rules-sovereign-wealth-funds-2026",
    "economics:environmental-economics",
    "cross-reference",
    "能源转型改变资源租金"
  );
  addEdge(
    "economics:low-income-debt-countries-macro-diagnosis-2026",
    "economics:debt-sustainability-macro-framework",
    "cross-reference",
    "债务可持续性"
  );
  addEdge(
    "economics:low-income-debt-countries-macro-diagnosis-2026",
    "economics:low-income-debt-restructuring-development-finance-2026",
    "cross-reference",
    "重组与发展融资"
  );
  addEdge(
    "economics:low-income-debt-restructuring-development-finance-2026",
    "economics:poverty-trap",
    "cross-reference",
    "债务服务挤压公共投资"
  );

  const eraGroups = new Map<string, string[]>();
  for (const e of economistsData) {
    const era = e.frontmatter.era as string | undefined;
    if (!era) continue;
    if (!eraGroups.has(era)) eraGroups.set(era, []);
    eraGroups.get(era)!.push(e.slug);
  }
  for (const slugs of eraGroups.values()) {
    slugs.sort();
    for (let i = 0; i < slugs.length - 1; i++) {
      addEdge(`economics:${slugs[i]!}`, `economics:${slugs[i + 1]!}`, "temporal", "同时代");
    }
  }

  return { nodes, edges };
}

const graph = buildEconomicsGraph();
export const economicsNodes: GraphNode[] = graph.nodes;
export const economicsEdges: GraphEdge[] = graph.edges;
