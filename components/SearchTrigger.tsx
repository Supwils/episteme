'use client';

export function SearchTrigger() {
  function handleClick() {
    document.dispatchEvent(new CustomEvent('open-global-search'));
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="gs-trigger"
      aria-label="打开搜索 (Ctrl+K)"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="9" cy="9" r="6" />
        <path d="m14 14 4.5 4.5" />
      </svg>
      <span className="gs-trigger-label">搜索</span>
      <kbd className="gs-trigger-kbd">⌘K</kbd>
    </button>
  );
}
