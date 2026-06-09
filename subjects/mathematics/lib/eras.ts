import type { MathEraData } from "./types";

const ERAS: MathEraData[] = [
  {
    id: "ancient",
    name: "古代数学",
    nameEn: "Ancient Mathematics",
    period: "前3000年–公元500年",
    keyFact: "巴比伦算术、埃及几何、希腊公理化方法的诞生",
    icon: "🏛️",
    gradient: "linear-gradient(135deg, #6366f1, #818cf8)",
    glowColor: "rgba(99,102,241,0.3)",
    bgAccent: "rgba(99,102,241,0.06)",
    borderAccent: "rgba(99,102,241,0.15)",
  },
  {
    id: "medieval",
    name: "中世纪数学",
    nameEn: "Medieval Mathematics",
    period: "500年–1400年",
    keyFact: "阿拉伯代数学、印度十进制、中国剩余定理",
    icon: "📜",
    gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    glowColor: "rgba(139,92,246,0.3)",
    bgAccent: "rgba(139,92,246,0.06)",
    borderAccent: "rgba(139,92,246,0.15)",
  },
  {
    id: "early-modern",
    name: "近代数学",
    nameEn: "Early Modern Mathematics",
    period: "1400年–1800年",
    keyFact: "微积分的发明、解析几何、概率论的开端",
    icon: "🔭",
    gradient: "linear-gradient(135deg, #22d3ee, #06b6d4)",
    glowColor: "rgba(34,211,238,0.3)",
    bgAccent: "rgba(34,211,238,0.06)",
    borderAccent: "rgba(34,211,238,0.15)",
  },
  {
    id: "modern",
    name: "现代数学",
    nameEn: "Modern Mathematics",
    period: "1800年–1950年",
    keyFact: "非欧几何、集合论、抽象代数、拓扑学的兴起",
    icon: "∞",
    gradient: "linear-gradient(135deg, #f472b6, #ec4899)",
    glowColor: "rgba(244,114,182,0.3)",
    bgAccent: "rgba(244,114,182,0.06)",
    borderAccent: "rgba(244,114,182,0.15)",
  },
  {
    id: "contemporary",
    name: "当代数学",
    nameEn: "Contemporary Mathematics",
    period: "1950年–至今",
    keyFact: "计算机辅助证明、范畴论、朗兰兹纲领",
    icon: "💻",
    gradient: "linear-gradient(135deg, #a78bfa, #c4b5fd)",
    glowColor: "rgba(167,139,250,0.3)",
    bgAccent: "rgba(167,139,250,0.06)",
    borderAccent: "rgba(167,139,250,0.15)",
  },
];

export function getAllMathEras(): MathEraData[] {
  return ERAS;
}

export function getMathEraById(id: string): MathEraData | undefined {
  return ERAS.find((era) => era.id === id);
}
