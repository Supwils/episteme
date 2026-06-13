import type { Metadata } from "next";
import Link from "next/link";
import { universePhysicsDialogues } from "@/lib/universe-physics-dialogues";

const DESCRIPTION =
  "跨越时代的物理学家对话——爱因斯坦与康德、玻尔与海森堡、特斯拉与爱迪生，在思想交锋中理解物理学的核心争论";

export const metadata: Metadata = {
  title: "物理学对话 — Universe Knowledge",
  description: DESCRIPTION,
  openGraph: {
    title: "物理学对话 — Universe Knowledge",
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "物理学对话 — Universe Knowledge",
    description: DESCRIPTION,
  },
};

export default function PhysicsDialoguesPage() {
  const dialogues = universePhysicsDialogues.getAll();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10 lg:px-16">
      <Link
        href="/universe-physics"
        className="text-fg-muted hover:text-fg-primary mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
      >
        ← 返回物理学
      </Link>

      <header className="mb-12">
        <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.42em] uppercase">
          physics / dialogues
        </p>
        <h1 className="text-fg-primary mb-4 text-3xl font-semibold sm:text-4xl">物理学对话</h1>
        <p className="text-fg-secondary max-w-2xl text-[15px] leading-relaxed">{DESCRIPTION}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {dialogues.map((d) => (
          <Link
            key={d.slug}
            href={`/universe-physics/dialogues/${d.slug}`}
            className="border-border-faint bg-bg-panel hover:border-border-subtle group rounded-lg border p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5"
          >
            <h2 className="text-fg-primary group-hover:text-accent-cool mb-2 text-base font-semibold transition-colors">
              {d.title}
            </h2>
            {d.description && (
              <p className="text-fg-secondary line-clamp-2 text-[13px] leading-relaxed">
                {d.description}
              </p>
            )}
            {d.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {d.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-fg-muted border-border-faint rounded border px-1.5 py-0.5 font-mono text-[10px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
