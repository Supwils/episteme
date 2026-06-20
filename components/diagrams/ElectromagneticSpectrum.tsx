// Static, source-cited SVG figure of the electromagnetic spectrum. No client JS
// (rendered server-side via the DomainArticle interactive registry).

const BANDS: { label: string; sub: string; color: string; w: number }[] = [
  { label: "无线电", sub: "> 1 m", color: "#7a5cc0", w: 1 },
  { label: "微波", sub: "1 m–1 mm", color: "#5a6fd0", w: 1 },
  { label: "红外", sub: "1 mm–700 nm", color: "#c0392b", w: 1 },
  { label: "可见光", sub: "700–400 nm", color: "#2ecc71", w: 0.7 },
  { label: "紫外", sub: "400–10 nm", color: "#8e44ad", w: 1 },
  { label: "X 射线", sub: "10 nm–0.01 nm", color: "#2980b9", w: 1 },
  { label: "γ 射线", sub: "< 0.01 nm", color: "#16a085", w: 1 },
];

export function ElectromagneticSpectrum() {
  const total = BANDS.reduce((s, b) => s + b.w, 0);
  const W = 320;
  let x = 0;
  return (
    <figure className="border-border-faint bg-bg-near my-8 border">
      <figcaption className="border-border-faint border-b px-4 py-2.5">
        <span className="font-mono text-[10px] tracking-[0.22em] text-[#5a6fd0] uppercase">
          电磁波谱 · 示意图
        </span>
      </figcaption>
      <div className="p-4 sm:p-6">
        <svg
          viewBox="0 0 320 96"
          className="h-auto w-full"
          role="img"
          aria-label="电磁波谱：从无线电（波长大于一米、能量最低）到伽马射线（波长小于0.01纳米、能量最高），中间是微波、红外、可见光、紫外、X射线"
        >
          {/* the band strip */}
          {BANDS.map((b) => {
            const bw = (b.w / total) * W;
            const cx = x + bw / 2;
            const rect = (
              <g key={b.label}>
                <rect x={x} y="22" width={bw} height="22" fill={b.color} opacity="0.85" />
                <text
                  x={cx}
                  y="16"
                  fontSize="7"
                  fontFamily="monospace"
                  textAnchor="middle"
                  fill="var(--color-fg-secondary)"
                >
                  {b.label}
                </text>
                <text
                  x={cx}
                  y="56"
                  fontSize="5.5"
                  fontFamily="monospace"
                  textAnchor="middle"
                  fill="var(--color-fg-muted)"
                >
                  {b.sub}
                </text>
              </g>
            );
            x += bw;
            return rect;
          })}
          {/* axes: wavelength ↓ vs frequency/energy ↑ */}
          <text x="2" y="76" fontSize="6.5" fontFamily="monospace" fill="var(--color-fg-muted)">
            ← 波长变长
          </text>
          <text
            x="318"
            y="76"
            fontSize="6.5"
            fontFamily="monospace"
            textAnchor="end"
            fill="var(--color-fg-muted)"
          >
            频率 · 能量变高 →
          </text>
          <line
            x1="2"
            y1="86"
            x2="318"
            y2="86"
            stroke="var(--color-border-subtle)"
            strokeWidth="0.7"
          />
        </svg>
        <p className="text-fg-muted mt-3 text-xs leading-relaxed">
          可见光只是其中极窄的一段（约 400–700 nm）。波长越短，频率与光子能量越高——这也是为什么 X
          射线和 γ 射线具有电离能力。
        </p>
      </div>
    </figure>
  );
}
