/**
 * 碎片化正文检测：找出「单句成段」比例过高的文章——读起来像 PPT 要点而非散文。
 * 这是对 `叙事与引用规范.md`「句号后该换段就换段」的过度矫正，与 check-content
 * 已捕获的 run-on sentences 恰好相反，机器此前无覆盖。
 *
 * 用法：node scripts/audit-fragmented-prose.mjs
 *
 * ⚠️ 已知误报（并入 check-content 前必须先修）：公式/代码/表格的**引导句**必须
 * 短且独立成段（如「运动方程：」「把渐进复杂度摆在一起看：」），本脚本会把它们
 * 计为碎片。修法：排除紧跟 `$$` / 围栏代码 / 表格 / 列表的段落。
 * 详见 docs/任务清单.md 的 T-CONTENT-37。
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
for(const f of walk('content')){
  const body=readFileSync(f,'utf8').replace(/^---[\s\S]*?\n---\n/,'')
  const blocks=body.split(/\n\s*\n/).map(b=>b.trim()).filter(Boolean)
  // 只看散文段：排除标题/列表/表格/代码/公式/引用块
  const prose=blocks.map((b,i)=>[b,i]).filter(([b])=>/[一-鿿]/.test(b) && !/^[#>|\-*\d`$]/.test(b) && !b.includes('|'))
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
