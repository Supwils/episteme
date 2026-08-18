/**
 * 碎片化正文检测：找出「单句成段」比例过高的文章——读起来像 PPT 要点而非散文。
 * 这是对 `叙事与引用规范.md`「句号后该换段就换段」的过度矫正，与 check-content
 * 已捕获的 run-on sentences 恰好相反，机器此前无覆盖。
 *
 * 用法：node scripts/audit-fragmented-prose.mjs
 *
 * 已排除的误报类别（勿回退）：
 * 1. 引导句：短段若其后紧跟公式块 / 围栏代码 / 表格 / 列表 / 引用块，它是这些块的
 *    引导句——必须短且独立成段，不是碎片（isBlockLead）。
 * 2. human-history KB 的「第N页」格式中，每页开头有一行 `标题：……` 副题，
 *    属格式约定而非碎片。
 * 3. human-history KB 根的 6 篇编辑元文档（索引/内容深度规范/项目规划/开发规范/
 *    工程守则/审校工作台）是内部文档而非知识文章，跳过（其公开渲染问题另案处理）。
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
const walk=(d,o=[])=>{for(const e of readdirSync(d)){const p=join(d,e),s=statSync(p);if(s.isDirectory())walk(p,o);else if(/\.mdx?$/.test(e)&&!/narration/.test(e))o.push(p)}return o}
const rows=[]
const cjk=p=>(p.match(/[一-鿿]/g)||[]).length
// 引导句：短段若其**后**紧跟公式块 / 围栏代码 / 表格 / 列表 / 引用块，则它是这些块的
// 引导句——必须短且独立成段，不是碎片。这是本脚本此前最主要的误报来源。
const isBlockLead=next => next!==undefined &&
  (/^\$\$/.test(next) || /^```/.test(next) || /^\s*\|/.test(next) ||
   /^\s*(?:[-*+]|\d+\.)\s/.test(next) || /^>/.test(next))
// human-history KB 的编辑元文档（内部文档，非知识文章）
const META_DOC=/human-history\/knowledge-base\/(索引|内容深度规范|项目规划|开发规范|工程守则|审校工作台)\.md$/
for(const f of walk('content')){
  if(META_DOC.test(f)) continue
  const body=readFileSync(f,'utf8').replace(/^---[\s\S]*?\n---\n/,'')
  const blocks=body.split(/\n\s*\n/).map(b=>b.trim()).filter(Boolean)
  // 只看散文段：排除标题/列表/表格/代码/公式/引用块/脚注定义，以及 human-history「第N页」格式的 `标题：` 副题行
  const prose=blocks.map((b,i)=>[b,i]).filter(([b])=>/[一-鿿]/.test(b) && !/^[#>|\-*\d`$]/.test(b) && !/^\[\^/.test(b) && !b.includes('|') && !/^标题：/.test(b))
  if(prose.length<8) continue
  const short=prose.filter(([b,i])=>cjk(b)>0 && cjk(b)<40 && !isBlockLead(blocks[i+1])).length
  const ratio=short/prose.length
  if(ratio>0.6) rows.push({f,paras:prose.length,short,ratio})
}
rows.sort((a,b)=>b.ratio-a.ratio)
console.log(`碎片化段落文件（>60% 正文段落不足 40 汉字）：${rows.length}`)
const byDom={}
for(const r of rows){ const d=r.f.split('/')[1]; byDom[d]=(byDom[d]||0)+1 }
console.log(byDom)
for(const r of rows.slice(0,15)) console.log(`  ${(r.ratio*100).toFixed(0)}%  ${r.short}/${r.paras}  ${r.f}`)
