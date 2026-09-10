const fs = require("fs");
const path = require("path");

const root = process.argv[2] || ".";

function bodyCjk(text) {
  const end = text.indexOf("\n---", 3);
  const body = text.startsWith("---") && end !== -1 ? text.slice(end + 4) : text;
  return (body.match(/[\u4e00-\u9fff]/g) || []).length;
}

function patch(rel, replacements) {
  const file = path.join(root, rel);
  let t = fs.readFileSync(file, "utf8");
  const before = bodyCjk(t);
  for (const [old, neu] of replacements) {
    if (!t.includes(old)) throw new Error("missing anchor in " + rel + ": " + old.slice(0, 60));
    t = t.replace(old, neu);
  }
  if (!/^updated: 2026-09-09$/m.test(t)) {
    t = t.replace(/^updated:.*$/m, "updated: 2026-09-09");
  }
  fs.writeFileSync(file, t);
  const after = bodyCjk(t);
  console.log(rel + "|" + before + "|" + after);
  return after;
}

const sAfter = patch("content/computer-science/pioneers/bjarne-stroustrup.mdx", [
  [
    "此后 C++ 按固定周期更新标准：C++03、C++11、C++14、C++17、C++20、C++23——自 C++11 起，基本保持了三年一版的节奏。",
    "此后 C++ 按固定周期更新标准：C++03、C++11、C++14、C++17、C++20、C++23——自 C++11 起，基本保持了三年一版的节奏。节奏本身是一种治理选择：与其攒到大而完美再发布，不如让编译器与库作者有可预期的目标年，把争议特性拆进连续几票里消化。",
  ],
  [
    "Stroustrup 承认委员会过程并不完美，但认为多方参与保证了语言适合真实工业需求，而非学术偏好。",
    "Stroustrup 承认委员会过程并不完美，但认为多方参与保证了语言适合真实工业需求，而非学术偏好。他常提醒批评者：许多所谓为什么不删掉某特性的问题，答案不是技术上删不掉，而是全球有一整条工具链、教材与二进制接口已经长在那上面；委员会的保守，有时是在替那些无法到场投票的既有代码投票。",
  ],
  [
    "并非全无道理。",
    "并非全无道理。斯特劳斯特鲁普的辩护始终绕回同一判据：若当年选择不兼容，C++ 可能更干净，也可能只是又一门实验室语言；兼容换来的是可渐进迁移的工业路径，这正是他把现实中的大型软件写进设计目标时愿意支付的票价。",
  ],
]);

const cAfter = patch("content/earth-science/events/chicxulub-impact.mdx", [
  [
    "不过要强调：这是“主流共识”，不是“全体一致”。德干贡献究竟有多大、撞击的具体致死机制以何为主，至今仍是地球科学里一个真实、活跃、还在产出新论文的前沿问题。",
    "不过要强调：这是“主流共识”，不是“全体一致”。德干贡献究竟有多大、撞击的具体致死机制以何为主，至今仍是地球科学里一个真实、活跃、还在产出新论文的前沿问题。区分两者的一条经验法则是看指示剂的独特性：冲击石英与全球等时铱峰几乎无法用纯火山叙事复制，而德干的碳释放可以解释界线前的气候扰动背景。于是更干净的表述不是火山无关，而是火山不足以单独造成这次同步灭绝面；撞击提供了缺失的全球瞬时触发。",
  ],
  [
    "如果那颗小行星偏出一点点、没有砸中尤卡坦，地球的演化故事很可能完全不同。",
    "如果那颗小行星偏出一点点、没有砸中尤卡坦，地球的演化故事很可能完全不同。目标区的浅海蒸发岩与碳酸盐，使这次撞击特别善于制造遮光硫气溶胶；换一块贫硫的深海玄武岩基底，同样动能未必煮出同等配方的冬天。地质偶然与轨道偶然在这里叠乘：不是任意一次大型撞击都会写成这一页界线。",
  ],
]);

for (const [rel, n] of [
  ["content/computer-science/pioneers/bjarne-stroustrup.mdx", sAfter],
  ["content/earth-science/events/chicxulub-impact.mdx", cAfter],
  ["content/computer-science/algorithms/huffman-coding.mdx", null],
]) {
  const file = path.join(root, rel);
  const t = fs.readFileSync(file, "utf8");
  const n2 = bodyCjk(t);
  const ok = n2 >= 4050 && n2 <= 4700;
  console.log((ok ? "OK" : "OUT") + " " + n2 + " " + rel);
}
