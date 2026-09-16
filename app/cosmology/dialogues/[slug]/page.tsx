import { withCanonicalPath } from "@/lib/article-canonical";
import { serializeJsonLd } from "@/lib/jsonld";
import { notFound } from "next/navigation";
import { cosmologyDialogues } from "@/lib/cosmology-dialogues";
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
  return [];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dialogue = cosmologyDialogues.getBySlug(slug);
  if (!dialogue) notFound();
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(dialogue.title)}&section=cosmology&description=${encodeURIComponent(dialogue.description)}`;
  return withCanonicalPath(`/cosmology/dialogues/${slug}`, {
    title: `${dialogue.title} — 宇宙学对话`,
    description: dialogue.description || dialogue.title,
    openGraph: {
      title: `${dialogue.title} — 宇宙学对话`,
      description: dialogue.description || dialogue.title,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  });
}

export default async function CosmologyDialogueDetailPage({ params }: Props) {
  const { slug } = await params;
  const dialogue = cosmologyDialogues.getBySlug(slug);
  if (!dialogue) notFound();

  const all = cosmologyDialogues.getAll();
  const currentIndex = all.findIndex((item) => item.slug === dialogue.slug);
  const prev = currentIndex > 0 ? all[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < all.length - 1 ? all[currentIndex + 1] : null;
  const url = `/cosmology/dialogues/${dialogue.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: dialogue.title,
    description: dialogue.description || dialogue.title,
    url: `${SITE_URL}${url}`,
    author: { "@type": "Organization", name: "Episteme · 格致" },
    publisher: { "@type": "Organization", name: "Episteme · 格致", url: SITE_URL },
    keywords: dialogue.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <ArticleLayout
        domain="cosmology"
        backHref="/cosmology/dialogues"
        backLabel="← 返回对话"
        url={url}
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "宇宙学", href: "/cosmology" },
              { label: "对话", href: "/cosmology/dialogues" },
              { label: dialogue.title },
            ]}
          />
        }
        accent={ACCENT}
        eyebrow="宇宙学对话"
        title={dialogue.title}
        content={dialogue.content}
        lede={dialogue.description || undefined}
        tags={dialogue.tags}
        meta={
          dialogue.participants.length > 0 ? (
            <>对话者：{dialogue.participants.join("、")}</>
          ) : undefined
        }
        prev={prev ? { href: `/cosmology/dialogues/${prev.slug}`, title: prev.title } : null}
        next={next ? { href: `/cosmology/dialogues/${next.slug}`, title: next.title } : null}
        sidebar={<TableOfContents accentColor={ACCENT} />}
      >
        <MarkdownRenderer domain="cosmology" content={dialogue.content} accentColor={ACCENT} />
      </ArticleLayout>
    </>
  );
}
