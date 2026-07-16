import Link from "next/link";
import { serializeJsonLd } from "@/lib/jsonld";
import { notFound } from "next/navigation";
import { cosmologyKB } from "@/lib/cosmology-kb";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ReadingModeControls } from "@/components/ReadingModeControls";
import { SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

const ACCENT = "#6ea8d8";

export function generateStaticParams() {
  return []; // ISR: render on first request + cache; skip build prerender to bound deploy file count
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = cosmologyKB.getArticleBySlug(slug);
  if (!article) notFound();
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(article.title)}&section=cosmology&description=${encodeURIComponent(article.excerpt)}`;
  return {
    title: `${article.title} — 宇宙学知识库`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} — 宇宙学知识库`,
      description: article.excerpt,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function CosmologyKnowledgeArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = cosmologyKB.getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: `${SITE_URL}/cosmology/knowledge-base/${slug}`,
    author: { "@type": "Organization", name: "Episteme · 格致" },
    publisher: { "@type": "Organization", name: "Episteme · 格致", url: SITE_URL },
    keywords: article.tags.join(", "),
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <nav className="article-reading-chrome mb-8 flex items-center justify-between gap-4">
        <Link
          href="/cosmology/knowledge-base"
          className="text-fg-muted hover:text-fg-primary inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
        >
          ← 返回知识库
        </Link>
        <span className="text-fg-muted font-mono text-[10px] tracking-[0.2em] uppercase">
          {article.category}
        </span>
      </nav>

      <article className="article-reading-surface mx-auto transition-[max-width] duration-300">
        <header className="mb-10">
          <div className="mb-6 flex justify-end">
            <ReadingModeControls />
          </div>
          <h1 className="text-fg-primary mb-4 text-3xl leading-tight font-semibold sm:text-4xl">
            {article.title}
          </h1>
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-fg-muted border-border-faint rounded border px-2 py-0.5 font-mono text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <MarkdownRenderer domain="cosmology" content={article.content} accentColor={ACCENT} />
      </article>

      <footer className="border-border-subtle mt-12 border-t pt-6">
        <Link
          href="/cosmology/knowledge-base"
          className="text-fg-muted hover:text-fg-primary inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
        >
          ← 返回知识库
        </Link>
      </footer>
    </div>
  );
}
