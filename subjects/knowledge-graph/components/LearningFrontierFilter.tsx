import {
  KNOWLEDGE_FRONTIER_STATUS_META,
  type KnowledgeFrontierStatus,
  type KnowledgeFrontierSummary,
} from "@/lib/knowledge-frontier";

export function LearningFrontierFilter({
  value,
  summary,
  onChange,
  isMobile,
}: {
  value: KnowledgeFrontierStatus | null;
  summary: KnowledgeFrontierSummary;
  onChange: (status: KnowledgeFrontierStatus | null) => void;
  isMobile: boolean;
}) {
  const count = (status: KnowledgeFrontierStatus) => {
    if (status === "mastered") return summary.masteredCount;
    if (status === "ready") return summary.readyCount;
    return summary.blockedCount;
  };
  return (
    <label className="text-white/45">
      <span className="sr-only">学习前沿状态筛选</span>
      <select
        value={value ?? ""}
        onChange={(event) =>
          onChange((event.target.value || null) as KnowledgeFrontierStatus | null)
        }
        className="h-8 border border-white/[0.06] bg-[#111118] px-2 text-xs text-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366f1]"
        aria-label="学习前沿状态筛选"
      >
        <option value="">{isMobile ? "全部状态" : "学习前沿：全部"}</option>
        {(Object.keys(KNOWLEDGE_FRONTIER_STATUS_META) as KnowledgeFrontierStatus[]).map(
          (status) => (
            <option key={status} value={status}>
              {KNOWLEDGE_FRONTIER_STATUS_META[status].shortLabel} · {count(status)}
            </option>
          )
        )}
      </select>
    </label>
  );
}
