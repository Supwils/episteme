import { notFound } from "next/navigation";
import Link from "next/link";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import { getDomainConfig, getSectionConfig } from "@/lib/new-domains";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import type { Domain } from "@/lib/cross-domain-refs";
import { SITE_URL } from "@/lib/constants";
import { createArticleJsonLd } from "@/lib/jsonld";
import { bibliographyToJsonLd } from "@/lib/citations";

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

  const related = all
    .filter((a) => a.slug !== article.slug && article.related.includes(a.slug))
    .slice(0, 5);

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
                      href={`/${domain}/${section}/${r.slug}`}
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
        <MarkdownRenderer content={article.content} accentColor={accent} />
        <RelatedContent slug={slug} domain={domain as Domain} entityId={slug} />
      </ArticleLayout>
    </>
  );
}
