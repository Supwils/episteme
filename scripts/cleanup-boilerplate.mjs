#!/usr/bin/env node
// One-off cleanup: remove verbatim AI-template boilerplate paragraphs that were
// mass-appended across content/ by earlier "deepening" rounds. Operates at the
// PARAGRAPH level (blank-line-delimited blocks) and only removes a paragraph if
// it contains a distinctive boilerplate signature — so concept-specific prose
// that happens to share a section heading (e.g. the real content inside many
// `## 当代反思` sections) is preserved. After removal, section headings left with
// no body are dropped, and runs of blank lines are collapsed.
//
// Usage:
//   node scripts/cleanup-boilerplate.mjs          # dry-run: prints affected files + diffs
//   node scripts/cleanup-boilerplate.mjs --apply  # writes changes

import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const APPLY = process.argv.includes("--apply");

// Distinctive substrings — any paragraph containing one is template boilerplate.
// Five families seen across content/: 跨学科思考, 当代反思, 反思与实践, 当代技术反思,
// plus the generic aphorism blockquote. Each entry is verbatim-unique to filler.
const BOILERPLATE_SIGNATURES = [
  // 跨学科思考（3 段）
  "量子力学的发现挑战了经典物理学的确定性世界观，进化生物学揭示了生命的动态本质",
  "人工智能的发展特别值得关注。当机器能够执行以前被认为是人类独有的认知任务时",
  "环境危机也为这一主题增加了紧迫性。气候变化、生物多样性丧失和资源耗竭",
  // 当代反思（2 段，概念名内插，故只匹配稳定句）
  "全球化使得不同哲学传统的对话变得更加频繁和深入。数字技术为概念分析提供了新的工具和方法",
  "哲学概念的生命力在于它们能够不断被重新解读和应用——每一次重新审视都可能带来新的洞见",
  // 反思与实践（3 段）
  "哲学思考的最终目标不是纯粹的理论建构，而是实践智慧的培养",
  "（王阳明）提醒我们：真正的知识必然体现在行动中。在印度传统中",
  "数字时代的信息过载使得这种反思变得更加困难",
  // 当代技术反思（3 段 + 格言引用）
  "这个思想实验在人工智能和生物技术时代获得了新的紧迫性",
  "神经科学和认知科学的进展也为评估这些思想实验提供了新的经验工具",
  "东方哲学传统对这些思想实验提供了独特的回应",
  "思想实验的价值不在于它是否能在现实中实现",
  // concepts 收尾家族（33 篇，概念名内插）
  "这一概念在人工智能和数字时代获得了新的维度。算法系统和大数据技术",
  "数字技术的发展也为这一概念提供了新的应用场景和反思素材",
  "跨文化对话在此领域尤为重要。东方哲学传统",
  // isms/schools 收尾家族（16 篇）
  "这一哲学立场在数字时代和全球化语境中",
  "后殖民批评和女性主义理论对这一传统提出了重要的挑战。来自非西方文化传统的声音",
  "制度化和大众化也为这一传统带来了新的",
  // dialogues 收尾家族（13 篇）
  "这场思想对话的价值不仅在于揭示两位思想家的异同",
  "当代全球化使得这种跨文化对话比以往任",
  "数字时代的到来也为这种对话提供了新的",
  // questions 收尾家族（10 篇）
  "这个问题没有最终答案——这恰恰是它的价值所在",
  "当代科学和技术的发展为这个问题提供了新的视角和工具",
  "东方哲学传统——特别是佛教、道家和印度",
  // 各家族收尾的通用格言引用（无归属，纯填充）
  "概念不是固定的定义，而是不断生长的理解——它们在新的语境中获得新的生命",
  "哲学立场的生命力不在于它的永恒不变，而在于它能够不断回应新的时代问题",
  "真正的对话不是说服对方，而是在差异中发现共同的人类关切",
  "提出正确的问题比回答错误的问题更有智慧",
];

function isBoilerplate(paragraph) {
  return BOILERPLATE_SIGNATURES.some((sig) => paragraph.includes(sig));
}

// Split into blocks: headings (## ...), separators (---), blank, and prose
// paragraphs. We rebuild line-by-line, dropping boilerplate paragraphs.
function clean(content) {
  const lines = content.split("\n");
  const out = [];
  let i = 0;
  let removed = 0;
  while (i < lines.length) {
    const line = lines[i];
    // Accumulate a prose paragraph (maximal run of non-blank, non-heading lines)
    if (line.trim() !== "" && !line.startsWith("#") && line.trim() !== "---") {
      const para = [];
      let j = i;
      while (
        j < lines.length &&
        lines[j].trim() !== "" &&
        !lines[j].startsWith("#") &&
        lines[j].trim() !== "---"
      ) {
        para.push(lines[j]);
        j++;
      }
      const paraText = para.join("\n");
      if (isBoilerplate(paraText)) {
        removed++;
        i = j; // skip the whole paragraph
        continue;
      }
      out.push(...para);
      i = j;
      continue;
    }
    out.push(line);
    i++;
  }

  let text = out.join("\n");
  // Drop section headings (## / ### ...) whose body is now empty: a heading
  // immediately followed (ignoring blanks) by another heading, a `---`, or EOF.
  text = dropEmptyHeadings(text);
  // Collapse 3+ blank lines to a single blank line.
  text = text.replace(/\n{3,}/g, "\n\n");
  // Trim trailing whitespace/separators at EOF, keep one final newline.
  text = text.replace(/\s+$/, "") + "\n";
  return { text, removed };
}

function dropEmptyHeadings(text) {
  const lines = text.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isHeading = /^#{2,4}\s+/.test(line);
    if (isHeading) {
      // Look ahead past blank lines for the next meaningful line.
      let k = i + 1;
      while (k < lines.length && lines[k].trim() === "") k++;
      const next = k < lines.length ? lines[k] : null;
      const emptyBody =
        next === null || /^#{2,4}\s+/.test(next) || next.trim() === "---";
      if (emptyBody) continue; // drop this orphaned heading
    }
    out.push(line);
  }
  return out.join("\n");
}

const files = execSync("find content -name '*.md' -o -name '*.mdx'", {
  encoding: "utf8",
  cwd: process.cwd(),
})
  .trim()
  .split("\n")
  .filter(Boolean);

let totalRemoved = 0;
let changedFiles = 0;
for (const file of files) {
  const before = readFileSync(file, "utf8");
  // Only touch files that actually contain boilerplate — skip cosmetic-only
  // whitespace normalization on the rest of the corpus.
  if (!BOILERPLATE_SIGNATURES.some((sig) => before.includes(sig))) continue;
  const { text: after, removed } = clean(before);
  if (after !== before) {
    changedFiles++;
    totalRemoved += removed;
    if (APPLY) {
      writeFileSync(file, after);
    } else {
      console.log(`${file}  (−${removed} para)`);
    }
  }
}
console.log(
  `\n${APPLY ? "APPLIED" : "DRY-RUN"}: ${changedFiles} files, ${totalRemoved} boilerplate paragraphs removed.`
);
