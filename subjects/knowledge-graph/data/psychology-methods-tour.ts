import type { ThoughtTour } from "./thought-tours";

export const PSYCHOLOGY_METHODS_TOUR: ThoughtTour = {
  id: "how-psychology-builds-evidence",
  title: "心理学如何建立证据",
  subtitle: "从可靠测量、变化模型和概率推断，到综合、开放与计算伦理",
  waypoints: [
    "psychology:psychometrics-reliability-validity",
    "psychology:measurement-invariance-fair-comparison",
    "psychology:longitudinal-multilevel-models",
    "psychology:bayesian-modeling-psychology",
    "psychology:effect-size-and-power",
    "psychology:meta-analysis-evidence-synthesis",
    "psychology:preregistration-registered-reports",
    "psychology:replication-crisis-open-science",
    "psychology:digital-phenotyping-computational-ethics",
  ],
  steps: [
    {
      nodeId: "psychology:psychometrics-reliability-validity",
      title: "先确认尺子测到了什么",
      summary:
        "心理构念不能直接读取，信度、效度与潜变量模型共同判断分数是否稳定，以及它能支持哪些解释。",
      focus: "测量基础",
    },
    {
      nodeId: "psychology:measurement-invariance-fair-comparison",
      title: "比较前先校准共同刻度",
      summary:
        "群体或时间差异只有在结构、载荷与截距足够等值时才可解释，否则变化可能来自题意和反应方式。",
      focus: "公平比较",
    },
    {
      nodeId: "psychology:longitudinal-multilevel-models",
      title: "把人与时间的层次拆开",
      summary:
        "纵向多层模型区分个体间差异和个体内变化，并让不同人的起点、轨迹与情境作用进入同一分析。",
      focus: "变化结构",
    },
    {
      nodeId: "psychology:bayesian-modeling-psychology",
      title: "用生成过程更新不确定性",
      summary: "先验、似然和后验预测把已有知识、当前数据与模型失配放进可检查的概率推理链。",
      focus: "概率推断",
    },
    {
      nodeId: "psychology:effect-size-and-power",
      title: "问效应多大而非只问显著",
      summary: "效应量、区间与功效把二分显著性改写成关于实际重要性、估计精度和设计信息量的问题。",
      focus: "证据强度",
    },
    {
      nodeId: "psychology:meta-analysis-evidence-synthesis",
      title: "让多项研究真正累积",
      summary:
        "系统综述和元分析在共同尺度上综合结果，同时保留异质性、研究偏倚和未来情境的不确定性。",
      focus: "证据综合",
    },
    {
      nodeId: "psychology:preregistration-registered-reports",
      title: "让分析承诺和偏离可追踪",
      summary:
        "预注册区分事前检验与事后探索，注册报告则在结果出现前评价问题和设计，削弱显著性发表激励。",
      focus: "过程透明",
    },
    {
      nodeId: "psychology:replication-crisis-open-science",
      title: "把单项失败放回科研制度",
      summary:
        "低功效、选择性报告和评价激励共同塑造可重复性，改革因此必须覆盖统计实践、出版与资源配置。",
      focus: "制度校准",
    },
    {
      nodeId: "psychology:digital-phenotyping-computational-ethics",
      title: "计算能力必须接受伦理审计",
      summary:
        "传感器和机器学习只有同时通过构念、外部验证、隐私、公平与行动责任检验，才能成为心理证据。",
      focus: "计算治理",
    },
  ],
};
