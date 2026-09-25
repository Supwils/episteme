import Link from "next/link";
import { SITE_TOTALS } from "@/lib/site-stats";
import { pigmentVar } from "@/lib/design/palette";
import { sealSymbolHref } from "@/lib/design/sprites";
import { isSealDomain } from "@/lib/design/seals";
import { DOMAINS } from "@/lib/data";
import {
  CLUSTER_ARCS,
  CORE_RADIUS,
  DOMAIN_WEDGES,
  annularSectorPath,
  domainWedge,
  levelBand,
  levelRadius,
  polarToXY,
} from "@/lib/knowledge-geometry";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import { astrolabeConfluences, astrolabeReadout, type AstrolabeReadout } from "@/lib/astrolabe";
import { AstrolabeController } from "./AstrolabeController";

/** Normalized geometry × SCALE = SVG user units; the ring's rim sits at 100. */
const SCALE = 100;
const VIEW = 122;
const ARC = { inner: 1.045, outer: 1.065 };
const SEAL = { radius: 1.13, size: 9 };
const fmt = (value: number) => Number((value * SCALE).toFixed(2));
const TITLE_BY_DOMAIN = new Map<string, string>(DOMAINS.map((d) => [d.id, d.title]));

function tickPath(): string {
  const parts: string[] = [];
  for (let deg = 0; deg < 360; deg += 5) {
    const a = polarToXY(deg, 1);
    const b = polarToXY(deg, deg % 15 === 0 ? 1.03 : 1.015);
    parts.push(`M${fmt(a.x)} ${fmt(a.y)}L${fmt(b.x)} ${fmt(b.y)}`);
  }
  return parts.join("");
}

const LEVELS: readonly KnowledgeLevel[] = [1, 2, 3, 4, 5];

function bandMiddle(level: KnowledgeLevel): number {
  const band = levelBand(level);
  return (band.inner + band.outer) / 2;
}

