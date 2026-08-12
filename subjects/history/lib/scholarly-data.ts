import { SCHOLARLY_SUMMARY } from "@/content/human-history/data/generated/scholarly-summary.js";

export interface ScholarlySummaryEntry {
  pageCount: number;
  quote: string | null;
  facts: string[];
  batch: 1 | 2 | 3 | 4;
}

export interface ScholarlyDetail {
  pages: { title: string; body: string }[];
  facts: string[];
  quote: { text: string; author: string };
  references: string[];
}

export const SCHOLARLY_SUMMARIES = SCHOLARLY_SUMMARY as unknown as Record<
  string,
  ScholarlySummaryEntry
>;

type ScholarlyBatchRecords = Record<string, ScholarlyDetail>;

const scholarlyBatchLoaders: Record<
  ScholarlySummaryEntry["batch"],
  () => Promise<ScholarlyBatchRecords>
> = {
  1: () =>
    import("@/content/human-history/data/scholarly/scholarly-batch-1.js").then(
      (loaded) => loaded.SCHOLARLY_BATCH_1
    ),
  2: () =>
    import("@/content/human-history/data/scholarly/scholarly-batch-2.js").then(
      (loaded) => loaded.SCHOLARLY_BATCH_2
    ),
  3: () =>
    import("@/content/human-history/data/scholarly/scholarly-batch-3.js").then(
      (loaded) => loaded.SCHOLARLY_BATCH_3
    ),
  4: () =>
    import("@/content/human-history/data/scholarly/scholarly-batch-4.js").then(
      (loaded) => loaded.SCHOLARLY_BATCH_4
    ),
};

const batchCache = new Map<number, ScholarlyBatchRecords>();

export async function loadScholarlyDetail(title: string): Promise<ScholarlyDetail | undefined> {
  const summary = SCHOLARLY_SUMMARIES[title];
  if (!summary) return undefined;
  const cached = batchCache.get(summary.batch);
  if (cached) return cached[title];
  const batch = await scholarlyBatchLoaders[summary.batch]();
  batchCache.set(summary.batch, batch);
  return batch[title];
}
