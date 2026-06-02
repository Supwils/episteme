"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

type SearchInputProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
};

export function SearchInput({ placeholder = "搜索哲学家、流派、主义……", onSearch }: SearchInputProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedSearch = useCallback(
    (query: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onSearch(query);
      }, 250);
    },
    [onSearch],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    setValue(query);
    debouncedSearch(query);
  }

  function handleClear() {
    setValue("");
    onSearch("");
  }

  return (
    <div className="relative mb-8">
      <div
        className={clsx(
          "relative flex items-center border bg-bg-panel backdrop-blur-md transition-all duration-300",
          isFocused
            ? "border-accent-gold/40 shadow-[0_0_0_3px_rgba(200,164,90,0.08)]"
            : "border-border-faint",
        )}
      >
        {/* Search icon */}
        <span className="pointer-events-none pl-4 text-fg-disabled">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
            <circle cx="9" cy="9" r="6" />
            <path d="m14 14 4.5 4.5" />
          </svg>
        </span>

        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent px-3 py-3 font-mono text-sm tracking-wide text-fg-primary outline-none placeholder:text-fg-disabled/60"
        />

        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-fg-disabled/30 text-fg-disabled transition-colors hover:border-fg-muted hover:text-fg-secondary"
            aria-label="清除搜索"
          >
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-2.5 w-2.5">
              <path d="M2 2l6 6M8 2l-6 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
