import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import { createFrontier } from "@/lib/frontier";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { MoleculeViewer } from "@/components/molecule/MoleculeViewer";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import type { Domain } from "@/lib/cross-domain-refs";
import { SITE_URL } from "@/lib/constants";
import { createArticleJsonLd } from "@/lib/jsonld";
import { bibliographyToJsonLd } from "@/lib/citations";
import { getNarration } from "@/lib/narration";
import { NarrationButton } from "@/components/narration/NarrationButton";

// `interactive: <id>` in an article's frontmatter renders a matching explorer
// inline. Lazy-loaded so each interactive ships only on the pages that use it.
const INTERACTIVES: Record<string, ComponentType> = {
  "plate-boundaries": dynamic(() =>
    import("@/components/earth-science/PlateBoundaries").then((m) => m.PlateBoundaries)
  ),
  "political-compass": dynamic(() =>
    import("@/components/political-science/PoliticalCompass").then((m) => m.PoliticalCompass)
  ),
  "em-spectrum": dynamic(() =>
    import("@/components/diagrams/ElectromagneticSpectrum").then((m) => m.ElectromagneticSpectrum)
  ),
  "reaction-energy": dynamic(() =>
    import("@/components/diagrams/ReactionEnergyProfile").then((m) => m.ReactionEnergyProfile)
  ),
  "sorting-visualizer": dynamic(() =>
    import("@/components/computer-science/SortingVisualizer").then((m) => m.SortingVisualizer)
  ),
  "complexity-growth": dynamic(() =>
    import("@/components/computer-science/ComplexityChart").then((m) => m.ComplexityChart)
  ),
  "periodic-table": dynamic(() =>
    import("@/components/chemistry/PeriodicTable").then((m) => m.PeriodicTable)
  ),
  "geologic-time-scale": dynamic(() =>
    import("@/components/earth-science/GeologicTimeScale").then((m) => m.GeologicTimeScale)
  ),
  "epidemic-curve": dynamic(() =>
    import("@/components/medicine/EpidemicCurve").then((m) => m.EpidemicCurve)
  ),
  "graph-traversal": dynamic(() =>
    import("@/components/computer-science/GraphTraversal").then((m) => m.GraphTraversal)
  ),
};

type RelatedLink = { slug: string; href: string; title: string };

// `related:` slugs can point to any section of the domain (or a frontier `.md`),
// not just the current one — so resolve them against a domain-wide index instead
// of the current section, or cross-section links (e.g. an institution → a frontier
// piece) silently vanish. Cached per domain since it scans every section's files.
const domainRelatedIndexCache = new Map<string, Map<string, RelatedLink>>();

function getDomainRelatedIndex(domain: string): Map<string, RelatedLink> {
  const cached = domainRelatedIndexCache.get(domain);
  if (cached) return cached;
  const index = new Map<string, RelatedLink>();
  const config = getDomainConfig(domain);
  for (const sec of config?.sections ?? []) {
    for (const item of createKnowledgeSection(domain, sec.key).getAll()) {
      if (!index.has(item.slug)) {
        index.set(item.slug, {
          slug: item.slug,
          href: `/${domain}/${sec.key}/${item.slug}`,
          title: item.title,
        });
      }
    }
  }
  for (const fa of createFrontier(domain).getAllArticles()) {
    if (!index.has(fa.slug)) {
      index.set(fa.slug, {
        slug: fa.slug,
        href: `/${domain}/frontier/${fa.slug}`,
        title: fa.title,
      });
    }
  }
  domainRelatedIndexCache.set(domain, index);
  return index;
}

export function DomainArticle({
  domain,
  section,
  slug,
}: {
  domain: string;
  section: string;
  slug: string;
}) {
  const domainConfig = getDomainConfig(domain);
  const sectionConfig = getSectionConfig(domain, section);
  if (!domainConfig || !sectionConfig) notFound();

  const knowledge = createKnowledgeSection(domain, section);
  const article = knowledge.getBySlug(slug);
  if (!article) notFound();

  const all = knowledge.getAll();
  const currentIndex = all.findIndex((a) => a.slug === article.slug);
  const prev = currentIndex > 0 ? all[currentIndex - 1] : null;
  const next = currentIndex < all.length - 1 ? all[currentIndex + 1] : null;
  const accent = sectionConfig.accent;

  const relatedIndex = getDomainRelatedIndex(domain);
  const related: RelatedLink[] = [];
  for (const relSlug of article.related) {
    if (relSlug === article.slug) continue;
    const hit = relatedIndex.get(relSlug);
    if (hit && !related.some((r) => r.slug === hit.slug)) related.push(hit);
    if (related.length >= 5) break;
  }

  const narration = getNarration(domain, section, slug);

  const jsonLd = createArticleJsonLd({
    title: article.title,
    description: article.titleEn || article.title,
    url: `${SITE_URL}/${domain}/${section}/${slug}`,
    keywords: [article.title, article.category, ...article.tags].filter((k): k is string =>
      Boolean(k)
    ),
    citations: bibliographyToJsonLd(article.content),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleLayout
        backHref={`/${domain}/${section}`}
        backLabel={`← 返回${sectionConfig.label}`}
        breadcrumb={
          <Breadcrumb
            items={[
              { label: domainConfig.label, href: `/${domain}` },
              { label: sectionConfig.label, href: `/${domain}/${section}` },
              { label: article.title },
            ]}
          />
        }
        accent={accent}
        eyebrow={article.category || sectionConfig.label}
        eyebrowMeta={article.info[0] ? [article.info[0].value] : undefined}
        title={article.title}
        titleEn={article.titleEn || undefined}
        content={article.content}
        tags={article.tags}
        articleClassName="max-w-[900px]"
        prev={prev ? { href: `/${domain}/${section}/${prev.slug}`, title: prev.title } : null}
        next={next ? { href: `/${domain}/${section}/${next.slug}`, title: next.title } : null}
        sidebar={
          <>
            <TableOfContents accentColor={accent} />
            {article.info.length > 0 && (
              <div className="border-border-faint border p-4">
                <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                  条目信息
                </h3>
                <dl className="space-y-3 text-sm">
                  {article.info.map((row) => (
                    <div key={row.label}>
                      <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                        {row.label}
                      </dt>
                      <dd className="text-fg-primary mt-0.5">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {related.length > 0 && (
              <div className="border-border-faint mt-4 border p-4">
                <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                  相关条目
                </h3>
                <div className="space-y-2">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={r.href}
                      className="group flex items-center gap-2 transition-colors"
                    >
                      <div
                        className="h-4 w-0.5 rounded-full opacity-40 transition-opacity group-hover:opacity-70"
                        style={{ backgroundColor: accent }}
                      />
                      <span className="text-fg-secondary group-hover:text-accent-gold text-sm transition-colors">
                        {r.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        }
      >
        {narration && (
          <NarrationButton
            id={`${domain}/${section}/${slug}`}
            title={narration.title}
            script={narration.script}
            audioUrl={narration.audioUrl}
            accent={accent}
          />
        )}
        <MarkdownRenderer content={article.content} accentColor={accent} />
        {article.molecule && (
          <MoleculeViewer pdbId={article.molecule} title={article.title} accent={accent} />
        )}
        {article.interactive &&
          INTERACTIVES[article.interactive] &&
          (() => {
            const Interactive = INTERACTIVES[article.interactive]!;
            return <Interactive />;
          })()}
        <RelatedContent slug={slug} domain={domain as Domain} entityId={slug} />
      </ArticleLayout>
    </>
  );
}
