import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

/**
 * 图像权利管线（T-IMAGE-01，T-SUBJECT-NEXT 前置）。
 *
 * 约定：
 * - 原图与权利元数据放在 content-assets/images/<id>.src.<ext> 与 <id>.json；
 * - `pnpm gen-content-images` 生成响应式 WebP 变体到 public/images/ 并产出
 *   manifest.json（尺寸、变体、署名信息）；
 * - `pnpm audit-image-rights` 校验登记完整性、引用一致性、变体新鲜度与性能
 *   预算（见 scripts/audit-image-rights.ts）；
 * - 文章内以 `![alt](/images/<id>)` 引用，MarkdownRenderer 自动渲染
 *   srcset/宽高/署名。
 */

export const IMAGE_LICENSES = [
  "public-domain",
  "cc0",
  "cc-by",
  "cc-by-sa",
  "cc-by-nd",
  "own",
] as const;

export const ImageRightsSchema = z.object({
  /** 图片标题（中文，用于 figcaption）。 */
  title: z.string().min(1),
  /** 作者/版权持有人。自研图填团队名。 */
  author: z.string().min(1),
  /** 可核验的来源页面（非直链）。 */
  sourceUrl: z.string().url(),
  license: z.enum(IMAGE_LICENSES),
  /** 需要署名时的完整署名行；public-domain/own 可省略。 */
  attribution: z.string().optional(),
  /** 出处备注：获取日期、裁剪/修改说明。 */
  provenance: z.string().min(1),
});

export type ImageRights = z.infer<typeof ImageRightsSchema>;

export type ImageManifestEntry = {
  id: string;
  width: number;
  height: number;
  variants: { width: number; file: string; bytes: number }[];
  title: string;
  attribution?: string;
};

export type ImageManifest = Record<string, ImageManifestEntry>;

export const CONTENT_ASSETS_DIR = path.join(process.cwd(), "content-assets", "images");
export const PUBLIC_IMAGES_DIR = path.join(process.cwd(), "public", "images");
export const MANIFEST_PATH = path.join(PUBLIC_IMAGES_DIR, "manifest.json");

export const RESPONSIVE_WIDTHS = [640, 1280, 1920] as const;

/** 性能预算：单篇文章引用的全部图片在 1280w 档的合计字节数上限。 */
export const ARTICLE_IMAGE_BUDGET_BYTES = 800 * 1024;
/** 单张图片最大变体（1920w）的字节数上限。 */
export const SINGLE_IMAGE_BUDGET_BYTES = 500 * 1024;

export function loadImageRights(id: string): ImageRights | null {
  const file = path.join(CONTENT_ASSETS_DIR, `${id}.json`);
  if (!fs.existsSync(file)) return null;
  const parsed = ImageRightsSchema.safeParse(JSON.parse(fs.readFileSync(file, "utf-8")));
  return parsed.success ? parsed.data : null;
}

export function loadImageManifest(): ImageManifest {
  if (!fs.existsSync(MANIFEST_PATH)) return {};
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8")) as ImageManifest;
}
