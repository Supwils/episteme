import { readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import path from "node:path";

const root = process.cwd();
const route = "/universe-physics/universe/earth/page";
const buildDir = path.join(root, ".next");
const routeDir = path.join(buildDir, "server/app/universe-physics/universe/earth/page");

const INITIAL_JS_BUDGET = 180 * 1024;

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

async function gzipBytes(asset) {
  const source = await readFile(path.join(buildDir, asset));
  return gzipSync(source).byteLength;
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const appManifest = await readJson(path.join(routeDir, "app-build-manifest.json"));
const initialAssets = (appManifest.pages[route] ?? []).filter((asset) => asset.endsWith(".js"));
const initialBytes = (
  await Promise.all(initialAssets.map((asset) => gzipBytes(asset)))
).reduce((total, size) => total + size, 0);

const shellSource = await readFile(
  path.join(root, "app/universe-physics/universe/_shell/UniverseShell.tsx"),
  "utf8",
);
const webglSource = await readFile(
  path.join(root, "app/universe-physics/universe/_shell/UniverseWebGL.tsx"),
  "utf8",
);
const sceneSource = await readFile(
  path.join(root, "subjects/physics/scenes/ActiveScene.tsx"),
  "utf8",
);

assert(initialAssets.length > 0, "未找到宇宙地球路由的初始 JS 资产");
assert(initialBytes <= INITIAL_JS_BUDGET, `3D 外壳 ${formatKb(initialBytes)} 超过预算`);
assert(!shellSource.includes("@react-three/fiber"), "UniverseShell 不得静态引入 R3F");
assert(!shellSource.includes('from "three"'), "UniverseShell 不得静态引入 Three.js");
assert(!shellSource.includes('from "next/dynamic"'), "WebGL 条件入口不得使用会预取的 next/dynamic");
assert(shellSource.includes("const UniverseWebGL = lazy("), "UniverseWebGL 必须使用条件 React.lazy");
assert(webglSource.includes('const PostFX = lazy('), "PostFX 必须在首场景后按需加载");
assert(
  (sceneSource.match(/import\("\.\/tier\d-/g) ?? []).length === 8,
  "T0-T7 八个 3D 场景必须保持独立动态导入",
);

console.log("物理 3D 依赖审计");
console.log(`- 导航外壳：${formatKb(initialBytes)} / ${formatKb(INITIAL_JS_BUDGET)}`);
console.log("- WebGL 运行时：WebGL 探测成功后通过 React.lazy 请求");
console.log("- 场景边界：T0-T7 共 8 个独立动态导入");
console.log("- 后处理：首场景完成后空闲加载");
