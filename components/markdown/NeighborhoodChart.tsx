import { resolveWikiLink } from "@/lib/wiki-link-index";
import { DOMAIN_SEALS, isSealDomain } from "@/lib/design/seals";
import { pigmentVar } from "@/lib/design/palette";
import { domainCluster } from "@/lib/knowledge-geometry";
import type { Neighbor } from "./sections";

const W = 480;
const H = 250;
const CX = W / 2;
const CY = H / 2;
const MAX_NEIGHBORS = 8;

function clip(text: string, length: number) {
  return [...text].length > length ? `${[...text].slice(0, length - 1).join("")}…` : text;
}

/**
 * 邻域星图（T-DESIGN-06d）：本篇在中心，跨域连接里列出的条目环绕四周，按所属学科的
 * 簇颜料上色。纯装饰——同样的链接就在下方的列表里，所以整张图 aria-hidden。
 */
export function NeighborhoodChart({
  neighbors,
  domain,
  title,
}: {
  neighbors: Neighbor[];
  domain: string;
  title?: string;
}) {
  const placed = neighbors
    .map((neighbor) => {
      const href = resolveWikiLink(neighbor.target, domain);
      const neighborDomain = href?.split("/")[1] ?? "";
      const cluster = domainCluster(neighborDomain);
      return href && cluster ? { ...neighbor, neighborDomain, cluster } : null;
    })
    .filter((item) => item !== null)
    .slice(0, MAX_NEIGHBORS);
  if (placed.length < 2) return null;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="neighborhood-chart"
      aria-hidden
      focusable="false"
      role="presentation"
    >
      {placed.map((item, index) => {
        // Spread around an ellipse, starting top-left so labels avoid the center.
        const angle = -Math.PI / 2 + ((index + 0.5) / placed.length) * Math.PI * 2;
        const x = CX + Math.cos(angle) * 180;
        const y = CY + Math.sin(angle) * 88;
        const right = x >= CX;
        const color = pigmentVar(item.cluster);
        const domainName = isSealDomain(item.neighborDomain)
          ? DOMAIN_SEALS[item.neighborDomain].name
          : "";
        return (
          <g key={`${item.target}-${index}`}>
            <line
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              stroke={color}
              strokeOpacity={0.55}
              strokeWidth={1}
            />
            <circle cx={x} cy={y} r={5} fill={color} />
            <text
              x={x + (right ? 10 : -10)}
              y={y - 2}
              textAnchor={right ? "start" : "end"}
              className="neighborhood-chart__label"
            >
              {clip(item.label, 9)}
            </text>
            <text
              x={x + (right ? 10 : -10)}
              y={y + 13}
              textAnchor={right ? "start" : "end"}
              className="neighborhood-chart__domain"
              style={{ fill: pigmentVar(item.cluster, "ink") }}
            >
              {clip(domainName, 8)}
            </text>
          </g>
        );
      })}
      <circle cx={CX} cy={CY} r={30} className="neighborhood-chart__center" />
      <text x={CX} y={CY + 5} textAnchor="middle" className="neighborhood-chart__self">
        {title ? clip(title, 5) : "本篇"}
      </text>
    </svg>
  );
}
