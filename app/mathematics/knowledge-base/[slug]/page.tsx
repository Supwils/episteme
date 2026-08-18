import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/ArticleLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TableOfContents } from "@/components/TableOfContents";
import { mathematicsKB } from "@/lib/mathematics-kb";

interface Props {
  params: Promise<{ slug: string }>;
}

const ACCENT = "#8b6fd0";

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = mathematicsKB.getArticleBySlug(slug);
  if (!article) notFound();
  return {
    title: `${article.title} — 数学深度阅读`,
    description: article.excerpt,
  };
}

export default async function MathematicsKnowledgeArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = mathematicsKB.getArticleBySlug(slug);
  if (!article) notFound();

  const articles = mathematicsKB.getAllArticles();
  const currentIndex = articles.findIndex((item) => item.slug === article.slug);
  const prev = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const url = `/mathematics/knowledge-base/${article.slug}`;

  return (
    <ArticleLayout
      backHref="/mathematics/knowledge-base"
      backLabel="← 返回深度阅读"
      url={url}
      breadcrumb={
        <Breadcrumb
          items={[
            { label: "数学", href: "/mathematics" },
            { label: "深度阅读", href: "/mathematics/knowledge-base" },
            { label: article.title },
          ]}
        />
      }
      accent={ACCENT}
      eyebrow={article.category}
      title={article.title}
      content={article.content}
      tags={article.tags}
      prev={prev ? { href: `/mathematics/knowledge-base/${prev.slug}`, title: prev.title } : null}
      next={next ? { href: `/mathematics/knowledge-base/${next.slug}`, title: next.title } : null}
      sidebar={<TableOfContents accentColor={ACCENT} />}
    >
      <MarkdownRenderer domain="mathematics" content={article.content} accentColor={ACCENT} />
    </ArticleLayout>
  );
}
