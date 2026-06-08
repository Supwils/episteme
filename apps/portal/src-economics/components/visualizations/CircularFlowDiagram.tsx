"use client";

import { useState, useCallback, useEffect } from "react";

type Sector = "households" | "firms" | "product-market" | "factor-market" | "government" | "financial";

interface SectorInfo {
  id: Sector;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  description: string;
  details: string[];
}

const SVG_W = 700;
const SVG_H = 500;

const SECTORS: SectorInfo[] = [
  {
    id: "households",
    label: "家庭",
    x: 100,
    y: 180,
    w: 140,
    h: 100,
    color: "#6bae8a",
    description: "消费支出的来源，生产要素（劳动、资本、土地）的供给者",
    details: [
      "提供劳动、资本、土地",
      "获得工资、利润、租金",
      "消费支出 → 产品市场",
      "储蓄 → 金融市场",
      "纳税 → 政府",
    ],
  },
  {
    id: "firms",
    label: "企业",
    x: 460,
    y: 180,
    w: 140,
    h: 100,
    color: "#d47850",
    description: "产品与服务的生产者，雇佣生产要素并支付报酬",
    details: [
      "生产商品和服务",
      "雇佣劳动、使用资本",
      "产品 → 产品市场",
      "支付要素报酬 → 要素市场",
      "投资 ← 金融市场",
    ],
  },
  {
    id: "product-market",
    label: "产品市场",
    x: 280,
    y: 60,
    w: 140,
    h: 60,
    color: "#e8a840",
    description: "家庭购买商品和服务的市场，企业出售产品获得收入",
    details: [
      "家庭消费支出流入",
      "企业产品流出",
      "供需决定价格",
      "消费者剩余 + 生产者剩余",
    ],
  },
  {
    id: "factor-market",
    label: "要素市场",
    x: 280,
    y: 340,
    w: 140,
    h: 60,
    color: "#5a9ad8",
    description: "劳动、资本、土地等生产要素的交易市场",
    details: [
      "企业购买生产要素",
      "家庭提供劳动/资本",
      "工资由供需决定",
      "边际生产力决定要素价格",
    ],
  },
  {
    id: "government",
    label: "政府",
    x: 280,
    y: 200,
    w: 140,
    h: 60,
    color: "#a88adf",
    description: "征税、提供公共品、转移支付，调节经济运行",
    details: [
      "征收税收（家庭 + 企业）",
      "政府购买商品和服务",
      "转移支付给家庭",
      "提供公共品与基础设施",
    ],
  },
  {
    id: "financial",
    label: "金融市场",
    x: 520,
    y: 60,
    w: 140,
    h: 60,
    color: "#56b6c2",
    description: "储蓄转化为投资的中介，连接家庭储蓄与企业投资",
    details: [
      "家庭储蓄流入",
      "企业贷款/投资流出",
      "利率调节资金供需",
      "股票、债券、银行",
    ],
  },
];

interface FlowArrow {
  from: Sector;
  to: Sector;
  label: string;
  color: string;
  offsetX?: number;
  offsetY?: number;
}

const FLOWS: FlowArrow[] = [
  { from: "households", to: "product-market", label: "消费支出", color: "#6bae8a", offsetX: -20 },
  { from: "product-market", to: "firms", label: "销售收入", color: "#e8a840", offsetX: -20 },
  { from: "firms", to: "factor-market", label: "要素成本", color: "#d47850", offsetX: 20 },
  { from: "factor-market", to: "households", label: "工资/租金/利润", color: "#5a9ad8", offsetX: 20 },
  { from: "households", to: "government", label: "税收", color: "#a88adf", offsetY: 5 },
  { from: "government", to: "firms", label: "政府采购", color: "#a88adf", offsetY: 5 },
  { from: "households", to: "financial", label: "储蓄", color: "#56b6c2" },
  { from: "financial", to: "firms", label: "投资", color: "#56b6c2" },
  { from: "firms", to: "government", label: "企业税", color: "#a88adf", offsetX: -20 },
  { from: "government", to: "households", label: "转移支付", color: "#a88adf", offsetX: -20 },
];

const LEAKAGES = [
  { label: "储蓄 (S)", value: "家庭 → 金融市场", color: "#56b6c2" },
  { label: "税收 (T)", value: "家庭/企业 → 政府", color: "#a88adf" },
  { label: "进口 (M)", value: "国内 → 国外", color: "#d85a5a" },
];

