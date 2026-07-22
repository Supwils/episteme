import type { ThoughtTour } from "./thought-tours";

export const ADOLESCENT_MENTAL_HEALTH_TOUR: ThoughtTour = {
  id: "from-adolescent-development-to-continuous-support",
  title: "从青春期发展到连续支持",
  subtitle:
    "睡眠、家庭与同伴、平台设计、因果证据、学校服务、分级转诊和权利如何共同塑造青少年心理健康",
  waypoints: [
    "psychology:developmental-psychology",
    "psychology:sleep-and-mind",
    "sociology:family-and-kinship",
    "sociology:social-support-mental-health",
    "psychology:social-media-teen-mental-health",
    "psychology:causal-inference-experiments-observational-studies",
    "sociology:platform-governance",
    "medicine:adolescent-mental-health-school-community-services",
    "medicine:community-mental-health-access-continuity",
    "medicine:informed-consent",
  ],
  steps: [
    {
      nodeId: "psychology:developmental-psychology",
      title: "先从发展阶段理解风险与机会",
      summary:
        "青春期同时发生生理、认知、身份和关系变化，平均年龄趋势不能替代个体发展轨迹，也不能把正常波动直接病理化。",
      focus: "发展窗口",
    },
    {
      nodeId: "psychology:sleep-and-mind",
      title: "睡眠连接生物节律与社会时间",
      summary:
        "睡眠稳态、昼夜节律、上学时间、家庭作息和夜间数字活动共同作用；关联研究不能单独判定影响方向。",
      focus: "睡眠与节律",
    },
    {
      nodeId: "sociology:family-and-kinship",
      title: "家庭不是单一背景变量",
      summary:
        "照护时间、冲突、安全、资源和代际规范会改变压力暴露、求助空间与治疗参与，需要避免把责任全部推给家庭。",
      focus: "家庭制度",
    },
    {
      nodeId: "sociology:social-support-mental-health",
      title: "支持要区分网络规模与关系质量",
      summary:
        "实际帮助、感知支持、孤独和网络结构测量的是不同机制；同伴关系既可缓冲压力，也可能传播排斥和规范压力。",
      focus: "同伴与支持",
    },
    {
      nodeId: "psychology:social-media-teen-mental-health",
      title: "把屏幕时间拆成具体机制",
      summary:
        "睡眠置换、社会比较、骚扰、支持性联结和推荐系统可能同时存在，平台、内容、使用方式与个体差异必须分别测量。",
      focus: "数字环境",
    },
    {
      nodeId: "psychology:causal-inference-experiments-observational-studies",
      title: "因果结论取决于识别设计",
      summary:
        "随机实验、纵向研究、自然实验和目标试验模拟回答不同问题；每种方法都应公开干预定义、混杂假设和可外推人群。",
      focus: "因果识别",
    },
    {
      nodeId: "sociology:platform-governance",
      title: "个体自控不能替代系统治理",
      summary:
        "默认设置、推荐机制、骚扰处置、数据访问与独立审计决定风险如何分布，政策评估应检验行为响应和分配效应。",
      focus: "平台责任",
    },
    {
      nodeId: "medicine:adolescent-mental-health-school-community-services",
      title: "学校入口必须连接社区服务",
      summary:
        "促进性环境、教师边界、适龄识别、保密转诊和校外青年触达需要组成一套系统，筛查本身不是诊断或治疗。",
      focus: "学校与社区",
    },
    {
      nodeId: "medicine:community-mental-health-access-continuity",
      title: "转诊之后仍要审计连续照护",
      summary:
        "从需要、首次接触、匹配服务到持续参与和恢复，每一步都可能流失；平均覆盖率也可能掩盖群体差距。",
      focus: "照护级联",
    },
    {
      nodeId: "medicine:informed-consent",
      title: "最后以适龄权利校准整个系统",
      summary:
        "能力应针对具体决定评估，并通过易懂沟通、支持性决策、隐私边界、持续同意和申诉机制保护主体地位。",
      focus: "权利与自主",
    },
  ],
};
