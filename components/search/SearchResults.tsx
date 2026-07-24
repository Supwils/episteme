import type { SearchResult, Section } from "./types";
import { SEARCH_SECTIONS, SECTION_META } from "./types";
import { SearchResultItem } from "./SearchResultItem";

interface SearchResultsProps {
  query: string;
  titleResults: SearchResult[];
  bodyResults: SearchResult[];
  flatResults: SearchResult[];
  activeIndex: number;
  onActivate: (index: number) => void;
  onSelect: (url: string) => void;
}

/** Group title hits by knowledge domain; body hits stay in one group because
 *  "the phrase appears in this article" is a different kind of answer. */
export function SearchResults({
  query,
  titleResults,
  bodyResults,
  flatResults,
  activeIndex,
  onActivate,
  onSelect,
}: SearchResultsProps) {
  const indexOf = new Map(flatResults.map((result, index) => [result.url, index]));

  const grouped = new Map<Section, SearchResult[]>();
  for (const result of titleResults) {
    const section = result.section as Section;
    if (!(section in SECTION_META)) continue;
    const bucket = grouped.get(section);
    if (bucket) bucket.push(result);
    else grouped.set(section, [result]);
  }

  const renderItem = (result: SearchResult) => {
    const index = indexOf.get(result.url) ?? 0;
    return (
      <SearchResultItem
        key={result.url}
        result={result}
        query={query}
        isActive={index === activeIndex}
        onClick={onSelect}
        onMouseEnter={() => onActivate(index)}
      />
    );
  };

  return (
    <>
      {SEARCH_SECTIONS.map((section) => {
        const results = grouped.get(section);
        if (!results?.length) return null;
        return (
          <div key={section} className="gs-group">
            <div className="gs-group-label" style={{ color: SECTION_META[section].color }}>
              {SECTION_META[section].label}
            </div>
            {results.map(renderItem)}
          </div>
        );
      })}

      {bodyResults.length > 0 && (
        <div className="gs-group" data-testid="gs-body-group">
          <div className="gs-group-label gs-group-label-body">正文中提到</div>
          {bodyResults.map(renderItem)}
        </div>
      )}
    </>
  );
}
