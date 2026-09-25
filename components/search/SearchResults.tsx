import type { SearchResult, Section } from "./types";
import { SEARCH_SECTIONS, SECTION_META, orderResultsForDisplay } from "./types";
import { SearchResultItem, searchResultDomId } from "./SearchResultItem";
import { SectionMark } from "./SectionMark";

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
  const indexOf = new Map(flatResults.map((result, index) => [searchResultDomId(result), index]));

  const grouped = new Map<Section, SearchResult[]>();
  for (const result of orderResultsForDisplay(titleResults, [])) {
    const section = result.section as Section;
    const bucket = grouped.get(section);
    if (bucket) bucket.push(result);
    else grouped.set(section, [result]);
  }

  const renderItem = (result: SearchResult, showSectionLabel = false) => {
    const id = searchResultDomId(result);
    const index = indexOf.get(id) ?? 0;
    return (
      <SearchResultItem
        key={id}
        result={result}
        query={query}
        isActive={index === activeIndex}
        onClick={onSelect}
        onMouseEnter={() => onActivate(index)}
        showSectionLabel={showSectionLabel}
      />
    );
  };

  return (
    <>
      {SEARCH_SECTIONS.map((section) => {
        const results = grouped.get(section);
        if (!results?.length) return null;
        return (
          <div
            key={section}
            className="gs-group"
            role="group"
            aria-labelledby={`gs-group-${section}`}
          >
            <div id={`gs-group-${section}`} role="presentation" className="gs-group-label">
              <SectionMark section={section} />
              {SECTION_META[section].label}
            </div>
            {results.map((result) => renderItem(result))}
          </div>
        );
      })}

      {bodyResults.length > 0 && (
        <div
          className="gs-group"
          data-testid="gs-body-group"
          role="group"
          aria-labelledby="gs-group-body"
        >
          <div
            id="gs-group-body"
            role="presentation"
            className="gs-group-label gs-group-label-body"
          >
            正文中提到
          </div>
          {bodyResults.map((result) => renderItem(result, true))}
        </div>
      )}
    </>
  );
}
