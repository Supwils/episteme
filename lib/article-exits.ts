/**
 * 三向出口（T-DESIGN-06f）：每篇文章结尾的三个去处。
 *   向前：阅读顺序里的下一篇（页面已有的 next）。
 *   向上：以本篇为前置、层级更高的一篇（generated/article-exits.json，由图谱前置关系派生）。
 *   向旁：本篇「跨域连接」里作者列出的第一个别的学科的条目。
 */
import ARTICLE_EXITS from "@/generated/article-exits.json";
import { splitSections, parseNeighbors } from "@/components/markdown/sections";
import { resolveWikiLink } from "@/lib/wiki-link-index";

export type Exit = { href: string; title: string; level?: number; domain?: string };

type ExitEntry = { level: number; up: [string, string, number] };
// JSON imports widen the [url, title, level] tuple to an array; the generator writes exactly three.
const EXITS = ARTICLE_EXITS as unknown as Record<string, ExitEntry>;

function entryFor(url: string): ExitEntry | undefined {
  return EXITS[url] ?? EXITS[decodeURI(url)];
}

export function upwardExit(url: string): Exit | null {
  const entry = entryFor(url);
  if (!entry) return null;
  const [href, title, level] = entry.up;
  return { href, title, level, domain: href.split("/")[1] };
}

export function sidewaysExit(content: string, url: string): Exit | null {
  const domain = url.split("/")[1] ?? "";
  const crossDomain = splitSections(content).find((section) => section.kind === "cross-domain");
  if (!crossDomain) return null;
  for (const neighbor of parseNeighbors(crossDomain.blocks)) {
    const href = resolveWikiLink(neighbor.target, domain);
    const neighborDomain = href?.split("/")[1];
    if (href && neighborDomain && neighborDomain !== domain) {
      return { href, title: neighbor.label, domain: neighborDomain };
    }
  }
  return null;
}
