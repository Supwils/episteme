import {
  ADOLESCENT_SERVICE_OPTIONS,
  selectAdolescentServicePortfolio,
  type AdolescentServiceConstraints,
  type AdolescentServiceOptionId,
  type AdolescentServicePortfolio,
} from "@/subjects/medicine/lib/adolescent-service-portfolio";

const LEVELS = [
  { label: "低", multiplier: 0.75 },
  { label: "基准", multiplier: 1 },
  { label: "高", multiplier: 1.25 },
] as const;

type Props = {
  constraints: AdolescentServiceConstraints;
  optionId: AdolescentServiceOptionId;
  costMultiplier: number;
  effectMultiplier: number;
  baselinePortfolio: AdolescentServicePortfolio;
  currentPortfolio: AdolescentServicePortfolio;
  onOptionChange: (id: AdolescentServiceOptionId) => void;
  onCostMultiplierChange: (value: number) => void;
  onEffectMultiplierChange: (value: number) => void;
};

function optionIds(portfolio: AdolescentServicePortfolio): Set<string> {
  return new Set(portfolio.options.map((option) => option.id));
}

export function AdolescentServiceSensitivity({
  constraints,
  optionId,
  costMultiplier,
  effectMultiplier,
  baselinePortfolio,
  currentPortfolio,
  onOptionChange,
  onCostMultiplierChange,
  onEffectMultiplierChange,
}: Props) {
  const option = ADOLESCENT_SERVICE_OPTIONS.find((item) => item.id === optionId)!;
  const baselineIds = optionIds(baselinePortfolio);
  const currentIds = optionIds(currentPortfolio);
  const added = currentPortfolio.options.filter((item) => !baselineIds.has(item.id));
  const removed = baselinePortfolio.options.filter((item) => !currentIds.has(item.id));

  return (
    <section
      className="border-border-faint border-t px-5 py-6 sm:px-7"
      aria-labelledby="adolescent-service-sensitivity-title"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] lg:items-end">
        <div>
          <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.24em] uppercase">
            cost × effect sensitivity
          </p>
          <h3
            id="adolescent-service-sensitivity-title"
            className="font-display text-fg-primary text-xl font-semibold"
          >
            哪个假设会让服务包改组
          </h3>
          <p className="text-fg-secondary mt-2 max-w-2xl text-sm leading-relaxed">
            每次只改变一层服务的教学成本与效果。矩阵显示九种假设下是否仍存在满足预算、公平和路径约束的组合。
          </p>
        </div>
        <label className="text-fg-secondary text-sm">
          <span className="mb-2 block font-medium">检验哪一层</span>
          <select
            value={optionId}
            onChange={(event) =>
              onOptionChange(event.target.value as AdolescentServiceOptionId)
            }
            className="border-border-faint bg-bg-panel text-fg-primary h-10 w-full border px-3"
          >
            {ADOLESCENT_SERVICE_OPTIONS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.shortTitle}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <SensitivityRange
          inputId="adolescent-service-effect-assumption"
          label="效果假设"
          value={effectMultiplier}
          display={`${Math.round(effectMultiplier * 100)}%`}
          onChange={onEffectMultiplierChange}
        />
        <SensitivityRange
          inputId="adolescent-service-cost-assumption"
          label="成本假设"
          value={costMultiplier}
          display={`${Math.round(costMultiplier * 100)}%`}
          onChange={onCostMultiplierChange}
        />
      </div>

      <p className="text-fg-secondary mt-5 min-h-6 text-sm" aria-live="polite">
        <span className="text-fg-primary font-medium">相对基准服务包：</span>{" "}
        {!currentPortfolio.isFeasible
          ? "当前假设下没有满足全部约束的组合。"
          : added.length === 0 && removed.length === 0
            ? "组合未改变。"
            : [
                added.length > 0
                  ? `新增 ${added.map((item) => item.shortTitle).join("、")}`
                  : "",
                removed.length > 0
                  ? `移出 ${removed.map((item) => item.shortTitle).join("、")}`
                  : "",
              ]
                .filter(Boolean)
                .join("；") + "。"}
      </p>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-center">
          <caption className="sr-only">
            {option.title}的成本和效果敏感性矩阵，显示九种假设下的入选状态与服务包收益。
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
                  const portfolio = selectAdolescentServicePortfolio(constraints, {
                    [optionId]: {
                      effectMultiplier: effectLevel.multiplier,
                      costMultiplier: costLevel.multiplier,
                    },
                  });
                  const included = portfolio.options.some((item) => item.id === optionId);
                  return (
                    <td key={costLevel.label} className="px-3 py-4 text-xs">
                      <span
                        className={
                          !portfolio.isFeasible
                            ? "text-[#d9786f]"
                            : included
                              ? "text-[#8cab63]"
                              : "text-fg-muted"
                        }
                      >
                        {!portfolio.isFeasible ? "无可行组合" : included ? "入选" : "未入选"}
                      </span>
                      <span className="text-fg-disabled mt-1 block font-mono">
                        {portfolio.isFeasible
                          ? `${Math.round(portfolio.equityAdjustedBenefitUnits)} 单位`
                          : "—"}
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
        <output className="font-mono text-xs text-[#d9a85a]">{display}</output>
      </div>
      <input
        id={inputId}
        className="h-2 w-full cursor-pointer accent-[#d9a85a]"
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
