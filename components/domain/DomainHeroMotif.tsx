/**
 * Per-domain hero motif for engine-driven domain homepages. The engine
 * domains share one layout by design — the motif is the visual signature that
 * tells them apart at a glance. Pure static SVG, aria-hidden, no animation
 * (so prefers-reduced-motion needs no special case), tinted from the domain
 * accent. Unknown domains get no motif.
 */

type MotifProps = { color: string };

const shared = {
  fill: "none",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ChemistryMotif({ color }: MotifProps) {
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${i === 0 ? "M" : "L"}${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join("") + "Z";
  return (
    <g {...shared} stroke={color}>
      <path d={hex(60, 62, 34)} />
      <path d={hex(112, 92, 34)} />
      <path d={hex(164, 62, 34)} opacity={0.7} />
      <circle cx={60} cy={62} r={5} fill={color} stroke="none" opacity={0.8} />
      <circle cx={112} cy={92} r={5} fill={color} stroke="none" opacity={0.55} />
    </g>
  );
}

function LinguisticsMotif({ color }: MotifProps) {
  const glyphs = [
    { t: "ð", x: 28, y: 66, s: 44, o: 0.9 },
    { t: "ŋ", x: 76, y: 40, s: 30, o: 0.6 },
    { t: "ʃ", x: 116, y: 84, s: 38, o: 0.75 },
    { t: "ə", x: 160, y: 50, s: 30, o: 0.5 },
    { t: "˥˩", x: 64, y: 110, s: 20, o: 0.55 },
  ];
  return (
    <g fill={color} fontFamily="serif">
      {glyphs.map((g) => (
        <text key={g.t} x={g.x} y={g.y} fontSize={g.s} opacity={g.o}>
          {g.t}
        </text>
      ))}
    </g>
  );
}

function SociologyMotif({ color }: MotifProps) {
  const nodes = [
    [34, 40],
    [92, 26],
    [150, 48],
    [60, 88],
    [126, 100],
    [180, 82],
  ] as const;
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 3],
    [1, 4],
    [2, 4],
    [2, 5],
    [3, 4],
  ];
  return (
    <g {...shared} stroke={color}>
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a]![0]}
          y1={nodes[a]![1]}
          x2={nodes[b]![0]}
          y2={nodes[b]![1]}
          opacity={0.5}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 1 ? 7 : 4.5}
          fill={color}
          stroke="none"
          opacity={i === 1 ? 0.9 : 0.6}
        />
      ))}
    </g>
  );
}

function ComputerScienceMotif({ color }: MotifProps) {
  return (
    <g {...shared} stroke={color}>
      <path d="M52 34 L26 62 L52 90" opacity={0.9} />
      <path d="M138 34 L164 62 L138 90" opacity={0.9} />
      <line x1="106" y1="26" x2="84" y2="98" opacity={0.65} />
      <text
        x="30"
        y="122"
        fontSize="15"
        fill={color}
        stroke="none"
        fontFamily="monospace"
        opacity={0.55}
      >
        01001
      </text>
      <text
        x="112"
        y="122"
        fontSize="15"
        fill={color}
        stroke="none"
        fontFamily="monospace"
        opacity={0.4}
      >
        11010
      </text>
    </g>
  );
}

function PoliticalScienceMotif({ color }: MotifProps) {
  return (
    <g {...shared} stroke={color}>
      <line x1="98" y1="20" x2="98" y2="34" />
      <line x1="46" y1="34" x2="150" y2="34" />
      <line x1="46" y1="34" x2="46" y2="44" />
      <line x1="150" y1="34" x2="150" y2="44" />
      <path d="M32 70 L60 70 L46 44 Z" opacity={0.85} />
      <path d="M136 70 L164 70 L150 44 Z" opacity={0.85} />
      <line x1="98" y1="20" x2="98" y2="100" opacity={0.6} />
      <line x1="72" y1="100" x2="124" y2="100" opacity={0.6} />
    </g>
  );
}

