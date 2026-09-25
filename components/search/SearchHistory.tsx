import { removeFromSearchHistory, clearSearchHistory } from "@/lib/search-history";

interface SearchHistoryProps {
  history: string[];
  activeIndex?: number;
  onHistoryClick: (term: string) => void;
  onHistoryChange: () => void;
  onActivate?: (index: number) => void;
}

/** Header lives outside the listbox: a listbox may only contain options and
 *  groups, and the clear control is a button. */
export function SearchHistoryHeader({ onHistoryChange }: { onHistoryChange: () => void }) {
  const handleClearHistory = () => {
    clearSearchHistory();
    onHistoryChange();
  };
  return (
    <div className="gs-group-header">
      <span id="gs-history-label" className="gs-group-label">
        搜索历史
      </span>
      <button className="gs-clear-btn" onClick={handleClearHistory}>
        清除
      </button>
    </div>
  );
}

/**
 * Options and their remove buttons share one CSS grid but live in different
 * subtrees: the listbox (display: contents) may only contain options/groups,
 * so each ✕ is a grid sibling placed on the same row via `--row`.
 */
export function SearchHistory({
  history,
  activeIndex = -1,
  onHistoryClick,
  onHistoryChange,
  onActivate,
}: SearchHistoryProps) {
  const handleHistoryRemove = (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    removeFromSearchHistory(term);
    onHistoryChange();
  };

  return (
    <div className="gs-history-grid">
      <div
        id="gs-result-list"
        role="listbox"
        aria-labelledby="gs-history-label"
        className="gs-history-listbox"
      >
        {history.map((term, index) => (
          <div
            key={term}
            id={`gs-history-${index}`}
            role="option"
            aria-selected={index === activeIndex}
            tabIndex={-1}
            className="gs-history-item"
            data-active={index === activeIndex}
            style={{ "--row": index + 1 } as React.CSSProperties}
            onClick={() => onHistoryClick(term)}
            onMouseEnter={() => onActivate?.(index)}
            onKeyDown={(e) => {
              if (e.target !== e.currentTarget) return;
              if (e.key === "Enter" || e.key === " ") onHistoryClick(term);
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="gs-history-icon"
              aria-hidden
            >
              <circle cx="10" cy="10" r="7" />
              <path d="M10 6v4l3 2" />
            </svg>
            <span className="gs-history-text">{term}</span>
          </div>
        ))}
      </div>
      {history.map((term, index) => (
        <button
          key={term}
          className="gs-history-remove"
          data-active={index === activeIndex}
          style={{ "--row": index + 1 } as React.CSSProperties}
          onMouseEnter={() => onActivate?.(index)}
          onClick={(e) => handleHistoryRemove(e, term)}
          aria-label={`删除搜索记录「${term}」`}
        >
          ✕
        </button>
      ))}
    </div>
  );
}
