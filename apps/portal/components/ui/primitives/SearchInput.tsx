"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";

export interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  debounceMs?: number;
  shortcutKey?: string;
  size?: "sm" | "md";
  className?: string;
}

const sizeStyles: Record<NonNullable<SearchInputProps["size"]>, string> = {
  sm: "px-2.5 py-1.5 text-xs rounded-lg gap-2",
  md: "px-4 py-3 text-sm gap-3",
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      placeholder = "搜索……",
      value: controlledValue,
      onChange,
      onSearch,
      debounceMs = 250,
      shortcutKey,
      size = "md",
      className,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const debouncedSearch = useCallback(
      (query: string) => {
        if (!onSearch) return;
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          onSearch(query);
        }, debounceMs);
      },
      [onSearch, debounceMs]
    );

    useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, []);

    useEffect(() => {
      if (!shortcutKey) return;
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === shortcutKey && !e.defaultPrevented) {
          const target = e.target as HTMLElement;
          if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
            return;
          }
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [shortcutKey]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const newValue = e.target.value;
      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
      debouncedSearch(newValue);
    }

    function handleClear() {
      if (!isControlled) setInternalValue("");
      onChange?.("");
      onSearch?.("");
    }

    function setRefs(el: HTMLInputElement | null) {
      inputRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
    }

    return (
      <div
        className={cn(
          "relative flex items-center border bg-bg-panel backdrop-blur-md transition-all duration-300",
          isFocused
            ? "border-accent-gold/40 shadow-[0_0_0_3px_rgba(200,164,90,0.08)]"
            : "border-border-faint",
          sizeStyles[size],
          className
        )}
      >
        <span className="pointer-events-none text-fg-disabled">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={cn(size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")}
          >
            <circle cx="9" cy="9" r="6" />
            <path d="m14 14 4.5 4.5" />
          </svg>
        </span>

        <input
          ref={setRefs}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent px-2 font-mono tracking-wide text-fg-primary outline-none placeholder:text-fg-disabled/60"
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-fg-disabled/30 text-fg-disabled transition-colors hover:border-fg-muted hover:text-fg-secondary"
            aria-label="清除搜索"
          >
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-2.5 w-2.5">
              <path d="M2 2l6 6M8 2l-6 6" />
            </svg>
          </button>
        )}

        {!isFocused && shortcutKey && (
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[0.6rem] text-fg-disabled/50 border border-fg-muted/20 bg-fg-muted/5 font-mono">
            {shortcutKey}
          </kbd>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
