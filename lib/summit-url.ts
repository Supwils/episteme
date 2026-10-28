import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export type SummitLocation = {
  domain: string;
  index: number;
};

let urls: Record<string, unknown> | null | undefined;

/**
 * 文章出口用的 url → 学科页与节点序号。文件由 gen-summit-layout 写到 generated/，
 * 不把整张图谱引进每篇文章的服务端模块。文件还没有时就不显示入口。
 */
export function summitLocateForUrl(url: string): SummitLocation | null {
  const table = loadSummitUrls();
  if (!table) return null;
  const pathOnly = url.split("?")[0] ?? url;
  const value = table[pathOnly];
  if (!Array.isArray(value)) return null;
  const domain = value[0];
  const index = value[1];
  if (typeof domain !== "string" || domain.length === 0 || typeof index !== "number") return null;
  if (!Number.isInteger(index) || index < 0) return null;
  return { domain, index };
}

function loadSummitUrls(): Record<string, unknown> | null {
  if (urls !== undefined) return urls;
  const file = path.join(process.cwd(), "generated", "summit-urls.json");
  if (!existsSync(file)) {
    urls = null;
    return null;
  }
  const parsed: unknown = JSON.parse(readFileSync(file, "utf8"));
  urls = parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
  return urls;
}
