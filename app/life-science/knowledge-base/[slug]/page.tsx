import Link from "next/link";
import { serializeJsonLd } from "@/lib/jsonld";
import { notFound } from "next/navigation";
import { lifeScienceKB } from "@/lib/life-science-kb";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

const ACCENT = "#4a9e6f";

export function generateStaticParams() {
  return []; // On-demand SSG: build on first request, then cache until the next deployment
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = lifeScienceKB.getArticleBySlug(slug);
  if (!article) notFound();
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(article.title)}&section=life-science&description=${encodeURIComponent(article.excerpt)}`;
  return {
    title: `${article.title} — 生命科学知识库`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} — 生命科学知识库`,
      description: article.excerpt,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function LifeScienceKnowledgeArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = lifeScienceKB.getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: `${SITE_URL}/life-science/knowledge-base/${slug}`,
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
      <nav className="mb-8 flex items-center justify-between">
        <Link
          href="/life-science/knowledge-base"
          className="text-fg-muted hover:text-fg-primary inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
        >
          ← 返回知识库
        </Link>
        <span className="text-fg-muted font-mono text-[10px] tracking-[0.2em] uppercase">
          {article.category}
        </span>
      </nav>

      <article>
        <header className="mb-10">
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

        <MarkdownRenderer domain="life-science" content={article.content} accentColor={ACCENT} />
      </article>

      <footer className="border-border-subtle mt-12 border-t pt-6">
        <Link
          href="/life-science/knowledge-base"
          className="text-fg-muted hover:text-fg-primary inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
        >
          ← 返回知识库
        </Link>
      </footer>
    </div>
  );
}
