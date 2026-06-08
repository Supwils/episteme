import Link from "next/link";
import type { SearchResult } from "./types";
import { TYPE_LABELS } from "./types";

function highlightText(text: string, terms: string[]): React.ReactNode {
  if (!terms.length) return text;

  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="gs-highlight">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

interface SearchResultItemProps {
  result: SearchResult;
  isActive: boolean;
  onClick: (url: string) => void;
  onMouseEnter: () => void;
}

export function SearchResultItem({ result, isActive, onClick, onMouseEnter }: SearchResultItemProps) {
  const typeLabel = TYPE_LABELS[result.doc.type];

  return (
    <Link
      id={`gs-item-${result.doc.id}`}
      href={result.doc.url}
      role="option"
      aria-selected={isActive}
      className="gs-item"
      data-active={isActive}
      onClick={() => onClick(result.doc.url)}
      onMouseEnter={onMouseEnter}
    >
      <div className="gs-item-title">
        {highlightText(result.doc.title, result.titleMatches)}
        {result.doc.subtitle && (
          <span className="gs-item-subtitle">
            {highlightText(result.doc.subtitle, result.subtitleMatches)}
          </span>
        )}
        {typeLabel && <span className="gs-item-type">{typeLabel}</span>}
      </div>
      <div className="gs-item-desc">
        {highlightText(result.doc.content, result.contentMatches)}
      </div>
    </Link>
  );
}
