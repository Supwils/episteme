import { SpritePlate, SpriteSeal } from "@/components/design/SpriteSeal";
import { DomainCardLink } from "@/components/portal/DomainCardLink";
import { pigmentVar } from "@/lib/design/palette";
import { isSealDomain } from "@/lib/design/seals";
import type { DomainClusterId } from "@/lib/domain-clusters";
import { APP_URLS } from "../lib/urls";
import { formatCollection, getDomainStats } from "../lib/site-stats";

interface Domain {
  id: keyof typeof APP_URLS;
  title: string;
  titleEn: string;
  description: string;
  cluster?: DomainClusterId;
  stats: string;
}

/** Real counts first (generated), then the domain's own descriptive line. */
function statsLine(domain: Domain): string {
  const { articles, collections } = getDomainStats(domain.id);
  const counted = [`${articles} 篇文章`, ...collections.map(formatCollection)];
  return [...counted, ...(collections.length > 0 ? [] : [domain.stats])].join(" · ");
}

/** 首页六簇里的一张学科卡：标本图版在上，学科印与名字在下，颜色取所属簇的颜料。 */
export function DomainCard({ domain }: { domain: Domain }) {
  const pigment = domain.cluster ? pigmentVar(domain.cluster) : "var(--brass)";
  const seal = isSealDomain(domain.id) ? domain.id : null;

  return (
    <DomainCardLink
      href={APP_URLS[domain.id]}
      domain={domain.id}
      className="domain-card"
      style={{ ["--domain-color" as string]: pigment }}
    >
      {seal ? <SpritePlate domain={seal} accent={pigment} className="domain-card__plate" /> : null}
      <div className="domain-card__copy">
        <div className="domain-card__head">
          {seal ? <SpriteSeal domain={seal} size={26} color={pigment} /> : null}
          <h4 className="domain-card__title">{domain.title}</h4>
        </div>
        <p className="domain-card__subtitle">{domain.titleEn}</p>
        <p className="domain-card__description">{domain.description}</p>
      </div>
      <div className="domain-card__footer">
        <span className="domain-card__stats">{statsLine(domain)}</span>
        <span className="domain-card__cta">
          进入探索
          <span aria-hidden="true" className="domain-card__arrow">
            →
          </span>
        </span>
      </div>
    </DomainCardLink>
  );
}
