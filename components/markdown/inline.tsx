import type { ReactNode } from "react";
import { takeInlineSegment } from "./inline-segments";
import type { Footnotes } from "./footnotes";

export { extractFootnotes, footnoteReturnAnchors, type Footnotes } from "./footnotes";
export { KATEX_OPTIONS } from "./katex-options";

/**
 * Inline markdown for article prose: math, emphasis, code, wiki-links, links,
 * footnote refs, images and DOI links. Server-only — KaTeX and the wiki-link
 * index never reach the browser. Segment order lives in `inline-segments.tsx`.
 * Currency versus formula is decided only by `isInlineMath`.
 */
export function renderInline(text: string, footnotes: Footnotes, domain: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let remaining = text;
  let key = 0;
  const takeKey = () => key++;

  while (remaining.length > 0) {
    const segment = takeInlineSegment({
      text,
      remaining,
      footnotes,
      domain,
      takeKey,
      renderInline,
    });
    if (!segment) {
      parts.push(remaining[0]);
      remaining = remaining.slice(1);
      continue;
    }
    parts.push(...segment.nodes);
    remaining = remaining.slice(segment.consumed);
  }

  return parts;
}
