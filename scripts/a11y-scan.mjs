import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const BASE = process.env.SCAN_BASE || 'http://localhost:3067';
const PAGES = [
  ['portal','/'],
  ['earth plate-boundaries','/earth-science/concepts/plate-boundaries'],
  ['poli compass','/political-science/concepts/ideology'],
  ['philosophy','/philosophy/thinkers/socrates'],
  ['species','/life-science/species/octopus'],
  ['frontier','/computer-science/frontier/large-language-models'],
];
for(let i=0;i<40;i++){ try{ const r=await fetch(BASE); if(r.ok) break; }catch{} await new Promise(r=>setTimeout(r,2000)); }
const browser = await chromium.launch();
const seen = {};
for(const [name,path] of PAGES){
  const context = await browser.newContext(); const page = await context.newPage();
  await page.goto(BASE+path,{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(1500);
  const r = await new AxeBuilder({page}).exclude("header").exclude(".domain-card").withTags(['wcag2a','wcag2aa']).analyze();
  const ser = r.violations.filter(v=>v.impact==='serious'||v.impact==='critical');
  console.log(`\n### ${name}: ${ser.length} serious/critical`);
  for(const v of ser){ console.log(`  [${v.impact}] ${v.id}: ${v.help} ×${v.nodes.length}`); console.log(`     e.g. ${(v.nodes[0]?.html||'').slice(0,110)}`); seen[v.id]=(seen[v.id]||0)+v.nodes.length; }
  await page.close();
}
console.log('\n=== 汇总 ===');
for(const [k,n] of Object.entries(seen)) console.log(`  ${k}: ${n} nodes`);
await browser.close();
