import { withCanonicalPath } from "@/lib/article-canonical";
import { serializeJsonLd } from "@/lib/jsonld";
import { notFound } from "next/navigation";
import { lifeScienceKB } from "@/lib/life-science-kb";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleLayout } from "@/components/ArticleLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

const ACCENT = "#4a9e6f";

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = lifeScienceKB.getArticleBySlug(slug);
  if (!article) notFound();
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(article.title)}&section=life-science&description=${encodeURIComponent(article.excerpt)}`;
  return withCanonicalPath(`/life-science/knowledge-base/${slug}`, {
    title: `${article.title} — 生命科学知识库`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} — 生命科学知识库`,
      description: article.excerpt,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  });
}

export default async function LifeScienceKnowledgeArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = lifeScienceKB.getArticleBySlug(slug);
  if (!article) notFound();

  const articles = lifeScienceKB.getAllArticles();
  const currentIndex = articles.findIndex((item) => item.slug === article.slug);
  const prev = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const url = `/life-science/knowledge-base/${article.slug}`;

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
        domain="life-science"
        backHref="/life-science/knowledge-base"
        backLabel="← 返回知识库"
        url={url}
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "生命科学", href: "/life-science" },
              { label: "知识库", href: "/life-science/knowledge-base" },
              { label: article.title },
            ]}
          />
        }
        accent={ACCENT}
        eyebrow={article.category}
        title={article.title}
        content={article.content}
        tags={article.tags}
        prev={
          prev ? { href: `/life-science/knowledge-base/${prev.slug}`, title: prev.title } : null
        }
        next={
          next ? { href: `/life-science/knowledge-base/${next.slug}`, title: next.title } : null
        }
        sidebar={<TableOfContents accentColor={ACCENT} />}
      >
        <MarkdownRenderer domain="life-science" content={article.content} accentColor={ACCENT} />
      </ArticleLayout>
    </>
  );
}
