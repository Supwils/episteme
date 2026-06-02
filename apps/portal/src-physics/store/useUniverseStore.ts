/**
 * Backward-compatibility alias. The new authoritative store is
 * useSectionStore (see ./useSectionStore.ts and
 * docs/design/10-section-architecture.md). State shape is a superset
 * so existing call sites that read `currentTier` / `transition` keep
 * working without changes.
 */
export { useSectionStore as useUniverseStore } from "./useSectionStore";
