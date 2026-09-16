import { withCanonicalPath } from "@/lib/article-canonical";
import { serializeJsonLd } from "@/lib/jsonld";
import { notFound } from "next/navigation";
import { cosmologyKB } from "@/lib/cosmology-kb";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleLayout } from "@/components/ArticleLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

const ACCENT = "#6ea8d8";

export function generateStaticParams() {
  return []; // On-demand SSG: build on first request, then cache until the next deployment
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = cosmologyKB.getArticleBySlug(slug);
  if (!article) notFound();
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(article.title)}&section=cosmology&description=${encodeURIComponent(article.excerpt)}`;
  return withCanonicalPath(`/cosmology/knowledge-base/${slug}`, {
    title: `${article.title} — 宇宙学知识库`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} — 宇宙学知识库`,
      description: article.excerpt,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  });
}

export default async function CosmologyKnowledgeArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = cosmologyKB.getArticleBySlug(slug);
  if (!article) notFound();

  const articles = cosmologyKB.getAllArticles();
  const currentIndex = articles.findIndex((item) => item.slug === article.slug);
  const prev = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const url = `/cosmology/knowledge-base/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: `${SITE_URL}${url}`,
    author: { "@type": "Organization", name: "Episteme · 格致" },
    publisher: { "@type": "Organization", name: "Episteme · 格致", url: SITE_URL },
    keywords: article.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <ArticleLayout
        domain="cosmology"
        backHref="/cosmology/knowledge-base"
        backLabel="← 返回知识库"
        url={url}
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "宇宙学", href: "/cosmology" },
              { label: "知识库", href: "/cosmology/knowledge-base" },
              { label: article.title },
            ]}
          />
        }
        accent={ACCENT}
        eyebrow={article.category}
        title={article.title}
        content={article.content}
        tags={article.tags}
        prev={prev ? { href: `/cosmology/knowledge-base/${prev.slug}`, title: prev.title } : null}
        next={next ? { href: `/cosmology/knowledge-base/${next.slug}`, title: next.title } : null}
        sidebar={<TableOfContents accentColor={ACCENT} />}
      >
        <MarkdownRenderer domain="cosmology" content={article.content} accentColor={ACCENT} />
      </ArticleLayout>
    </>
  );
}
