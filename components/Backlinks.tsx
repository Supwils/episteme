import Link from "next/link";
import { DOMAINS } from "@/lib/data";
import { groupBacklinks, type Backlink } from "@/lib/backlinks";

// Canonical per-domain accents (lib/data is the same source the domain cards and
// nav use). Colour is carried by the dot and never by the label text, so both
// themes keep using foreground tokens that already clear WCAG AA.
const ACCENT_BY_DOMAIN: Record<string, string> = Object.fromEntries(
  DOMAINS.map((d) => [d.id, d.glowColor])
);

function BacklinkPill({ link, accent }: { link: Backlink; accent?: string }) {
  return (
    <Link
      href={link.url}
      className="border-border-faint text-fg-secondary hover:border-accent-gold hover:text-accent-gold inline-flex items-center gap-2 rounded-full border py-1.5 pr-3 pl-2.5 text-[13px] transition-colors"
    >
      {accent && (
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: accent }}
        />
      )}
      {link.title}
    </Link>
  );
}

/**
 * "Referenced by" panel — the reverse of the inline `[[wiki-links]]`. Lists the
 * articles that link here so the cross-reference web is navigable in both
 * directions, and splits out the ones that come from *other* knowledge domains.
 * Those cross-domain inbound links are the platform's differentiator (319 of
 * 2740) yet used to render indistinguishably inside one flat pill list.
 *
 * A server component on purpose: the generated index is ~275 KB, so looking it
 * up on the client shipped the whole thing (~40 KB gzip) to every article page
 * just to read a single entry.
 */
export function Backlinks({ url }: { url: string }) {
  const { sameDomain, crossDomain, total } = groupBacklinks(url);
  if (total === 0) return null;

  const crossCount = total - sameDomain.length;

  return (
    <section className="border-border-faint mt-14 border-t pt-6" aria-label="被引用">
      <h2 className="text-fg-muted mb-4 font-mono text-[10px] tracking-[0.22em] uppercase">
        正文中引用本条 · {total}
        {crossCount > 0 && (
          <span className="text-fg-secondary">
            {" · "}其中 {crossCount} 条来自其他领域
          </span>
        )}
      </h2>

      {crossDomain.length > 0 && (
        <div className="mb-5 flex flex-col gap-3">
          {crossDomain.map((group) => {
            const accent = ACCENT_BY_DOMAIN[group.domain];
            return (
              <div key={group.domain} className="flex flex-wrap items-center gap-2">
                <span className="text-fg-muted inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] tracking-[0.18em]">
                  <span
                    aria-hidden
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: accent ?? "currentColor" }}
                  />
                  {group.label}
                </span>
                {group.links.map((link) => (
                  <BacklinkPill key={link.url} link={link} accent={accent} />
                ))}
              </div>
            );
          })}
        </div>
      )}

      {sameDomain.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {sameDomain.map((link) => (
            <li key={link.url}>
              <BacklinkPill link={link} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
