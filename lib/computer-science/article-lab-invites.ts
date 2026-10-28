import type { LabInviteData } from "@/lib/lab-invite";

const CACHE_STRIDE: LabInviteData = {
  href: "/computer-science/cache-locality-lab",
  label: "缓存步长示意",
  tease: "改访问步长，看同一小块内存里命中怎么变。不是测速，也不是攻击。",
};

const BY_SLUG: Record<string, LabInviteData> = {
  "memory-hierarchy-caching": CACHE_STRIDE,
};

export function computerScienceLabInvite(_section: string, slug: string): LabInviteData | null {
  return BY_SLUG[slug] ?? null;
}
