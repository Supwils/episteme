import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { EVENTS } from "@/content/human-history/data/events.js";
import { FIGURES } from "@/content/human-history/data/figures.js";
import {
  HISTORY_EVENT_CATALOG,
  HISTORY_FIGURE_CATALOG,
  HISTORY_TIMELINE_CATALOG,
  getHistoryEventSummary,
  getHistoryFigureSummary,
} from "@/subjects/history/lib/history-catalog";
import { getEventRouteRecord } from "@/subjects/history/lib/event-route-data";
import { getFigureRouteRecord } from "@/subjects/history/lib/figure-route-data";
import { loadTimelineDetail } from "@/subjects/history/lib/timeline-detail-loader";
import { resolveNodeUrl } from "@/subjects/history/components/history-graph/useHistoryGraphState";
import type { HistoryGraphNode } from "@/subjects/history/lib/graph-data";

const ROOT = process.cwd();

describe("human-history route data split", () => {
  it("keeps lightweight catalogs synchronized with canonical sources", () => {
    expect(HISTORY_EVENT_CATALOG).toHaveLength(EVENTS.length);
    expect(HISTORY_FIGURE_CATALOG).toHaveLength(FIGURES.length);
    expect(HISTORY_EVENT_CATALOG[0]).not.toHaveProperty("longDesc");
    expect(HISTORY_FIGURE_CATALOG[0]).not.toHaveProperty("longDesc");
    expect(HISTORY_FIGURE_CATALOG[0]).not.toHaveProperty("achievements");
  });

  it("deduplicates the combined timeline while preserving broad coverage", () => {
    const titles = HISTORY_TIMELINE_CATALOG.map((event) => event.title);
    expect(new Set(titles).size).toBe(titles.length);
    expect(HISTORY_TIMELINE_CATALOG).toHaveLength(281);
    expect(new Set(HISTORY_TIMELINE_CATALOG.map((event) => event.era))).toEqual(
      new Set([
        "prehistoric",
        "classical",
        "medieval",
        "earlyModern",
        "modern",
        "contemporary",
        "future",
      ]),
    );
  });

  it("loads only the selected era record for event and figure detail routes", async () => {
    const eventSummary = getHistoryEventSummary("工业革命");
    const figureSummary = getHistoryFigureSummary("孔子");
    expect(eventSummary?.era).toBe("earlyModern");
    expect(figureSummary?.era).toBe("classical");

    const event = await getEventRouteRecord("工业革命");
    const figure = await getFigureRouteRecord("孔子");
    expect(event?.title).toBe("工业革命");
    expect(event?.resolvedReferences.length).toBeGreaterThan(0);
    expect(figure?.name).toBe("孔子");
    expect(figure?.longDesc.length).toBeGreaterThan(100);
  });

  it("loads timeline prose on demand from the event's era shard", async () => {
    const record = await loadTimelineDetail("prehistoric", "农业革命");
    expect(record?.detail?.pages.length).toBeGreaterThan(0);
    expect(record?.longDesc.length).toBeGreaterThan(100);
  });

  it("keeps full prose modules out of the timeline shell and graph catalogs", () => {
    const timelineSource = readFileSync(
      join(ROOT, "subjects/history/page-renderers/timeline.js"),
      "utf8",
    );
    const historyGraphSource = readFileSync(
      join(ROOT, "subjects/history/lib/graph-data.ts"),
      "utf8",
    );
    const globalGraphSource = readFileSync(
      join(ROOT, "subjects/knowledge-graph/data/history-nodes.ts"),
      "utf8",
    );

    for (const source of [timelineSource, historyGraphSource, globalGraphSource]) {
      expect(source).not.toContain("data/event-details");
      expect(source).not.toContain("data/figures.js");
      expect(source).not.toContain("data/events.js");
    }
    expect(timelineSource).toContain("loadTimelineDetail");
  });
});

describe("human-history graph article links", () => {
  function node(
    type: HistoryGraphNode["type"],
    label: string,
    slug: string,
  ): HistoryGraphNode {
    return {
      id: `history:${type}-${slug}`,
      label,
      type,
      slug,
      tags: [],
      description: "",
    };
  }

  it("links event and figure nodes to their exact readable detail pages", () => {
    expect(resolveNodeUrl(node("event", "工业革命", "工业革命"))).toBe(
      `/human-history/events/${encodeURIComponent("工业革命")}`,
    );
    expect(resolveNodeUrl(node("figure", "孔子", "孔子"))).toBe(
      `/human-history/figures/${encodeURIComponent("孔子")}`,
    );
    expect(resolveNodeUrl(node("era", "近代", "early-modern"))).toBe(
      "/human-history/eras/earlyModern",
    );

  });
});
