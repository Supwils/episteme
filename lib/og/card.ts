import { DOMAINS } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";
import { clusterMarkHex } from "@/lib/design/domain-accent";
import { ogText, OG_DESCRIPTION_LIMIT, OG_TITLE_LIMIT } from "./text";

export const OG_BRAND = "Episteme · 格致";
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
const sections = new Map([
  ...DOMAINS.map(
    (domain) =>
      [domain.id, { label: domain.title, accent: clusterMarkHex(domain.cluster) }] as const
  ),
  ["knowledge-graph", { label: "知识图谱", accent: "#d19a66" }],
]);

export function ogCard(search: URLSearchParams) {
  const section = sections.get(search.get("section") ?? "");
  const title = ogText(search.get("title") ?? "", OG_TITLE_LIMIT) || OG_BRAND;
  const length = Array.from(title).length;
  return {
    title,
    description: ogText(search.get("description") ?? "", OG_DESCRIPTION_LIMIT, true),
    sectionLabel: section?.label ?? "",
    accent: section?.accent ?? "#c8a45a",
    host: new URL(SITE_URL).host,
    titleSize: length > 30 ? 42 : length > 20 ? 52 : 64,
  };
}

export type OgCard = ReturnType<typeof ogCard>;
