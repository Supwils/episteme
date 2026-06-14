import type { MetadataRoute } from "next";
import { getThinkerSlugs, getQuestionSlugs } from "@/lib/mdx";
import { getSchoolSlugs } from "@/lib/schools";
import { getIsmSlugs } from "@/lib/isms";
import { getExperimentSlugs } from "@/lib/experiments";
import { getAllArticles } from "@/lib/knowledge-base";
import { universePhysicsKB } from "@/lib/universe-physics-kb";
import { cosmologyKB } from "@/lib/cosmology-kb";
import { universePhysicsDialogues } from "@/lib/universe-physics-dialogues";
import { cosmologyDialogues } from "@/lib/cosmology-dialogues";
import { SITE_URL } from "@/lib/constants";
import { getMathematicianSlugs } from "@/subjects/mathematics/lib/mathematicians";
import { getTheoremSlugs } from "@/subjects/mathematics/lib/theorems";
import { getMathConceptSlugs } from "@/subjects/mathematics/lib/concepts";
import { getMathDialogueSlugs } from "@/subjects/mathematics/lib/dialogues";
import {
  getEconomistSlugs,
  getTheorySlugs as getEconTheorySlugs,
  getConceptSlugs as getEconConceptSlugs,
  getCaseStudySlugs,
  getSchoolSlugs as getEconSchoolSlugs,
  getDebateSlugs as getEconDebateSlugs,
  getDialogueSlugs as getEconDialogueSlugs,
} from "@/subjects/economics/lib/mdx";
import {
  getTheoristSlugs,
  getExperimentSlugs as getPsyExperimentSlugs,
  getPhenomenonSlugs,
  getSchoolSlugs as getPsySchoolSlugs,
  getDisorderSlugs,
  getDebateSlugs as getPsyDebateSlugs,
  getDialogueSlugs as getPsyDialogueSlugs,
} from "@/subjects/psychology/lib/mdx";
import { createKnowledgeSection } from "@/lib/knowledge-domain";
import { createFrontier, FRONTIER_DOMAINS } from "@/lib/frontier";
import { KNOWLEDGE_DOMAINS } from "@/lib/new-domains";
import { READING_PATHS } from "@/lib/reading-paths";

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  // Daily
  { path: "/daily", priority: 0.8 },
  // Reading paths
  { path: "/read", priority: 0.7 },
  // Universe Physics
  { path: "/universe-physics", priority: 0.8 },
  { path: "/universe-physics/universe", priority: 0.8 },
  { path: "/universe-physics/universe/observable", priority: 0.6 },
  { path: "/universe-physics/universe/laniakea", priority: 0.6 },
  { path: "/universe-physics/universe/local-group", priority: 0.6 },
  { path: "/universe-physics/universe/milky-way", priority: 0.6 },
  { path: "/universe-physics/universe/solar-system", priority: 0.6 },
  { path: "/universe-physics/universe/stellar-neighborhood", priority: 0.6 },
  { path: "/universe-physics/universe/earth", priority: 0.6 },
  { path: "/universe-physics/universe/cosmic-web", priority: 0.6 },
  { path: "/universe-physics/universe/handwritten", priority: 0.6 },
  { path: "/universe-physics/universe/handwritten/observable", priority: 0.5 },
  { path: "/universe-physics/universe/handwritten/laniakea", priority: 0.5 },
  { path: "/universe-physics/universe/handwritten/local-group", priority: 0.5 },
  { path: "/universe-physics/universe/handwritten/milky-way", priority: 0.5 },
  { path: "/universe-physics/universe/handwritten/solar-system", priority: 0.5 },
  { path: "/universe-physics/universe/handwritten/stellar-neighborhood", priority: 0.5 },
  { path: "/universe-physics/universe/handwritten/earth", priority: 0.5 },
  { path: "/universe-physics/universe/handwritten/cosmic-web", priority: 0.5 },
  { path: "/universe-physics/physics", priority: 0.8 },
  { path: "/universe-physics/physics/classical-mechanics", priority: 0.6 },
  { path: "/universe-physics/physics/thermodynamics", priority: 0.6 },
  { path: "/universe-physics/physics/electromagnetism", priority: 0.6 },
  { path: "/universe-physics/physics/relativity", priority: 0.6 },
  { path: "/universe-physics/physics/quantum-mechanics", priority: 0.6 },
  { path: "/universe-physics/physics/atomic-molecular", priority: 0.6 },
  { path: "/universe-physics/physics/nuclear-particle", priority: 0.6 },
  { path: "/universe-physics/physics/standard-model", priority: 0.6 },
  { path: "/universe-physics/physics/frontier", priority: 0.6 },
  { path: "/universe-physics/experiments", priority: 0.7 },
  { path: "/universe-physics/knowledge-base", priority: 0.7 },
  { path: "/universe-physics/dialogues", priority: 0.7 },
  // Human History
  { path: "/human-history", priority: 0.8 },
  { path: "/human-history/timeline", priority: 0.7 },
  { path: "/human-history/atlas", priority: 0.7 },
  { path: "/human-history/graph", priority: 0.7 },
  { path: "/human-history/figures", priority: 0.7 },
  { path: "/human-history/map", priority: 0.7 },
  { path: "/human-history/scholarly", priority: 0.7 },
  { path: "/human-history/lessons", priority: 0.7 },
  { path: "/human-history/simulations", priority: 0.7 },
  { path: "/human-history/knowledge", priority: 0.7 },
  // Philosophy
  { path: "/philosophy", priority: 0.8 },
  { path: "/philosophy/thinkers", priority: 0.7 },
  { path: "/philosophy/schools", priority: 0.7 },
  { path: "/philosophy/isms", priority: 0.7 },
  { path: "/philosophy/experiments", priority: 0.7 },
  { path: "/philosophy/questions", priority: 0.7 },
  { path: "/philosophy/timeline", priority: 0.7 },
  // Life Science
  { path: "/life-science", priority: 0.8 },
  { path: "/life-science/tree", priority: 0.7 },
  { path: "/life-science/species", priority: 0.7 },
  { path: "/life-science/scientists", priority: 0.7 },
  { path: "/life-science/extinctions", priority: 0.7 },
  { path: "/life-science/timeline", priority: 0.7 },
  // Mathematics
  { path: "/mathematics", priority: 0.8 },
  { path: "/mathematics/mathematicians", priority: 0.7 },
  { path: "/mathematics/theorems", priority: 0.7 },
  { path: "/mathematics/concepts", priority: 0.7 },
  { path: "/mathematics/dialogues", priority: 0.7 },
  { path: "/mathematics/timeline", priority: 0.7 },
  // Knowledge Graph
  { path: "/knowledge-graph", priority: 0.7 },
  // Cosmology
  { path: "/cosmology", priority: 0.8 },
  { path: "/cosmology/universe", priority: 0.7 },
  { path: "/cosmology/universe/observable", priority: 0.6 },
  { path: "/cosmology/universe/cosmic-web", priority: 0.6 },
  { path: "/cosmology/universe/laniakea", priority: 0.6 },
  { path: "/cosmology/universe/local-group", priority: 0.6 },
  { path: "/cosmology/universe/milky-way", priority: 0.6 },
  { path: "/cosmology/universe/stellar-neighborhood", priority: 0.6 },
  { path: "/cosmology/universe/solar-system", priority: 0.6 },
  { path: "/cosmology/universe/earth", priority: 0.6 },
  { path: "/cosmology/timeline", priority: 0.7 },
  { path: "/cosmology/knowledge-base", priority: 0.7 },
  { path: "/cosmology/dialogues", priority: 0.7 },
  // Economics
  { path: "/economics", priority: 0.8 },
  { path: "/economics/economists", priority: 0.7 },
  { path: "/economics/theories", priority: 0.7 },
  { path: "/economics/concepts", priority: 0.7 },
  { path: "/economics/case-studies", priority: 0.7 },
  { path: "/economics/schools", priority: 0.7 },
  { path: "/economics/debates", priority: 0.7 },
  { path: "/economics/dialogues", priority: 0.7 },
  { path: "/economics/simulations", priority: 0.7 },
  // Psychology
  { path: "/psychology", priority: 0.8 },
  { path: "/psychology/theorists", priority: 0.7 },
  { path: "/psychology/experiments", priority: 0.7 },
  { path: "/psychology/phenomena", priority: 0.7 },
  { path: "/psychology/schools", priority: 0.7 },
  { path: "/psychology/disorders", priority: 0.7 },
  { path: "/psychology/debates", priority: 0.7 },
  { path: "/psychology/dialogues", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority,
  }));

  const thinkerEntries: MetadataRoute.Sitemap = getThinkerSlugs().map((slug) => ({
    url: `${SITE_URL}/philosophy/thinkers/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const schoolEntries: MetadataRoute.Sitemap = getSchoolSlugs().map((slug) => ({
    url: `${SITE_URL}/philosophy/schools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const ismEntries: MetadataRoute.Sitemap = getIsmSlugs().map((slug) => ({
    url: `${SITE_URL}/philosophy/isms/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const experimentEntries: MetadataRoute.Sitemap = getExperimentSlugs().map((slug) => ({
    url: `${SITE_URL}/philosophy/experiments/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const questionEntries: MetadataRoute.Sitemap = getQuestionSlugs().map((slug) => ({
    url: `${SITE_URL}/philosophy/questions/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const knowledgeEntries: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${SITE_URL}/human-history/knowledge/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // KB detail slugs are a single `--`-joined segment with CJK characters;
  // encode the whole segment so the sitemap emits valid URLs.
  const physicsKbEntries: MetadataRoute.Sitemap = universePhysicsKB.getSlugs().map((slug) => ({
    url: `${SITE_URL}/universe-physics/knowledge-base/${encodeURIComponent(slug)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const cosmologyKbEntries: MetadataRoute.Sitemap = cosmologyKB.getSlugs().map((slug) => ({
    url: `${SITE_URL}/cosmology/knowledge-base/${encodeURIComponent(slug)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dialogue slugs are ASCII filenames (tesla-edison, hubble-lemaitre).
  const physicsDialogueEntries: MetadataRoute.Sitemap = universePhysicsDialogues
    .getSlugs()
    .map((slug) => ({
      url: `${SITE_URL}/universe-physics/dialogues/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const cosmologyDialogueEntries: MetadataRoute.Sitemap = cosmologyDialogues
    .getSlugs()
    .map((slug) => ({
      url: `${SITE_URL}/cosmology/dialogues/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const mathematicianEntries: MetadataRoute.Sitemap = getMathematicianSlugs().map((slug) => ({
    url: `${SITE_URL}/mathematics/mathematicians/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const theoremEntries: MetadataRoute.Sitemap = getTheoremSlugs().map((slug) => ({
    url: `${SITE_URL}/mathematics/theorems/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const mathConceptEntries: MetadataRoute.Sitemap = getMathConceptSlugs().map((slug) => ({
    url: `${SITE_URL}/mathematics/concepts/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const mathDialogueEntries: MetadataRoute.Sitemap = getMathDialogueSlugs().map((slug) => ({
    url: `${SITE_URL}/mathematics/dialogues/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // ── Economics dynamic entries ───────────────────────────────────────

  const economistEntries: MetadataRoute.Sitemap = getEconomistSlugs().map((slug) => ({
    url: `${SITE_URL}/economics/economists/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const econTheoryEntries: MetadataRoute.Sitemap = getEconTheorySlugs().map((slug) => ({
    url: `${SITE_URL}/economics/theories/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const econConceptEntries: MetadataRoute.Sitemap = getEconConceptSlugs().map((slug) => ({
    url: `${SITE_URL}/economics/concepts/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = getCaseStudySlugs().map((slug) => ({
    url: `${SITE_URL}/economics/case-studies/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const econSchoolEntries: MetadataRoute.Sitemap = getEconSchoolSlugs().map((slug) => ({
    url: `${SITE_URL}/economics/schools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const econDebateEntries: MetadataRoute.Sitemap = getEconDebateSlugs().map((slug) => ({
    url: `${SITE_URL}/economics/debates/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const econDialogueEntries: MetadataRoute.Sitemap = getEconDialogueSlugs().map((slug) => ({
    url: `${SITE_URL}/economics/dialogues/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // ── Psychology dynamic entries ──────────────────────────────────────

  const theoristEntries: MetadataRoute.Sitemap = getTheoristSlugs().map((slug) => ({
    url: `${SITE_URL}/psychology/theorists/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const psyExperimentEntries: MetadataRoute.Sitemap = getPsyExperimentSlugs().map((slug) => ({
    url: `${SITE_URL}/psychology/experiments/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const phenomenonEntries: MetadataRoute.Sitemap = getPhenomenonSlugs().map((slug) => ({
    url: `${SITE_URL}/psychology/phenomena/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const psySchoolEntries: MetadataRoute.Sitemap = getPsySchoolSlugs().map((slug) => ({
    url: `${SITE_URL}/psychology/schools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const disorderEntries: MetadataRoute.Sitemap = getDisorderSlugs().map((slug) => ({
    url: `${SITE_URL}/psychology/disorders/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const psyDebateEntries: MetadataRoute.Sitemap = getPsyDebateSlugs().map((slug) => ({
    url: `${SITE_URL}/psychology/debates/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const psyDialogueEntries: MetadataRoute.Sitemap = getPsyDialogueSlugs().map((slug) => ({
    url: `${SITE_URL}/psychology/dialogues/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const newDomainEntries: MetadataRoute.Sitemap = [];
  for (const config of Object.values(KNOWLEDGE_DOMAINS)) {
    newDomainEntries.push({
      url: `${SITE_URL}/${config.domain}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    });
    for (const section of config.sections) {
      newDomainEntries.push({
        url: `${SITE_URL}/${config.domain}/${section.key}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
      for (const slug of createKnowledgeSection(config.domain, section.key).getSlugs()) {
        newDomainEntries.push({
          url: `${SITE_URL}/${config.domain}/${section.key}/${slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        });
      }
    }
  }

  const frontierEntries: MetadataRoute.Sitemap = [];
  for (const domain of FRONTIER_DOMAINS) {
    frontierEntries.push({
      url: `${SITE_URL}/${domain}/frontier`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    });
    for (const slug of createFrontier(domain).getSlugs()) {
      frontierEntries.push({
        url: `${SITE_URL}/${domain}/frontier/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
  }

  const readingPathEntries: MetadataRoute.Sitemap = READING_PATHS.map((p) => ({
    url: `${SITE_URL}/read/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...readingPathEntries,
    ...newDomainEntries,
    ...frontierEntries,
    ...thinkerEntries,
    ...schoolEntries,
    ...ismEntries,
    ...experimentEntries,
    ...questionEntries,
    ...knowledgeEntries,
    ...physicsKbEntries,
    ...cosmologyKbEntries,
    ...physicsDialogueEntries,
    ...cosmologyDialogueEntries,
    ...mathematicianEntries,
    ...theoremEntries,
    ...mathConceptEntries,
    ...mathDialogueEntries,
    ...economistEntries,
    ...econTheoryEntries,
    ...econConceptEntries,
    ...caseStudyEntries,
    ...econSchoolEntries,
    ...econDebateEntries,
    ...econDialogueEntries,
    ...theoristEntries,
    ...psyExperimentEntries,
    ...phenomenonEntries,
    ...psySchoolEntries,
    ...disorderEntries,
    ...psyDebateEntries,
    ...psyDialogueEntries,
  ];
}
