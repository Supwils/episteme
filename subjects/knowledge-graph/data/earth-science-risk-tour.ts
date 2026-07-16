import type { ThoughtTour } from "./thought-tours";

export const EARTH_SCIENCE_RISK_TOUR: ThoughtTour = {
  id: "from-climate-signal-to-fair-adaptation",
  title: "从气候信号到公平适应",
  subtitle: "模型与归因如何经过复合风险、城市健康和海岸路径，进入减排与公共治理",
  waypoints: [
    "earth-science:climate-modeling",
    "earth-science:ensemble-prediction-and-decision",
    "earth-science:extreme-event-attribution",
    "earth-science:compound-climate-risks",
    "earth-science:urban-heat-risk-adaptation",
    "earth-science:sea-level-adaptation-pathways",
    "earth-science:carbon-budgets-and-net-zero",
    "political-science:fiscal-state",
  ],
  steps: [
    {
      nodeId: "earth-science:climate-modeling",
      title: "先模拟受物理约束的可能世界",
      summary: "气候模型不预测某天的天气，而是比较不同强迫条件下温度、降水和极端分布如何重排。",
      focus: "长期统计",
    },
    {
      nodeId: "earth-science:ensemble-prediction-and-decision",
      title: "把不确定性拆成可管理来源",
      summary:
        "初始条件、模型结构和排放情景回答不同问题；稳健决策据此保留调整空间，而非押注单一路径。",
      focus: "决策稳健性",
    },
    {
      nodeId: "earth-science:extreme-event-attribution",
      title: "用反事实校准危险改变",
      summary:
        "归因估计人为变暖如何改变极端事件的概率或强度，同时避免把物理危险与社会损失混为一谈。",
      focus: "风险归因",
    },
    {
      nodeId: "earth-science:compound-climate-risks",
      title: "危险会在系统中相乘",
      summary: "热、旱、雨、潮与停电可能共现或级联；风险评估必须检验依赖、基础设施与脆弱性。",
      focus: "复合风险",
    },
    {
      nodeId: "earth-science:urban-heat-risk-adaptation",
      title: "热风险通过住房和照护分配",
      summary: "热岛和高温只是起点，室内环境、劳动权利、医疗与社区支持决定谁能安全度过热浪。",
      focus: "热健康公平",
    },
    {
      nodeId: "earth-science:sea-level-adaptation-pathways",
      title: "海岸需要可切换的长期路径",
      summary: "保护、容纳和后退要随海平面、沉降与复合洪水变化调整，并以产权、迁移和补偿保障公平。",
      focus: "动态适应",
    },
    {
      nodeId: "earth-science:carbon-budgets-and-net-zero",
      title: "累计排放规定风险上限",
      summary:
        "碳预算提供温度目标下的物理边界；适应不可替代减排，抵消也不能替代高完整性的直接减排。",
      focus: "减缓约束",
    },
    {
      nodeId: "political-science:fiscal-state",
      title: "最终进入公共财政与责任分配",
      summary:
        "预警、医疗、住房、海岸工程和转型投资都需要可持续财政能力，也需要公开谁付费、谁受益与谁被保护。",
      focus: "治理能力",
    },
  ],
};
