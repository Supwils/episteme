import { notFound } from "next/navigation";
import Link from "next/link";
import { getKnowledgeBaseBySlug, getKnowledgeBaseSlugs, getAllKnowledgeBase } from "@/subjects/economics/lib/mdx";
import { TableOfContents } from "@/components/TableOfContents";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

const CATEGORY_COLORS: Record<string, string> = {
  "国际金融": "#61afef",
  "货币政策": "#e5c07b",
  "金融市场": "#c8a45a",
  "房地产": "#d47850",
  "个人理财": "#98c379",
  "宏观经济": "#a88adf",
  "行为经济学应用": "#c678dd",
  "投资学": "#e06c75",
};

export function generateStaticParams() {
  return getKnowledgeBaseSlugs().map((slug) => ({ slug }));
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

export default async function KnowledgeBaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getKnowledgeBaseBySlug(slug);
  if (!article) notFound();

  const allArticles = getAllKnowledgeBase();
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const prev = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const next = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const accent = CATEGORY_COLORS[article.category] ?? "#c8a45a";
  const wordCount = article.content.length;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 400));

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <Link
        href="/economics/knowledge-base"
        className="text-fg-muted hover:text-accent-gold mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回知识库
      </Link>

      <header className="relative mb-12 overflow-hidden border border-border-faint bg-bg-panel p-8 backdrop-blur-md">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: accent }}
        />
        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center gap-2.5">
            <span
              className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ borderColor: `${accent}30`, color: accent, backgroundColor: `${accent}10` }}
            >
              {article.category}
            </span>
            <span className="text-fg-disabled font-mono text-[10px] tracking-[0.22em]">
              约 {readMinutes} 分钟阅读
            </span>
          </div>

          <h1 className="font-display text-fg-primary mb-2 text-[2rem] leading-tight font-semibold tracking-tight md:text-[2.8rem]">
            {article.title}
          </h1>
          {article.title_en && (
            <p className="text-fg-muted font-display text-lg italic tracking-wide opacity-70">
              {article.title_en}
            </p>
          )}

          {article.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.12em]"
                  style={{ borderColor: `${accent}20`, color: `${accent}cc`, backgroundColor: `${accent}08` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-col gap-12 lg:flex-row">
        <article className="min-w-0 flex-1 max-w-[900px]">
          <MarkdownRenderer content={article.content} accentColor={accent} />
        </article>

        <aside className="w-full flex-shrink-0 lg:w-80">
          <TableOfContents accentColor={accent} />
          <div className="border-border-faint border p-4">
            <h3 className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
              文章信息
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">分类</dt>
                <dd className="text-fg-primary mt-0.5">{article.category}</dd>
              </div>
              {article.updated && (
                <div>
                  <dt className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">更新日期</dt>
                  <dd className="text-fg-primary mt-0.5">{article.updated}</dd>
                </div>
              )}
            </dl>
          </div>
        </aside>
      </div>

      <nav className="border-border-faint mt-16 flex items-stretch justify-between gap-4 border-t pt-8">
        {prev ? (
          <Link
            href={`/economics/knowledge-base/${prev.slug}`}
            className="group flex flex-1 flex-col gap-1 border border-border-faint p-4 transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">← 上一篇</span>
            <span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-gold">
              {prev.title}
            </span>
          </Link>
        ) : <div className="flex-1" />}
        {next ? (
          <Link
            href={`/economics/knowledge-base/${next.slug}`}
            className="group flex flex-1 flex-col items-end gap-1 border border-border-faint p-4 text-right transition-all duration-300 hover:border-fg-disabled/30 hover:bg-bg-panel"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.22em] uppercase">下一篇 →</span>
            <span className="font-display text-fg-secondary text-sm font-medium transition-colors group-hover:text-accent-gold">
              {next.title}
            </span>
          </Link>
        ) : <div className="flex-1" />}
      </nav>
    </div>
  );
}
