import { DOMAIN_LABELS } from "@/lib/cross-domain-refs/types";

// The daily pools are grouped by the list an event was filed under, not by the
// article it links to: a "history" entry for Neptune links into physics. Labels
// and icons therefore follow the link target.
const ICON_BY_DOMAIN: Record<string, string> = {
  "universe-physics": "🔬",
  cosmology: "🔭",
  "human-history": "📜",
  philosophy: "💭",
  "life-science": "🧬",
  economics: "📊",
  psychology: "🧠",
};

/** Legacy style keys used by the daily cards' colour table. */
const STYLE_KEY_BY_DOMAIN: Record<string, string> = {
  "universe-physics": "physics",
  "human-history": "history",
};

export function domainFromUrl(url: string | undefined): string | null {
  const segment = url?.split("/")[1] ?? "";
  return segment in DOMAIN_LABELS ? segment : null;
}

export function dailyLabelFor(url: string | undefined, fallback: string): string {
  const domain = domainFromUrl(url);
  return domain ? DOMAIN_LABELS[domain as keyof typeof DOMAIN_LABELS] : fallback;
}

export function dailyIconFor(url: string | undefined, fallback: string): string {
  const domain = domainFromUrl(url);
  return (domain && ICON_BY_DOMAIN[domain]) || fallback;
}

export function dailyStyleKeyFor(url: string | undefined, fallback: string): string {
  const domain = domainFromUrl(url);
  return domain ? (STYLE_KEY_BY_DOMAIN[domain] ?? domain) : fallback;
}

export function dailyEventKey(event: { title: string; year?: number }): string {
  return `${event.year ?? ""}|${event.title.replace(/\s+/g, "")}`;
}

/** The same dated event filed in two pools (Neptune, 1846) is shown once. */
export function dedupeDailyEvents<T extends { title: string; year?: number }>(
  events: readonly T[],
  alreadyShown: readonly { title: string; year?: number }[] = []
): T[] {
  const seen = new Set(alreadyShown.map(dailyEventKey));
  return events.filter((event) => {
    const key = dailyEventKey(event);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
