import type { SearchDocument } from "./types";

export function indexCosmology(
  erasDataMod: {
    COSMOLOGY_ERAS: ReadonlyArray<{
      id: string;
      name: { primary: string; english: string };
      description: string;
      timeRange: string;
    }>;
  } | null,
  cosKbDataMod: {
    COSMOLOGY_KB_DATA: ReadonlyArray<{
      slug: string;
      title: string;
      titleEn: string;
      category: string;
    }>;
  } | null,
  cosDialoguesDataMod: {
    COSMOLOGY_DIALOGUES_DATA: ReadonlyArray<{
      slug: string;
      title: string;
      titleEn: string;
      field: string;
      participants: readonly string[];
    }>;
  } | null
): SearchDocument[] {
  const docs: SearchDocument[] = [];

  // The 8 cosmic-scale tier TEXT pages (/cosmology/universe/<slug>). Kept as a
  // compact static list so the heavy T0–T7 content modules don't enter the
  // client search bundle. Distinct from the physics 3D walker (different url).
  const TIER_DOCS: ReadonlyArray<[string, string, string, string]> = [
    ["observable", "可见宇宙", "Observable Universe", "约 930 亿光年的共动直径"],
    ["cosmic-web", "宇宙纤维", "Cosmic Web", "暗物质纤维织成的宇宙网"],
    ["laniakea", "拉尼亚凯亚超星系团", "Laniakea Supercluster", "我们所在的引力分水岭"],
    ["local-group", "本星系群", "Local Group", "银河系与仙女座的邻里"],
    ["milky-way", "银河系", "Milky Way", "我们所在的棒旋星系"],
    ["stellar-neighborhood", "恒星邻域", "Stellar Neighborhood", "太阳周围的近邻恒星"],
    ["solar-system", "太阳系", "Solar System", "太阳与它的行星家族"],
    ["earth", "地球", "Earth / Planet", "尺度阶梯的终点：一颗行星"],
  ];
  for (const [slug, name, latin, tagline] of TIER_DOCS) {
    docs.push({
      id: `cosmology-tier-${slug}`,
      title: name,
      subtitle: latin,
      content: `${tagline} · 宇宙尺度图文详解`,
      section: "cosmology",
      url: `/cosmology/universe/${slug}`,
      type: "era",
    });
  }

  if (erasDataMod) {
    for (const era of erasDataMod.COSMOLOGY_ERAS) {
      docs.push({
        id: `cosmology-era-${era.id}`,
        title: era.name.primary,
        subtitle: era.name.english,
        content: `${era.timeRange} · ${era.description}`,
        section: "cosmology",
        url: `/cosmology/timeline`,
        type: "era",
      });
    }
  }

  if (cosKbDataMod) {
    for (const a of cosKbDataMod.COSMOLOGY_KB_DATA) {
      docs.push({
        id: `cosmology-kb-${a.slug}`,
        title: a.title,
        subtitle: a.titleEn,
        content: `${a.category} · 知识库`,
        section: "cosmology",
        url: `/cosmology/knowledge-base/${a.slug}`,
        type: "knowledgeBase",
      });
    }
  }

  if (cosDialoguesDataMod) {
    for (const d of cosDialoguesDataMod.COSMOLOGY_DIALOGUES_DATA) {
      docs.push({
        id: `cosmology-dialogue-${d.slug}`,
        title: d.title,
        subtitle: d.titleEn,
        content: `${d.field} · ${d.participants.join("、")}`,
        section: "cosmology",
        url: `/cosmology/dialogues/${d.slug}`,
        type: "dialogue",
      });
    }
  }

  return docs;
}
