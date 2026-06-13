import Link from "next/link";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";
import { notFound } from "next/navigation";

export function DomainSectionList({ domain, section }: { domain: string; section: string }) {
  const domainConfig = getDomainConfig(domain);
  const sectionConfig = getSectionConfig(domain, section);
  if (!domainConfig || !sectionConfig) notFound();

  const items = createKnowledgeSection(domain, section).getAll();
  const accent = sectionConfig.accent;

  const grouped = new Map<string, typeof items>();
  for (const item of items) {
    const cat = item.category || sectionConfig.label;
    const list = grouped.get(cat) ?? [];
    list.push(item);
    grouped.set(cat, list);
  }

  return (
    <div className="w-full px-6 py-16 sm:px-10 lg:px-16">
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

      {Array.from(grouped.entries()).map(([category, list]) => (
        <section key={category} className="mb-12">
          {grouped.size > 1 && (
            <div className="mb-5 flex items-center gap-3">
              <span
                className="font-mono text-[10px] tracking-[0.32em] uppercase"
                style={{ color: accent }}
              >
                {category}
              </span>
              <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
                {list.length} 篇
              </span>
              <span className="bg-border-faint h-px flex-1" />
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {list.map((item) => (
              <Link
                key={item.slug}
                href={`/${domain}/${section}/${item.slug}`}
                className="group border-border-faint bg-bg-panel hover:border-fg-disabled/30 relative flex flex-col gap-2 overflow-hidden border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <div
                  className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15"
                  style={{ backgroundColor: accent }}
                />
                <div className="relative flex items-center gap-2">
                  <div
                    className="h-5 w-0.5 rounded-full opacity-60"
                    style={{ backgroundColor: accent }}
                  />
                  {item.info[0] && (
                    <span
                      className="font-mono text-[9px] tracking-[0.22em] uppercase"
                      style={{ color: accent }}
                    >
                      {item.info[0].value}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-fg-primary group-hover:text-accent-gold relative text-lg leading-snug font-semibold transition-colors">
                  {item.title}
                </h3>
                {item.titleEn && (
                  <p className="text-fg-muted font-display -mt-1 text-sm tracking-wide italic opacity-60">
                    {item.titleEn}
                  </p>
                )}
                <p className="text-fg-secondary relative flex-1 text-sm leading-relaxed">
                  {item.excerpt}
                </p>
                {item.tags.length > 0 && (
                  <p className="text-fg-disabled relative font-mono text-[10px] tracking-wider">
                    {item.tags.slice(0, 3).join(" · ")}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      ))}

      {items.length === 0 && (
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
