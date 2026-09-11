import type { LabInviteData } from "@/lib/lab-invite";

const KINSHIP: LabInviteData = {
  href: "/anthropology/kinship-diagram",
  label: "亲属称谓示意图",
  tease: "切换爱斯基摩型与易洛魁型。不是某族谱。",
};

const MAP: LabInviteData = {
  href: "/anthropology/material-map",
  label: "物质文化分布示意",
  tease: "点一条传统。椭圆不是遗址坐标。",
};

const SCALE: LabInviteData = {
  href: "/anthropology/chronology-scale",
  label: "史前年代标尺",
  tease: "相对地层与绝对测年不是同一口钟。",
};

const GIFT: LabInviteData = {
  href: "/anthropology/reciprocity-lab",
  label: "交换与互惠实验室",
  tease: "概括、均衡、消极。不是交易教程。",
};

const BY_SLUG: Record<string, LabInviteData> = {
  "what-is-culture": KINSHIP,
  "emic-and-etic": KINSHIP,
  "ethnography-as-description": KINSHIP,
  "anthropological-comparison": KINSHIP,
  "holism-and-context": KINSHIP,
  "culture-is-not-race": KINSHIP,
  "kinship-terminology": KINSHIP,
  "descent-and-alliance": KINSHIP,
  "gift-and-reciprocity": GIFT,
  "marriage-and-household": KINSHIP,
  "gender-and-personhood": KINSHIP,
  "property-and-persons": GIFT,
  "things-and-persons": MAP,
  "technology-and-skill": MAP,
  "pottery-and-style": MAP,
  "cloth-and-value": MAP,
  "museums-and-collections": MAP,
  "landscape-and-dwelling": MAP,
  "stratigraphy-and-context": SCALE,
  "archaeological-dating": SCALE,
  "foragers-and-farmers": SCALE,
  "cities-and-early-states": SCALE,
  "human-dispersals-and-fossils": SCALE,
  "collapse-and-resilience": SCALE,
  "fieldnotes-and-representation": KINSHIP,
  "excavation-records": SCALE,
  "oral-tradition-and-history": KINSHIP,
  "sampling-and-absence": SCALE,
  "informed-consent-in-ethnography": KINSHIP,
  "collaborative-indigenous-archaeology": MAP,
  "urban-anthropology": MAP,
  "heritage-and-unesco": MAP,
  "nagpra-and-repatriation": MAP,
  "who-owns-the-past": MAP,
  "applied-anthropology": KINSHIP,
  "anthropology-of-the-contemporary": KINSHIP,
  "ancient-dna-and-identity-claims": SCALE,
  "digital-heritage-and-3d-ethics": MAP,
  "climate-archaeology-and-loss": SCALE,
  "museum-restitution-after-2020s": MAP,
};

const BY_SECTION: Record<string, LabInviteData> = {
  "culture-and-method": KINSHIP,
  "kinship-and-exchange": GIFT,
  "material-culture": MAP,
  "prehistory-and-archaeology": SCALE,
  "comparison-and-ethics": KINSHIP,
  "urban-and-heritage": MAP,
  frontier: MAP,
};

export function anthropologyLabInvite(section: string, slug: string): LabInviteData {
  return BY_SLUG[slug] ?? BY_SECTION[section] ?? MAP;
}
