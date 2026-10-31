import type { SourceRef } from "./types";

export type CosmologyEra = {
  id: string;
  name: { primary: string; english: string };
  timeRange: string;
  description: string;
  keyEvents: string[];
  sources: SourceRef[];
  marker?: {
    icon: string;
    color: string;
    category: "origin" | "structure" | "light" | "matter" | "present";
  };
};

const planck: SourceRef = {
  label: "Planck2018 · 基准ΛCDM参数与宇宙年龄",
  url: "https://arxiv.org/abs/1807.06209",
  kind: "paper",
};
const inflation: SourceRef = {
  label: "Planck2018 · 暴胀模型的观测限制",
  url: "https://arxiv.org/abs/1807.06211",
  kind: "paper",
};
const webb: SourceRef = {
  label: "NASA/JWST · 早期恒星与星系的观测问题",
  url: "https://science.nasa.gov/mission/webb/early-universe/",
  kind: "agency",
};
const eras: SourceRef = {
  label: "ESA · 再结合、黑暗时代与再电离",
  url: "https://www.esa.int/Science_Exploration/Space_Science/Cosmic_eras",
  kind: "agency",
};
const bigBang: SourceRef = {
  label: "NASA/Hubble · 早期轻元素与宇宙膨胀",
  url: "https://science.nasa.gov/mission/hubble/science/science-behind-the-discoveries/hubble-big-bang/",
  kind: "agency",
};
const solarSystem: SourceRef = {
  label: "NASA · 太阳系形成与组成",
  url: "https://science.nasa.gov/solar-system/solar-system-facts/",
  kind: "agency",
};

export const COSMOLOGY_ERAS: CosmologyEra[] = [
  {
    id: "inflation",
    name: { primary: "暴胀假说", english: "Inflation" },
    timeRange: "极早期 · 具体时标依模型",
    description:
      "在一类早期宇宙模型中，暴胀及其后的再加热接入热大爆炸阶段，为大尺度近乎平坦、均匀及初始扰动提供解释。机制、持续时间和能标仍待约束，具体秒数并未被独立测定。",
    keyEvents: ["加速膨胀模型", "初始扰动", "机制尚待检验"],
    sources: [inflation],
  },
  {
    id: "big-bang",
    name: { primary: "热大爆炸", english: "Hot Big Bang" },
    timeRange: "宇宙极早期",
    description:
      "热大爆炸模型追溯宇宙早期高温、高密的膨胀状态。经典方程向更早外推的奇点提示理论适用范围有限，尚不能据此确认时空起源或四种基本相互作用曾统一。",
    keyEvents: ["高温等离子体", "宇宙膨胀", "极早期物理待检验"],
    sources: [planck, bigBang],
    marker: { icon: "✦", color: "#f43f5e", category: "origin" },
  },
  {
    id: "nucleosynthesis",
    name: { primary: "原初核合成", english: "Primordial Nucleosynthesis" },
    timeRange: "大爆炸后最初数分钟",
    description:
      "在不断冷却的早期宇宙中，核反应形成氘、氦等轻原子核以及少量更重的轻核。此时还不是中性原子的时代；轻元素丰度为热大爆炸及重子含量提供独立检验。",
    keyEvents: ["轻原子核形成", "原初元素丰度", "与重子密度交叉检验"],
    sources: [bigBang, planck],
    marker: { icon: "⚛", color: "#f97316", category: "matter" },
  },
  {
    id: "recombination",
    name: { primary: "再结合与光子退耦", english: "Recombination" },
    timeRange: "大爆炸后约38万年",
    description:
      "温度降至约3000K时，中性氢逐渐形成，自由电子减少，光子散射率随之降低。今天的CMB主要是这一时期自由传播的早期热辐射，并非氢原子结合时新发出的那束光。再结合与退耦相关，但不是完全相同的过程。",
    keyEvents: ["中性氢形成", "光子散射减少", "CMB最后散射"],
    sources: [planck, eras],
    marker: { icon: "◎", color: "#eab308", category: "light" },
  },
  {
    id: "dark-ages",
    name: { primary: "黑暗时代", english: "Dark Ages" },
    timeRange: "再结合后至首批恒星出现",
    description:
      "在恒星尚未出现的阶段，中性氢、氦与暗物质中的结构继续增长，气体逐渐聚集和冷却。黑暗指缺少恒星光源，早期遗留辐射仍然存在；这一阶段没有一个已被直接测定的统一结束年份。",
    keyEvents: ["暗物质晕增长", "气体聚集", "恒星形成前的阶段"],
    sources: [webb, eras],
  },
  {
    id: "first-stars",
    name: { primary: "第一批恒星", english: "First Stars" },
    timeRange: "最初数亿年内 · 时点待约束",
    description:
      "原始气体在部分早期晕中形成恒星，紫外辐射逐渐改变周围气体的电离状态。理论中的星族III由近乎无重元素的气体形成，但质量分布、最早出现时点与不同结局仍依模型，不能断言每颗都以超新星结束。",
    keyEvents: ["原始恒星形成", "紫外辐射", "金属增丰逐渐开始"],
    sources: [webb, eras],
    marker: { icon: "✧", color: "#a78bfa", category: "light" },
  },
  {
    id: "galaxy-formation",
    name: { primary: "星系形成与增长", english: "Galaxy Formation" },
    timeRange: "最初数亿年起，持续至今",
    description:
      "气体、恒星和暗物质晕共同构成早期星系，并通过吸积、造星和并合继续演化。JWST已观测到宇宙不足3亿年时存在的星系；这不是第一颗星系诞生日期，也不表示星系形成只发生在一段封闭时代。",
    keyEvents: ["早期星系", "吸积与并合", "再电离与结构增长"],
    sources: [webb, eras],
    marker: { icon: "◉", color: "#3b82f6", category: "structure" },
  },
  {
    id: "stellar-evolution",
    name: { primary: "恒星与行星的长期演化", english: "Stars and Planets" },
    timeRange: "首批恒星形成后，持续至今",
    description:
      "不同质量恒星沿不同路径演化，通过恒星风、超新星等过程影响环境和元素丰度。部分气体进入新一代恒星与行星系统；低质量恒星的结局与大质量恒星不同，这些过程也不是到宇宙100亿岁才开始。",
    keyEvents: ["恒星核合成", "物质循环", "多代恒星与行星"],
    sources: [webb],
  },
  {
    id: "solar-system",
    name: { primary: "太阳系形成", english: "Solar System Formation" },
    timeRange: "距今约46亿年",
    description:
      "太阳及周围原行星盘在银河系中形成，盘内固体和气体逐渐构成行星与小天体。形成与轨道演化经历一段过程；今天八大行星的布局并非所有成员在同一瞬间直接就位。",
    keyEvents: ["太阳与原行星盘", "固体与气体吸积", "轨道继续演化"],
    sources: [solarSystem],
    marker: { icon: "☉", color: "#22d3ee", category: "structure" },
  },
  {
    id: "today",
    name: { primary: "今天", english: "Today" },
    timeRange: "宇宙年龄约138亿年",
    description:
      "在Planck基准平坦ΛCDM分析中，宇宙年龄约138亿年；暗物质与暗能量共同参与对观测的解释。加速膨胀有多种观测支持，但暗能量的本质与是否演化仍是研究问题，星系总数也依观测深度和外推模型而变。",
    keyEvents: ["加速膨胀", "模型与多探针检验", "结构继续演化"],
    sources: [planck, webb],
    marker: { icon: "⊕", color: "#10b981", category: "present" },
  },
];
