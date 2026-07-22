import {
  ADOLESCENT_SERVICE_OPTIONS,
  type AdolescentServicePortfolio,
  type AdolescentServiceOption,
} from "@/subjects/medicine/lib/adolescent-service-portfolio";

const LAYER_COLORS: Record<AdolescentServiceOption["layer"], string> = {
  promotion: "#6aa7d8",
  "early-support": "#b783d6",
  outreach: "#d9a85a",
  entry: "#62b7a2",
  care: "#d9786f",
  continuity: "#8cab63",
};

export function AdolescentServiceStackDiagram({
  portfolio,
}: {
  portfolio: AdolescentServicePortfolio;
}) {
  const selected = new Map(portfolio.options.map((option) => [option.id, option]));

  return (
    <svg
      id="adolescent-service-stack"
      viewBox="0 0 560 520"
      className="h-auto w-full"
      role="img"
      aria-label={`青少年学校与社区服务六层立体结构，当前纳入${portfolio.options.length}层，${
        portfolio.hasCompletePathway ? "形成完整支持路径" : "尚未形成完整支持路径"
      }`}
      data-testid="adolescent-service-stack"
    >
      <title>
        六层服务栈从全校促进、定向支持和社区外展，连接适龄入口、匹配照护与连续导航
      </title>
      <line
        x1="58"
        y1="42"
        x2="58"
        y2="464"
        stroke="var(--color-border-faint)"
        strokeWidth="2"
      />
      <path
        d="M50 452 L58 466 L66 452"
        fill="none"
        stroke="var(--color-border-faint)"
        strokeWidth="2"
      />
      <text x="12" y="28" fill="var(--color-fg-muted)" fontSize="14">
        环境与入口
      </text>
      <text x="12" y="492" fill="var(--color-fg-muted)" fontSize="14">
        照护与连续性
      </text>

      {ADOLESCENT_SERVICE_OPTIONS.map((option, index) => {
        const current = selected.get(option.id);
        const active = Boolean(current);
        const color = LAYER_COLORS[option.layer];
        const y = 48 + index * 72;
        const opacity = active ? 0.94 : 0.2;
        return (
          <g key={option.id} data-testid={`service-stack-layer-${option.id}`}>
            <polygon
              points={`80,${y} 410,${y} 450,${y + 18} 120,${y + 18}`}
              fill={color}
              opacity={opacity}
            />
            <polygon
              points={`80,${y} 120,${y + 18} 120,${y + 52} 80,${y + 34}`}
              fill={color}
              opacity={active ? 0.58 : 0.12}
            />
            <polygon
              points={`120,${y + 18} 450,${y + 18} 450,${y + 52} 120,${y + 52}`}
              fill={active ? "var(--color-bg-panel)" : "var(--color-bg-near)"}
              stroke={active ? color : "var(--color-border-faint)"}
              strokeWidth={active ? 2 : 1}
            />
            <line
              x1="450"
              y1={y + 18}
              x2="410"
              y2={y}
              stroke={active ? color : "var(--color-border-faint)"}
              strokeWidth="1"
            />
            <line
              x1="450"
              y1={y + 52}
              x2="410"
              y2={y + 34}
              stroke={active ? color : "var(--color-border-faint)"}
              strokeWidth="1"
            />
            <line
              x1="410"
              y1={y}
              x2="410"
              y2={y + 34}
              stroke={active ? color : "var(--color-border-faint)"}
              strokeWidth="1"
            />
            <circle
              cx="98"
              cy={y + 26}
              r="7"
              fill={active ? color : "var(--color-bg-base)"}
              stroke={color}
              strokeWidth="2"
            />
            <text
              x="140"
              y={y + 40}
              fill={active ? "var(--color-fg-primary)" : "var(--color-fg-muted)"}
              fontSize="16"
              fontWeight={active ? "600" : "400"}
            >
              {option.shortTitle}
            </text>
            <text
              x="430"
              y={y + 40}
              textAnchor="end"
              fill={active ? color : "var(--color-fg-disabled)"}
              fontSize="13"
            >
              {active ? `${current!.assumedCostUnits.toFixed(1)} 预算单位` : "未纳入"}
            </text>
          </g>
        );
      })}

      <g transform="translate(464 84)">
        <circle
          cx="10"
          cy="10"
          r="8"
          fill={portfolio.hasCompletePathway ? "#8cab63" : "var(--color-bg-base)"}
          stroke={portfolio.hasCompletePathway ? "#8cab63" : "#d9786f"}
          strokeWidth="2"
        />
        <line
          x1="10"
          y1="22"
          x2="10"
          y2="326"
          stroke={portfolio.hasCompletePathway ? "#8cab63" : "#d9786f"}
          strokeWidth="2"
          strokeDasharray={portfolio.hasCompletePathway ? undefined : "5 6"}
        />
        <path
          d="M3 318 L10 330 L17 318"
          fill="none"
          stroke={portfolio.hasCompletePathway ? "#8cab63" : "#d9786f"}
          strokeWidth="2"
        />
        <text
          x="26"
          y="15"
          fill={portfolio.hasCompletePathway ? "#8cab63" : "#d9786f"}
          fontSize="14"
        >
          {portfolio.hasCompletePathway ? "路径闭环" : "路径断点"}
        </text>
      </g>
    </svg>
  );
}
