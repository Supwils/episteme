export type RecentArticle = { title: string; url: string; domain: string; updated: string };

type DatedArticle = Omit<RecentArticle, "updated"> & { updated?: string; status?: string };

/** One recent article per subject keeps the portal from becoming a single batch's feed. */
export function selectRecentArticles(
  articles: readonly DatedArticle[],
  limit = 5
): RecentArticle[] {
  const sorted = articles
    .filter(
      (article) =>
        article.updated &&
        /^\d{4}-\d{2}-\d{2}$/.test(article.updated) &&
        (!article.status || article.status === "published")
    )
    .sort((a, b) => b.updated!.localeCompare(a.updated!) || a.url.localeCompare(b.url));
  const seen = new Set<string>();
  const recent: RecentArticle[] = [];
  for (const article of sorted) {
    if (seen.has(article.domain)) continue;
    seen.add(article.domain);
    recent.push({
      title: article.title,
      url: article.url,
      domain: article.domain,
      updated: article.updated!,
    });
    if (recent.length === limit) break;
  }
  return recent;
}
