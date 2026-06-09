"use client";

import { getContentForTier } from "@/subjects/physics/lib/tier-content";
import { KnowledgePanel } from "@/subjects/physics/components/KnowledgePanel";
import { getSectionConfig } from "@/subjects/physics/lib/section";
import { useUniverseStore } from "@/subjects/physics/store/useUniverseStore";

export function TierDeepReadingPanel() {
  const tier = useUniverseStore((s) => s.currentTier);
  const section = useUniverseStore((s) => s.section);
  const cfg = getSectionConfig(section);
  const meta = cfg.tiers[tier] ?? cfg.tiers[cfg.defaultTier]!;
  const content = getContentForTier(tier);

  if (!content) return null;

  const dataCards = content.dataCards.map((card) => ({
    title: card.label,
    value: card.value,
    unit: card.hint,
    description: card.latinLabel ?? card.hint ?? card.value,
  }));

  const narrative = content.narrative.map((section) => ({
    title: section.heading,
    paragraphs: section.body,
  }));

  const sources = content.sources.map((src) => ({
    label: src.label,
    url: src.url,
  }));

  return (
    <KnowledgePanel
      tierName={meta.label}
      dataCards={dataCards}
      narrative={narrative}
      sources={sources}
    />
  );
}
