import Link from "next/link";
import { serializeJsonLd } from "@/lib/jsonld";
import { notFound } from "next/navigation";
import { cosmologyDialogues } from "@/lib/cosmology-dialogues";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

const ACCENT = "#6ea8d8";

export function generateStaticParams() {
  // On-demand ISR: not prerendered at build (dynamicParams defaults to true); renders
  // on first request and is cached. Keeps build output small as content grows.
  return [];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dialogue = cosmologyDialogues.getBySlug(slug);
  if (!dialogue) notFound();
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(dialogue.title)}&section=cosmology&description=${encodeURIComponent(dialogue.description)}`;
  return {
    title: `${dialogue.title} — 宇宙学对话`,
    description: dialogue.description || dialogue.title,
    openGraph: {
      title: `${dialogue.title} — 宇宙学对话`,
      description: dialogue.description || dialogue.title,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function CosmologyDialogueDetailPage({ params }: Props) {
  const { slug } = await params;
  const dialogue = cosmologyDialogues.getBySlug(slug);
  if (!dialogue) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: dialogue.title,
    description: dialogue.description || dialogue.title,
    url: `${SITE_URL}/cosmology/dialogues/${slug}`,
    author: { "@type": "Organization", name: "Episteme · 格致" },
    publisher: { "@type": "Organization", name: "Episteme · 格致", url: SITE_URL },
    keywords: dialogue.tags.join(", "),
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <nav className="mb-8 flex items-center justify-between">
        <Link
          href="/cosmology/dialogues"
          className="text-fg-muted hover:text-fg-primary inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
        >
          ← 返回对话
        </Link>
      </nav>

      <article>
        <header className="mb-10">
          <h1 className="text-fg-primary mb-4 text-3xl leading-tight font-semibold sm:text-4xl">
            {dialogue.title}
          </h1>
          {dialogue.description && (
            <p className="text-fg-secondary text-[15px] leading-relaxed">{dialogue.description}</p>
          )}
          {dialogue.participants.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {dialogue.participants.map((name) => (
                <span
                  key={name}
                  className="text-fg-muted border-border-faint rounded border px-2 py-0.5 font-mono text-[10px]"
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </header>

        <MarkdownRenderer domain="cosmology" content={dialogue.content} accentColor={ACCENT} />
      </article>

      <footer className="border-border-subtle mt-12 border-t pt-6">
        <Link
          href="/cosmology/dialogues"
          className="text-fg-muted hover:text-fg-primary inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
        >
          ← 返回对话
        </Link>
      </footer>
    </div>
  );
}
