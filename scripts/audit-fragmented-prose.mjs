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
for(const f of walk('content')){
  const body=readFileSync(f,'utf8').replace(/^---[\s\S]*?\n---\n/,'')
  // prose paragraphs only: skip headings, lists, tables, code, math, blockquotes
  const paras=body.split(/\n\s*\n/).map(p=>p.trim()).filter(p=>p && !/^[#>|\-*\d`$]/.test(p) && !p.includes('|'))
  if(paras.length<8) continue
  const cjk=p=>(p.match(/[一-鿿]/g)||[]).length
  const short=paras.filter(p=>cjk(p)>0 && cjk(p)<40).length
  const ratio=short/paras.length
  if(ratio>0.6) rows.push({f,paras:paras.length,short,ratio})
}
rows.sort((a,b)=>b.ratio-a.ratio)
console.log(`碎片化段落文件（>60% 正文段落不足 40 汉字）：${rows.length}`)
const byDom={}
for(const r of rows){ const d=r.f.split('/')[1]; byDom[d]=(byDom[d]||0)+1 }
console.log(byDom)
for(const r of rows.slice(0,15)) console.log(`  ${(r.ratio*100).toFixed(0)}%  ${r.short}/${r.paras}  ${r.f}`)
