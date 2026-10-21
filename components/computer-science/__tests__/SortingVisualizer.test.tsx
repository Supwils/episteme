import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { INITIAL_HEIGHTS, SortingVisualizer, shuffledHeights } from "../SortingVisualizer";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("SortingVisualizer initial render", () => {
  it("renders the same bars every time so hydration matches the server", () => {
    const random = vi.spyOn(Math, "random");

    const first = renderToString(<SortingVisualizer />);
    const second = renderToString(<SortingVisualizer />);

    expect(second).toBe(first);
    expect(random).not.toHaveBeenCalled();
  });

  it("starts from a shuffled permutation of the fixed height ladder", () => {
    const ladder = shuffledHeights(() => 0.999999)
      .slice()
      .sort((a, b) => a - b);
    expect([...INITIAL_HEIGHTS].sort((a, b) => a - b)).toEqual(ladder);
    expect(INITIAL_HEIGHTS).not.toEqual(ladder);
  });
});
