import Link from "next/link";

interface ThinkerNavProps {
  prevThinker: { slug: string; title: string; philosopher: string; era: string } | null;
  nextThinker: { slug: string; title: string; philosopher: string; era: string } | null;
}

export default function ThinkerNav({ prevThinker, nextThinker }: ThinkerNavProps) {
  return (
    <nav className="border-border-faint mt-16 border-t pt-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {prevThinker ? (
          <Link
            href={`/thinkers/${prevThinker.slug}`}
            className="group border-border-faint bg-bg-near hover:bg-bg-elevated flex flex-col gap-2 border p-5 transition-all duration-300"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.28em] uppercase">
              ← 上一位
            </span>
            <span className="font-display text-fg-primary text-lg font-semibold transition-colors group-hover:text-accent-gold">
              {prevThinker.title}
            </span>
            <span className="text-fg-muted font-mono text-[10px] italic">
              {prevThinker.philosopher} · {prevThinker.era}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {nextThinker ? (
          <Link
            href={`/thinkers/${nextThinker.slug}`}
            className="group border-border-faint bg-bg-near hover:bg-bg-elevated flex flex-col items-end gap-2 border p-5 text-right transition-all duration-300"
          >
            <span className="text-fg-disabled font-mono text-[9px] tracking-[0.28em] uppercase">
              下一位 →
            </span>
            <span className="font-display text-fg-primary text-lg font-semibold transition-colors group-hover:text-accent-gold">
              {nextThinker.title}
            </span>
            <span className="text-fg-muted font-mono text-[10px] italic">
              {nextThinker.philosopher} · {nextThinker.era}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