function EarthScienceMotif({ color }: MotifProps) {
  return (
    <g {...shared} stroke={color}>
      <path d="M20 40 C 60 30, 100 50, 140 42 S 180 34, 188 40" opacity={0.9} />
      <path d="M20 62 C 55 54, 95 72, 135 64 S 175 56, 188 62" opacity={0.7} />
      <path d="M20 84 C 50 78, 90 94, 130 86 S 170 78, 188 84" opacity={0.5} />
      <path d="M20 106 C 55 100, 95 114, 140 106 S 178 100, 188 106" opacity={0.35} />
    </g>
  );
}

function MedicineMotif({ color }: MotifProps) {
  return (
    <g {...shared} stroke={color}>
      <path
        d="M18 66 H56 L68 66 L78 36 L92 96 L102 52 L110 66 H140 L150 66 L158 52 L166 74 L174 66 H190"
        strokeWidth={2}
        opacity={0.9}
      />
      <circle cx="92" cy="96" r="3.5" fill={color} stroke="none" opacity={0.7} />
    </g>
  );
}

function LawMotif({ color }: MotifProps) {
  const columns = [56, 88, 120, 152] as const;
  return (
    <g {...shared} stroke={color}>
      <path d="M44 46 L104 20 L164 46 Z" opacity={0.9} />
      <line x1="40" y1="52" x2="168" y2="52" opacity={0.7} />
      {columns.map((x) => (
        <line key={x} x1={x} y1="58" x2={x} y2="98" opacity={0.75} />
      ))}
      <line x1="36" y1="104" x2="172" y2="104" opacity={0.6} />
      <line x1="28" y1="114" x2="180" y2="114" opacity={0.45} />
    </g>
  );
}

function EngineeringMotif({ color }: MotifProps) {
  const posts = [20, 62, 104, 146, 188] as const;
  return (
    <g {...shared} stroke={color}>
      {/* truss bridge: chords, posts, and a zigzag of diagonals */}
      <line x1="14" y1="58" x2="194" y2="58" opacity={0.9} />
      <line x1="14" y1="98" x2="194" y2="98" opacity={0.9} />
      {posts.map((x) => (
        <line key={x} x1={x} y1="58" x2={x} y2="98" opacity={0.7} />
      ))}
      <path d="M20 98 L62 58 L104 98 L146 58 L188 98" opacity={0.5} />
      <path d="M8 112 L30 112 L19 98 Z" opacity={0.45} />
      <path d="M178 112 L200 112 L189 98 Z" opacity={0.45} />
    </g>
  );
}

function ArtsMotif({ color }: MotifProps) {
  return (
    <g {...shared} stroke={color}>
      {/* large frame with a one-point perspective construction inside */}
      <rect x="28" y="22" width="76" height="60" opacity={0.9} />
      <rect x="37" y="31" width="58" height="42" opacity={0.55} />
      <circle cx="66" cy="52" r="2.5" fill={color} stroke="none" opacity={0.8} />
      <path d="M37 31 L66 52 L95 31" opacity={0.4} />
      <path d="M37 73 L66 52 L95 73" opacity={0.4} />
      {/* smaller frame receding toward the vanishing point */}
      <rect x="132" y="46" width="46" height="34" opacity={0.6} />
      <rect x="139" y="52" width="32" height="22" opacity={0.35} />
      <path d="M132 46 L178 80" opacity={0.3} />
    </g>
  );
}

const MOTIFS: Record<string, (props: MotifProps) => React.ReactNode> = {
  chemistry: ChemistryMotif,
  linguistics: LinguisticsMotif,
  sociology: SociologyMotif,
  "computer-science": ComputerScienceMotif,
  "political-science": PoliticalScienceMotif,
  "earth-science": EarthScienceMotif,
  medicine: MedicineMotif,
  law: LawMotif,
  arts: ArtsMotif,
  engineering: EngineeringMotif,
};

export function DomainHeroMotif({ domain, accent }: { domain: string; accent: string }) {
  const Motif = MOTIFS[domain];
  if (!Motif) return null;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 208 132"
      className="pointer-events-none absolute top-24 right-6 hidden w-72 opacity-[0.16] sm:block md:right-16 md:w-96"
    >
      <Motif color={accent} />
    </svg>
  );
}
