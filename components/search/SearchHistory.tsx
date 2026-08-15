import { removeFromSearchHistory, clearSearchHistory } from "@/lib/search-history";

interface SearchHistoryProps {
  history: string[];
  activeIndex?: number;
  onHistoryClick: (term: string) => void;
  onHistoryChange: () => void;
  onActivate?: (index: number) => void;
}

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

  const handleClearHistory = () => {
    clearSearchHistory();
    onHistoryChange();
  };

  return (
    <div className="gs-group">
      <div className="gs-group-header">
        <span className="gs-group-label">搜索历史</span>
        <button className="gs-clear-btn" onClick={handleClearHistory}>
          清除
        </button>
      </div>
      {history.map((term, index) => (
        // Outer element is a div with button semantics because a nested
        // <button> (the remove control) is invalid HTML and breaks clicking.
        <div
          key={term}
          id={`gs-history-${index}`}
          role="option"
          aria-selected={index === activeIndex}
          tabIndex={-1}
          className="gs-history-item"
          data-active={index === activeIndex}
          onClick={() => onHistoryClick(term)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onHistoryClick(term);
          }}
          onMouseEnter={() => onActivate?.(index)}
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
          <button
            className="gs-history-remove"
            onClick={(e) => handleHistoryRemove(e, term)}
            aria-label={`删除搜索记录「${term}」`}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
