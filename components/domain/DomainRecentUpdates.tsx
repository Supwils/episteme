import Link from "next/link";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import { getDomainConfig } from "@/lib/new-domains";

const MAX_ITEMS = 4;

/**
 * "最近更新" strip for engine-driven domain homepages: the domain's freshest
 * articles across all sections, by frontmatter `updated`. Auto-derived — no
 * curation to maintain, and returning visitors immediately see what changed.
 * Server component; renders nothing when no article carries a date.
 */
export function DomainRecentUpdates({ domain, accent }: { domain: string; accent: string }) {
  const config = getDomainConfig(domain);
  if (!config) return null;

  const items = config.sections
    .flatMap((section) =>
      createKnowledgeSection(domain, section.key)
        .getAll()
        .map((item) => ({
          slug: item.slug,
          title: item.title,
          updated: item.updated,
          sectionLabel: section.label,
          href: `/${domain}/${section.key}/${item.slug}`,
        }))
    )
    .filter((item) => /^\d{4}-\d{2}-\d{2}$/.test(item.updated))
    .sort((a, b) => b.updated.localeCompare(a.updated))
    .slice(0, MAX_ITEMS);

  if (items.length === 0) return null;

  return (
    <section className="relative z-[2] w-full px-6 pb-20 sm:px-10 lg:px-16">
      <p className="text-fg-muted mb-6 font-mono text-[10px] tracking-[0.38em] uppercase">
        最近更新 · recently updated
      </p>
      <ul className="border-border-faint divide-y divide-[var(--color-border-faint)] border-y">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group hover:bg-bg-elevated/60 flex items-baseline gap-4 px-2 py-3.5 transition-colors"
            >
              <span className="text-fg-disabled shrink-0 font-mono text-[11px] tracking-wider tabular-nums">
                {item.updated}
              </span>
              <span
                className="shrink-0 font-mono text-[9px] tracking-[0.22em] uppercase"
                style={{ color: `color-mix(in oklab, ${accent} 42%, var(--color-fg-primary))` }}
              >
                {item.sectionLabel}
              </span>
              <span className="text-fg-secondary group-hover:text-accent-gold truncate text-sm transition-colors">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
