import "./states.css";

const TICKS = Array.from({ length: 13 }, (_, i) => -60 + i * 10);

/**
 * 仪器刻度盘：加载时指针来回校准；出错时静止在偏离的位置（`needle`）。
 * 纯 SVG + CSS，服务端渲染，减少动效时不摆动。
 */
export function CalibratingDial({
  sweep = true,
  needle = 0,
  size = 96,
}: {
  sweep?: boolean;
  needle?: number;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 64"
      width={size}
      height={(size * 64) / 100}
      className="calibrating text-fg-muted"
      data-sweep={sweep || undefined}
      aria-hidden
      focusable="false"
    >
      <path d="M12 50a38 38 0 0 1 76 0" fill="none" stroke="currentColor" strokeWidth="1" />
      {TICKS.map((deg) => {
        const long = deg % 30 === 0;
        return (
          <line
            key={deg}
            x1="50"
            y1={long ? 14 : 16}
            x2="50"
            y2="20"
            stroke="currentColor"
            strokeWidth={long ? 1.2 : 0.8}
            transform={`rotate(${deg} 50 50)`}
          />
        );
      })}
      <g
        className="calibrating__needle"
        style={{ transform: sweep ? undefined : `rotate(${needle}deg)` }}
      >
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="18"
          stroke="var(--brass)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>
      <circle cx="50" cy="50" r="3" fill="var(--brass)" />
    </svg>
  );
}

/** 加载中：刻度盘 + 一行字。替换各路由里复制粘贴的通用骨架屏。 */
export function Calibrating({ label = "正在载入" }: { label?: string }) {
  return (
    <div className="state-view" role="status" aria-live="polite">
      <CalibratingDial />
      <p className="text-fg-muted text-sm">{label}…</p>
    </div>
  );
}
