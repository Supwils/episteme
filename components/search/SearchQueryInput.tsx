"use client";

import { useRef, type ComponentProps } from "react";
import { MAX_SEARCH_QUERY_LENGTH, truncateSearchQuery } from "@/lib/search/query";

type SearchQueryInputProps = Omit<
  ComponentProps<"input">,
  "value" | "maxLength" | "onChange" | "onCompositionStart" | "onCompositionEnd"
> & {
  onQueryChange?: (query: string) => void;
};

export function SearchQueryInput({ onQueryChange, ...props }: SearchQueryInputProps) {
  const composing = useRef(false);
  const commit = (input: HTMLInputElement) => {
    const query = truncateSearchQuery(input.value);
    if (input.value !== query) input.value = query;
    onQueryChange?.(query);
  };

  return (
    <input
      {...props}
      // Native maxlength counts UTF-16 units; leave room for surrogate pairs
      // and enforce the code-point budget only after IME composition commits.
      maxLength={MAX_SEARCH_QUERY_LENGTH * 2}
      onChange={(event) => {
        if (!composing.current) commit(event.currentTarget);
      }}
      onCompositionStart={() => {
        composing.current = true;
      }}
      onCompositionEnd={(event) => {
        composing.current = false;
        commit(event.currentTarget);
      }}
    />
  );
}
