import { DOMAIN_SEALS } from "@/lib/design/seals";
import { pigmentVar } from "@/lib/design/palette";
import {
  CLUSTER_ARCS,
  CORE_RADIUS,
  DOMAIN_WEDGES,
  annularSectorPath,
  levelRadius,
  polarToXY,
} from "@/lib/knowledge-geometry";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";

const SCALE = 100;
const LEVELS: readonly KnowledgeLevel[] = [1, 2, 3, 4, 5];

type Beacon = { id: string; title: string; x: number; z: number };

/** 无脚本时的俯视图。和首页星盘同一套环与扇区，汇流灯标可以点。 */
export function SummitPlan({ beacons }: { beacons: readonly Beacon[] }) {
  return (
    <svg
      className="summit-plan__svg"
      viewBox="-124 -124 248 248"
      role="img"
      aria-label="格致山平面图"
    >
      <title>格致山平面图</title>
      {LEVELS.map((level) => (
        <circle key={level} className="summit-plan__ring" r={levelRadius(level) * SCALE} />
      ))}
      <circle className="summit-plan__core" r={CORE_RADIUS * SCALE} />
      {CLUSTER_ARCS.map((arc) => (
        <path
          key={arc.cluster}
          d={annularSectorPath(arc.startDeg, arc.endDeg, 1.02, 1.08, SCALE)}
          fill={pigmentVar(arc.cluster)}
        />
      ))}
      {DOMAIN_WEDGES.map((wedge) => {
        const seal = DOMAIN_SEALS[wedge.domain as keyof typeof DOMAIN_SEALS];
        const pos = polarToXY(wedge.centerDeg, 1.16);
        return (
          <a key={wedge.domain} href={`/knowledge-summit/${wedge.domain}`}>
            <text
              className="summit-plan__seal"
              x={pos.x * SCALE}
              y={pos.y * SCALE}
              fill={pigmentVar(wedge.cluster)}
            >
              {seal?.char ?? ""}
            </text>
          </a>
        );
      })}
      {beacons.map((beacon) => (
        <a key={beacon.id} href={`/knowledge-confluence/${beacon.id}`}>
          <circle
            className="summit-plan__beacon"
            cx={beacon.x * SCALE}
            cy={beacon.z * SCALE}
            r="2.4"
          />
          <title>{beacon.title}</title>
        </a>
      ))}
    </svg>
  );
}
