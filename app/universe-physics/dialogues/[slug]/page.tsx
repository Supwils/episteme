import { withCanonicalPath } from "@/lib/article-canonical";
import { serializeJsonLd } from "@/lib/jsonld";
import { notFound } from "next/navigation";
import { universePhysicsDialogues } from "@/lib/universe-physics-dialogues";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleLayout } from "@/components/ArticleLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

const ACCENT = "#7c9fd6";

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dialogue = universePhysicsDialogues.getBySlug(slug);
  if (!dialogue) notFound();
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(dialogue.title)}&section=universe-physics&description=${encodeURIComponent(dialogue.description)}`;
  return withCanonicalPath(`/universe-physics/dialogues/${slug}`, {
    title: `${dialogue.title} — 物理学对话`,
    description: dialogue.description || dialogue.title,
    openGraph: {
      title: `${dialogue.title} — 物理学对话`,
      description: dialogue.description || dialogue.title,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  });
}

export default async function PhysicsDialogueDetailPage({ params }: Props) {
  const { slug } = await params;
  const dialogue = universePhysicsDialogues.getBySlug(slug);
  if (!dialogue) notFound();

  const all = universePhysicsDialogues.getAll();
  const currentIndex = all.findIndex((item) => item.slug === dialogue.slug);
  const prev = currentIndex > 0 ? all[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < all.length - 1 ? all[currentIndex + 1] : null;
  const url = `/universe-physics/dialogues/${dialogue.slug}`;

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
        domain="universe-physics"
        backHref="/universe-physics/dialogues"
        backLabel="← 返回对话"
        url={url}
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "物理学", href: "/universe-physics" },
              { label: "对话", href: "/universe-physics/dialogues" },
              { label: dialogue.title },
            ]}
          />
        }
        accent={ACCENT}
        eyebrow="物理学对话"
        title={dialogue.title}
        content={dialogue.content}
        lede={dialogue.description || undefined}
        tags={dialogue.tags}
        prev={prev ? { href: `/universe-physics/dialogues/${prev.slug}`, title: prev.title } : null}
        next={next ? { href: `/universe-physics/dialogues/${next.slug}`, title: next.title } : null}
        sidebar={<TableOfContents accentColor={ACCENT} />}
      >
        <MarkdownRenderer
          domain="universe-physics"
          content={dialogue.content}
          accentColor={ACCENT}
        />
      </ArticleLayout>
    </>
  );
}
