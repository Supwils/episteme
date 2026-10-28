import type { DomainClusterId } from "@/lib/domain-clusters";
import { CLUSTER_PIGMENTS, PALETTE, type ThemeName } from "@/lib/design/palette";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";

/**
 * 按阶段上色时复用已有的五簇颜料，从山脚到山顶。
 * 不新造一套色。层级的名字仍然写在字上，颜色不单独承载含义。
 */
const LEVEL_PIGMENTS = [
  "formal-technology",
  "cosmos-nature",
  "life-mind",
  "society-institutions",
  "history-civilization",
] as const satisfies readonly DomainClusterId[];

export function summitThemeName(root: Element): ThemeName {
  return root.classList.contains("light") ? "light" : "dark";
}

export function summitLevelColor(level: KnowledgeLevel, theme: ThemeName): string {
  const pigment = LEVEL_PIGMENTS[level - 1] ?? "formal-technology";
  return CLUSTER_PIGMENTS[pigment].mark[theme];
}

export function summitClusterColor(cluster: DomainClusterId, theme: ThemeName): string {
  return CLUSTER_PIGMENTS[cluster].mark[theme];
}

export function summitGroundColor(theme: ThemeName): string {
  return PALETTE[theme].surface.deep;
}

export function summitMeshColor(theme: ThemeName): string {
  return PALETTE[theme].surface.panel;
}
