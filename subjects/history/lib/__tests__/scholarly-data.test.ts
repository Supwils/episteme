import { describe, expect, it } from "vitest";
import { SCHOLARLY_BATCH_1 } from "@/content/human-history/data/scholarly/scholarly-batch-1.js";
import { SCHOLARLY_BATCH_2 } from "@/content/human-history/data/scholarly/scholarly-batch-2.js";
import { SCHOLARLY_BATCH_3 } from "@/content/human-history/data/scholarly/scholarly-batch-3.js";
import { SCHOLARLY_BATCH_4 } from "@/content/human-history/data/scholarly/scholarly-batch-4.js";
import { SCHOLARLY_TITLES } from "@/content/human-history/data/scholarly-titles.js";
import { SCHOLARLY_SUMMARIES, loadScholarlyDetail } from "@/subjects/history/lib/scholarly-data";

const BATCHES = [SCHOLARLY_BATCH_1, SCHOLARLY_BATCH_2, SCHOLARLY_BATCH_3, SCHOLARLY_BATCH_4];
const ALL_DETAILS: Record<string, (typeof SCHOLARLY_BATCH_1)[string]> = Object.assign(
  {},
  ...BATCHES
);

describe("scholarly summary projection", () => {
  it("stays synchronized with the canonical lecture batches", () => {
    const summaryTitles = Object.keys(SCHOLARLY_SUMMARIES);
    expect(summaryTitles).toHaveLength(81);
    expect(new Set(summaryTitles)).toEqual(new Set(BATCHES.flatMap((batch) => Object.keys(batch))));
    // SCHOLARLY_TITLES gates timeline/lessons entry points; every gated title
    // must resolve to a summary (batches currently add 启蒙运动 on top).
    for (const title of SCHOLARLY_TITLES) {
      expect(SCHOLARLY_SUMMARIES[title], title).toBeDefined();
    }

    for (const [batchIndex, batch] of BATCHES.entries()) {
      for (const [title, detail] of Object.entries(batch)) {
        const summary = SCHOLARLY_SUMMARIES[title];
        expect(summary, title).toBeDefined();
        expect(summary?.batch, title).toBe(batchIndex + 1);
        expect(summary?.pageCount, title).toBe(detail.pages.length);
        expect(summary?.quote, title).toBe(detail.quote?.text ?? null);
        expect(summary?.facts, title).toEqual(detail.facts.slice(0, 2));
      }
    }
  });

  it("carries no lecture prose, keeping the grid chunk lightweight", () => {
    for (const summary of Object.values(SCHOLARLY_SUMMARIES)) {
      expect(summary).not.toHaveProperty("pages");
      expect(summary).not.toHaveProperty("references");
    }
  });

  it("loads full lecture detail from the owning batch shard", async () => {
    const firstBatch = await loadScholarlyDetail("农业革命");
    expect(firstBatch?.pages.length).toBeGreaterThan(0);
    expect(firstBatch?.references.length).toBeGreaterThan(0);

    const lastBatch = await loadScholarlyDetail("波斯战争");
    expect(lastBatch).toEqual(ALL_DETAILS["波斯战争"]);

    await expect(loadScholarlyDetail("不存在的事件")).resolves.toBeUndefined();
  });
});
