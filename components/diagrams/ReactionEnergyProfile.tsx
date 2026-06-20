// Static, source-cited SVG of a reaction energy profile (activation energy,
// enthalpy change, and the lower barrier a catalyst provides). No client JS.

const ACCENT = "#e08a3c";

export function ReactionEnergyProfile() {
  // an exothermic profile: reactants high-ish, transition-state peak, products lower
  const uncat = "M20 70 C 70 70, 90 18, 160 18 S 250 55, 300 55";
  const cat = "M20 70 C 80 70, 110 40, 160 40 S 250 55, 300 55";
  return (
    <figure className="border-border-faint bg-bg-near my-8 border">
      <figcaption className="border-border-faint border-b px-4 py-2.5">
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: ACCENT }}
        >
          反应能量曲线 · 示意图
        </span>
      </figcaption>
      <div className="p-4 sm:p-6">
        <svg
          viewBox="0 0 320 96"
          className="h-auto w-full"
          role="img"
          aria-label="反应能量曲线：反应物越过一个活化能势垒到达过渡态，再下降到能量更低的产物（放热反应）。催化剂提供一条势垒更低的路径，但不改变反应物与产物的能量差 ΔH。"
        >
          {/* axes */}
          <line
            x1="20"
            y1="8"
            x2="20"
            y2="80"
            stroke="var(--color-border-subtle)"
            strokeWidth="0.8"
          />
          <line
            x1="20"
            y1="80"
            x2="312"
            y2="80"
            stroke="var(--color-border-subtle)"
            strokeWidth="0.8"
          />
          <text x="6" y="14" fontSize="6.5" fontFamily="monospace" fill="var(--color-fg-muted)">
            能量
          </text>
          <text
            x="300"
            y="90"
            fontSize="6.5"
            fontFamily="monospace"
            textAnchor="end"
            fill="var(--color-fg-muted)"
          >
            反应进程 →
          </text>

          {/* catalysed (lower) path */}
          <path
            d={cat}
            fill="none"
            stroke="var(--color-fg-muted)"
            strokeWidth="1.4"
            strokeDasharray="3 2"
          />
          <text x="120" y="36" fontSize="5.5" fontFamily="monospace" fill="var(--color-fg-muted)">
            有催化剂
          </text>

          {/* uncatalysed path */}
          <path d={uncat} fill="none" stroke={ACCENT} strokeWidth="1.8" />

          {/* Ea bracket (reactant level → peak) */}
          <line
            x1="160"
            y1="18"
            x2="160"
            y2="70"
            stroke="var(--color-fg-disabled)"
            strokeWidth="0.7"
            strokeDasharray="2 2"
          />
          <line
            x1="44"
            y1="70"
            x2="160"
            y2="70"
            stroke="var(--color-fg-disabled)"
            strokeWidth="0.6"
            strokeDasharray="2 2"
          />
          <text x="166" y="46" fontSize="7" fontFamily="monospace" fill={ACCENT}>
            Ea 活化能
          </text>

          {/* ΔH (reactant → product level) */}
          <line x1="290" y1="55" x2="290" y2="70" stroke="var(--color-success)" strokeWidth="0.8" />
          <text x="248" y="68" fontSize="6.5" fontFamily="monospace" fill="var(--color-success)">
            ΔH &lt; 0
          </text>

          {/* labels */}
          <text
            x="22"
            y="68"
            fontSize="6.5"
            fontFamily="monospace"
            fill="var(--color-fg-secondary)"
          >
            反应物
          </text>
          <text
            x="300"
            y="51"
            fontSize="6.5"
            fontFamily="monospace"
            textAnchor="end"
            fill="var(--color-fg-secondary)"
          >
            产物
          </text>
          <text
            x="160"
            y="14"
            fontSize="6"
            fontFamily="monospace"
            textAnchor="middle"
            fill="var(--color-fg-secondary)"
          >
            过渡态
          </text>
        </svg>
        <p className="text-fg-muted mt-3 text-xs leading-relaxed">
          反应必须先翻过活化能（Ea）这道势垒。催化剂提供一条势垒更低的路径、加快反应，但它
          <strong className="text-fg-secondary">不改变</strong>
          反应物与产物的能量差（ΔH），因此也不改变平衡位置。
        </p>
      </div>
    </figure>
  );
}
