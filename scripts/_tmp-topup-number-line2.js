const fs = require("fs");
const path = "/Users/supwils/supwilsoft/live/universe-knowledge/content/mathematics/concepts/number-line.mdx";
function bodyCjk(text) {
  const end = text.indexOf("\n---", 3);
  const body = text.startsWith("---") && end !== -1 ? text.slice(end + 4) : text;
  return (body.match(/[\u4e00-\u9fff]/g) || []).length;
}
let t = fs.readFileSync(path, "utf8");
const before = bodyCjk(t);
const reps = [
  [
    "不过，高维空间也会出现一维直觉无法覆盖的现象。在数轴上，两点之间只有一条直线区间；在平面或更高维中，路径、方向和邻域具有更多自由度。理解这一差异，是从初等坐标进入线性代数、几何和数据科学的重要一步。",
    "不过，高维空间也会出现一维直觉无法覆盖的现象。在数轴上，两点之间只有一条直线区间；在平面或更高维中，路径、方向和邻域具有更多自由度。理解这一差异，是从初等坐标进入线性代数、几何和数据科学的重要一步。一维里“远近”几乎只有一种说法；多维里你可以换范数、换度量、甚至先投影再比较。于是数轴留下的遗产不是那条线本身，而是一套可迁移的问题清单：原点怎么定、单位怎么比、距离怎么定义、邻域怎么收缩。"
  ],
  [
    "同一个学习者可以在不同问题上处于不同层级。会使用数轴解决不等式，并不自动意味着已经掌握实数完备性；理解完备性，也不自动解决浮点误差或社会测量中的尺度可比性。知识图谱中的前置关系表达“这一步依赖什么”，而不是给人贴上能力等级。",
    "同一个学习者可以在不同问题上处于不同层级。会使用数轴解决不等式，并不自动意味着已经掌握实数完备性；理解完备性，也不自动解决浮点误差或社会测量中的尺度可比性。知识图谱中的前置关系表达“这一步依赖什么”，而不是给人贴上能力等级。把五层当作检查清单比当作进度条更有用：遇到新题目，先问自己卡在哪一层，再决定是补直觉、补定义，还是补证据与开放问题。"
  ],
];
for (const [old, neu] of reps) {
  if (!t.includes(old)) throw new Error("missing: " + old.slice(0, 80));
  t = t.replace(old, neu);
}
if (!/^updated: 2026-09-09$/m.test(t)) t = t.replace(/^updated:.*$/m, "updated: 2026-09-09");
fs.writeFileSync(path, t);
const after = bodyCjk(t);
console.log("mathematics/concepts/number-line.mdx|" + before + "|" + after);
console.log(after >= 4050 && after <= 4700 ? "OK" : "OUT");
