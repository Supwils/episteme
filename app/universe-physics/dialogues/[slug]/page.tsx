import Link from "next/link";
import { notFound } from "next/navigation";
import { universePhysicsDialogues } from "@/lib/universe-physics-dialogues";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

const ACCENT = "#7c9fd6";

export function generateStaticParams() {
  return universePhysicsDialogues.getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dialogue = universePhysicsDialogues.getBySlug(slug);
  if (!dialogue) notFound();
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(dialogue.title)}&section=universe-physics&description=${encodeURIComponent(dialogue.description)}`;
  return {
    title: `${dialogue.title} — 物理学对话`,
    description: dialogue.description || dialogue.title,
    openGraph: {
      title: `${dialogue.title} — 物理学对话`,
      description: dialogue.description || dialogue.title,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function PhysicsDialogueDetailPage({ params }: Props) {
  const { slug } = await params;
  const dialogue = universePhysicsDialogues.getBySlug(slug);
  if (!dialogue) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: dialogue.title,
    description: dialogue.description || dialogue.title,
    url: `${SITE_URL}/universe-physics/dialogues/${slug}`,
    author: { "@type": "Organization", name: "Universe Knowledge" },
    publisher: { "@type": "Organization", name: "Universe Knowledge", url: SITE_URL },
    keywords: dialogue.tags.join(", "),
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mb-8 flex items-center justify-between">
        <Link
          href="/universe-physics/dialogues"
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
          {dialogue.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {dialogue.tags.map((tag) => (
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

        <MarkdownRenderer content={dialogue.content} accentColor={ACCENT} />
      </article>

      <footer className="border-border-subtle mt-12 border-t pt-6">
        <Link
          href="/universe-physics/dialogues"
          className="text-fg-muted hover:text-fg-primary inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
        >
          ← 返回对话
        </Link>
      </footer>
    </div>
  );
}
