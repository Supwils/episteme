import {
  ADOLESCENT_SERVICE_OPTIONS,
  type AdolescentServiceAssumptions,
  type AdolescentServicePortfolio,
} from "@/subjects/medicine/lib/adolescent-service-portfolio";

export function AdolescentServicePortfolioTable({
  portfolio,
  assumptions,
}: {
  portfolio: AdolescentServicePortfolio;
  assumptions: AdolescentServiceAssumptions;
}) {
  const selected = new Map(portfolio.options.map((option) => [option.id, option]));

  return (
    <div className="overflow-x-auto" data-testid="adolescent-service-portfolio-scroll">
      <table
        className="w-full border-collapse text-left"
        data-testid="adolescent-service-portfolio-table"
        style={{ minWidth: 1180 }}
      >
        <caption className="sr-only">
          青少年学校与社区服务选项的教学成本、效果、公平覆盖、系统依赖和当前入选状态。
        </caption>
        <thead>
          <tr className="border-border-faint border-b">
            {["服务层", "教学成本", "效果单位", "服务不足群体", "系统机制", "实施约束", "状态"].map(
              (label) => (
                <th
                  key={label}
                  className="text-fg-muted px-4 py-3 font-mono text-[10px] tracking-[0.15em] whitespace-nowrap uppercase"
                >
                  {label}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {ADOLESCENT_SERVICE_OPTIONS.map((option) => {
            const current = selected.get(option.id);
            const assumedCost =
              option.costUnits * (assumptions[option.id]?.costMultiplier ?? 1);
            const assumedEffect =
              option.benefitUnits * (assumptions[option.id]?.effectMultiplier ?? 1);
            return (
              <tr
                key={option.id}
                className="border-border-faint border-b last:border-b-0"
                style={
                  current
                    ? { backgroundColor: "rgba(217, 168, 90, 0.07)" }
                    : undefined
                }
              >
                <th className="text-fg-primary min-w-56 px-4 py-4 text-sm font-medium">
                  {option.title}
                </th>
                <td className="text-fg-secondary px-4 py-4 text-sm whitespace-nowrap">
                  {assumedCost.toFixed(1)}
                  {assumedCost !== option.costUnits ? (
                    <span className="text-fg-muted ml-1 text-xs">
                      基准 {option.costUnits.toFixed(1)}
                    </span>
                  ) : null}
                </td>
                <td className="text-fg-secondary px-4 py-4 text-sm whitespace-nowrap">
                  {Math.round(assumedEffect)}
                  {current && current.pathwayModifier !== 1 ? (
                    <span className="text-fg-muted ml-1 text-xs">
                      → 实现后 {Math.round(current.realizedBenefitUnits)}
                    </span>
                  ) : null}
                </td>
                <td className="text-fg-secondary px-4 py-4 text-sm whitespace-nowrap">
                  {Math.round(option.underservedShare * 100)}%
                </td>
                <td className="text-fg-secondary min-w-72 px-4 py-4 text-sm leading-relaxed">
                  {option.mechanism}
                </td>
                <td className="text-fg-muted min-w-72 px-4 py-4 text-sm leading-relaxed">
                  {option.implementationConstraint}
                </td>
                <td className="min-w-32 px-4 py-4">
                  <span
                    className={`inline-flex border px-2 py-1 font-mono text-[10px] tracking-[0.12em] ${
                      current
                        ? "border-[#d9a85a]/60 text-[#d9a85a]"
                        : "border-border-faint text-fg-muted"
                    }`}
                  >
                    {current ? "纳入服务包" : "未纳入"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
