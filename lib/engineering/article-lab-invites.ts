import type { LabInviteData } from "@/lib/lab-invite";

const GRID: LabInviteData = {
  href: "/engineering/grid-flow",
  label: "电网潮流模拟器",
  tease: "在五节点教学电网上调节火电、风电与负荷，看功率怎样挤进走廊。",
};

const STRUCTURE: LabInviteData = {
  href: "/engineering/structure-lab",
  label: "结构受力实验室",
  tease: "移动简支梁上的集中力，观察反力与弯矩图。",
};

const MATERIALS: LabInviteData = {
  href: "/engineering/materials-profile",
  label: "材料性能剖面",
  tease: "比较钢、混凝土、铝与木材的强度、密度与刚度。",
};

const CHIP: LabInviteData = {
  href: "/engineering/chip-process",
  label: "芯片制造流程图",
  tease: "按公开教科书顺序走一遍平面工艺，不含可操作配方。",
};

const BY_SLUG: Record<string, LabInviteData> = {
  "power-grid": GRID,
  "electricity-and-motors": GRID,
  "energy-storage": GRID,
  "semiconductor-manufacturing": CHIP,
  "computing-hardware": CHIP,
  "steel-and-alloys": MATERIALS,
  "concrete-engineering": MATERIALS,
  "materials-strength": MATERIALS,
  bridges: STRUCTURE,
  skyscrapers: STRUCTURE,
  "solid-state-battery-manufacturing": GRID,
  "perovskite-silicon-tandem-scale-up": GRID,
  "low-carbon-cement-circularity": MATERIALS,
  "infrastructure-digital-twins": STRUCTURE,
  "hydrogen-direct-reduced-iron": MATERIALS,
  "embodied-ai-robot-reliability": CHIP,
};

const BY_SECTION: Record<string, LabInviteData> = {
  foundations: STRUCTURE,
  energy: GRID,
  materials: MATERIALS,
  machines: CHIP,
  civil: STRUCTURE,
  frontiers: STRUCTURE,
  frontier: STRUCTURE,
};

export function engineeringLabInvite(section: string, slug: string): LabInviteData {
  return BY_SLUG[slug] ?? BY_SECTION[section] ?? STRUCTURE;
}
