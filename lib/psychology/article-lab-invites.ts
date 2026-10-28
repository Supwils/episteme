import type { LabInviteData } from "@/lib/lab-invite";

const SIGNAL: LabInviteData = {
  href: "/psychology/signal-detection-lab",
  label: "信号检测示意",
  tease: "移动判断标准，看击中和虚报一起变，敏感度却停在原处。不是被试成绩。",
};

const BY_SLUG: Record<string, LabInviteData> = {
  "psychophysics-and-signal-detection": SIGNAL,
  "perception-physiology": SIGNAL,
};

export function psychologyLabInvite(_section: string, slug: string): LabInviteData | null {
  return BY_SLUG[slug] ?? null;
}
