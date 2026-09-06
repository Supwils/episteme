export type MaterialId = "steel" | "concrete" | "aluminum" | "timber";

export type MaterialProfile = {
  id: MaterialId;
  name: string;
  grade: string;
  /** Characteristic strength used in the bars, MPa. */
  strengthMpa: number;
  strengthKind: "屈服" | "立方抗压" | "抗弯";
  densityKgM3: number;
  elasticGpa: number;
  specificStrength: number;
  note: string;
};

export const MATERIAL_PROFILES: readonly MaterialProfile[] = [
  {
    id: "steel",
    name: "结构钢",
    grade: "S355",
    strengthMpa: 355,
    strengthKind: "屈服",
    densityKgM3: 7850,
    elasticGpa: 210,
    specificStrength: 355 / 7.85,
    note: "EN 10025 结构钢常见屈服下限；密度与弹性模量取教科书圆整值。",
  },
  {
    id: "concrete",
    name: "结构混凝土",
    grade: "C30/37",
    strengthMpa: 30,
    strengthKind: "立方抗压",
    densityKgM3: 2400,
    elasticGpa: 32,
    specificStrength: 30 / 2.4,
    note: "Eurocode 2 中 C30 的圆柱/立方强度口径不同；这里用立方 30 MPa 作教学条。",
  },
  {
    id: "aluminum",
    name: "铝合金",
    grade: "6061-T6",
    strengthMpa: 276,
    strengthKind: "屈服",
    densityKgM3: 2700,
    elasticGpa: 69,
    specificStrength: 276 / 2.7,
    note: "ASM 手册量级：热处理铝合金轻，但弹性模量只有钢的约三分之一。",
  },
  {
    id: "timber",
    name: "结构木材",
    grade: "C24",
    strengthMpa: 24,
    strengthKind: "抗弯",
    densityKgM3: 420,
    elasticGpa: 11,
    specificStrength: 24 / 0.42,
    note: "EN 338 C24 抗弯强度与平均密度的圆整值；各向异性与含水率未展开。",
  },
];

export function maxMetric(
  profiles: readonly MaterialProfile[],
  key: "strengthMpa" | "densityKgM3" | "elasticGpa" | "specificStrength"
): number {
  return Math.max(...profiles.map((profile) => profile[key]));
}