const INJECTIONS = [
  { label: "投资 (I)", value: "金融市场 → 企业", color: "#56b6c2" },
  { label: "政府支出 (G)", value: "政府 → 产品市场", color: "#a88adf" },
  { label: "出口 (X)", value: "国外 → 国内", color: "#6bae8a" },
];

function getSectorCenter(s: SectorInfo): { cx: number; cy: number } {
  return { cx: s.x + s.w / 2, cy: s.y + s.h / 2 };
}

function getArrowPath(from: SectorInfo, to: SectorInfo, offsetX = 0, offsetY = 0): string {
  const f = getSectorCenter(from);
  const t = getSectorCenter(to);
  const fx = f.cx + offsetX;
  const fy = f.cy + offsetY;
  const tx = t.cx + offsetX;
  const ty = t.cy + offsetY;
  const mx = (fx + tx) / 2;
  const my = (fy + ty) / 2;
  const dx = tx - fx;
  const dy = ty - fy;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / len * 20;
  const ny = dx / len * 20;
  return `M ${fx} ${fy} Q ${mx + nx} ${my + ny} ${tx} ${ty}`;
}

function getArrowLabelPos(from: SectorInfo, to: SectorInfo, offsetX = 0, offsetY = 0): { x: number; y: number } {
  const f = getSectorCenter(from);
  const t = getSectorCenter(to);
  const fx = f.cx + offsetX;
  const fy = f.cy + offsetY;
  const tx = t.cx + offsetX;
  const ty = t.cy + offsetY;
  const mx = (fx + tx) / 2;
  const my = (fy + ty) / 2;
  const dx = tx - fx;
  const dy = ty - fy;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / len * 28;
  const ny = dx / len * 28;
  return { x: mx + nx, y: my + ny };
}

