import { KNOWLEDGE_LEVELS, type KnowledgeLevel } from "@/lib/knowledge-levels";

export function CognitiveLevelAxis({
  activeLevel,
  isMobile,
}: {
  activeLevel: KnowledgeLevel | null;
  isMobile: boolean;
}) {
  if (isMobile) {
    return (
      <div
        className="pointer-events-none absolute top-16 right-2 bottom-52 z-10 flex flex-col justify-between"
        aria-hidden="true"
      >
        {KNOWLEDGE_LEVELS.map((level) => (
          <span
            key={level.id}
            className={`border px-1.5 py-1 font-mono text-[9px] ${
              level.id === activeLevel
                ? "border-accent-gold/50 bg-bg-deep/90 text-accent-gold"
                : "border-border-faint bg-bg-deep/75 text-fg-muted"
            }`}
          >
            L{level.id}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute top-2 right-10 left-10 z-10 grid grid-cols-5 gap-2"
      aria-hidden="true"
    >
      {KNOWLEDGE_LEVELS.map((level) => (
        <div
          key={level.id}
          className={`border-t px-2 pt-1.5 text-center font-mono text-[9px] tracking-[0.1em] uppercase ${
            level.id === activeLevel
              ? "border-accent-gold/55 text-accent-gold"
              : "border-border-faint text-fg-disabled"
          }`}
        >
          L{level.id} · {level.shortLabel}
        </div>
      ))}
    </div>
  );
}
