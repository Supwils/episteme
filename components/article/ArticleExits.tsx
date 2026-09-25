import Link from "next/link";
import { Glyph } from "@/components/design/Glyph";
import { Seal } from "@/components/design/Seal";
import { pigmentVar } from "@/lib/design/palette";
import { isSealDomain, DOMAIN_SEALS } from "@/lib/design/seals";
import { domainCluster } from "@/lib/knowledge-geometry";
import { KNOWLEDGE_LEVELS } from "@/lib/knowledge-levels";
import { sidewaysExit, upwardExit, type Exit } from "@/lib/article-exits";
import { readingPathChaptersFor } from "@/lib/reading-paths";
import "./article-exits.css";

type Direction = { key: string; word: string; note: string; exit: Exit };

function DomainMark({ domain }: { domain?: string }) {
  const cluster = domain ? domainCluster(domain) : null;
  if (!domain || !isSealDomain(domain) || !cluster) return null;
  return <Seal domain={domain} size={18} color={pigmentVar(cluster)} label={false} />;
}

/**
 * 三向出口（T-DESIGN-06f）：向前（阅读顺序的下一篇）、向上（以本篇为前置的更高一级）、
 * 向旁（跨域连接里最先列出的别的学科）。下面一行放上一篇与「在图谱中定位」。
 * 三个方向都缺时退化为只有这一行。
 */
export function ArticleExits({
  url,
  content,
  next,
  prev,
  nextLabel = "下一篇",
  prevLabel = "上一篇",
}: {
  url: string;
  content: string;
  next?: { href: string; title: string } | null;
  prev?: { href: string; title: string } | null;
  nextLabel?: string;
  prevLabel?: string;
}) {
  const chapters = readingPathChaptersFor(url);
  // 向前 follows the reading route first: it is the sequence an editor chose.
  const route = chapters.find((chapter) => chapter.step < chapter.path.steps.length);
  const routeNext = route ? route.path.steps[route.step] : undefined;
  const forward =
    route && routeNext
      ? {
          exit: {
            href: `${routeNext.href}?path=${route.path.slug}&step=${route.step + 1}`,
            title: routeNext.title,
            domain: routeNext.href.split("/")[1],
          },
          note: `阅读路线 · ${route.path.title} ${route.step + 1}/${route.path.steps.length}`,
        }
      : next
        ? { exit: { ...next, domain: url.split("/")[1] }, note: nextLabel }
        : null;
  const up = upwardExit(url);
  const side = sidewaysExit(content, url);
  const levelName = (level?: number) =>
    KNOWLEDGE_LEVELS.find((item) => item.id === level)?.label ?? "";
  const directions: Direction[] = [
    forward && { key: "forward", word: "向前", note: forward.note, exit: forward.exit },
    up && { key: "up", word: "向上", note: `L${up.level} ${levelName(up.level)}`, exit: up },
    side && {
      key: "side",
      word: "向旁",
      note: side.domain && isSealDomain(side.domain) ? DOMAIN_SEALS[side.domain].name : "跨学科",
      exit: side,
    },
  ].filter((item): item is Direction => Boolean(item));

  return (
    <nav aria-label="读完之后" className="article-exits print-hidden">
      {directions.length > 0 && (
        <ul className="article-exits__grid">
          {directions.map((direction) => (
            <li key={direction.key}>
              <Link
                href={direction.exit.href}
                className="article-exit"
                data-direction={direction.key}
              >
                <span className="article-exit__word">{direction.word}</span>
                <span className="article-exit__note">
                  <DomainMark domain={direction.exit.domain} />
                  {direction.note}
                </span>
                <span className="article-exit__title">{direction.exit.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {chapters.length > 0 && (
        <nav aria-label="阅读路线" className="article-exits__routes">
          <span>这篇也在阅读路线里</span>
          {chapters.map((chapter) => (
            <Link
              key={chapter.path.slug}
              href={`${url}?path=${chapter.path.slug}&step=${chapter.step}`}
              className="article-exits__minor"
            >
              {chapter.path.title} {chapter.step}/{chapter.path.steps.length}
            </Link>
          ))}
        </nav>
      )}
      <div className="article-exits__row">
        {prev && (
          <Link href={prev.href} className="article-exits__minor">
            {prevLabel}：{prev.title}
          </Link>
        )}
        <Link
          href={`/knowledge-graph?at=${encodeURIComponent(url)}&source=article-exit`}
          className="article-exits__minor article-exits__graph"
        >
          <Glyph name="graph" size={16} />
          在知识图谱中定位
        </Link>
      </div>
    </nav>
  );
}
