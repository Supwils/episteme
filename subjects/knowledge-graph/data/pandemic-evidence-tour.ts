import type { ThoughtTour } from "./thought-tours";

export const PANDEMIC_EVIDENCE_TOUR: ThoughtTour = {
  id: "from-outbreak-data-to-public-health-action",
  title: "从疫情数据到公共卫生行动",
  subtitle: "分母、反事实、风险感知、国家能力与全球干预如何组成可审计的证据链",
  waypoints: [
    "medicine:epidemiology",
    "medicine:influenza",
    "medicine:covid-19-pandemic",
    "medicine:infectious-disease-modeling-surveillance",
    "psychology:risk-perception-and-macro-decisions",
    "political-science:state-capacity",
    "medicine:vaccine-policy-programs-hesitancy",
    "medicine:smallpox-eradication",
    "medicine:antibiotic-era",
    "medicine:antibiotic-resistance",
  ],
  steps: [
    {
      nodeId: "medicine:epidemiology",
      title: "先问病例是怎样进入数据的",
      summary:
        "病例定义、检测、就医、报告和延迟共同决定分子与分母；确诊数不是感染的透明窗口，比较前必须重建数据生成过程。",
      focus: "数据生成",
    },
    {
      nodeId: "medicine:influenza",
      title: "季节性负担依赖监测与模型",
      summary:
        "流感死亡常发生在病毒检测窗口之后，负担估计需要从哨点住院、检测漏失和院外死亡逐层外推，而不是只数死亡证明。",
      focus: "负担分母",
    },
    {
      nodeId: "medicine:covid-19-pandemic",
      title: "新发疫情迫使决策进入反事实",
      summary:
        "病例死亡、感染死亡和超额死亡使用不同分母；政策效果还必须说明若未干预会怎样，以及教育、收入和心理代价由谁承担。",
      focus: "政策反事实",
    },
    {
      nodeId: "medicine:infectious-disease-modeling-surveillance",
      title: "模型把观测转成情景而不是预言",
      summary:
        "传播模型连接接触、免疫、医疗容量与行为反馈，输出依赖参数和结构假设，应以情景区间持续接受新数据校准。",
      focus: "情景推演",
    },
    {
      nodeId: "psychology:risk-perception-and-macro-decisions",
      title: "同一风险数字会被不同方式感知",
      summary:
        "可得性、恐惧、身份认同和信任影响个人如何理解概率，也会改变检测、接种、消费与遵从，使行为反过来改变疫情曲线。",
      focus: "风险感知",
    },
    {
      nodeId: "political-science:state-capacity",
      title: "发布政策不等于具备执行能力",
      summary:
        "实验室、基层人员、供应链、财政补偿和可信沟通决定措施能否落地；能力不足会把纸面规则转成不平等的实际负担。",
      focus: "国家能力",
    },
    {
      nodeId: "medicine:vaccine-policy-programs-hesitancy",
      title: "疫苗效力必须穿过交付系统",
      summary:
        "随机试验中的生物学效力只是起点，真实影响还取决于目标人群、剂次、可及性、安全监测、接种信任与公平覆盖。",
      focus: "项目效果",
    },
    {
      nodeId: "medicine:smallpox-eradication",
      title: "根除来自组合系统而非单一战术",
      summary:
        "普遍或大规模接种建立免疫基础，主动搜索、隔离和环形接种切断残余链条，独立认证再验证全球传播确已归零。",
      focus: "根除归因",
    },
    {
      nodeId: "medicine:antibiotic-era",
      title: "治疗革命也会改变选择环境",
      summary:
        "抗生素把大量细菌感染变得可治，并支撑外科和化疗；错误适应证、剂量或疗程却会增加选择压力和不良结局。",
      focus: "治疗边界",
    },
    {
      nodeId: "medicine:antibiotic-resistance",
      title: "最后用两个反事实衡量耐药负担",
      summary:
        "归因死亡比较耐药感染与敏感感染，相关死亡比较耐药感染与没有感染；不同反事实不能互换，也不能被写成逐例因果清单。",
      focus: "反事实负担",
    },
  ],
};
