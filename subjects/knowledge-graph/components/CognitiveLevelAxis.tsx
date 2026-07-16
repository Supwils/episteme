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
                ? "border-amber-400/50 bg-[#08080f]/90 text-amber-200"
                : "border-white/[0.06] bg-[#08080f]/75 text-white/30"
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
              ? "border-amber-400/55 text-amber-200/80"
              : "border-white/[0.06] text-white/25"
          }`}
        >
          L{level.id} · {level.shortLabel}
        </div>
      ))}
    </div>
  );
}
