/**
 * 响应式内容图像生成（T-IMAGE-01）。
 * 读取 content-assets/images/<id>.src.<ext> 原图 + <id>.json 权利元数据，
 * 输出 public/images/<id>-<w>.webp 响应式变体与 manifest.json。
 * 幂等：变体新于原图且 manifest 字段完整时跳过。
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import {
  CONTENT_ASSETS_DIR,
  PUBLIC_IMAGES_DIR,
  MANIFEST_PATH,
  RESPONSIVE_WIDTHS,
  loadImageRights,
  loadImageManifest,
  type ImageManifest,
} from "../lib/image-rights.ts";

const SOURCE_RE = /^(.+)\.src\.(png|jpe?g|webp|avif|tiff?)$/i;

async function main() {
  if (!fs.existsSync(CONTENT_ASSETS_DIR)) {
    console.log("content-assets/images 不存在，无内容图像需要生成。");
    return;
  }
  fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });

  const manifest = loadImageManifest();
  const sources = fs.readdirSync(CONTENT_ASSETS_DIR).filter((f) => SOURCE_RE.test(f));
  let generated = 0;
  let skipped = 0;

  for (const file of sources) {
    const id = file.match(SOURCE_RE)![1]!;
    const rights = loadImageRights(id);
    if (!rights) {
      console.error(
        `❌ ${id}: 缺少或非法的权利元数据 ${id}.json（先用 audit-image-rights 看细节）`
      );
      process.exitCode = 1;
      continue;
    }

    const srcPath = path.join(CONTENT_ASSETS_DIR, file);
    const srcMtime = fs.statSync(srcPath).mtimeMs;
    const meta = await sharp(srcPath).metadata();
    if (!meta.width || !meta.height) {
      console.error(`❌ ${id}: 无法读取图片尺寸`);
      process.exitCode = 1;
      continue;
    }

    const variants = [];
    let fresh = true;
    for (const width of RESPONSIVE_WIDTHS) {
      if (meta.width < width) continue; // 不放大：只生成不超过原图宽度的档
      const outFile = `${id}-${width}.webp`;
      const outPath = path.join(PUBLIC_IMAGES_DIR, outFile);
      if (!fs.existsSync(outPath) || fs.statSync(outPath).mtimeMs < srcMtime) fresh = false;
      variants.push({ width, file: outFile, path: outPath });
    }

    if (fresh && manifest[id]?.variants.length === variants.length) {
      skipped += 1;
      continue;
    }

    for (const variant of variants) {
      await sharp(srcPath)
        .resize({ width: variant.width, withoutEnlargement: true })
        .webp({ quality: 80, effort: 5 })
        .toFile(variant.path);
    }

    manifest[id] = {
      id,
      width: meta.width,
      height: meta.height,
      variants: variants.map((v) => ({
        width: v.width,
        file: v.file,
        bytes: fs.statSync(v.path).size,
      })),
      title: rights.title,
      ...(rights.attribution ? { attribution: rights.attribution } : {}),
    };
    generated += 1;
    console.log(`✅ ${id}: ${meta.width}x${meta.height} → ${variants.length} 档`);
  }

  // 清理已从 content-assets 移除的条目
  const liveIds = new Set(sources.map((f) => f.match(SOURCE_RE)![1]!));
  for (const id of Object.keys(manifest)) {
    if (!liveIds.has(id)) {
      for (const variant of manifest[id]!.variants) {
        fs.rmSync(path.join(PUBLIC_IMAGES_DIR, variant.file), { force: true });
      }
      delete manifest[id];
      console.log(`🗑  ${id}: 已移除（源文件不存在）`);
    }
  }

  // Trailing newline matches what prettier (via lint-staged) writes; without it
  // the generator and the formatter overwrite each other on every commit and
  // CI's generated-artifact idempotency check fails on a clean checkout.
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest as ImageManifest, null, 2)}\n`);
  console.log(
    `\n完成：${generated} 张重新生成，${skipped} 张跳过（已最新），manifest ${Object.keys(manifest).length} 条。`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
