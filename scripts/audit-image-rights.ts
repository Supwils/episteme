/**
 * 图像权利与性能审计（T-IMAGE-01，T-SUBJECT-NEXT 前置闸门）。
 * 校验：
 *  1. 登记完整性——content-assets/images 每张原图的权利元数据存在且通过 Zod schema；
 *  2. 引用一致性——content/ 中所有 `![...](/images/<id>)` 必须指向已登记 id；
 *  3. 变体新鲜度——public/images 的响应式变体存在且不旧于原图；
 *  4. 性能预算——单篇文章 1280w 档合计 ≤ ARTICLE_IMAGE_BUDGET_BYTES，
 *     单张最大变体 ≤ SINGLE_IMAGE_BUDGET_BYTES；
 *  5. 禁止外链热图——content/ 中不允许 http(s) 图片直链（必须登记本地化）。
 */
import fs from "node:fs";
import path from "node:path";
import {
  CONTENT_ASSETS_DIR,
  PUBLIC_IMAGES_DIR,
  ARTICLE_IMAGE_BUDGET_BYTES,
  SINGLE_IMAGE_BUDGET_BYTES,
  ImageRightsSchema,
  loadImageManifest,
} from "../lib/image-rights.ts";

const CONTENT_DIR = path.join(process.cwd(), "content");
const issues: string[] = [];
const warnings: string[] = [];

function* walk(dir: string): Generator<string> {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.mdx?$/.test(entry.name) && !entry.name.endsWith(".narration.md")) yield full;
  }
}

const manifest = loadImageManifest();
const rightsFiles = fs.existsSync(CONTENT_ASSETS_DIR)
  ? fs.readdirSync(CONTENT_ASSETS_DIR).filter((f) => f.endsWith(".json"))
  : [];
const sourceFiles = fs.existsSync(CONTENT_ASSETS_DIR)
  ? fs.readdirSync(CONTENT_ASSETS_DIR).filter((f) => f.includes(".src."))
  : [];

// 1. 登记完整性
const registeredIds = new Set<string>();
for (const file of rightsFiles) {
  const id = file.replace(/\.json$/, "");
  registeredIds.add(id);
  const parsed = ImageRightsSchema.safeParse(
    JSON.parse(fs.readFileSync(path.join(CONTENT_ASSETS_DIR, file), "utf-8"))
  );
  if (!parsed.success) {
    issues.push(`${id}: 权利元数据未通过 schema（${parsed.error.issues[0]?.message}）`);
    continue;
  }
  if (!sourceFiles.some((f) => f.startsWith(`${id}.src.`))) {
    issues.push(`${id}: 有元数据但缺原图（${id}.src.<ext>）`);
  }
}
for (const file of sourceFiles) {
  const id = file.split(".src.")[0]!;
  if (!registeredIds.has(id)) issues.push(`${id}: 有原图但缺权利元数据 ${id}.json`);
}

// 2 + 5. 引用一致性与外链热图
const IMAGE_REF_RE = /!\[[^\]]*\]\(([^)\s]+)[^)]*\)/g;
const articleImages = new Map<string, string[]>();
const usedIds = new Set<string>();
for (const file of walk(CONTENT_DIR)) {
  const text = fs.readFileSync(file, "utf-8");
  const rel = path.relative(process.cwd(), file);
  for (const match of text.matchAll(IMAGE_REF_RE)) {
    const src = match[1]!;
    if (/^https?:\/\//.test(src)) {
      issues.push(`${rel}: 外链热图 ${src}（必须先登记本地化）`);
      continue;
    }
    const idMatch = src.match(/^\/images\/([a-z0-9-]+?)(?:-\d+)?(?:\.\w+)?$/);
    if (!idMatch) continue; // 非登记路径的历史图片（当前不存在），暂不约束
    const id = idMatch[1]!;
    usedIds.add(id);
    if (!registeredIds.has(id)) {
      issues.push(`${rel}: 引用未登记的图像 ${src}`);
      continue;
    }
    const list = articleImages.get(rel) ?? [];
    list.push(id);
    articleImages.set(rel, list);
  }
}

// 3. 变体新鲜度
for (const id of registeredIds) {
  const entry = manifest[id];
  const srcFile = sourceFiles.find((f) => f.startsWith(`${id}.src.`));
  if (!srcFile) continue;
  const srcMtime = fs.statSync(path.join(CONTENT_ASSETS_DIR, srcFile)).mtimeMs;
  if (!entry) {
    issues.push(`${id}: manifest 缺失（需运行 pnpm gen-content-images）`);
    continue;
  }
  for (const variant of entry.variants) {
    const outPath = path.join(PUBLIC_IMAGES_DIR, variant.file);
    if (!fs.existsSync(outPath)) {
      issues.push(`${id}: 变体缺失 ${variant.file}`);
    } else if (fs.statSync(outPath).mtimeMs < srcMtime) {
      issues.push(`${id}: 变体 ${variant.file} 旧于原图（需重新生成）`);
    }
  }
}

// 4. 性能预算
for (const id of registeredIds) {
  const entry = manifest[id];
  if (!entry) continue;
  const largest = entry.variants.at(-1);
  if (largest && largest.bytes > SINGLE_IMAGE_BUDGET_BYTES) {
    issues.push(
      `${id}: 最大变体 ${(largest.bytes / 1024).toFixed(0)}KB 超过单图预算 ${SINGLE_IMAGE_BUDGET_BYTES / 1024}KB`
    );
  }
}
for (const [rel, ids] of articleImages) {
  const total = ids.reduce((sum, id) => {
    const entry = manifest[id];
    const v1280 = entry?.variants.find((v) => v.width === 1280) ?? entry?.variants.at(-1);
    return sum + (v1280?.bytes ?? 0);
  }, 0);
  if (total > ARTICLE_IMAGE_BUDGET_BYTES) {
    issues.push(
      `${rel}: 文章图像合计 ${(total / 1024).toFixed(0)}KB 超过预算 ${ARTICLE_IMAGE_BUDGET_BYTES / 1024}KB`
    );
  }
}

// 登记了但未被引用：警告（允许图库预登记，但提醒）
for (const id of registeredIds) {
  if (!usedIds.has(id)) warnings.push(`${id}: 已登记但暂未被任何文章引用`);
}

console.log("Image Rights & Performance Audit\n");
console.log(`Registered images: ${registeredIds.size}`);
console.log(`Referenced by articles: ${usedIds.size}`);
console.log(`Articles with images: ${articleImages.size}`);
if (warnings.length > 0) {
  console.log("\nWarnings:");
  for (const w of warnings) console.log(`  - ${w}`);
}
if (issues.length > 0) {
  console.error(`\nAudit failed with ${issues.length} issue(s):`);
  for (const issue of issues) console.error(`  - ${issue}`);
  process.exitCode = 1;
} else {
  console.log("\nAudit passed: image rights, references, variants and budgets are consistent.");
}
