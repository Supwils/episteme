import type { LabInviteData } from "@/lib/lab-invite";

const MOBILITY: LabInviteData = {
  href: "/sociology/mobility-lab",
  label: "代际流动示意",
  tease: "改开放度，看示意队列的去向份额。不是调查表。",
};

const BY_SLUG: Record<string, LabInviteData> = {
  "social-stratification": MOBILITY,
  "education-and-credentialism": MOBILITY,
};

export function sociologyLabInvite(_section: string, slug: string): LabInviteData | null {
  return BY_SLUG[slug] ?? null;
}
