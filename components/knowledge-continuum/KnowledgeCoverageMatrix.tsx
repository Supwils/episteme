import { KNOWLEDGE_STAGES, type KnowledgeStageId } from "@/lib/knowledge-continuum";
import { isDomainCoverageRow, type CoverageRow } from "./coverage-types";

export function KnowledgeCoverageMatrix({
  rows,
  selectedRowId,
  selectedLevel,
  onSelect,
}: {
  rows: readonly CoverageRow[];
  selectedRowId: string;
  selectedLevel: KnowledgeStageId;
  onSelect: (rowId: string, level: KnowledgeStageId) => void;
}) {
  const maximum = Math.max(...rows.flatMap((row) => [...row.levels]), 1);

  return (
    <div className="min-w-0" data-testid="coverage-matrix">
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: "minmax(86px, 112px) repeat(5, minmax(34px, 1fr))" }}
      >
        <div />
        {KNOWLEDGE_STAGES.map((stage) => (
          <button
            key={stage.id}
            type="button"
            onClick={() => onSelect(selectedRowId, stage.id)}
            aria-label={`查看${stage.label}覆盖`}
            className={`min-h-9 px-1 font-mono text-[9px] transition-colors motion-reduce:transition-none ${
              stage.id === selectedLevel
                ? "text-fg-primary"
                : "text-fg-disabled hover:text-fg-muted"
            }`}
          >
            L{stage.id}
            <span className="hidden sm:inline"> · {stage.shortLabel}</span>
          </button>
        ))}

        {rows.map((row) => (
          <KnowledgeCoverageMatrixRow
            key={row.id}
            row={row}
            maximum={maximum}
            selectedRowId={selectedRowId}
            selectedLevel={selectedLevel}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function KnowledgeCoverageMatrixRow({
  row,
  maximum,
  selectedRowId,
  selectedLevel,
  onSelect,
}: {
  row: CoverageRow;
  maximum: number;
  selectedRowId: string;
  selectedLevel: KnowledgeStageId;
  onSelect: (rowId: string, level: KnowledgeStageId) => void;
}) {
  const rowSelected = row.id === selectedRowId;
  return (
    <>
      <button
        type="button"
        onClick={() => onSelect(row.id, selectedLevel)}
        className={`flex min-h-9 min-w-0 items-center gap-2 px-1 text-left text-[11px] transition-colors motion-reduce:transition-none sm:text-xs ${
          rowSelected ? "text-fg-primary" : "text-fg-muted hover:text-fg-secondary"
        }`}
        aria-label={`选择${row.label}，共${row.total}个核心节点`}
      >
        <span
          className="h-2 w-2 shrink-0"
          style={{ backgroundColor: row.color }}
          aria-hidden="true"
        />
        <span className="min-w-0 truncate">{row.shortLabel}</span>
        {isDomainCoverageRow(row) && row.status === "preview" && (
          <span className="text-fg-disabled hidden font-mono text-[8px] sm:inline">建设中</span>
        )}
      </button>
      {row.levels.map((count, index) => {
        const level = (index + 1) as KnowledgeStageId;
        const selected = rowSelected && level === selectedLevel;
        const intensity = count === 0 ? 0 : 0.12 + (count / maximum) * 0.48;
        return (
          <button
            key={level}
            type="button"
            onClick={() => onSelect(row.id, level)}
            aria-pressed={selected}
            aria-label={`${row.label}，${KNOWLEDGE_STAGES[index]!.label}，${count}个核心节点`}
            className="border-border-faint relative min-h-9 border font-mono text-[10px] transition-colors motion-reduce:transition-none"
            style={{
              borderColor: selected ? row.color : undefined,
              color: count > 0 ? "var(--color-fg-primary)" : "var(--color-fg-disabled)",
              backgroundColor:
                count > 0
                  ? `color-mix(in srgb, ${row.color} ${Math.round(intensity * 100)}%, transparent)`
                  : "transparent",
              boxShadow: selected ? `inset 0 0 0 1px ${row.color}` : undefined,
            }}
          >
            {count}
          </button>
        );
      })}
    </>
  );
}
