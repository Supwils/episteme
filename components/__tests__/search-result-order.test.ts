import { describe, expect, it } from "vitest";
import { orderResultsForDisplay, type SearchResult } from "../search/types";

const hit = (url: string, section: string): SearchResult => ({
  title: url,
  subtitle: "",
  url,
  section,
  kind: "article",
});

describe("orderResultsForDisplay", () => {
  it("groups title hits by section order and trails body hits", () => {
    // Score order (as MiniSearch returns): medicine, physics, philosophy.
    const title = [
      hit("/medicine/a", "medicine"),
      hit("/universe-physics/a", "physics"),
      hit("/philosophy/a", "philosophy"),
    ];
    const body = [hit("/law/a", "law")];
    const ordered = orderResultsForDisplay(title, body);
    // physics precedes philosophy and medicine in SEARCH_SECTIONS order.
    expect(ordered.map((r) => r.url)).toEqual([
      "/universe-physics/a",
      "/philosophy/a",
      "/medicine/a",
      "/law/a",
    ]);
  });

  it("drops results from unknown sections and keeps score order within a section", () => {
    const title = [
      hit("/nope/a", "alchemy"),
      hit("/philosophy/b", "philosophy"),
      hit("/philosophy/a", "philosophy"),
    ];
    expect(orderResultsForDisplay(title, []).map((r) => r.url)).toEqual([
      "/philosophy/b",
      "/philosophy/a",
    ]);
  });
});
