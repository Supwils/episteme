interface SearchInputProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  activeId: string | undefined;
  onChange: (value: string) => void;
}

export function SearchInput({ inputRef, activeId, onChange }: SearchInputProps) {
  return (
    <div className="gs-input-wrap">
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="gs-search-icon"
      >
        <circle cx="9" cy="9" r="6" />
        <path d="m14 14 4.5 4.5" />
      </svg>
      <input
        ref={inputRef}
        type="text"
        className="gs-input"
        placeholder="搜索宇宙物理、人类历史、哲学思想、生命科学、经济学、心理学…"
        aria-label="搜索"
        aria-autocomplete="list"
        aria-controls="gs-result-list"
        aria-activedescendant={activeId}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        spellCheck={false}
      />
      <kbd className="gs-kbd">ESC</kbd>
    </div>
  );
}
