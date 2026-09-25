"use client";

import { usePathname } from "next/navigation";

/** The last path segment as words: /philosophy/thinkers/soc-rates → "soc rates". */
export function queryFromPath(pathname: string): string {
  const segment = pathname.split("/").filter(Boolean).at(-1) ?? "";
  try {
    return decodeURIComponent(segment).replace(/[-_]+/g, " ").trim();
  } catch {
    return "";
  }
}

/**
 * 404 的搜索框：一个普通的 GET 表单（没有 JS 也能用），把地址里最后一段预填成
 * 关键词——拼错的地址往往只差一两个字母。
 */
export function UnchartedSearch() {
  const pathname = usePathname();
  return (
    <form action="/search" method="get" role="search" className="state-search">
      <label htmlFor="uncharted-q" className="sr-only">
        搜索全站
      </label>
      <input
        id="uncharted-q"
        name="q"
        type="search"
        defaultValue={queryFromPath(pathname ?? "")}
        placeholder="搜索文章、人物、概念"
      />
      <button type="submit" className="state-view__action" data-primary>
        搜索
      </button>
    </form>
  );
}
