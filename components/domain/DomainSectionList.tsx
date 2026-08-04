import { DomainSectionListBrowser } from "@/components/domain/DomainSectionListBrowser";
import type {
  SectionListBadge,
  SectionListEntry,
} from "@/components/domain/DomainSectionListBrowser";
import { groupBacklinks } from "@/lib/backlinks";
import { DOMAINS } from "@/lib/data";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";
import { notFound } from "next/navigation";

// Same accent source as <CrossDomainBadge> — the badge itself stays server-only
// (it reads the ~275 KB backlink index), so list cards receive precomputed
// dot colors as plain data for the client-side browser to render.
const ACCENT_BY_DOMAIN: Record<string, string> = Object.fromEntries(
  DOMAINS.map((d) => [d.id, d.glowColor])
);

export function DomainSectionList({ domain, section }: { domain: string; section: string }) {
  const domainConfig = getDomainConfig(domain);
  const sectionConfig = getSectionConfig(domain, section);
  if (!domainConfig || !sectionConfig) notFound();

  const items = createKnowledgeSection(domain, section).getAll();
  const accent = sectionConfig.accent;

  const entries: SectionListEntry[] = items.map((item) => ({
    slug: item.slug,
    title: item.title,
    titleEn: item.titleEn,
    excerpt: item.excerpt,
    tags: item.tags,
    category: item.category || sectionConfig.label,
    info0: item.info[0]?.value,
  }));

  const badges: Record<string, SectionListBadge> = {};
  for (const item of items) {
    const { crossDomain } = groupBacklinks(`/${domain}/${section}/${item.slug}`);
    if (crossDomain.length > 0) {
      badges[item.slug] = {
        colors: crossDomain.map((g) => ACCENT_BY_DOMAIN[g.domain] ?? "currentColor"),
        count: crossDomain.length,
        names: crossDomain.map((g) => g.label).join("、"),
      };
    }
  }

  return (
    <div data-testid="domain-section-list" className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <header className="mb-12 max-w-3xl">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          {domain} / {section}
        </p>
        <h1 className="font-display text-fg-primary text-[2.4rem] leading-tight tracking-tight md:text-[3.2rem]">
          {sectionConfig.label}
        </h1>
        <p className="text-fg-secondary mt-4 text-[15px] leading-relaxed">
          {sectionConfig.description}
        </p>
        {items.length > 0 && (
          <p className="text-fg-disabled mt-3 font-mono text-[11px] tracking-[0.22em]">
            {items.length} 篇
          </p>
        )}
      </header>

      {items.length > 0 ? (
        <DomainSectionListBrowser
          domain={domain}
          section={section}
          accent={accent}
          entries={entries}
          badges={badges}
        />
      ) : (
        <div className="border-border-faint bg-bg-panel mt-12 border p-12 text-center">
          <p className="text-fg-muted font-mono text-[11px] tracking-[0.22em] uppercase">
            内容撰写中
          </p>
          <p className="text-fg-secondary mt-2 text-sm">该板块的内容正在整理中，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
