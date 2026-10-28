import type { SummitPanelLink, SummitPanelNode } from "@/lib/summit-cards";
import type { KnowledgeLevel } from "@/lib/knowledge-levels";

export function summitNodeElement(index: number): HTMLElement | null {
  if (!Number.isInteger(index) || index < 0) return null;
  return document.getElementById(`summit-node-${index}`);
}

export function summitNodeLabel(index: number): string {
  return summitNodeElement(index)?.textContent?.trim() || "";
}

export function revealSummitNode(index: number) {
  let parent = summitNodeElement(index)?.parentElement ?? null;
  while (parent) {
    if (parent instanceof HTMLDetailsElement) parent.open = true;
    parent = parent.parentElement;
  }
}

/** 学科页上的节点。关系写在 data-links 里，邻域条目不在本页时也能标出名字。 */
export function panelNodeFromElement(index: number): SummitPanelNode | null {
  const node = summitNodeElement(index);
  if (!node) return null;
  const levelValue = Number(node.dataset.level);
  const domainId = node.closest("[id^='summit-domain-']")?.id.replace("summit-domain-", "") ?? "";
  const links = parseDataLinks(node.dataset.links);
  return {
    index,
    label: node.textContent?.trim() || "未命名",
    level: asLevel(levelValue),
    domainId,
    dek: node.dataset.dek || null,
    href: node.getAttribute("href"),
    prereq: links.p,
    neighbors: links.n,
  };
}

function parseDataLinks(value: string | undefined): { p: SummitPanelLink[]; n: SummitPanelLink[] } {
  if (!value) return { p: [], n: [] };
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object") return { p: [], n: [] };
    const record = parsed as { p?: unknown; n?: unknown };
    return { p: linkList(record.p), n: linkList(record.n) };
  } catch {
    return { p: [], n: [] };
  }
}

function linkList(value: unknown): SummitPanelLink[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const link = item as { i?: unknown; d?: unknown; l?: unknown; h?: unknown };
    if (typeof link.i !== "number" || !Number.isInteger(link.i) || link.i < 0) return [];
    if (typeof link.d !== "string" || typeof link.l !== "string") return [];
    const href = typeof link.h === "string" && link.h.startsWith("/") ? link.h : null;
    return [{ index: link.i, domain: link.d, label: link.l, href }];
  });
}

function asLevel(value: number): KnowledgeLevel {
  if (value === 1 || value === 2 || value === 3 || value === 4 || value === 5) return value;
  return 1;
}
