import { describe, expect, it } from "vitest";
import { CHRONOLOGICAL_QUOTES } from "../QuotesTimeline";

describe("philosophy quote timeline", () => {
  it("renders quotes in chronological order", () => {
    const years = CHRONOLOGICAL_QUOTES.map((quote) => quote.year);
    expect(years).toEqual([...years].sort((a, b) => a - b));
    const names = CHRONOLOGICAL_QUOTES.map((quote) => quote.philosopher);
    expect(names.indexOf("克尔凯郭尔")).toBeLessThan(names.indexOf("马克思"));
    expect(names.indexOf("德里达")).toBeLessThan(names.indexOf("福柯"));
  });
});
