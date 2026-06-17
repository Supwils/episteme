import { notFound } from "next/navigation";
import Link from "next/link";
import { getDialogueBySlug, getDialogueSlugs } from "@/lib/dialogues";
import InteractiveDialogue from "@/subjects/philosophy/components/InteractiveDialogue";
import { FIELD_COLORS } from "@/subjects/philosophy/lib/constants";

export function generateStaticParams() {
  return getDialogueSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dialogue = getDialogueBySlug(slug);
  if (!dialogue) return {};
  const description = `以交互式方式探索${dialogue.participants.join("、")}的对话：${dialogue.title_en}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://episteme.vercel.app";
  const ogImage = `${siteUrl}/api/og?title=${encodeURIComponent(dialogue.title)}&section=philosophy&description=${encodeURIComponent(description)}`;
  return {
    title: `交互式阅读 — ${dialogue.title}`,
    description,
    openGraph: {
      title: `交互式阅读 — ${dialogue.title}`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

const PARTICIPANT_COLORS = ["#c8a45a", "#61afef", "#e06c75", "#98c379", "#c678dd", "#56b6c2"];

function parseDialogueSteps(content: string, participants: string[]) {
  const sections = content.split(/\n## /).filter(Boolean);
  const steps: { speaker: string; text: string; argument: string }[] = [];
  let speakerIndex = 0;

  for (const section of sections) {
    const lines = section.split("\n");
    const heading = lines[0]?.replace(/^#+\s*/, "").trim() ?? "";
    const body = lines.slice(1).join("\n").trim();

    if (!body) continue;

    const paragraphs = body.split(/\n\n+/).filter(Boolean);

    for (const para of paragraphs) {
      const speaker = participants[speakerIndex % participants.length]!;
      steps.push({
        speaker,
        text: para.trim(),
        argument: heading,
      });
      speakerIndex++;
    }
  }

  return steps;
}

export default async function InteractiveDialoguePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dialogue = getDialogueBySlug(slug);
  if (!dialogue) notFound();

  const fieldColor = FIELD_COLORS[dialogue.field] || "#c8a45a";

  const participantsWithColors = dialogue.participants.map((name, i) => ({
    name,
    color: PARTICIPANT_COLORS[i % PARTICIPANT_COLORS.length]!,
  }));

  const steps = parseDialogueSteps(dialogue.content, dialogue.participants);

  const question =
    dialogue.content
      .split("\n")
      .find((line) => line.trim().length > 0)
      ?.trim() ?? dialogue.title;

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-16">
      <Link
        href={`/philosophy/dialogues/${slug}`}
        className="text-fg-muted hover:text-accent-gold mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回{dialogue.title}
      </Link>

      <header className="border-border-faint bg-bg-panel relative mb-10 overflow-hidden border p-6 backdrop-blur-md">
        <div
          className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: fieldColor }}
        />
        <div className="relative">
          <span
            className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.32em] uppercase"
            style={{ borderColor: `${fieldColor}50`, color: fieldColor }}
          >
            交互式阅读
          </span>
          <h1 className="font-display text-fg-primary mt-3 text-[1.8rem] leading-tight font-semibold tracking-tight md:text-[2.4rem]">
            {dialogue.title}
          </h1>
          <p className="text-fg-muted font-display text-base tracking-wide italic opacity-70">
            {dialogue.title_en}
          </p>
        </div>
      </header>

      <InteractiveDialogue
        participants={participantsWithColors}
        steps={steps}
        question={question}
      />

      <nav className="border-border-faint mt-12 flex justify-center border-t pt-8">
        <Link
          href={`/philosophy/dialogues/${slug}`}
          className="group border-border-faint hover:border-fg-disabled/30 hover:bg-bg-panel flex items-center gap-2 border p-4 transition-all duration-300"
        >
          <span className="text-fg-muted group-hover:text-accent-gold font-mono text-[10px] tracking-[0.22em] uppercase transition-colors">
            返回普通阅读模式
          </span>
        </Link>
      </nav>
    </div>
  );
}
