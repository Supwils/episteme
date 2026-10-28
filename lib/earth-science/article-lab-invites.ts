import type { LabInviteData } from "@/lib/lab-invite";

const WATER_BALANCE: LabInviteData = {
  href: "/earth-science/water-balance-lab",
  label: "水量平衡示意",
  tease: "改降水、蒸散发和径流，看储蓄项怎么变。不是气候预测。",
};

const BY_SLUG: Record<string, LabInviteData> = {
  "water-cycle": WATER_BALANCE,
};

export function earthScienceLabInvite(_section: string, slug: string): LabInviteData | null {
  return BY_SLUG[slug] ?? null;
}
