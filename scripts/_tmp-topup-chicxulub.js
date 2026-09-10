const fs = require("fs");
const path = require("path");
const root = process.argv[2] || ".";
function bodyCjk(text) {
  const end = text.indexOf("\n---", 3);
  const body = text.startsWith("---") && end !== -1 ? text.slice(end + 4) : text;
  return (body.match(/[\u4e00-\u9fff]/g) || []).length;
}
const rel = "content/earth-science/events/chicxulub-impact.mdx";
const file = path.join(root, rel);
let t = fs.readFileSync(file, "utf8");
const before = bodyCjk(t);
const reps = [
  [
    "不过要强调：这是\"主流共识\"，不是\"全体一致\"。德干贡献究竟有多大、撞击的具体致死机制以何为主，至今仍是地球科学里一个真实、活跃、还在产出新论文的前沿问题。",
    "不过要强调：这是\"主流共识\"，不是\"全体一致\"。德干贡献究竟有多大、撞击的具体致死机制以何为主，至今仍是地球科学里一个真实、活跃、还在产出新论文的前沿问题。区分两者的一条经验法则是看指示剂的独特性：冲击石英与全球等时铱峰几乎无法用纯火山叙事复制，而德干的碳释放可以解释界线前的气候扰动背景。于是更干净的表述不是火山无关，而是火山不足以单独造成这次同步灭绝面；撞击提供了缺失的全球瞬时触发。",
  ],
  [
    "如果那颗小行星偏出一点点、没有砸中尤卡坦，地球的演化故事很可能完全不同。",
    "如果那颗小行星偏出一点点、没有砸中尤卡坦，地球的演化故事很可能完全不同。目标区的浅海蒸发岩与碳酸盐，使这次撞击特别善于制造遮光硫气溶胶；换一块贫硫的深海玄武岩基底，同样动能未必煮出同等配方的冬天。地质偶然与轨道偶然在这里叠乘：不是任意一次大型撞击都会写成这一页界线。",
  ],
];
for (const [old, neu] of reps) {
  if (!t.includes(old)) throw new Error("missing: " + old.slice(0, 40));
  t = t.replace(old, neu);
}
if (!/^updated: 2026-09-09$/m.test(t)) t = t.replace(/^updated:.*$/m, "updated: 2026-09-09");
fs.writeFileSync(file, t);
const after = bodyCjk(t);
console.log(rel + "|" + before + "|" + after);
console.log((after >= 4050 && after <= 4700 ? "OK" : "OUT"), after);
