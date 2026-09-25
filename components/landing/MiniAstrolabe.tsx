import { pigmentVar } from "@/lib/design/palette";
import {
  CLUSTER_ARCS,
  DOMAIN_WEDGES,
  annularSectorPath,
  domainWedge,
  polarToXY,
} from "@/lib/knowledge-geometry";

const SCALE = 60;
const RIM = { inner: 0.74, outer: 0.96 };
const ARC_RADIUS = 1.04;

/**
 * 小星盘：全站 22 个学科按簇排成一圈（与首页格致仪同一套几何），本学科那一格
 * 用簇颜料填满，一根照准线从盘心指向它。服务端 SVG，零客户端 JS。
 */
export function MiniAstrolabe({ domain, clusterLabel }: { domain: string; clusterLabel: string }) {
  const here = domainWedge(domain);
  const tip = polarToXY(here.centerDeg, RIM.inner - 0.04);
  const fmt = (value: number) => Number((value * SCALE).toFixed(2));

  return (
    <figure className="mini-astrolabe">
      <svg
        viewBox={`${-SCALE * 1.12} ${-SCALE * 1.12} ${SCALE * 2.24} ${SCALE * 2.24}`}
        role="img"
        aria-label={`本学科在六簇知识环中的位置：${clusterLabel}`}
      >
        {CLUSTER_ARCS.map((arc) => (
          <path
            key={arc.cluster}
            d={annularSectorPath(arc.startDeg, arc.endDeg, ARC_RADIUS, ARC_RADIUS + 0.02, SCALE)}
            fill={pigmentVar(arc.cluster)}
            opacity={arc.cluster === here.cluster ? 1 : 0.45}
          />
        ))}
        {DOMAIN_WEDGES.map((wedge) => (
          <path
            key={wedge.domain}
            d={annularSectorPath(wedge.startDeg, wedge.endDeg, RIM.inner, RIM.outer, SCALE)}
            className="mini-astrolabe__wedge"
            data-here={wedge.domain === domain || undefined}
            style={wedge.domain === domain ? { fill: pigmentVar(wedge.cluster) } : undefined}
          />
        ))}
        <circle r={fmt(0.2)} className="mini-astrolabe__core" />
        <line x1={0} y1={0} x2={fmt(tip.x)} y2={fmt(tip.y)} className="mini-astrolabe__alidade" />
        <circle r={2.5} className="mini-astrolabe__pivot" />
      </svg>
      <figcaption>{clusterLabel}</figcaption>
    </figure>
  );
}
