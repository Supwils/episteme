"use client";

import { isSafeInternalPath } from "@/lib/urls";
import { SectionMark } from "./SectionMark";
import { SECTION_META, TYPE_LABELS, type SearchResult, type Section } from "./types";

// Kinds that are cards or site pages rather than knowledge nodes.
const NOT_IN_GRAPH = new Set(["curiosity", "page"]);

/** Where the graph resolves an article URL to its node (see KnowledgeGraph `at`). */
export function graphLocateHref(url: string): string {
  return `/knowledge-graph?at=${encodeURIComponent(url)}&source=search`;
}

/**
 * ⌘K 的桌面预览栏（T-DESIGN-03e）：当前高亮结果的领域印、体裁、标题、副题与
 * 命中片段，外加两个去处——打开，或在知识图谱里定位它。
 */
export function SearchPreview({
  result,
  onNavigate,
}: {
  result: SearchResult | undefined;
  onNavigate: (url: string) => void;
}) {
  if (!result || !isSafeInternalPath(result.url)) {
    return <aside className="gs-preview" aria-hidden />;
  }
  const section = SECTION_META[result.section as Section];
  const kind = TYPE_LABELS[result.kind];
  const follow = (href: string) => (event: React.MouseEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    onNavigate(href);
  };
  return (
    <aside className="gs-preview" aria-label="结果预览">
      <p className="gs-preview-meta">
        <SectionMark section={result.section} size={18} />
        {section?.label}
        {kind && <span className="gs-preview-kind">{kind}</span>}
      </p>
      <h3 className="gs-preview-title">{result.title}</h3>
      {result.subtitle && <p className="gs-preview-subtitle">{result.subtitle}</p>}
      {result.snippet && <p className="gs-preview-snippet">…{result.snippet}…</p>}
      <div className="gs-preview-actions">
        <a
          href={result.url}
          className="gs-preview-action"
          data-primary
          onClick={follow(result.url)}
        >
          打开 <kbd className="gs-kbd-sm">↵</kbd>
        </a>
        {!NOT_IN_GRAPH.has(result.kind) && (
          <a
            href={graphLocateHref(result.url)}
            className="gs-preview-action"
            onClick={follow(graphLocateHref(result.url))}
          >
            在图谱中定位
          </a>
        )}
      </div>
    </aside>
  );
}
