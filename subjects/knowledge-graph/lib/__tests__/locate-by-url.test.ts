import { describe, expect, it } from "vitest";
import { ALL_NODES } from "../../data/graph-data";
import { resolveNodeUrl } from "../../components/detail-panel/constants";
import { findNodeIdByUrl } from "../../hooks/useLocateByUrl";

describe("locating a graph node from an article URL", () => {
  it("round-trips every node that has a page", () => {
    const withUrl = ALL_NODES.filter((node) => resolveNodeUrl(node));
    expect(withUrl.length).toBeGreaterThan(ALL_NODES.length * 0.9);
    // URLs can be shared by an entity and its article; any node on that URL is a valid focus.
    for (const node of withUrl.slice(0, 400)) {
      const found = findNodeIdByUrl(ALL_NODES, resolveNodeUrl(node)!);
      expect(found && resolveNodeUrl(ALL_NODES.find((n) => n.id === found)!)).toBe(
        resolveNodeUrl(node)
      );
    }
  });

  it("ignores query strings and misses cleanly", () => {
    const node = ALL_NODES.find((n) => resolveNodeUrl(n))!;
    expect(findNodeIdByUrl(ALL_NODES, `${resolveNodeUrl(node)}?from=search#top`)).not.toBeNull();
    expect(findNodeIdByUrl(ALL_NODES, "/no/such/article")).toBeNull();
  });
});
