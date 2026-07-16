import type { ThoughtTour } from "./thought-tours";

export const CHEMISTRY_METHODS_TOUR: ThoughtTour = {
  id: "from-molecular-evidence-to-safe-process",
  title: "从分子证据到安全工艺",
  subtitle: "结构如何被多种实验约束，又如何成为可放大、可审计的化学过程",
  waypoints: [
    "chemistry:spectroscopy",
    "chemistry:nmr-spectroscopy-structure-elucidation",
    "chemistry:x-ray-crystallography",
    "chemistry:electron-microscopy-and-surface-analysis",
    "chemistry:reaction-mechanisms",
    "chemistry:retrosynthesis-and-reaction-optimization",
    "chemistry:process-scale-up",
    "chemistry:process-safety",
  ],
  steps: [
    {
      nodeId: "chemistry:spectroscopy",
      title: "先把物质和信号的关系说清",
      summary: "光与物质相互作用提供能级、振动和组成线索，但每种谱学方法只看到结构的一部分。",
      focus: "信号生成",
    },
    {
      nodeId: "chemistry:nmr-spectroscopy-structure-elucidation",
      title: "核环境把局部连接变成约束",
      summary:
        "化学位移、耦合、积分和二维相关支持结构假设，却必须与分子式、纯度和其他谱学共同解释。",
      focus: "溶液结构",
    },
    {
      nodeId: "chemistry:x-ray-crystallography",
      title: "衍射将周期散射重建为电子密度",
      summary: "晶体学以相位求解和精修获得三维固态结构；无序、晶型与质量指标决定它能支持多强结论。",
      focus: "三维结构",
    },
    {
      nodeId: "chemistry:electron-microscopy-and-surface-analysis",
      title: "局部形貌需要化学态共同校准",
      summary:
        "SEM/TEM、EDS 和 XPS 分别观察不同尺度与深度，制样、束流损伤和代表性决定图像是否能代表材料。",
      focus: "材料表征",
    },
    {
      nodeId: "chemistry:reaction-mechanisms",
      title: "机理把现象压缩成可检验步骤",
      summary: "电子移动和中间体不是装饰性箭头，而是提出速率、选择性和副反应预测的化学模型。",
      focus: "机制假设",
    },
    {
      nodeId: "chemistry:retrosynthesis-and-reaction-optimization",
      title: "路线必须有可接受的操作窗口",
      summary:
        "逆合成提出竞争路线，设计实验和可靠分析则把单次高产率推进为对原料与条件波动稳健的过程。",
      focus: "路线开发",
    },
    {
      nodeId: "chemistry:process-scale-up",
      title: "体积改变后，热和混合不再相似",
      summary: "放大要同时控制传热、加料、传质、结晶和下游分离，不能把烧瓶配方简单乘以规模系数。",
      focus: "工程转化",
    },
    {
      nodeId: "chemistry:process-safety",
      title: "理解失败路径才算掌握过程",
      summary:
        "反应量热、偏差审查、本质安全和独立防护层使化学过程能在冷却失效、误加料等情形下仍保持可控。",
      focus: "安全边界",
    },
  ],
};
