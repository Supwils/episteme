import { DOMAIN_WEDGES } from "@/lib/knowledge-geometry";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";
import { SUMMIT_NODE_STRIDE, type SummitLayoutFile } from "@/lib/summit-layout";

/** 立体图点击后才取的说明。标题不进布局文件，也不进山体页的 HTML。 */
export const SUMMIT_CARDS_VERSION = 1;

export type SummitCardFile = {
  v: number;
  l: string[];
  u: string[];
  d: Record<string, string>;
  p: string[];
  n: string[];
};

export type SummitPanelLink = {
  index: number;
  domain: string;
  label: string;
  href: string | null;
};

export type SummitPanelNode = {
  index: number;
  label: string;
  level: KnowledgeLevel;
  domainId: string;
  dek: string | null;
  href: string | null;
  prereq: SummitPanelLink[];
  neighbors: SummitPanelLink[];
};

type CardSource = {
  index: number;
  label: string;
  url: string | null;
  dek: string | null;
  prereq: readonly number[];
  neighbors: readonly number[];
};

export function summitCardFile(nodes: readonly CardSource[]): SummitCardFile {
  const deks: Record<string, string> = {};
  for (const node of nodes) {
    if (node.dek) deks[String(node.index)] = node.dek;
  }
  return {
    v: SUMMIT_CARDS_VERSION,
    l: nodes.map((node) => node.label),
    u: nodes.map((node) => node.url ?? ""),
    d: deks,
    p: nodes.map((node) => node.prereq.join(" ")),
    n: nodes.map((node) => node.neighbors.join(" ")),
  };
}

export function parseSummitCards(value: unknown): SummitCardFile | null {
  if (!value || typeof value !== "object") return null;
  const record = value as SummitCardFile;
  if (record.v !== SUMMIT_CARDS_VERSION) return null;
  if (
    !Array.isArray(record.l) ||
    !Array.isArray(record.u) ||
    !Array.isArray(record.p) ||
    !Array.isArray(record.n)
  ) {
    return null;
  }
  if (record.l.length === 0 || record.u.length !== record.l.length) return null;
  if (record.p.length !== record.l.length || record.n.length !== record.l.length) return null;
  if (!record.d || typeof record.d !== "object") return null;
  return record;
}

export function panelNodeFromCards(
  cards: SummitCardFile,
  layout: SummitLayoutFile,
  index: number
): SummitPanelNode | null {
  const label = cards.l[index];
  if (label === undefined) return null;
  const base = index * SUMMIT_NODE_STRIDE;
  const level = asLevel(layout.nodes[base + 3]);
  const domainId = domainAt(layout, index);
  return {
    index,
    label,
    level,
    domainId,
    dek: cards.d[String(index)] ?? null,
    href: cards.u[index] || null,
    prereq: unpackLinks(cards.p[index], cards, layout),
    neighbors: unpackLinks(cards.n[index], cards, layout),
  };
}

function unpackLinks(
  value: string | undefined,
  cards: SummitCardFile,
  layout: SummitLayoutFile
): SummitPanelLink[] {
  if (!value) return [];
  return value.split(" ").flatMap((part) => {
    const index = Number(part);
    const label = cards.l[index];
    if (!Number.isInteger(index) || index < 0 || label === undefined) return [];
    return [
      {
        index,
        domain: domainAt(layout, index),
        label,
        href: cards.u[index] || null,
      },
    ];
  });
}

function domainAt(layout: SummitLayoutFile, index: number): string {
  const domainIndex = layout.nodes[index * SUMMIT_NODE_STRIDE + 4] ?? 0;
  return DOMAIN_WEDGES[domainIndex]?.domain ?? "";
}

function asLevel(value: number | undefined): KnowledgeLevel {
  if (value === 1 || value === 2 || value === 3 || value === 4 || value === 5) return value;
  return 1;
}
