import type { KnowledgeDomainId } from "./knowledge-continuum";
import type { KnowledgeLevel } from "./knowledge-levels";

/**
 * 工程与技术（engineering）发布计划——linguistics/law/arts 模式的第四次应用。
 * 候选条目：lib/subject-candidate-matrix.ts 的 engineering。
 * 内容纪律（launchGate）：docs/工程内容边界与安全规范.md（军民两用边界 +
 * 工程安全提示 + 数据时效 as_of）。
 */

export type EngArticlePlan = {
  slug: string;
  title: string;
  level: KnowledgeLevel;
  bridgeDomains: readonly KnowledgeDomainId[];
};

export type EngSectionPlan = {
  id: string;
  label: string;
  articles: readonly EngArticlePlan[];
};

export type EngReleaseWave = {
  id: string;
  label: string;
  articleSlugs: readonly string[];
};

export const ENGINEERING_SECTIONS: readonly EngSectionPlan[] = [
  {
    id: "foundations",
    label: "工程基础",
    articles: [
      {
        slug: "simple-machines",
        title: "简单机械：杠杆、轮轴与斜面",
        level: 1,
        bridgeDomains: ["universe-physics", "human-history"],
      },
      {
        slug: "steam-and-engines",
        title: "蒸汽机与热机：把热变成功",
        level: 1,
        bridgeDomains: ["universe-physics", "human-history"],
      },
      {
        slug: "electricity-and-motors",
        title: "电与电动机",
        level: 1,
        bridgeDomains: ["universe-physics", "chemistry"],
      },
      {
        slug: "measurement-and-tolerance",
        title: "测量与公差：精密的代价",
        level: 2,
        bridgeDomains: ["mathematics", "universe-physics"],
      },
      {
        slug: "materials-strength",
        title: "材料强度：钢、混凝土与复合材料",
        level: 2,
        bridgeDomains: ["chemistry", "earth-science"],
      },
      {
        slug: "control-and-feedback",
        title: "控制与反馈：从恒温器到自动驾驶仪",
        level: 2,
        bridgeDomains: ["mathematics", "computer-science"],
      },
    ],
  },
  {
    id: "energy",
    label: "能源与动力",
    articles: [
      {
        slug: "power-grid",
        title: "电网：最大的实时平衡系统",
        level: 2,
        bridgeDomains: ["economics", "mathematics"],
      },
      {
        slug: "thermal-power",
        title: "火电：蒸汽循环的百年优化",
        level: 2,
        bridgeDomains: ["chemistry", "earth-science"],
      },
      {
        slug: "hydro-power",
        title: "水电与大坝工程",
        level: 2,
        bridgeDomains: ["earth-science", "economics"],
      },
      {
        slug: "nuclear-power",
        title: "核电：临界、冷却与安全壳",
        level: 3,
        bridgeDomains: ["universe-physics", "chemistry"],
      },
      {
        slug: "solar-and-wind",
        title: "光伏与风电：间歇性的工程解法",
        level: 3,
        bridgeDomains: ["universe-physics", "earth-science"],
      },
      {
        slug: "energy-storage",
        title: "储能：电池、抽蓄与氢",
        level: 3,
        bridgeDomains: ["chemistry", "economics"],
      },
      {
        slug: "geothermal-and-tidal",
        title: "地热与潮汐：小众但稳定的能源",
        level: 3,
        bridgeDomains: ["earth-science", "universe-physics"],
      },
    ],
  },
  {
    id: "materials",
    label: "材料与制造",
    articles: [
      {
        slug: "steel-and-alloys",
        title: "钢铁：从贝塞麦到特种合金",
        level: 2,
        bridgeDomains: ["chemistry", "human-history"],
      },
      {
        slug: "concrete-engineering",
        title: "混凝土工程：罗马人的遗产",
        level: 2,
        bridgeDomains: ["chemistry", "earth-science"],
      },
      {
        slug: "semiconductor-manufacturing",
        title: "芯片制造：光刻与洁净室",
        level: 3,
        bridgeDomains: ["chemistry", "computer-science"],
      },
      {
        slug: "additive-manufacturing",
        title: "增材制造：3D 打印能做什么",
        level: 3,
        bridgeDomains: ["computer-science", "chemistry"],
      },
      {
        slug: "supply-chains",
        title: "供应链：全球制造的隐形骨架",
        level: 3,
        bridgeDomains: ["economics", "sociology"],
      },
    ],
  },
  {
    id: "machines",
    label: "信息与机器",
    articles: [
      {
        slug: "engines-and-turbines",
        title: "内燃机与燃气轮机",
        level: 2,
        bridgeDomains: ["universe-physics", "chemistry"],
      },
      {
        slug: "aviation-engineering",
        title: "航空工程：机翼、推重比与适航",
        level: 3,
        bridgeDomains: ["universe-physics", "mathematics"],
      },
      {
        slug: "computing-hardware",
        title: "计算硬件：从晶体管到 SoC",
        level: 2,
        bridgeDomains: ["computer-science", "universe-physics"],
      },
      {
        slug: "robotics-systems",
        title: "机器人系统：感知、规划与执行",
        level: 3,
        bridgeDomains: ["computer-science", "mathematics"],
      },
      {
        slug: "automation-and-industry",
        title: "自动化与工业 4.0",
        level: 3,
        bridgeDomains: ["computer-science", "economics"],
      },
      {
        slug: "space-engineering",
        title: "航天工程：入轨、对接与回收",
        level: 4,
        bridgeDomains: ["universe-physics", "computer-science"],
      },
    ],
  },
  {
    id: "civil",
    label: "土木与建造",
    articles: [
      {
        slug: "bridges",
        title: "桥梁：受力路径与美学",
        level: 2,
        bridgeDomains: ["universe-physics", "arts"],
      },
      {
        slug: "skyscrapers",
        title: "摩天楼：抗风、抗震与垂直交通",
        level: 3,
        bridgeDomains: ["universe-physics", "earth-science"],
      },
      {
        slug: "tunnels-and-metro",
        title: "隧道与地铁：地下工程",
        level: 3,
        bridgeDomains: ["earth-science", "economics"],
      },
      {
        slug: "high-speed-rail",
        title: "高速铁路工程：轨道、受流与系统集成",
        level: 3,
        bridgeDomains: ["earth-science", "economics"],
      },
      {
        slug: "water-systems",
        title: "供水与排水：城市的隐形系统",
        level: 3,
        bridgeDomains: ["medicine", "earth-science"],
      },
      {
        slug: "resilient-infrastructure",
        title: "韧性基础设施：为最坏情况设计",
        level: 4,
        bridgeDomains: ["earth-science", "political-science"],
      },
    ],
  },
  {
    id: "frontiers",
    label: "重大工程与伦理",
    articles: [
      {
        slug: "failure-analysis",
        title: "失效分析：事故调查如何改进工程",
        level: 4,
        bridgeDomains: ["universe-physics", "sociology"],
      },
      {
        slug: "safety-engineering",
        title: "安全工程：冗余、联锁与人因",
        level: 4,
        bridgeDomains: ["psychology", "medicine"],
      },
      {
        slug: "engineering-ethics",
        title: "工程伦理：挑战者号与专业责任",
        level: 4,
        bridgeDomains: ["philosophy", "law"],
      },
      {
        slug: "energy-transition-engineering",
        title: "能源转型的工程现实",
        level: 5,
        bridgeDomains: ["earth-science", "economics"],
      },
      {
        slug: "megaprojects",
        title: "超级工程：成本超支与风险政治",
        level: 5,
        bridgeDomains: ["economics", "political-science"],
      },
      {
        slug: "bioengineering-boundaries",
        title: "生物工程的边界：义肢、器官与合成生物",
        level: 5,
        bridgeDomains: ["medicine", "philosophy"],
      },
    ],
  },
] as const;