function Dial({ selected }: { selected: string }) {
  return (
    <svg
      viewBox={`${-VIEW} ${-VIEW} ${VIEW * 2} ${VIEW * 2}`}
      className="astrolabe__svg"
      role="group"
      aria-label="格致仪：二十二个学科按六簇排成一圈，半径是认知层级，外圈 L1 直觉启蒙，靠近圆心 L5 综合前沿"
    >
      <g className="astrolabe__disc">
        <g className="astrolabe__rings" aria-hidden="true">
          {LEVELS.map((level, i) => (
            <circle
              key={level}
              r={fmt(levelRadius(level))}
              pathLength={1}
              style={{ ["--i" as string]: i }}
            />
          ))}
          <circle r={fmt(CORE_RADIUS)} pathLength={1} style={{ ["--i" as string]: 5 }} />
          {LEVELS.map((level) => (
            <text key={level} y={-fmt(bandMiddle(level))} className="astrolabe__level">
              L{level}
            </text>
          ))}
        </g>
        <path d={tickPath()} className="astrolabe__ticks" aria-hidden="true" />

        {CLUSTER_ARCS.map((arc) => (
          <path
            key={arc.cluster}
            d={annularSectorPath(arc.startDeg, arc.endDeg, ARC.inner, ARC.outer, SCALE)}
            fill={pigmentVar(arc.cluster)}
            aria-hidden="true"
          />
        ))}

        {DOMAIN_WEDGES.map((wedge) => {
          const title = TITLE_BY_DOMAIN.get(wedge.domain) ?? wedge.domain;
          const isSelected = wedge.domain === selected;
          return (
            <a
              key={wedge.domain}
              href={`/${wedge.domain}`}
              className={isSelected ? "astrolabe__wedge is-selected" : "astrolabe__wedge"}
              data-wedge={wedge.domain}
              aria-label={title}
              style={{ ["--wedge-pigment" as string]: pigmentVar(wedge.cluster) }}
            >
              <title>{title}</title>
              <path d={annularSectorPath(wedge.startDeg, wedge.endDeg, CORE_RADIUS, 1, SCALE)} />
            </a>
          );
        })}

        <g aria-hidden="true">
          {DOMAIN_WEDGES.map((wedge) => (
            <g
              key={wedge.domain}
              className={
                wedge.domain === selected ? "astrolabe__spine is-selected" : "astrolabe__spine"
              }
              data-spine={wedge.domain}
              style={{ ["--wedge-pigment" as string]: pigmentVar(wedge.cluster) }}
            >
              {LEVELS.map((level) => {
                const point = polarToXY(wedge.centerDeg, bandMiddle(level));
                return <circle key={level} cx={fmt(point.x)} cy={fmt(point.y)} r={1.3} />;
              })}
            </g>
          ))}
        </g>

        <g aria-hidden="true">
          {DOMAIN_WEDGES.filter((wedge) => isSealDomain(wedge.domain)).map((wedge) => (
            <g
              key={wedge.domain}
              transform={`rotate(${wedge.centerDeg.toFixed(2)}) translate(0 ${-fmt(SEAL.radius)})`}
              style={{ color: pigmentVar(wedge.cluster) }}
            >
              <use
                href={sealSymbolHref(wedge.domain as Parameters<typeof sealSymbolHref>[0])}
                x={-SEAL.size / 2}
                y={-SEAL.size / 2}
                width={SEAL.size}
                height={SEAL.size}
              />
            </g>
          ))}
        </g>

        {astrolabeConfluences().map((confluence) => {
          const point = polarToXY(confluence.angleDeg, CORE_RADIUS * 0.55);
          return (
            <a
              key={confluence.id}
              href={`/knowledge-confluence/${confluence.id}`}
              className="astrolabe__confluence"
              aria-label={`知识汇流：${confluence.title}`}
              tabIndex={-1}
            >
              <title>{`知识汇流：${confluence.title}`}</title>
              <circle cx={fmt(point.x)} cy={fmt(point.y)} r={2.4} />
            </a>
          );
        })}
      </g>

      <g className="astrolabe__rule" aria-hidden="true">
        <line x1={0} y1={-4} x2={0} y2={-fmt(1.04)} />
        <path d={`M0 ${-fmt(1.075)}L-2.4 ${-fmt(1.035)}L2.4 ${-fmt(1.035)}Z`} />
        <circle cy={-fmt(0.62)} r={3.4} className="astrolabe__handle" />
      </g>
      <circle r={2} className="astrolabe__pivot" aria-hidden="true" />
    </svg>
  );
}

/**
 * 首页格致仪（E4）。星盘在服务端从 DOMAINS 与知识几何画出来：无 JS 时是一张
 * 可读的图，22 个扇区都是学科链接，读数面板显示默认学科。水合后
 * `AstrolabeController` 只接管选择状态（照准规角度、面板内容），不重画 SVG。
 */
export function Astrolabe({ selected }: { selected: string }) {
  const initial: AstrolabeReadout = astrolabeReadout(selected);
  const domains = DOMAIN_WEDGES.map((wedge) => ({
    id: wedge.domain,
    title: TITLE_BY_DOMAIN.get(wedge.domain) ?? wedge.domain,
  }));

  return (
    <section className="astrolabe" aria-labelledby="home-title">
      <AstrolabeController
        initial={initial}
        initialAim={domainWedge(selected).centerDeg}
        domains={domains}
        intro={
          <header className="astrolabe__intro">
            <p className="astrolabe__kicker">Episteme · 格致</p>
            <h1 id="home-title" className="astrolabe__title">
              从问题出发
            </h1>
            <p className="astrolabe__lead">
              {DOMAINS.length} 个学科，{SITE_TOTALS.articles.toLocaleString("en-US")}{" "}
              篇文章，按同一张星盘排列：角度是学科，半径是从直觉到前沿的五个层级。
            </p>
          </header>
        }
        actions={
          <nav className="astrolabe__actions" aria-label="开始阅读">
            <Link href="/random" className="astrolabe__cta astrolabe__cta--primary">
              随机一篇
            </Link>
            <Link href="/read" className="astrolabe__cta">
              阅读路线
            </Link>
            <Link href="/curiosities" className="astrolabe__cta">
              奇趣知识
            </Link>
          </nav>
        }
        dial={<Dial selected={selected} />}
      />
    </section>
  );
}
