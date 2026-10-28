/**
 * 格致山布局。坐标、台阶高度和汇流灯标，给 /knowledge-summit 的立体图用。
 * 坐标留在布局文件里。标题、提要和链接写进 summit-cards.json，给立体图的侧栏用。
 * 无脚本目录在二十二个学科页上，不进山体页。
 * 同一张图跑两次，字节必须一样。
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { brotliCompressSync } from "node:zlib";
import { summitCardFile } from "../lib/summit-cards.ts";
import { buildSummitModel } from "../lib/summit-model.ts";

const ROOT = process.cwd();
const layoutPath = path.join(ROOT, "public", "summit-layout.json");
const cardPath = path.join(ROOT, "public", "summit-cards.json");
const urlPath = path.join(ROOT, "generated", "summit-urls.json");

const model = buildSummitModel();
const layoutText = `${JSON.stringify(model.layout)}\n`;
const cardText = `${JSON.stringify(summitCardFile(model.nodes))}\n`;
const urlText = `${JSON.stringify(model.urls)}\n`;
mkdirSync(path.dirname(urlPath), { recursive: true });
writeFileSync(layoutPath, layoutText);
writeFileSync(cardPath, cardText);
writeFileSync(urlPath, urlText);

const layoutBytes = Buffer.byteLength(layoutText);
const cardBytes = Buffer.byteLength(cardText);
const layoutBrotli = brotliCompressSync(layoutText).length;
const cardBrotli = brotliCompressSync(cardText).length;
const deks = model.nodes.filter((node) => node.dek).length;
const linked = model.nodes.filter((node) => node.url).length;
console.log(
  `summit layout: nodes=${model.nodes.length} linked=${linked} deks=${deks} raw=${layoutBytes} brotli=${layoutBrotli} beacons=${model.beacons.length}`
);
console.log(`summit cards: raw=${cardBytes} brotli=${cardBrotli}`);
