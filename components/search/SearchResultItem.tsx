import Link from "next/link";
import type { SearchResult } from "./types";
import { TYPE_LABELS } from "./types";

/** Highlight the query where it appears verbatim. Chinese queries are typed as
 *  a contiguous run, so a plain substring match marks what the reader looked
 *  for without the noise of marking each individual bigram. */
function highlight(text: string, query: string): React.ReactNode {
  const at = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark className="gs-highlight">{text.slice(at, at + query.length)}</mark>
      {text.slice(at + query.length)}
    </>
  );
}

/** Body hits arrive with the match already located, so highlight by offset. */
function highlightSnippet(snippet: string, matchStart: number, length: number): React.ReactNode {
  if (matchStart < 0 || matchStart >= snippet.length) return snippet;
  return (
    <>
      …{snippet.slice(0, matchStart)}
      <mark className="gs-highlight">{snippet.slice(matchStart, matchStart + length)}</mark>
      {snippet.slice(matchStart + length)}…
    </>
  );
}

interface SearchResultItemProps {
  result: SearchResult;
  query: string;
  isActive: boolean;
  onClick: (url: string) => void;
  onMouseEnter: () => void;
}

export function SearchResultItem({
  result,
  query,
  isActive,
  onClick,
  onMouseEnter,
}: SearchResultItemProps) {
  const typeLabel = TYPE_LABELS[result.kind];

  return (
    <Link
      id={`gs-item-${result.url}`}
      href={result.url}
      role="option"
      aria-selected={isActive}
      className="gs-item"
      data-active={isActive}
      onClick={() => onClick(result.url)}
      onMouseEnter={onMouseEnter}
    >
      <div className="gs-item-title">
        {highlight(result.title, query)}
        {result.subtitle && (
          <span className="gs-item-subtitle">{highlight(result.subtitle, query)}</span>
        )}
        {typeLabel && <span className="gs-item-type">{typeLabel}</span>}
      </div>
      {result.snippet && (
        <div className="gs-item-desc">
          {highlightSnippet(result.snippet, result.matchStart ?? -1, query.length)}
        </div>
      )}
    </Link>
  );
}
