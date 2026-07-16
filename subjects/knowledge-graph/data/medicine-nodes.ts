import type { GraphNode, GraphEdge } from "./types";
import { MEDICINE_COVERAGE_EDGES, MEDICINE_COVERAGE_NODES } from "./medicine-coverage";

const n = (
  slug: string,
  label: string,
  type: GraphNode["type"],
  section: string,
  description: string,
  tags: string[]
): GraphNode => ({
  id: `medicine:${slug}`,
  label,
  domain: "medicine",
  type,
  slug,
  section,
  url: `/medicine/${section}/${slug}`,
  tags,
  description,
});

export const MEDICINE_NODES: GraphNode[] = [
  // ── figures ───────────────────────────────────────────────
  n("hippocrates", "希波克拉底", "figure", "figures", "西方医学之父，把疾病从神谴拉回自然原因。", [
    "医学之父",
    "希波克拉底誓言",
  ]),
  n("vesalius", "维萨里", "figure", "figures", "《人体的构造》纠正盖伦，开创近代解剖学。", [
    "解剖学",
    "人体构造",
  ]),
  n("william-harvey", "威廉·哈维", "figure", "figures", "用实验证明血液循环，奠定实验生理学。", [
    "血液循环",
    "生理学",
  ]),
  n("edward-jenner", "爱德华·詹纳", "figure", "figures", "牛痘接种，疫苗学的开端。", [
    "牛痘",
    "疫苗",
  ]),
  n("louis-pasteur", "路易·巴斯德", "figure", "figures", "细菌致病论、巴氏消毒、狂犬病疫苗。", [
    "细菌学",
    "巴氏消毒",
  ]),
  n("robert-koch", "罗伯特·科赫", "figure", "figures", "科赫法则与结核杆菌，细菌学奠基。", [
    "科赫法则",
    "结核杆菌",
  ]),
  n("alexander-fleming", "弗莱明", "figure", "figures", "发现青霉素，开启抗生素时代。", [
    "青霉素",
    "抗生素",
  ]),
  n("tu-youyou", "屠呦呦", "figure", "figures", "从古方提取青蒿素，挽救数百万疟疾患者。", [
    "青蒿素",
    "诺贝尔奖",
  ]),

  // ── diseases ──────────────────────────────────────────────
  n("plague", "鼠疫", "disease", "diseases", "黑死病，由鼠疫耶尔森菌引起的三次大流行。", [
    "黑死病",
    "鼠疫杆菌",
  ]),
  n("smallpox", "天花", "disease", "diseases", "人类唯一根除的传染病。", ["天花", "根除"]),
  n("cholera", "霍乱", "disease", "diseases", "霍乱弧菌经水传播，催生了流行病学。", [
    "霍乱弧菌",
    "水传播",
  ]),
  n("tuberculosis", "结核病", "disease", "diseases", "「白色瘟疫」，耐药结核仍是全球威胁。", [
    "结核",
    "耐药",
  ]),
  n("malaria", "疟疾", "disease", "diseases", "疟原虫经按蚊传播，全球负担沉重。", [
    "疟原虫",
    "按蚊",
  ]),
  n("hiv-aids", "艾滋病", "disease", "diseases", "HIV 攻击免疫系统，ART 把绝症变慢病。", [
    "HIV",
    "抗逆转录病毒",
  ]),
  n("covid-19", "COVID-19", "disease", "diseases", "SARS-CoV-2 大流行，mRNA 疫苗的首秀。", [
    "SARS-CoV-2",
    "大流行",
  ]),
  n("cancer", "癌症", "disease", "diseases", "并非单一疾病：细胞失控增殖的体细胞演化。", [
    "肿瘤",
    "突变",
  ]),

  // ── concepts ──────────────────────────────────────────────
  n("germ-theory", "细菌致病论", "concept", "concepts", "疾病由微生物引起，取代瘴气说。", [
    "病原体",
    "瘴气说",
  ]),
  n("immune-system", "免疫系统", "concept", "concepts", "先天与适应性免疫，身体的防御网络。", [
    "免疫",
    "抗体",
  ]),
  n(
    "evidence-based-medicine",
    "循证医学",
    "concept",
    "concepts",
    "用随机对照试验与系统综述取代经验直觉。",
    ["RCT", "证据等级"]
  ),
  n("epidemiology", "流行病学", "concept", "concepts", "研究疾病的分布与决定因素，关联≠因果。", [
    "队列研究",
    "因果",
  ]),
  n(
    "public-health",
    "公共卫生",
    "concept",
    "concepts",
    "以有组织的社会行动预防疾病并促进人群健康。",
    ["预防", "人群健康"]
  ),
  n(
    "antibiotic-resistance",
    "抗生素耐药性",
    "concept",
    "concepts",
    "滥用施加选择压力，催生超级细菌。",
    ["耐药", "超级细菌"]
  ),
  n("vaccination", "疫苗原理", "concept", "concepts", "训练免疫记忆，建立群体免疫。", [
    "免疫记忆",
    "群体免疫",
  ]),

  // ── public health and health systems ─────────────────────
  n(
    "burden-of-disease-daly-qaly",
    "疾病负担、DALY 与 QALY",
    "concept",
    "public-health",
    "用早逝与带病生存衡量健康损失，并辨析资源配置中的效率与公平。",
    ["疾病负担", "DALY", "QALY"]
  ),
  n(
    "health-economic-evaluation-priority-setting",
    "卫生经济学与优先排序",
    "concept",
    "public-health",
    "把成本效果、预算影响、公平、严重度与实施能力放进可说明的福利包决策。",
    ["成本效果", "预算影响", "健康公平", "优先排序"]
  ),
  n(
    "health-systems-universal-health-coverage",
    "卫生系统与全民健康覆盖",
    "concept",
    "public-health",
    "从人口、服务和费用三条轴理解有效覆盖、财务保护与系统能力。",
    ["卫生系统", "UHC", "财务保护"]
  ),
  n(
    "infectious-disease-modeling-surveillance",
    "传染病建模与监测",
    "concept",
    "public-health",
    "把数据生成、传播模型、情景推演和公共卫生情报连成决策链。",
    ["传染病模型", "疫情监测", "公共卫生情报"]
  ),
  n(
    "implementation-science-health-policy",
    "实施科学",
    "concept",
    "public-health",
    "研究有效干预如何在真实卫生系统中被采用、适配、扩展和持续。",
    ["实施科学", "真实世界", "政策转化"]
  ),
  n(
    "global-health-inequality-coloniality",
    "全球健康不平等与殖民性",
    "concept",
    "public-health",
    "追问健康差距背后的社会决定因素、资源流动和知识生产权力。",
    ["健康公平", "全球健康", "殖民性"]
  ),
  n(
    "environmental-occupational-health",
    "环境与职业健康",
    "concept",
    "public-health",
    "从暴露路径、控制层级、气候风险和环境正义理解上游预防。",
    ["环境健康", "职业健康", "气候健康"]
  ),
  n(
    "maternal-child-health-life-course",
    "妇幼健康与生命周期",
    "concept",
    "public-health",
    "以三延误、连续照护和生命早期发展理解妇幼健康权利。",
    ["妇幼健康", "生命周期", "连续照护"]
  ),
  n(
    "vaccine-policy-programs-hesitancy",
    "疫苗政策与接种行为",
    "concept",
    "public-health",
    "把疫苗效果、项目能力、行为社会驱动、安全监测和公平覆盖共同评价。",
    ["疫苗政策", "BeSD", "接种行为"]
  ),
  {
    ...n(
      "fair-health-priority-setting",
      "公平卫生优先排序前沿",
      "concept",
      "frontier",
      "在效果、预算、公平、严重度与实施约束之间形成可说明、可复核的卫生资源组合。",
      ["卫生优先排序", "健康公平", "预算约束", "决策问责"]
    ),
    url: "/medicine/frontier/fair-health-priority-setting",
  },

  // ── technologies ──────────────────────────────────────────
  n("anesthesia", "麻醉", "technology", "technologies", "乙醚带来无痛手术，外科从此改写。", [
    "乙醚",
    "无痛手术",
  ]),
  n(
    "antisepsis",
    "无菌术",
    "technology",
    "technologies",
    "李斯特用石炭酸把手术从坏疽中拯救出来。",
    ["李斯特", "石炭酸"]
  ),
  n(
    "x-ray-imaging",
    "X 射线影像",
    "technology",
    "technologies",
    "伦琴的射线让人类第一次看透身体。",
    ["伦琴", "影像"]
  ),
  n("antibiotics", "抗生素", "technology", "technologies", "青霉素量产，感染不再是死刑。", [
    "青霉素",
    "链霉素",
  ]),
  n("mrna-vaccine", "mRNA 疫苗", "technology", "technologies", "脂质纳米颗粒递送，疫苗研发提速。", [
    "mRNA",
    "脂质纳米颗粒",
  ]),

  // ── events ────────────────────────────────────────────────
  n(
    "jenner-smallpox-vaccination",
    "詹纳牛痘接种（1796）",
    "event",
    "events",
    "第一支疫苗，预防医学的起点。",
    ["疫苗", "1796"]
  ),
  n(
    "snow-cholera-broad-street",
    "斯诺与宽街水泵（1854）",
    "event",
    "events",
    "移除泵柄，流行病学的奠基传奇。",
    ["斯诺", "流行病学"]
  ),
  n("smallpox-eradication", "天花根除（1980）", "event", "events", "人类唯一彻底消灭的传染病。", [
    "WHO",
    "根除",
  ]),
  n(
    "tuskegee-syphilis-study",
    "塔斯基吉梅毒研究",
    "event",
    "events",
    "研究伦理的黑暗篇，催生知情同意制度。",
    ["研究伦理", "知情同意"]
  ),
  n(
    "covid-19-pandemic",
    "COVID-19 大流行（2020）",
    "event",
    "events",
    "封锁、疫苗竞赛与全球不平等的大考。",
    ["大流行", "2020"]
  ),
  ...MEDICINE_COVERAGE_NODES,
];

