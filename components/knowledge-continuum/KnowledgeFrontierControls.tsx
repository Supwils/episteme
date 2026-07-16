import {
  KNOWLEDGE_FRONTIER_STATUS_META,
  type KnowledgeFrontierStatus,
  type KnowledgeFrontierSummary,
} from "@/lib/knowledge-frontier";
import {
  COVERAGE_DOMAIN_META,
  type CoverageDomainId,
} from "@/lib/knowledge-continuum-coverage-meta";
import { KNOWLEDGE_LEVELS, type KnowledgeLevel } from "@/lib/knowledge-levels";

export function KnowledgeFrontierControls({
  summary,
  status,
  domainId,
  level,
  query,
  onStatusChange,
  onDomainChange,
  onLevelChange,
  onQueryChange,
}: {
  summary: KnowledgeFrontierSummary;
  status: KnowledgeFrontierStatus;
  domainId: CoverageDomainId | undefined;
  level: KnowledgeLevel | undefined;
  query: string;
  onStatusChange: (status: KnowledgeFrontierStatus) => void;
  onDomainChange: (domainId: CoverageDomainId | undefined) => void;
  onLevelChange: (level: KnowledgeLevel | undefined) => void;
  onQueryChange: (query: string) => void;
}) {
  const count = (item: KnowledgeFrontierStatus) => {
    if (item === "mastered") return summary.masteredCount;
    if (item === "ready") return summary.readyCount;
    return summary.blockedCount;
  };
  return (
    <div className="border-border-faint flex flex-wrap items-end gap-4 border-b px-4 py-4 sm:px-6">
      <div className="border-border-faint flex border" role="group" aria-label="知识前沿状态">
        {(Object.keys(KNOWLEDGE_FRONTIER_STATUS_META) as KnowledgeFrontierStatus[]).map((item) => {
          const active = item === status;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => onStatusChange(item)}
              style={active ? { color: "var(--color-bg-base)" } : undefined}
              className={`h-10 px-3 text-[10px] ${
                active ? "bg-fg-primary" : "text-fg-muted hover:text-fg-primary"
              }`}
            >
              {KNOWLEDGE_FRONTIER_STATUS_META[item].shortLabel} {count(item)}
            </button>
          );
        })}
      </div>
      <label className="text-fg-muted text-[10px]">
        <span className="mb-1 block">学科</span>
        <select
          aria-label="知识前沿学科筛选"
          value={domainId ?? ""}
          onChange={(event) =>
            onDomainChange((event.target.value || undefined) as CoverageDomainId | undefined)
          }
          className="border-border-faint bg-bg-base text-fg-primary h-10 border px-2 text-[10px]"
        >
          <option value="">全部学科</option>
          {(Object.keys(COVERAGE_DOMAIN_META) as CoverageDomainId[]).map((id) => (
            <option key={id} value={id}>
              {COVERAGE_DOMAIN_META[id].label}
            </option>
          ))}
        </select>
      </label>
      <label className="text-fg-muted text-[10px]">
        <span className="mb-1 block">阶段</span>
        <select
          aria-label="知识前沿阶段筛选"
          value={level ?? ""}
          onChange={(event) =>
            onLevelChange(
              event.target.value ? (Number(event.target.value) as KnowledgeLevel) : undefined
            )
          }
          className="border-border-faint bg-bg-base text-fg-primary h-10 border px-2 text-[10px]"
        >
          <option value="">L1–L5</option>
          {KNOWLEDGE_LEVELS.map((item) => (
            <option key={item.id} value={item.id}>
              L{item.id} · {item.label}
            </option>
          ))}
        </select>
      </label>
      <label className="text-fg-muted min-w-52 flex-1 text-[10px]">
        <span className="mb-1 block">在当前状态中查找</span>
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="概念、人物、方法或关键词"
          className="border-border-faint bg-bg-base text-fg-primary placeholder:text-fg-disabled h-10 w-full border px-3 text-[10px]"
        />
      </label>
    </div>
  );
}
