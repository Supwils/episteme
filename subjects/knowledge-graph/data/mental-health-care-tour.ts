import type { ThoughtTour } from "./thought-tours";

export const MENTAL_HEALTH_CARE_TOUR: ThoughtTour = {
  id: "from-distress-to-rights-based-mental-health-care",
  title: "从心理困扰到可持续照护",
  subtitle: "症状、风险感知、社会支持、临床治疗、服务可及、公共政策与自主权如何组成一条完整证据链",
  waypoints: [
    "psychology:major-depressive",
    "psychology:risk-perception-and-macro-decisions",
    "sociology:social-support-mental-health",
    "medicine:depression",
    "medicine:community-mental-health-access-continuity",
    "medicine:health-systems-universal-health-coverage",
    "political-science:public-policy",
    "medicine:informed-consent",
    "philosophy:bioethics",
  ],
  steps: [
    {
      nodeId: "psychology:major-depressive",
      title: "先把情绪、症状与诊断分开",
      summary:
        "量表、功能损害和临床诊断回答不同问题；异质症状不能被一个总分或一种病因模型完全解释。",
      focus: "表型与测量",
    },
    {
      nodeId: "psychology:risk-perception-and-macro-decisions",
      title: "困扰要经过风险判断才会转成求助",
      summary:
        "当事人会权衡收益、伤害、污名、隐私、费用和制度信任，控制感与无望则改变这些结果的主观权重。",
      focus: "求助决策",
    },
    {
      nodeId: "sociology:social-support-mental-health",
      title: "关系既提供支持，也可能制造压力",
      summary:
        "孤立、孤独、感知支持和实际帮助并非同一构念；网络质量会改变压力缓冲、服务入口、污名和自主空间。",
      focus: "关系机制",
    },
    {
      nodeId: "medicine:depression",
      title: "临床证据要同时观察症状、功能与安全",
      summary:
        "诊断鉴别、共同决策、心理或药物治疗和持续复核共同构成照护，平均疗效不能直接预言个人反应。",
      focus: "临床选择",
    },
    {
      nodeId: "medicine:community-mental-health-access-continuity",
      title: "首次就诊只是照护级联的起点",
      summary:
        "从识别需要到适当治疗、持续参与和恢复，每一步都可能因排队、费用、失访或不尊重照护而流失。",
      focus: "连续照护",
    },
    {
      nodeId: "medicine:health-systems-universal-health-coverage",
      title: "覆盖必须乘以质量和财务保护",
      summary:
        "保险登记或服务存在都不等于有效覆盖，卫生人力、支付、转诊、信息和公平分配必须协同运作。",
      focus: "有效覆盖",
    },
    {
      nodeId: "political-science:public-policy",
      title: "把照护缺口转成可执行的公共项目",
      summary:
        "政策要定义目标人群、资金、执行责任、申诉与评估机制，并检查平均改善是否掩盖群体间的不平等。",
      focus: "制度执行",
    },
    {
      nodeId: "medicine:informed-consent",
      title: "服务扩张不能牺牲决定权",
      summary:
        "能力应针对具体决定评估，支持性决策、易懂沟通、持续同意和最少限制原则保护人在危机中的主体地位。",
      focus: "自主与能力",
    },
    {
      nodeId: "philosophy:bioethics",
      title: "最终问题是怎样的照护才算正当",
      summary:
        "自主、行善、不伤害、公正和权利可能发生冲突，伦理推理要求公开理由、权力边界与可复核的取舍。",
      focus: "伦理正当性",
    },
  ],
};
