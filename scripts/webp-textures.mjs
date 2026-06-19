// One-off: convert planet JPG textures to WebP (q82) to cut 3D-scene bandwidth.
import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "node:fs";
const dir = "public/textures/planets";
let before = 0, after = 0;
for (const f of readdirSync(dir)) {
  if (!f.endsWith(".jpg")) continue;
  const src = `${dir}/${f}`;
  const out = `${dir}/${f.replace(/\.jpg$/, ".webp")}`;
  before += statSync(src).size;
  await sharp(src).webp({ quality: 82, effort: 5 }).toFile(out);
  after += statSync(out).size;
  unlinkSync(src);
  console.log(`  ${f} -> ${(statSync(out).size/1024|0)}KB`);
}
console.log(`\nJPG ${(before/1024/1024).toFixed(2)}MB -> WebP ${(after/1024/1024).toFixed(2)}MB (saved ${(100-after/before*100).toFixed(0)}%)`);
