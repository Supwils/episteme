import type { LabInviteData } from "@/lib/lab-invite";

const EQUILIBRIUM: LabInviteData = {
  href: "/chemistry/equilibrium-lab",
  label: "平衡方向示意",
  tease: "改反应商和平衡常数，看净变化朝哪一侧。不是测定，也不是操作步骤。",
};

const BY_SLUG: Record<string, LabInviteData> = {
  "chemical-equilibrium": EQUILIBRIUM,
  "chemical-thermodynamics": EQUILIBRIUM,
};

export function chemistryLabInvite(_section: string, slug: string): LabInviteData | null {
  return BY_SLUG[slug] ?? null;
}
