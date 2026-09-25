/**
 * 首页格致仪（E4）的服务端数据：每个学科的读数（学习主线五步）、汇流点在盘心的
 * 方位、「今天」书架的每日轮换。只在服务端与 force-static 路由里用，
 * 图谱数据不进客户端包。
 */
import { DOMAINS } from "@/lib/data";
import { domainSpine, graphDomainId } from "@/lib/domain-spine";
import { DOMAIN_WEDGES, domainWedge } from "@/lib/knowledge-geometry";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import {
  CURATED_KNOWLEDGE_CONFLUENCES,
  getCuratedConfluenceNodeIds,
} from "@/subjects/knowledge-graph/data/curated-confluences";

export type AstrolabeStep = { level: KnowledgeLevel; label: string; url: string };

export type AstrolabeReadout = {
  domain: string;
  title: string;
  href: string;
  question: string;
  steps: AstrolabeStep[];
};

const ROUTE_BY_GRAPH_DOMAIN = new Map(DOMAINS.map((d) => [graphDomainId(d.id), d.id]));

export function astrolabeReadout(domain: string): AstrolabeReadout {
  const meta = DOMAINS.find((d) => d.id === domain);
  if (!meta) throw new Error(`astrolabe: unknown domain "${domain}"`);
  const spine = domainSpine(domain);
  return {
    domain,
    title: meta.title,
    href: `/${domain}`,
    question: spine?.question ?? meta.description,
    steps: (spine?.steps ?? []).map(({ level, label, url }) => ({ level, label, url })),
  };
}

/** Ring order, so the client can step through readouts with the arrow keys. */
export function astrolabeReadouts(): AstrolabeReadout[] {
  return DOMAIN_WEDGES.map((wedge) => astrolabeReadout(wedge.domain));
}

export type AstrolabeConfluence = { id: string; title: string; angleDeg: number };

/**
 * A confluence sits in the core at the circular mean of the domains it draws on,
 * so it leans toward the part of the ring it actually joins.
 */
export function astrolabeConfluences(): AstrolabeConfluence[] {
  return CURATED_KNOWLEDGE_CONFLUENCES.map((confluence) => {
    const domains = new Set(
      getCuratedConfluenceNodeIds(confluence).flatMap((nodeId) => {
        const route = ROUTE_BY_GRAPH_DOMAIN.get(nodeId.split(":")[0]!);
        return route ? [route] : [];
      })
    );
    let x = 0;
    let y = 0;
    for (const domain of domains) {
      const radians = (domainWedge(domain).centerDeg * Math.PI) / 180;
      x += Math.sin(radians);
      y += Math.cos(radians);
    }
    const angleDeg = ((Math.atan2(x, y) * 180) / Math.PI + 360) % 360;
    return { id: confluence.id, title: confluence.title, angleDeg };
  });
}

/** The domain the rule rests on today: one per day, round the ring. */
export function astrolabeDomainOfDay(date = new Date()): string {
  const index = Math.floor(seeded(dateSeed(date) + 7)() * DOMAIN_WEDGES.length);
  return DOMAIN_WEDGES[index]!.domain;
}

export type ShelfPick = AstrolabeStep & { domain: string; domainTitle: string };

function dateSeed(date: Date): number {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}

/** mulberry32: small, deterministic, good enough to shuffle a shelf. */
function seeded(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Six readable articles for today: L2–L3 steps of the domain spines (past the
 * first question, short of method and frontier), one per domain, rotated daily.
 */
export function dailyShelf(date = new Date(), size = 6): ShelfPick[] {
  const pool = astrolabeReadouts().flatMap((readout) =>
    readout.steps
      .filter((step) => step.level === 2 || step.level === 3)
      .map((step) => ({ ...step, domain: readout.domain, domainTitle: readout.title }))
  );
  const random = seeded(dateSeed(date));
  const shuffled = pool
    .map((pick) => ({ pick, key: random() }))
    .sort((a, b) => a.key - b.key)
    .map(({ pick }) => pick);
  const picks: ShelfPick[] = [];
  const seen = new Set<string>();
  for (const pick of shuffled) {
    if (seen.has(pick.domain)) continue;
    seen.add(pick.domain);
    picks.push(pick);
    if (picks.length === size) break;
  }
  return picks;
}
