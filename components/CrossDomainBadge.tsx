import { DOMAINS } from "@/lib/data";
import { groupBacklinks } from "@/lib/backlinks";

// Same accent source as <Backlinks> (lib/data is what the domain cards and nav
// use), so a dot here reads as the same domain everywhere on the platform.
const ACCENT_BY_DOMAIN: Record<string, string> = Object.fromEntries(
  DOMAINS.map((d) => [d.id, d.glowColor])
);

// More dots than this stops being a glanceable signal and starts wrapping the
// card; the count text still carries the full number.
const MAX_DOTS = 5;

/**
 * Quiet cross-domain signal for article list cards: which *other* knowledge
 * domains reference this article. Reads the same generated inbound-link index
 * as the article page's 跨域反链 panel, so list and detail never disagree.
 *
 * Server-only by design — the index is ~275 KB and `backlinks-server-only`
 * fails the build if it leaks into a client module.
 */
export function CrossDomainBadge({ url }: { url: string }) {
  const { crossDomain } = groupBacklinks(url);
  if (crossDomain.length === 0) return null;

  const names = crossDomain.map((g) => g.label).join("、");

  return (
    <p className="text-fg-disabled relative flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em]">
      <span aria-hidden className="flex items-center gap-1">
        {crossDomain.slice(0, MAX_DOTS).map((group) => (
          <span
            key={group.domain}
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: ACCENT_BY_DOMAIN[group.domain] ?? "currentColor" }}
          />
        ))}
      </span>
      被 {crossDomain.length} 个领域引用
      <span className="sr-only">（{names}）</span>
    </p>
  );
}
