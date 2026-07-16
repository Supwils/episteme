import {
  PRIORITY_INTERVENTIONS,
  selectPriorityPortfolio,
  type PriorityPortfolio,
} from "@/subjects/medicine/lib/health-priority-setting";

const LEVELS = [
  { label: "低", multiplier: 0.75 },
  { label: "基准", multiplier: 1 },
  { label: "高", multiplier: 1.25 },
] as const;

type SensitivityProps = {
  budgetMillions: number;
  equityWeight: number;
  protectVerySevereConditions: boolean;
  interventionId: string;
  costMultiplier: number;
  effectMultiplier: number;
  baselinePortfolio: PriorityPortfolio;
  currentPortfolio: PriorityPortfolio;
  onInterventionChange: (id: string) => void;
  onCostMultiplierChange: (value: number) => void;
  onEffectMultiplierChange: (value: number) => void;
};

function selectedIds(portfolio: PriorityPortfolio): Set<string> {
  return new Set(portfolio.interventions.map((intervention) => intervention.id));
}

export function HealthPrioritySensitivity({
  budgetMillions,
  equityWeight,
  protectVerySevereConditions,
  interventionId,
  costMultiplier,
  effectMultiplier,
  baselinePortfolio,
  currentPortfolio,
  onInterventionChange,
  onCostMultiplierChange,
  onEffectMultiplierChange,
}: SensitivityProps) {
  const intervention = PRIORITY_INTERVENTIONS.find((item) => item.id === interventionId)!;
  const baselineIds = selectedIds(baselinePortfolio);
  const currentIds = selectedIds(currentPortfolio);
  const added = currentPortfolio.interventions.filter((item) => !baselineIds.has(item.id));
  const removed = baselinePortfolio.interventions.filter((item) => !currentIds.has(item.id));

  return (
    <section
      className="border-border-faint border-t px-5 py-6 sm:px-7"
      aria-labelledby="sensitivity-title"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] lg:items-end">
        <div>
          <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.24em] uppercase">
            two-way sensitivity analysis
          </p>
          <h3 id="sensitivity-title" className="font-display text-fg-primary text-xl font-semibold">
            效果与成本敏感性分析
          </h3>
          <p className="text-fg-secondary mt-2 max-w-2xl text-sm leading-relaxed">
            只改变一项干预的效果与成本假设，比较当前组合与基准组合；矩阵同时展示九种假设下该项目是否仍会入选。
          </p>
        </div>
        <label className="text-fg-secondary text-sm">
          <span className="mb-2 block font-medium">检验哪项干预</span>
          <select
            value={interventionId}
            onChange={(event) => onInterventionChange(event.target.value)}
            className="border-border-faint bg-bg-panel text-fg-primary h-10 w-full border px-3"
          >
            {PRIORITY_INTERVENTIONS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.shortTitle}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <SensitivityRange
          inputId="priority-setting-effect-assumption"
          label="效果假设"
          value={effectMultiplier}
          display={`${Math.round(effectMultiplier * 100)}%`}
          onChange={onEffectMultiplierChange}
        />
        <SensitivityRange
          inputId="priority-setting-cost-assumption"
          label="成本假设"
          value={costMultiplier}
          display={`${Math.round(costMultiplier * 100)}%`}
          onChange={onCostMultiplierChange}
        />
      </div>

      <p className="text-fg-secondary mt-5 min-h-6 text-sm" aria-live="polite">
        <span className="text-fg-primary font-medium">相对基准组合：</span>{" "}
        {added.length === 0 && removed.length === 0
          ? "组合未改变。"
          : [
              added.length > 0 ? `新增 ${added.map((item) => item.shortTitle).join("、")}` : "",
              removed.length > 0 ? `移出 ${removed.map((item) => item.shortTitle).join("、")}` : "",
            ]
              .filter(Boolean)
              .join("；") + "。"}
      </p>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-center">
          <caption className="sr-only">
            {intervention.title}
            的效果与成本双向敏感性矩阵，显示九种假设下是否纳入组合及组合总公平调整收益。
          </caption>
          <thead>
            <tr className="border-border-faint border-b">
              <th className="text-fg-muted px-3 py-3 text-left font-mono text-[10px] tracking-[0.16em] uppercase">
                效果 \ 成本
              </th>
              {LEVELS.map((level) => (
                <th key={level.label} className="text-fg-muted px-3 py-3 text-xs font-medium">
                  {level.label} {Math.round(level.multiplier * 100)}%
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LEVELS.map((effectLevel) => (
              <tr key={effectLevel.label} className="border-border-faint border-b last:border-b-0">
                <th className="text-fg-secondary px-3 py-4 text-left text-xs font-medium">
                  {effectLevel.label} {Math.round(effectLevel.multiplier * 100)}%
                </th>
                {LEVELS.map((costLevel) => {
                  const portfolio = selectPriorityPortfolio(
                    budgetMillions,
                    equityWeight,
                    protectVerySevereConditions,
                    {
                      [interventionId]: {
                        effectMultiplier: effectLevel.multiplier,
                        costMultiplier: costLevel.multiplier,
                      },
                    }
                  );
                  const included = portfolio.interventions.some(
                    (item) => item.id === interventionId
                  );
                  return (
                    <td key={costLevel.label} className="px-3 py-4 text-xs">
                      <span className={included ? "text-[#8ed0aa]" : "text-fg-muted"}>
                        {included ? "入选" : "未入选"}
                      </span>
                      <span className="text-fg-disabled mt-1 block font-mono">
                        {Math.round(portfolio.equityAdjustedQalys)} 单位
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SensitivityRange({
  inputId,
  label,
  value,
  display,
  onChange,
}: {
  inputId: string;
  label: string;
  value: number;
  display: string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <label htmlFor={inputId} className="text-fg-primary font-medium">
          {label}
        </label>
        <output className="font-mono text-xs text-[#8ed0aa]">{display}</output>
      </div>
      <input
        id={inputId}
        className="h-2 w-full cursor-pointer accent-[#4f9d76]"
        type="range"
        min={0.5}
        max={1.5}
        step={0.05}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}
