/**
 * Single <defs> block mounted once per SVG canvas. Hosts every reusable
 * filter / pattern / gradient. Components reference them via url(#hw-*).
 *
 * All `seed` values are fixed to keep SSR and CSR renders identical —
 * see docs/design/08-handwritten-universe.md § 5.
 */

const PAPER_DOTS = [
  { x: 40, y: 60, r: 0.6 },
  { x: 150, y: 30, r: 0.5 },
  { x: 200, y: 110, r: 0.7 },
  { x: 70, y: 180, r: 0.45 },
  { x: 110, y: 90, r: 0.55 },
  { x: 175, y: 170, r: 0.4 },
  { x: 25, y: 130, r: 0.5 },
  { x: 95, y: 200, r: 0.55 },
];

export function HandwrittenDefs() {
  return (
    <defs>
      {/* Three levels of organic wobble for hand-drawn feel. */}
      <filter id="hw-wobble" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves={2} seed={7} />
        <feDisplacementMap in="SourceGraphic" scale={6} xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="hw-wobble-soft" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves={2} seed={13} />
        <feDisplacementMap in="SourceGraphic" scale={3} xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="hw-wobble-tiny" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={22} />
        <feDisplacementMap
          in="SourceGraphic"
          scale={1.2}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>

      {/* Paper grain — tiled 220×220 sparse dots. */}
      <pattern id="hw-paper" x={0} y={0} width={220} height={220} patternUnits="userSpaceOnUse">
        <rect width={220} height={220} fill="transparent" />
        <g opacity={0.42}>
          {PAPER_DOTS.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="var(--hw-ink-faint-solid)" />
          ))}
        </g>
      </pattern>

      {/* Ink gradient — gives strokes a subtle directional variation. */}
      <linearGradient id="hw-ink-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--hw-ink)" />
        <stop offset="100%" stopColor="var(--hw-ink-soft)" />
      </linearGradient>

      {/* Radial fade for cartouche / vignette. */}
      <radialGradient id="hw-bg-vignette" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stopColor="var(--hw-bg)" stopOpacity={0} />
        <stop offset="100%" stopColor="var(--hw-bg-edge)" stopOpacity={1} />
      </radialGradient>

      {/* Glow for marker hover halo. */}
      <radialGradient id="hw-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="var(--hw-gold)" stopOpacity={0.5} />
        <stop offset="60%" stopColor="var(--hw-gold)" stopOpacity={0.12} />
        <stop offset="100%" stopColor="var(--hw-gold)" stopOpacity={0} />
      </radialGradient>
    </defs>
  );
}
