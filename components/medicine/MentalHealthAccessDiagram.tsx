import { buildMentalHealthAccessCascade } from "@/subjects/medicine/lib/mental-health-access";

const ACCENT = "#62b7a2";
const UNDERSERVED = "#d9a85a";
const numberFormatter = new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 0 });

function formatPercent(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}

export function MentalHealthAccessDiagram({
  cascade,
  population,
}: {
  cascade: ReturnType<typeof buildMentalHealthAccessCascade>;
  population: number;
}) {
  const baselineY = 292;
  const maxHeight = 205;
  const columnWidth = 84;
  const depth = 12;

  return (
    <div className="overflow-x-auto px-3 py-5 sm:px-5">
      <svg
        viewBox="0 0 1040 350"
        className="h-auto w-full min-w-[760px]"
        role="img"
        aria-labelledby="mental-health-access-cascade-title mental-health-access-cascade-desc"
      >
        <title id="mental-health-access-cascade-title">心理健康服务有效覆盖级联</title>
        <desc id="mental-health-access-cascade-desc">
          五个立体柱依次显示存在支持需要、被识别、首次接触、持续照护与获得有效反应的人数。
        </desc>
        <line
          x1="42"
          y1={baselineY}
          x2="998"
          y2={baselineY}
          stroke="var(--color-border-faint)"
          strokeWidth="1"
        />
        {cascade.stages.map((stage, index) => {
          const x = 70 + index * 195;
          const height = Math.max(8, (stage.overallCount / population) * maxHeight);
          const y = baselineY - height;
          const underservedHeight =
            stage.overallCount === 0 ? 0 : height * (stage.underservedCount / stage.overallCount);

          return (
            <g key={stage.id} data-stage={stage.id}>
              {index < cascade.stages.length - 1 ? (
                <path
                  d={`M ${x + columnWidth + depth} ${y + height / 2} L ${x + 195 - 6} ${
                    baselineY -
                    Math.max(
                      8,
                      (cascade.stages[index + 1]!.overallCount / population) * maxHeight
                    ) /
                      2
                  }`}
                  stroke="var(--color-border-faint)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  fill="none"
                />
              ) : null}
              <polygon
                points={`${x},${y} ${x + depth},${y - depth} ${x + columnWidth + depth},${
                  y - depth
                } ${x + columnWidth},${y}`}
                fill="#8dd1c1"
                opacity="0.72"
              />
              <polygon
                points={`${x + columnWidth},${y} ${x + columnWidth + depth},${y - depth} ${
                  x + columnWidth + depth
                },${baselineY - depth} ${x + columnWidth},${baselineY}`}
                fill="#367868"
                opacity="0.76"
              />
              <rect x={x} y={y} width={columnWidth} height={height} fill={ACCENT} opacity="0.74" />
              <rect
                x={x}
                y={baselineY - underservedHeight}
                width={columnWidth}
                height={underservedHeight}
                fill={UNDERSERVED}
                opacity="0.92"
              />
              <text
                x={x + columnWidth / 2}
                y={Math.max(22, y - 22)}
                textAnchor="middle"
                fill="var(--color-fg-primary)"
                fontSize="15"
                fontWeight="600"
              >
                {numberFormatter.format(stage.overallCount)}
              </text>
              <text
                x={x + columnWidth / 2}
                y={Math.max(38, y - 6)}
                textAnchor="middle"
                fill="var(--color-fg-muted)"
                fontSize="10"
              >
                {formatPercent(stage.overallRate)}
              </text>
              <text
                x={x + columnWidth / 2}
                y="322"
                textAnchor="middle"
                fill="var(--color-fg-secondary)"
                fontSize="11"
              >
                {stage.label}
              </text>
            </g>
          );
        })}
        <g transform="translate(790 18)">
          <rect width="10" height="10" fill={ACCENT} opacity="0.74" />
          <text x="16" y="9" fill="var(--color-fg-muted)" fontSize="10">
            一般群体
          </text>
          <rect x="82" width="10" height="10" fill={UNDERSERVED} />
          <text x="98" y="9" fill="var(--color-fg-muted)" fontSize="10">
            服务不足群体
          </text>
        </g>
      </svg>
    </div>
  );
}