const e = (from: string, to: string, label: string): GraphEdge => ({
  source: `medicine:${from}`,
  target: `medicine:${to}`,
  type: "cross-reference",
  label,
});

export const MEDICINE_EDGES: GraphEdge[] = [
  // figures → contributions
  e("edward-jenner", "vaccination", "开创"),
  e("edward-jenner", "smallpox", "对抗"),
  e("edward-jenner", "jenner-smallpox-vaccination", "完成"),
  e("louis-pasteur", "germ-theory", "确立"),
  e("robert-koch", "germ-theory", "确立"),
  e("robert-koch", "tuberculosis", "发现病原"),
  e("alexander-fleming", "antibiotics", "发现"),
  e("alexander-fleming", "antibiotic-resistance", "其阴影"),
  e("tu-youyou", "malaria", "攻克"),
  e("william-harvey", "immune-system", "生理学传统"),
  // disease ↔ concept/tech
  e("germ-theory", "antisepsis", "催生"),
  e("germ-theory", "vaccination", "支撑"),
  e("cholera", "epidemiology", "催生"),
  e("snow-cholera-broad-street", "cholera", "追踪"),
  e("snow-cholera-broad-street", "epidemiology", "奠基"),
  e("immune-system", "vaccination", "原理基础"),
  e("immune-system", "hiv-aids", "被其攻击"),
  e("antibiotics", "antibiotic-resistance", "引发"),
  e("antibiotics", "tuberculosis", "治疗"),
  e("vaccination", "smallpox-eradication", "实现"),
  e("smallpox", "smallpox-eradication", "被根除"),
  e("covid-19", "covid-19-pandemic", "引发"),
  e("covid-19", "mrna-vaccine", "催生应用"),
  e("vaccination", "mrna-vaccine", "新形态"),
  e("evidence-based-medicine", "epidemiology", "方法相通"),
  e("tuskegee-syphilis-study", "evidence-based-medicine", "伦理教训"),
  e("anesthesia", "antisepsis", "共同成就外科"),
  e("cancer", "evidence-based-medicine", "临床试验密集"),
  // public health evidence → systems → implementation → equity
  e("epidemiology", "burden-of-disease-daly-qaly", "测量人群损失"),
  e("burden-of-disease-daly-qaly", "health-economic-evaluation-priority-setting", "形成比较尺度"),
  e(
    "health-economic-evaluation-priority-setting",
    "health-systems-universal-health-coverage",
    "界定福利包"
  ),
  e(
    "health-economic-evaluation-priority-setting",
    "implementation-science-health-policy",
    "检验可交付性"
  ),
  e("burden-of-disease-daly-qaly", "health-systems-universal-health-coverage", "设定覆盖优先级"),
  e(
    "health-systems-universal-health-coverage",
    "implementation-science-health-policy",
    "落实制度设计"
  ),
  e(
    "implementation-science-health-policy",
    "global-health-inequality-coloniality",
    "检验触达与公平"
  ),
  e("global-health-inequality-coloniality", "environmental-occupational-health", "揭示暴露分配"),
  e("environmental-occupational-health", "maternal-child-health-life-course", "塑造早期健康"),
  e("maternal-child-health-life-course", "vaccine-policy-programs-hesitancy", "连接生命周期免疫"),
  e(
    "infectious-disease-modeling-surveillance",
    "vaccine-policy-programs-hesitancy",
    "指导项目行动"
  ),
  e("epidemiology", "infectious-disease-modeling-surveillance", "提供监测与推断基础"),
  e("vaccination", "vaccine-policy-programs-hesitancy", "从免疫原理到项目"),
  e("public-health", "health-systems-universal-health-coverage", "从人群预防到制度供给"),
  e(
    "health-economic-evaluation-priority-setting",
    "fair-health-priority-setting",
    "从评价工具到可复核组合"
  ),
  e("implementation-science-health-policy", "fair-health-priority-setting", "检验真实交付约束"),

  // ── cross-domain bridges (verified existing node ids) ──
  {
    source: "medicine:antibiotic-resistance",
    target: "lifescience:darwin",
    type: "domain-link",
    label: "自然选择实时上演",
  },
  {
    source: "medicine:epidemiology",
    target: "mathematics:probability",
    type: "domain-link",
    label: "疾病建模与统计",
  },
  {
    source: "medicine:hiv-aids",
    target: "lifescience:darwin",
    type: "domain-link",
    label: "病毒快速演化",
  },
  {
    source: "medicine:burden-of-disease-daly-qaly",
    target: "mathematics:probability",
    type: "domain-link",
    label: "量化不确定性",
  },
  {
    source: "medicine:health-economic-evaluation-priority-setting",
    target: "economics:market-failures",
    type: "domain-link",
    label: "公共品与资源配置",
  },
  {
    source: "medicine:health-systems-universal-health-coverage",
    target: "political-science:state-capacity",
    type: "domain-link",
    label: "公共服务能力",
  },
  {
    source: "medicine:health-systems-universal-health-coverage",
    target: "political-science:budget-governance",
    type: "domain-link",
    label: "卫生预算与问责",
  },
  {
    source: "medicine:global-health-inequality-coloniality",
    target: "sociology:social-stratification",
    type: "domain-link",
    label: "健康的社会梯度",
  },
  {
    source: "medicine:environmental-occupational-health",
    target: "sociology:urban-climate-adaptation",
    type: "domain-link",
    label: "气候暴露与适应正义",
  },
  {
    source: "medicine:maternal-child-health-life-course",
    target: "sociology:family-and-kinship",
    type: "domain-link",
    label: "照护与生命周期",
  },
  ...MEDICINE_COVERAGE_EDGES,
];
