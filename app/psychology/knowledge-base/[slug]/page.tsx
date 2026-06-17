import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getKnowledgeBaseBySlug, getAllKnowledgeBase } from "@/subjects/psychology/lib/mdx";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { SITE_URL } from "@/lib/constants";
import { createArticleJsonLd } from "@/lib/jsonld";

const ACCENT = "#9b7dc4";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getKnowledgeBaseBySlug(slug);
  if (!article) notFound();
  const description = article.title_en || article.title;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(article.title)}&section=psychology&description=${encodeURIComponent(description)}`;
  return {
    title: `${article.title} — 知识库 — 心理学`,
    description,
    openGraph: {
      title: `${article.title} — 知识库 — 心理学`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function PsychologyKnowledgeBaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getKnowledgeBaseBySlug(slug);
  if (!article) notFound();

  const all = getAllKnowledgeBase();
  const i = all.findIndex((a) => a.slug === slug);
  const prev = i > 0 ? all[i - 1]! : null;
  const next = i >= 0 && i < all.length - 1 ? all[i + 1]! : null;

  const jsonLd = createArticleJsonLd({
    title: article.title,
    description: article.title_en || article.title,
    url: `${SITE_URL}/psychology/knowledge-base/${slug}`,
    keywords: [article.title, article.title_en, article.category, ...article.tags],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleLayout
        backHref="/psychology/knowledge-base"
        backLabel="← 返回知识库"
        accent={ACCENT}
        eyebrow={article.category}
        title={article.title}
        titleEn={article.title_en}
        content={article.content}
        tags={article.tags}
        articleClassName="max-w-[900px]"
        prev={prev ? { href: `/psychology/knowledge-base/${prev.slug}`, title: prev.title } : null}
        next={next ? { href: `/psychology/knowledge-base/${next.slug}`, title: next.title } : null}
        sidebar={
          <>
            <TableOfContents accentColor={ACCENT} />
            <div className="border-border-faint border p-4">
              <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
                文章信息
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                    分类
                  </dt>
                  <dd className="text-fg-primary mt-0.5">{article.category}</dd>
                </div>
                {article.updated && (
                  <div>
                    <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
                      更新日期
                    </dt>
                    <dd className="text-fg-primary mt-0.5">{article.updated}</dd>
                  </div>
                )}
              </dl>
            </div>
          </>
        }
      >
        <MarkdownRenderer content={article.content} accentColor={ACCENT} />
      </ArticleLayout>
    </>
  );
}
