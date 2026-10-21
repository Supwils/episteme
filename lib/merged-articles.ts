import { permanentRedirect } from "next/navigation";
import { decodeSlug } from "./content-utils";

/**
 * Articles that were merged into another page on the same topic. The old URL
 * stays alive as a permanent redirect, so bookmarks and outside links land on
 * the surviving article instead of a 404.
 */
export const MERGED_ARTICLES: Readonly<Record<string, string>> = {
  "/human-history/knowledge/文明--古埃及": "/human-history/knowledge/古代文明--古埃及",
  "/human-history/knowledge/概念--工业革命": "/human-history/knowledge/事件--工业革命",
  "/human-history/knowledge/概念--丝绸之路": "/human-history/knowledge/事件--丝绸之路",
  "/human-history/knowledge/中世纪--黑死病": "/human-history/knowledge/事件--黑死病",
  "/human-history/knowledge/思想史--启蒙运动": "/human-history/knowledge/事件--启蒙运动",
  "/human-history/knowledge/概念--大航海时代": "/human-history/knowledge/事件--大航海时代",
  "/cosmology/knowledge-base/星系天文学--agn-and-quasars":
    "/cosmology/knowledge-base/活动星系核与类星体",
  "/cosmology/knowledge-base/多信使天文学--cosmic-rays": "/cosmology/knowledge-base/宇宙射线",
  "/life-science/knowledge-base/生态学--热带雨林":
    "/life-science/knowledge-base/生态系统--热带雨林",
  "/life-science/species/coelacanth-living": "/life-science/species/coelacanth",
};

/** Redirects to the surviving article when `slug` under `section` was merged away. */
export function redirectIfMerged(section: string, slug: string): void {
  const target = MERGED_ARTICLES[`${section}/${decodeSlug(slug).normalize("NFC")}`];
  if (target) permanentRedirect(encodeURI(target));
}