export function CircularFlowDiagram() {
  const [selected, setSelected] = useState<Sector | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleSectorClick = useCallback((id: Sector) => {
    setSelected((prev) => (prev === id ? null : id));
  }, []);

  const selectedSector = SECTORS.find((s) => s.id === selected);

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="h-auto w-full select-none"
        role="img"
        aria-label="经济循环流动图"
      >
        <defs>
          <marker id="cf-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="rgba(200,164,90,0.5)" />
          </marker>
          {FLOWS.map((f, i) => (
            <marker
              key={`marker-${i}`}
              id={`cf-arrow-${i}`}
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill={f.color} opacity={0.7} />
            </marker>
          ))}
          <filter id="cf-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="transparent" rx={8} />

        {FLOWS.map((flow, i) => {
          const fromSector = SECTORS.find((s) => s.id === flow.from);
          const toSector = SECTORS.find((s) => s.id === flow.to);
          if (!fromSector || !toSector) return null;
          const pathD = getArrowPath(fromSector, toSector, flow.offsetX, flow.offsetY);
          const labelPos = getArrowLabelPos(fromSector, toSector, flow.offsetX, flow.offsetY);

          return (
            <g key={`flow-${i}`}>
              <path
                d={pathD}
                fill="none"
                stroke={flow.color}
                strokeWidth={1.5}
                strokeOpacity={0.35}
                markerEnd={`url(#cf-arrow-${i})`}
                strokeDasharray={prefersReducedMotion ? "none" : "6 4"}
              >
                {!prefersReducedMotion && (
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-20"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                )}
              </path>
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                fill={flow.color}
                fontSize={9}
                fontFamily="var(--font-mono)"
                opacity={0.7}
                fontWeight={500}
              >
                {flow.label}
              </text>
            </g>
          );
        })}

        {SECTORS.map((sector) => {
          const isSelected = selected === sector.id;
          return (
            <g
              key={sector.id}
              onClick={() => handleSectorClick(sector.id)}
              style={{ cursor: "pointer" }}
              role="button"
              aria-label={`${sector.label} — 点击查看详情`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSectorClick(sector.id);
                }
              }}
            >
              <rect
                x={sector.x}
                y={sector.y}
                width={sector.w}
                height={sector.h}
                rx={8}
                fill={isSelected ? `${sector.color}25` : `${sector.color}12`}
                stroke={isSelected ? sector.color : `${sector.color}40`}
                strokeWidth={isSelected ? 2 : 1}
                style={{
                  transition: prefersReducedMotion ? "none" : "all 0.25s ease-out",
                }}
              />
              {isSelected && (
                <rect
                  x={sector.x - 2}
                  y={sector.y - 2}
                  width={sector.w + 4}
                  height={sector.h + 4}
                  rx={10}
                  fill="none"
                  stroke={sector.color}
                  strokeWidth={1}
                  strokeOpacity={0.3}
                  filter="url(#cf-glow)"
                />
              )}
              <text
                x={sector.x + sector.w / 2}
                y={sector.y + sector.h / 2 - 6}
                textAnchor="middle"
                fill={sector.color}
                fontSize={13}
                fontWeight={600}
                fontFamily="var(--font-display)"
              >
                {sector.label}
              </text>
              <text
                x={sector.x + sector.w / 2}
                y={sector.y + sector.h / 2 + 12}
                textAnchor="middle"
                fill="rgba(200,164,90,0.4)"
                fontSize={8}
                fontFamily="var(--font-mono)"
                letterSpacing="0.06em"
              >
                {sector.id === "households"
                  ? "HOUSEHOLDS"
                  : sector.id === "firms"
                    ? "FIRMS"
                    : sector.id === "product-market"
                      ? "PRODUCT MARKET"
                      : sector.id === "factor-market"
                        ? "FACTOR MARKET"
                        : sector.id === "government"
                          ? "GOVERNMENT"
                          : "FINANCIAL"}
              </text>
            </g>
          );
        })}

        <g>
          <rect x={10} y={440} width={SVG_W - 20} height={50} rx={6} fill="rgba(200,164,90,0.03)" stroke="rgba(200,164,90,0.08)" strokeWidth={1} />
          <text x={SVG_W / 2} y={458} textAnchor="middle" fill="rgba(200,164,90,0.5)" fontSize={9} fontFamily="var(--font-mono)" letterSpacing="0.1em" fontWeight={500}>
            均衡条件: S + T + M = I + G + X（漏出 = 注入）
          </text>
          <text x={SVG_W / 2} y={476} textAnchor="middle" fill="rgba(200,164,90,0.3)" fontSize={8} fontFamily="var(--font-mono)" letterSpacing="0.08em">
            点击各经济主体查看详细信息
          </text>
        </g>
      </svg>

      {selectedSector && (
        <div
          className="data-panel mt-4"
          style={{
            borderLeftColor: selectedSector.color,
            borderLeftWidth: 3,
          }}
          role="region"
          aria-label={`${selectedSector.label}详细信息`}
        >
          <div className="mb-2 flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: selectedSector.color }}
            />
            <span
              className="font-mono text-xs tracking-wider uppercase"
              style={{ color: selectedSector.color }}
            >
              {selectedSector.label}
            </span>
          </div>
          <p className="text-fg-secondary mb-3 text-sm leading-relaxed">
            {selectedSector.description}
          </p>
          <ul className="space-y-1">
            {selectedSector.details.map((detail, i) => (
              <li key={i} className="text-fg-muted flex items-start gap-2 font-mono text-[11px]">
                <span style={{ color: selectedSector.color }} className="mt-0.5">
                  ›
                </span>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div
          className="border-border-faint bg-bg-elevated rounded-lg border p-4"
          style={{ borderLeftWidth: 3, borderLeftColor: "#d85a5a" }}
        >
          <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "#d85a5a" }}>
            漏出 Leakages
          </p>
          <div className="space-y-2">
            {LEAKAGES.map((l) => (
              <div key={l.label} className="flex items-center justify-between">
                <span className="font-mono text-[11px]" style={{ color: l.color }}>{l.label}</span>
                <span className="text-fg-muted font-mono text-[10px]">{l.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          className="border-border-faint bg-bg-elevated rounded-lg border p-4"
          style={{ borderLeftWidth: 3, borderLeftColor: "#6bae8a" }}
        >
          <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "#6bae8a" }}>
            注入 Injections
          </p>
          <div className="space-y-2">
            {INJECTIONS.map((l) => (
              <div key={l.label} className="flex items-center justify-between">
                <span className="font-mono text-[11px]" style={{ color: l.color }}>{l.label}</span>
                <span className="text-fg-muted font-mono text-[10px]">{l.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
