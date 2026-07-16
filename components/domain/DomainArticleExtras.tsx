"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const MoleculeViewer = dynamic(() =>
  import("@/components/molecule/MoleculeViewer").then((module) => module.MoleculeViewer)
);

const INTERACTIVES: Record<string, ComponentType> = {
  "plate-boundaries": dynamic(() =>
    import("@/components/earth-science/PlateBoundaries").then((module) => module.PlateBoundaries)
  ),
  "political-compass": dynamic(() =>
    import("@/components/political-science/PoliticalCompass").then(
      (module) => module.PoliticalCompass
    )
  ),
  "em-spectrum": dynamic(() =>
    import("@/components/diagrams/ElectromagneticSpectrum").then(
      (module) => module.ElectromagneticSpectrum
    )
  ),
  "reaction-energy": dynamic(() =>
    import("@/components/diagrams/ReactionEnergyProfile").then(
      (module) => module.ReactionEnergyProfile
    )
  ),
  "sorting-visualizer": dynamic(() =>
    import("@/components/computer-science/SortingVisualizer").then(
      (module) => module.SortingVisualizer
    )
  ),
  "complexity-growth": dynamic(() =>
    import("@/components/computer-science/ComplexityChart").then((module) => module.ComplexityChart)
  ),
  "periodic-table": dynamic(() =>
    import("@/components/chemistry/PeriodicTable").then((module) => module.PeriodicTable)
  ),
  "geologic-time-scale": dynamic(() =>
    import("@/components/earth-science/GeologicTimeScale").then(
      (module) => module.GeologicTimeScale
    )
  ),
  "epidemic-curve": dynamic(() =>
    import("@/components/medicine/EpidemicCurve").then((module) => module.EpidemicCurve)
  ),
  "graph-traversal": dynamic(() =>
    import("@/components/computer-science/GraphTraversal").then((module) => module.GraphTraversal)
  ),
  "ipa-explorer": dynamic(() =>
    import("@/components/linguistics/IPAExplorer").then((module) => module.IPAExplorer)
  ),
  "syntax-tree-builder": dynamic(() =>
    import("@/components/linguistics/SyntaxTreeBuilder").then((module) => module.SyntaxTreeBuilder)
  ),
  "language-map": dynamic(() =>
    import("@/components/linguistics/LanguageFamilyMap").then((module) => module.LanguageFamilyMap)
  ),
  "writing-timeline": dynamic(() =>
    import("@/components/linguistics/WritingSystemTimeline").then(
      (module) => module.WritingSystemTimeline
    )
  ),
  "sound-change-lab": dynamic(() =>
    import("@/components/linguistics/SoundChangeLab").then((module) => module.SoundChangeLab)
  ),
};

export function DomainArticleExtras({
  accent,
  interactive,
  molecule,
  title,
}: {
  accent: string;
  interactive?: string | null;
  molecule?: string | null;
  title: string;
}) {
  const Interactive = interactive ? INTERACTIVES[interactive] : null;

  return (
    <>
      {molecule ? <MoleculeViewer pdbId={molecule} title={title} accent={accent} /> : null}
      {Interactive ? <Interactive /> : null}
    </>
  );
}
