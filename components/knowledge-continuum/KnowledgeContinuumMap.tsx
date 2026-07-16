import {
  KNOWLEDGE_STAGES,
  KNOWLEDGE_THREADS,
  type KnowledgeContinuumNode,
  type KnowledgeStageId,
} from "@/lib/knowledge-continuum";

export function KnowledgeContinuumMap({
  activeStage,
  selectedNodeId,
  onSelect,
}: {
  activeStage: KnowledgeStageId;
  selectedNodeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      <div className="hidden p-4 md:block lg:p-6">
        <div className="grid grid-cols-[150px_repeat(5,minmax(0,1fr))] gap-x-3">
          <div />
          {KNOWLEDGE_STAGES.map((item) => (
            <div
              key={item.id}
              className={`pb-3 text-center font-mono text-[9px] tracking-[0.12em] uppercase ${
                item.id === activeStage ? "text-fg-primary" : "text-fg-disabled"
              }`}
            >
              {item.shortLabel}
            </div>
          ))}

          {KNOWLEDGE_THREADS.map((thread) => (
            <KnowledgeThreadRow
              key={thread.id}
              thread={thread}
              activeStage={activeStage}
              selectedNodeId={selectedNodeId}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-2 p-4 md:hidden">
        {KNOWLEDGE_THREADS.map((thread) => {
          const node = thread.nodes.find((item) => item.stage === activeStage)!;
          return (
            <button
              key={thread.id}
              type="button"
              aria-pressed={node.id === selectedNodeId}
              onClick={() => onSelect(node.id)}
              className={`border-border-faint grid min-h-16 grid-cols-[5px_minmax(0,1fr)] gap-3 border px-3 py-3 text-left transition-colors ${
                node.id === selectedNodeId ? "bg-bg-panel text-fg-primary" : "text-fg-secondary"
              }`}
            >
              <span
                className="h-full"
                style={{ backgroundColor: thread.color }}
                aria-hidden="true"
              />
              <span>
                <span className="text-fg-muted block text-[10px]">{thread.label}</span>
                <span className="mt-1 block text-sm font-medium">{node.title}</span>
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

function KnowledgeThreadRow({
  thread,
  activeStage,
  selectedNodeId,
  onSelect,
}: {
  thread: (typeof KNOWLEDGE_THREADS)[number];
  activeStage: KnowledgeStageId;
  selectedNodeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      <div className="border-border-faint flex min-h-24 flex-col justify-center border-t pr-4">
        <span className="text-fg-primary text-xs font-medium">{thread.label}</span>
        <span className="text-fg-muted mt-1 text-[10px]">{thread.subtitle}</span>
      </div>
      {thread.nodes.map((node, index) => {
        const selected = node.id === selectedNodeId;
        const inActiveStage = node.stage === activeStage;
        return (
          <div
            key={node.id}
            className="border-border-faint relative flex min-h-24 items-center border-t"
          >
            {index > 0 && (
              <span
                className="absolute top-1/2 -left-3 h-px w-1/2 opacity-45"
                style={{ backgroundColor: thread.color }}
                aria-hidden="true"
              />
            )}
            {index < thread.nodes.length - 1 && (
              <span
                className="absolute top-1/2 right-0 h-px w-1/2 opacity-45"
                style={{ backgroundColor: thread.color }}
                aria-hidden="true"
              />
            )}
            <button
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(node.id)}
              style={selected ? { color: "var(--color-bg-base)" } : undefined}
              className={`border-border-faint relative z-1 mx-auto min-h-14 w-full max-w-36 border px-2 py-2 text-center text-[11px] leading-snug transition-colors ${
                selected
                  ? "bg-fg-primary"
                  : inActiveStage
                    ? "bg-bg-panel text-fg-primary"
                    : "bg-bg-near text-fg-muted hover:text-fg-primary"
              }`}
            >
              {node.title}
            </button>
          </div>
        );
      })}
    </>
  );
}

export function ContinuumStepButton({
  label,
  node,
  onSelect,
  direction,
}: {
  label: string;
  node: KnowledgeContinuumNode | undefined;
  onSelect: (id: string) => void;
  direction: "←" | "→";
}) {
  return (
    <button
      type="button"
      disabled={!node}
      onClick={() => node && onSelect(node.id)}
      aria-label={node ? `${label}：${node.title}` : `${label}：无`}
      className="border-border-faint text-fg-secondary enabled:hover:text-fg-primary disabled:text-fg-disabled min-h-12 border px-3 text-left text-xs transition-colors disabled:cursor-not-allowed"
    >
      <span aria-hidden="true">{direction}</span> {node?.title ?? "已到边界"}
    </button>
  );
}
