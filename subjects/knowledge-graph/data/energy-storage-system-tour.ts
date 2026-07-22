import type { ThoughtTour } from "./thought-tours";

export const ENERGY_STORAGE_SYSTEM_TOUR: ThoughtTour = {
  id: "from-electron-to-circular-energy-storage",
  title: "从电子到循环储能系统",
  subtitle: "电势怎样成为可交付电池，又怎样穿过失效、矿产、资源经济与生命周期边界",
  waypoints: [
    "chemistry:chemical-thermodynamics",
    "chemistry:electrochemistry",
    "chemistry:battery-performance-safety-and-circularity",
    "chemistry:electron-microscopy-and-surface-analysis",
    "chemistry:process-safety",
    "chemistry:beyond-lithium-batteries",
    "earth-science:mineral-resources-and-critical-metals",
    "economics:commodity-exporters-macro-diagnosis-2026",
    "chemistry:green-chemistry",
  ],
  steps: [
    {
      nodeId: "chemistry:chemical-thermodynamics",
      title: "自由能划定可逆电压上限",
      summary:
        "化学势差可以转化为电功，但热力学只给出方向与上限，不保证电池在有电流时仍能维持同样电压。",
      focus: "能量边界",
    },
    {
      nodeId: "chemistry:electrochemistry",
      title: "界面与传质决定真实工作电压",
      summary:
        "过电位、欧姆损失和浓差极化把开路电势变成负载下的电压曲线，电子账还必须与离子和物料账闭合。",
      focus: "电化学转换",
    },
    {
      nodeId: "chemistry:battery-performance-safety-and-circularity",
      title: "先统一材料、电芯与系统的比较尺度",
      summary:
        "容量、能量、功率、寿命和效率必须绑定面载量、电解液、温度、倍率、样本数及材料到系统的不同分母。",
      focus: "性能审计",
    },
    {
      nodeId: "chemistry:electron-microscopy-and-surface-analysis",
      title: "用多尺度证据定位衰减机制",
      summary:
        "界面膜、裂纹、相变和元素迁移的局部图像，需要与阻抗、容量、气体和时间顺序互证，才能解释整枚电芯失效。",
      focus: "失效诊断",
    },
    {
      nodeId: "chemistry:process-safety",
      title: "把内短路扩展为传播与残余风险",
      summary:
        "单体触发、热失控、相邻传播、烟气、复燃和事故后处置构成完整安全链，材料不可燃并不自动证明系统安全。",
      focus: "安全边界",
    },
    {
      nodeId: "chemistry:beyond-lithium-batteries",
      title: "让候选化学体系进入可制造条件",
      summary:
        "钠离子、固态、锂硫和液流路线解决不同场景；实验室突破要继续通过全电芯、良率、成本和实际工况检验。",
      focus: "技术选择",
    },
    {
      nodeId: "earth-science:mineral-resources-and-critical-metals",
      title: "材料配方会重排矿产与加工瓶颈",
      summary:
        "减少锂、镍或钴依赖可能增加磷、锰、石墨或中游纯化压力，地壳丰度不能替代完整供应链分析。",
      focus: "资源约束",
    },
    {
      nodeId: "economics:commodity-exporters-macro-diagnosis-2026",
      title: "矿产机会进入价格与财政周期",
      summary:
        "新增需求可能扩大出口收入，也可能强化价格波动、汇率升值和财政依赖；加工能力与公共投资决定价值能否留在当地。",
      focus: "资源经济",
    },
    {
      nodeId: "chemistry:green-chemistry",
      title: "用生命周期与闭环质量作最终判断",
      summary:
        "统一功能单位后，才能同时比较制造能耗、寿命、效率、危害、原生矿需求、收集率和再生材料能否回到电池级。",
      focus: "循环系统",
    },
  ],
};
