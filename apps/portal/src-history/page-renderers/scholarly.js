import { SCHOLARLY_DETAILS } from '@/content/human-history/data/scholarly-index.js';
import { ERAS, EVENTS, formatYear } from '@/content/human-history/data/index.js';
import { el, clearApp, animateOnScroll, prefersReducedMotion } from '../lib/dom.js';
import { openScholarlyModal, cleanupScholarlyModal } from '../components/history/scholarly-modal.js';

export function renderScholarly() {
  const app = clearApp();

  const page = el('div', { class: 'scholarly-page' });

  const header = el('div', { class: 'scholarly-header' });
  header.innerHTML = `
    <h1 class="section-title">深度<em>讲稿</em></h1>
    <p class="section-sub">80篇顶级教授讲课式的历史解读——有现场感、有结构、有争议意识、有跨区域连接。每篇包含5个讲稿页面、4条事实卡和核心引言。</p>
  `;
  page.appendChild(header);

  const stats = el('div', { class: 'scholarly-stats' });
  const keys = Object.keys(SCHOLARLY_DETAILS);
  const totalPages = keys.reduce((sum, k) => sum + (SCHOLARLY_DETAILS[k].pages?.length || 0), 0);
  stats.innerHTML = `
    <div class="ls-stat"><strong>${keys.length}</strong><span>深度讲稿</span></div>
    <div class="ls-stat"><strong>${totalPages}</strong><span>讲稿页面</span></div>
    <div class="ls-stat"><strong>${keys.length * 4}</strong><span>事实卡</span></div>
  `;
  page.appendChild(stats);

  const grid = el('div', { class: 'scholarly-grid' });
  for (const title of keys) {
    const data = SCHOLARLY_DETAILS[title];
    const ev = EVENTS.find(e => e.title === title);
    const era = ev ? ERAS.find(e => e.id === ev.era) : null;

    const card = el('button', { class: 'scholarly-card', type: 'button' });
    card.innerHTML = `
      <div class="sch-card-head">
        <span class="sch-card-pages">${data.pages?.length || 0}页</span>
        ${era ? `<span class="sch-card-era" style="color:${era.color};border-color:${era.color}40;background:${era.color}10">${era.name}</span>` : ''}
        ${ev ? `<span class="sch-card-year">${formatYear(ev.year)}</span>` : ''}
      </div>
      <h3 class="sch-card-title">${title}</h3>
      ${data.quote ? `<p class="sch-card-quote">"${data.quote.text}"</p>` : ''}
      ${data.facts?.length ? `<div class="sch-card-facts">${data.facts.slice(0, 2).map(f => `<span class="sch-card-fact">${f}</span>`).join('')}</div>` : ''}
    `;
    card.addEventListener('click', () => openScholarlyModal(title));
    grid.appendChild(card);
  }
  page.appendChild(grid);

  app.appendChild(page);

  if (!prefersReducedMotion()) {
    animateOnScroll(page, '.scholarly-card');
  }
}

export function cleanupScholarly() {
  // Modal is appended to document.body, so clearApp() does not remove it;
  // close it (and detach its keydown listener) when leaving the page.
  cleanupScholarlyModal();
}
