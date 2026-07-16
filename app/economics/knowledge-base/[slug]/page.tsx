import { notFound } from "next/navigation";
import { getKnowledgeBaseBySlug, getAllKnowledgeBase } from "@/subjects/economics/lib/mdx";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

const CATEGORY_COLORS: Record<string, string> = {
  国际金融: "#61afef",
  货币政策: "#e5c07b",
  金融市场: "#c8a45a",
  房地产: "#d47850",
  个人理财: "#98c379",
  宏观经济: "#a88adf",
  行为经济学应用: "#c678dd",
  投资学: "#e06c75",
};

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getKnowledgeBaseBySlug(slug);
  if (!article) notFound();
  return {
    title: `${article.title} — 知识库 — 经济学`,
    description: article.title,
  };
}

export default async function KnowledgeBaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getKnowledgeBaseBySlug(slug);
  if (!article) notFound();

  const allArticles = getAllKnowledgeBase();
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const prev = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const next = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const accent = CATEGORY_COLORS[article.category] ?? "#c8a45a";

  return (
    <ArticleLayout
      backHref="/economics/knowledge-base"
      backLabel="← 返回知识库"
      accent={accent}
      eyebrow={article.category}
      title={article.title}
      titleEn={article.title_en}
      content={article.content}
      tags={article.tags}
      articleClassName="max-w-[900px]"
      prev={prev ? { href: `/economics/knowledge-base/${prev.slug}`, title: prev.title } : null}
      next={next ? { href: `/economics/knowledge-base/${next.slug}`, title: next.title } : null}
      sidebar={
        <>
          <TableOfContents accentColor={accent} />
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
      <MarkdownRenderer domain="economics" content={article.content} accentColor={accent} />
    </ArticleLayout>
  );
}
