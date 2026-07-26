/**
 * 丢失小节标题检测：对比 HEAD，列出工作树里**消失了的** `##`–`####` 标题。
 *
 * 存在理由：用 Edit 往某个 `## 标题` 前插入内容时，很容易把锚点标题本身吃掉，
 * 而 check-content 不查这个——2026-07-25 靠它抓到两次这类失误。任何批量改内容
 * 之后都值得跑一遍；输出里的「有意改名」需人工确认。
 *
 * 用法：node scripts/audit-lost-headings.mjs
 * 注：`## 参考文献`/`## 延伸阅读` 一类书目标题的改名已被忽略（属正常归位）。
 */
import { execSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
const files=execSync("git diff --name-only -- content/").toString().trim().split("\n").filter(Boolean)
let bad=0
for(const f of files){
  if(!existsSync(f)) continue
  let old
  try{ old=execSync(`git show HEAD:"${f}"`,{maxBuffer:1e8}).toString() }catch{ continue }
  const H=s=>new Set([...s.matchAll(/^(#{2,4})\s+(.+?)\s*$/gm)].map(m=>m[2].trim()))
  const before=H(old), after=H(readFileSync(f,'utf8'))
  const lost=[...before].filter(h=>!after.has(h))
    // citation-heading rename is intentional (task #2)
    .filter(h=>!/^(延伸阅读|进一步阅读|推荐阅读|参考资料|参考书目|参考来源|References?|Further Reading)$/i.test(h))
  if(lost.length){ console.log(`\n${f}`); lost.forEach(h=>console.log(`   LOST: ## ${h}`)); bad+=lost.length }
}
console.log(bad?`\n${bad} heading(s) lost`:"\nno headings lost")
