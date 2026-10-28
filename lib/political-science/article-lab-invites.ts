import type { LabInviteData } from "@/lib/lab-invite";

const SEAT_THRESHOLD: LabInviteData = {
  href: "/political-science/seat-threshold-lab",
  label: "席位与否决示意",
  tease: "改赞成票和否决者人数，看议案过不过。不是选举预测。",
};

const BY_SLUG: Record<string, LabInviteData> = {
  "checks-and-balances": SEAT_THRESHOLD,
  accountability: SEAT_THRESHOLD,
};

export function politicalScienceLabInvite(section: string, slug: string): LabInviteData | null {
  void section;
  return BY_SLUG[slug] ?? null;
}
