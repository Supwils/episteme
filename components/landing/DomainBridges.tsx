import Link from "next/link";
import { Seal } from "@/components/design/Seal";
import { DOMAIN_SEALS, isSealDomain } from "@/lib/design/seals";
import type { DomainBridge } from "@/lib/site-stats";

const ROW = 56;
const ORIGIN_X = 6;
const REACH = 46;

/**
 * 与其他领域的桥：正文里跨到别的学科的内链有多少条，按强弱排出最多八座桥。
 * 左边一束弧线从本学科出发、落到每一行的学科印上，线越粗桥越强；
 * 弧线是装饰，数目与去处都写在行里。
 */
export function DomainBridges({ bridges }: { bridges: DomainBridge[] }) {
  const rows = bridges.filter((bridge) => isSealDomain(bridge.domain));
  if (rows.length === 0) return null;
  const strongest = Math.max(...rows.map((bridge) => bridge.links));
  const height = rows.length * ROW;
  const originY = height / 2;

  return (
    <section className="landing-block" aria-labelledby="landing-bridges">
      <h2 id="landing-bridges" className="landing-block__title">
        与其他领域的桥
      </h2>
      <p className="landing-block__note">正文里的内链跨到别的学科，最常在这些地方相遇。</p>
      <div className="bridges">
        <svg
          className="bridges__arcs"
          viewBox={`0 0 ${ORIGIN_X + REACH} ${height}`}
          width={ORIGIN_X + REACH}
          height={height}
          aria-hidden
          focusable="false"
        >
          {rows.map((bridge, index) => {
            const y = index * ROW + ROW / 2;
            return (
              <path
                key={bridge.domain}
                d={`M ${ORIGIN_X} ${originY} C ${ORIGIN_X + REACH * 0.6} ${originY}, ${ORIGIN_X + REACH * 0.4} ${y}, ${ORIGIN_X + REACH} ${y}`}
                strokeWidth={1 + (bridge.links / strongest) * 3}
              />
            );
          })}
          <circle cx={ORIGIN_X} cy={originY} r={4} />
        </svg>
        <ol className="bridges__list">
          {rows.map((bridge) => (
            <li key={bridge.domain} className="bridges__row" style={{ height: ROW }}>
              <Seal domain={bridge.domain as keyof typeof DOMAIN_SEALS} size={26} label={false} />
              <span className="bridges__text">
                <Link href={`/${bridge.domain}`} className="bridges__domain">
                  {DOMAIN_SEALS[bridge.domain as keyof typeof DOMAIN_SEALS].name}
                </Link>
                <span className="bridges__via">
                  {bridge.links} 条内链 · 常在
                  <Link href={bridge.via.url}>{bridge.via.title}</Link>
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
