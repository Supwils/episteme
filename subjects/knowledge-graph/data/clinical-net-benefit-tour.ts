import type { ThoughtTour } from "./thought-tours";

export const CLINICAL_NET_BENEFIT_TOUR: ThoughtTour = {
  id: "from-early-signal-to-net-benefit",
  title: "从早期信号到净获益",
  subtitle: "筛查、确认诊断、治疗终点、伤害、失访与患者价值如何组成可审计的临床决策链",
  waypoints: [
    "medicine:epidemiology",
    "medicine:screening-and-early-detection",
    "medicine:clinical-diagnosis",
    "medicine:cancer",
    "medicine:clinical-trials",
    "medicine:evidence-based-medicine",
    "medicine:pain-and-analgesia",
    "medicine:depression",
    "medicine:informed-consent",
    "medicine:health-economic-evaluation-priority-setting",
  ],
  steps: [
    {
      nodeId: "medicine:epidemiology",
      title: "先定义目标人群和基础风险",
      summary:
        "筛查与治疗效果都依赖年龄、疾病负担、风险分布和数据生成过程；脱离分母的阳性数不能直接支持行动。",
      focus: "目标人群",
    },
    {
      nodeId: "medicine:screening-and-early-detection",
      title: "早期信号不等于已经获益",
      summary:
        "敏感性、特异性和预测值决定谁进入下游，提前期、长度与过度诊断则要求用严重结局而非检出率证明筛查价值。",
      focus: "筛查净获益",
    },
    {
      nodeId: "medicine:clinical-diagnosis",
      title: "确认诊断把信号变成行动概率",
      summary:
        "筛查阳性只提高检测前概率，病史、影像、病理和分型继续更新概率，直到跨过观察、检查或治疗阈值。",
      focus: "概率更新",
    },
    {
      nodeId: "medicine:cancer",
      title: "癌症把早发现与治疗异质性显现出来",
      summary:
        "分期、分子亚型和体能状态改变治疗目标；诊断后生存、肿瘤缩小、无进展和总生存分别回答不同问题。",
      focus: "疾病分层",
    },
    {
      nodeId: "medicine:clinical-trials",
      title: "试验用预设终点构造反事实",
      summary:
        "随机化、合理对照、意向治疗和足够随访帮助判断若不采用该策略会怎样，替代终点则必须保留确认不确定性。",
      focus: "治疗反事实",
    },
    {
      nodeId: "medicine:evidence-based-medicine",
      title: "把相对效果换回绝对人数",
      summary:
        "证据确定性、绝对风险降低、伤害和时间范围共同决定平均净获益，统计显著不能替代临床重要性。",
      focus: "绝对效果",
    },
    {
      nodeId: "medicine:pain-and-analgesia",
      title: "疼痛决策检验功能与伤害是否同行",
      summary:
        "短期疼痛分数下降不保证长期功能改善；阿片治疗还要持续评估呼吸、过量、使用障碍和减量本身的风险。",
      focus: "功能-伤害",
    },
    {
      nodeId: "medicine:depression",
      title: "精神健康要求追踪失访、复发与安全",
      summary:
        "症状反应、缓解、功能和复发不是同一终点，药物与心理治疗研究还要处理盲法、退出、停药反应和自杀监测。",
      focus: "持续照护",
    },
    {
      nodeId: "medicine:informed-consent",
      title: "患者价值决定同一风险如何选择",
      summary:
        "可理解的绝对获益、伤害、等待和替代方案让患者参与决策；同一平均效果可以对应不同的个人选择。",
      focus: "共同决策",
    },
    {
      nodeId: "medicine:health-economic-evaluation-priority-setting",
      title: "最后检查人群资源与公平",
      summary:
        "个人可能获益的服务还要穿过预算、诊断和治疗容量、机会成本与公平覆盖，才能形成可交付的人群净获益。",
      focus: "系统净获益",
    },
  ],
};