export const ALL_ENGINEERING_ARTICLES = ENGINEERING_SECTIONS.flatMap((section) => section.articles);

export const ENGINEERING_RELEASE_WAVES: readonly EngReleaseWave[] = [
  {
    id: "foundations",
    label: "L1–L2 机械、能量与材料基础",
    articleSlugs: ALL_ENGINEERING_ARTICLES.filter((article) => article.level <= 2).map(
      (article) => article.slug
    ),
  },
  {
    id: "systems",
    label: "L3 系统与基础设施",
    articleSlugs: [
      "nuclear-power",
      "solar-and-wind",
      "energy-storage",
      "semiconductor-manufacturing",
      "additive-manufacturing",
      "supply-chains",
      "geothermal-and-tidal",
      "aviation-engineering",
      "robotics-systems",
      "automation-and-industry",
      "skyscrapers",
      "tunnels-and-metro",
      "high-speed-rail",
      "water-systems",
    ],
  },
  {
    id: "frontiers",
    label: "L4–L5 设计、安全与前沿",
    articleSlugs: [
      "space-engineering",
      "resilient-infrastructure",
      "failure-analysis",
      "safety-engineering",
      "engineering-ethics",
      "energy-transition-engineering",
      "megaprojects",
      "bioengineering-boundaries",
    ],
  },
] as const;

export const RELEASED_ENGINEERING_ARTICLES = ENGINEERING_RELEASE_WAVES.flatMap(
  (wave) => wave.articleSlugs
).map((slug) => ALL_ENGINEERING_ARTICLES.find((article) => article.slug === slug)!);

export const ENGINEERING_VISUALIZATIONS = [
  {
    id: "grid-flow-simulator",
    label: "电网潮流模拟器",
    prerequisiteSlugs: ["power-grid", "solar-and-wind"],
  },
  {
    id: "structure-load-lab",
    label: "结构受力实验室",
    prerequisiteSlugs: ["bridges", "materials-strength"],
  },
  {
    id: "materials-profile",
    label: "材料性能剖面",
    prerequisiteSlugs: ["steel-and-alloys", "concrete-engineering"],
  },
  {
    id: "chip-process-flow",
    label: "芯片制造流程图",
    prerequisiteSlugs: ["semiconductor-manufacturing"],
  },
] as const;

export const ENGINEERING_GLOBAL_COVERAGE = [
  "中国工程传统与现代基建",
  "欧洲工业遗产",
  "北美技术体系",
  "日本精密制造",
  "印度与南亚工程",
  "非洲基础设施",
  "拉美能源",
] as const;
