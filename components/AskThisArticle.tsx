import type { AskPrompt } from "@/lib/article-discovery";

/** Static Socratic prompts that scroll to in-article h2 anchors. */
export function AskThisArticle({ prompts, accent }: { prompts: AskPrompt[]; accent: string }) {
  if (prompts.length < 2) return null;

  return (
    <nav
      aria-label="问问这篇"
      className="print-hidden border-border-faint bg-bg-panel/60 mb-10 border px-4 py-4 sm:px-5"
    >
      <p className="text-fg-muted mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
        问问这篇
      </p>
      <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {prompts.map((p) => (
          <li key={p.href}>
            <a
              href={p.href}
              className="text-fg-secondary hover:text-fg-primary inline-flex items-center gap-2 border px-3 py-2 text-[13px] leading-snug transition-colors"
              style={{ borderColor: `${accent}35` }}
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: accent }}
              />
              {p.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
