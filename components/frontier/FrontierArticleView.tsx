import { notFound } from "next/navigation";
import { createFrontier, FRONTIER_DOMAIN_CONFIG, type FrontierDomain } from "@/lib/frontier";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import RelatedContent from "@/components/RelatedContent";
import Breadcrumb from "@/components/Breadcrumb";
import type { Domain } from "@/lib/cross-domain-refs";
import { SITE_URL } from "@/lib/constants";
import { serializeJsonLd, createArticleJsonLd } from "@/lib/jsonld";
import { bibliographyToJsonLd } from "@/lib/citations";

/** Domains that participate in the cross-domain reference graph. */
const CROSS_DOMAINS = new Set<string>([
  "universe-physics",
  "cosmology",
  "mathematics",
  "life-science",
  "philosophy",
  "economics",
  "psychology",
  "human-history",
  "computer-science",
  "political-science",
]);

function MetaList({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">{label}</dt>
      <dd className="text-fg-primary mt-1 space-y-0.5">
        {items.map((item) => (
          <div key={item} className="text-sm leading-snug">
            {item}
          </div>
        ))}
      </dd>
    </div>
  );
}

export function FrontierArticleView({ domain, slug }: { domain: FrontierDomain; slug: string }) {
  const config = FRONTIER_DOMAIN_CONFIG[domain];
  const frontier = createFrontier(domain);
  const article = frontier.getArticleBySlug(slug);
  if (!article) notFound();

  const all = frontier.getAllArticles();
  const currentIndex = all.findIndex((a) => a.slug === article.slug);
  const prev = currentIndex > 0 ? all[currentIndex - 1] : null;
  const next = currentIndex < all.length - 1 ? all[currentIndex + 1] : null;
  const accent = config.accent;

  const jsonLd = createArticleJsonLd({
    title: article.title,
    description: article.titleEn || article.title,
    url: `${SITE_URL}/${domain}/frontier/${slug}`,
    dateModified: article.updated || undefined,
    keywords: [article.title, article.category, ...article.tags].filter((k): k is string =>
      Boolean(k)
    ),
    citations: bibliographyToJsonLd(article.content),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <ArticleLayout
        backHref={`/${domain}/frontier`}
        backLabel="← 返回研究前沿"
        breadcrumb={
          <Breadcrumb
            items={[
              { label: config.label, href: config.backHref },
              { label: "研究前沿", href: `/${domain}/frontier` },
              { label: article.title },
            ]}
          />
        }
        accent={accent}
        eyebrow={article.category}
        eyebrowMeta={article.horizon ? [article.horizon] : undefined}
        title={article.title}
        titleEn={article.titleEn || undefined}
        content={article.content}
        tags={article.tags}
        articleClassName="max-w-[900px]"
        prev={prev ? { href: `/${domain}/frontier/${prev.slug}`, title: prev.title } : null}
        next={next ? { href: `/${domain}/frontier/${next.slug}`, title: next.title } : null}
        sidebar={
          <>
            <TableOfContents accentColor={accent} />
            <div className="border-border-faint border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                前沿信息
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    方向
                  </dt>
                  <dd className="text-fg-primary mt-1 text-sm">{article.category}</dd>
                </div>
                {article.horizon && (
                  <div>
                    <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                      时间跨度
                    </dt>
                    <dd className="text-fg-primary mt-1 text-sm">{article.horizon}</dd>
                  </div>
                )}
                <MetaList label="代表性研究者 / 团队" items={article.researchers} />
                <MetaList label="机构 / 实验" items={article.institutions} />
                {article.updated && (
                  <div>
                    <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                      更新日期
                    </dt>
                    <dd className="text-fg-primary mt-1 text-sm">{article.updated}</dd>
                  </div>
                )}
              </dl>
            </div>
          </>
        }
      >
        <MarkdownRenderer content={article.content} accentColor={accent} />
        {CROSS_DOMAINS.has(domain) && (
          <RelatedContent slug={slug} domain={domain as Domain} entityId={slug} />
        )}
      </ArticleLayout>
    </>
  );
}
