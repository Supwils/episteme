#!/usr/bin/env node
// One-off: attach a one/two-sentence narrative hook (`story`) to the most
// story-rich species so their cards read as stories, not just taxonomic tags.
// Matches the ASCII `id: "<id>",` line (encoding-safe) and inserts `story`
// right after it. Idempotent: skips a species that already has a story.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";

const STORIES = {
  // ancient.ts
  stromatolite:
    "现今仍在澳大利亚鲨鱼湾的高盐海湾里生长——地球最古老的生命形态至今未断的活见证，它们释放的氧气最终改写了整个大气。",
  anomalocaris:
    "寒武纪海洋的顶级掠食者，体长可达半米。它的圆形口器化石曾被误认作水母、前肢被当成虾的身体，“奇虾”之名正源于这场百年误会。",
  hallucigenia:
    "化石让古生物学家足足搞反了两次——先把背刺当成腿，再把头尾颠倒，直到 2015 年才确认哪端是头。",
  pikaia:
    "只有几厘米长，却带有一条脊索——它是包括人类在内所有脊椎动物已知最古老的近亲之一。",
  // paleozoic.ts
  "horseshoe-crab":
    "鲎的蓝色血液含独特的凝血因子，至今仍被制药业用来检测疫苗与注射剂中的细菌内毒素——几乎每一支上市疫苗都受过这种 4 亿年古老血液的检验。",
  eurypterid:
    "广翅鲎是史上最大的节肢动物之一，最大的莱茵蝎体长超过 2.5 米，是古生代海洋的恐怖猎手。",
  tiktaalik:
    "“鱼类登陆”的关键过渡化石：既有鳃和鳞，又长出能撑起身体的肢状鳍。2004 年在加拿大北极的发现，完美填补了水生到陆生的演化空缺。",
  meganeura:
    "石炭纪的高氧大气催生了翼展近 70 厘米的巨脉蜻蜓——史上最大的飞行昆虫，它的体型本身就是远古氧气浓度的活记录。",
  helicoprion:
    "下颌长着一圈螺旋排列的牙齿“齿轮”，其复原方式曾困惑学界整整一个世纪。",
  // mesozoic.ts
  archaeopteryx:
    "兼具恐龙的牙齿、爪和长尾，又有鸟类的羽毛。1861 年的发现恰在达尔文《物种起源》出版两年后，成为演化论最著名的过渡化石。",
  ginkgo:
    "真正的“活化石”，与 2 亿年前侏罗纪的化石几乎无异；野生种群一度近乎灭绝，靠中国寺庙的栽培才幸存至今。",
  tuatara:
    "喙头目唯一的现存代表，这一支系可追溯到 2.5 亿年前；它头顶还保留着一只能感光的“第三只眼”。",
  welwitschia:
    "一生只长两片叶子，却能在纳米布沙漠存活上千年。",
  // cenozoic-modern.ts
  megalodon:
    "史上最大的掠食性鲨鱼，牙齿可达 18 厘米，体长估计 15–18 米，约在 360 万年前灭绝。",
  "blue-whale":
    "地球有史以来已知最大的动物，体长超 30 米、重达 170 吨，心脏就有一辆小汽车大——比任何恐龙都大。",
  platypus:
    "少数会下蛋的哺乳动物之一，还能用喙感知猎物的电场；首批标本送到欧洲时，博物学家一度以为是有人把鸭嘴缝在兽身上的骗局。",
  tardigrade:
    "能在脱水后进入“隐生”状态，挺过真空、极端辐射甚至太空暴露——2007 年它成为首批被证实能在外太空存活的动物。",
  "coelacanth-living":
    "曾被认为随恐龙一同灭绝，直到 1938 年南非渔民在渔获中发现一条活体——20 世纪最轰动的“活化石”发现，证明这一支系默默存续了上亿年。",
  thylacine:
    "最后一只袋狼 1936 年死于霍巴特动物园，距它被列为保护动物仅 59 天——人为灭绝的标志性悲剧。",
  dodo: "在毛里求斯没有天敌、不惧人类，水手登岛后不到一个世纪就将其猎杀殆尽，从此“渡渡鸟”成了灭绝的代名词。",
  moa: "新西兰的恐鸟最高可达 3.6 米，在毛利人抵达后约一两百年内被猎至灭绝。",
  "great-auk":
    "最后一对大海雀 1844 年在冰岛被捕杀，连同它们正在孵的蛋——人类亲手终结了北大西洋的“企鹅”。",
  "stellers-sea-cow":
    "1741 年才被科学描述，仅 27 年后就被毛皮猎人捕杀殆尽。",
  mammoth:
    "西伯利亚永久冻土里的遗骸如此完整，连胃中的食物都还在——这使它成为“去灭绝”基因工程最热门的候选。",
  neanderthalensis:
    "今天非非洲裔人类基因组里仍带着约 1–2% 的尼安德特 DNA——他们并未完全消失，而是活在我们体内。",
  denisovan:
    "最初仅凭西伯利亚一根指骨的 DNA 被发现，却揭示出一个全新人类支系；藏族人的高原适应基因 EPAS1 正来自他们。",
  smilodon:
    "犬齿长达 28 厘米却很脆，靠强壮的前肢按住猎物再精准切入要害——并非靠蛮力撕咬。",
};

const dir = "subjects/life-science/lib/species";
let added = 0;
for (const file of readdirSync(dir)) {
  if (!file.endsWith(".ts")) continue;
  const fp = `${dir}/${file}`;
  let text = readFileSync(fp, "utf8");
  const before = text;
  for (const [id, story] of Object.entries(STORIES)) {
    const anchor = `    id: "${id}",\n`;
    const idx = text.indexOf(anchor);
    if (idx === -1) continue;
    // Skip if this species object already has a story field nearby.
    const objEnd = text.indexOf("\n  },", idx);
    if (text.slice(idx, objEnd).includes("story:")) continue;
    const esc = story.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    text =
      text.slice(0, idx + anchor.length) +
      `    story: "${esc}",\n` +
      text.slice(idx + anchor.length);
    added++;
  }
  if (text !== before) writeFileSync(fp, text);
}
console.log(`Seeded ${added} species stories.`);
