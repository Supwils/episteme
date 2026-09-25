import Link from "next/link";
import { pigmentVar } from "@/lib/design/palette";
import {
  CLUSTER_ARCS,
  CORE_RADIUS,
  annularSectorPath,
  levelRadius,
} from "@/lib/knowledge-geometry";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";

const SCALE = 100;
const LEVELS: readonly KnowledgeLevel[] = [1, 2, 3, 4, 5];

/**
 * ⑥ 登上格致山。同一张星盘把层级读成高度就是一座山（E7）。3D 山体还没做，
 * 这一段先指向知识图谱「看全图」；星盘随滚动轻微后仰，用 CSS 滚动时间线，
 * 零 JS，减少动效或浏览器不支持时就是一张静止的俯视图。
 */
export function ClimbInvite() {
  return (
    <section className="home-section home-climb" aria-labelledby="climb-title">
      <div className="home-climb__stage" aria-hidden="true">
        <svg viewBox="-112 -112 224 224" className="home-climb__dial">
          {LEVELS.map((level) => (
            <circle key={level} r={levelRadius(level) * SCALE} />
          ))}
          <circle r={CORE_RADIUS * SCALE} />
          {CLUSTER_ARCS.map((arc) => (
            <path
              key={arc.cluster}
              d={annularSectorPath(arc.startDeg, arc.endDeg, 1.03, 1.07, SCALE)}
              fill={pigmentVar(arc.cluster)}
            />
          ))}
        </svg>
      </div>
      <div className="home-climb__copy">
        <h2 id="climb-title" className="home-section__title">
          登上格致山
        </h2>
        <p className="home-climb__text">
          把这张星盘的半径读成高度，它就是一座山：L1 直觉启蒙在山脚，L5
          综合前沿在山顶，各学科沿着自己的山脊往上走，在峰顶汇合。三维的格致山还在制作中，先在知识图谱里看全图。
        </p>
        <Link href="/knowledge-graph" className="astrolabe__cta astrolabe__cta--primary">
          看全图 →
        </Link>
      </div>
    </section>
  );
}
