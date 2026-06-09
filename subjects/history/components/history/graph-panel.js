import { el } from '../../lib/dom.js';
import { ERAS, FIGURE_RELATIONS, FIGURE_EVENT_LINKS, RELATION_LABELS, RELATION_COLORS, formatYear } from '@/content/human-history/data/index.js';
import { getFigureDates } from '../../features/figures/figure-model.js';
import { renderReferences } from '../../lib/references.js';
import { hasScholarlyDetail, openScholarlyModal } from './scholarly-modal.js';
import { getSimulationId } from '../../lib/simulation-links.js';
import { escapeHtml } from '../../lib/escape-html';

export function renderFigureDetail(panel, figure, nodes, onSelectNode) {
  const f = figure;
  const relations = FIGURE_RELATIONS.filter(r => r.source === f.name || r.target === f.name);
  const eventLinks = FIGURE_EVENT_LINKS.filter(l => l.figure === f.name);

  const head = el('div', { class: 'gp-head' });
  head.innerHTML = `<div class="gp-avatar">${escapeHtml(f.name[0])}</div><div><div class="gp-name">${escapeHtml(f.name)}</div><div class="gp-title">${escapeHtml(f.title)}</div><div class="gp-dates">${escapeHtml(getFigureDates(f))}</div></div>`;
  panel.appendChild(head);

  const desc = el('p', { class: 'gp-desc' });
  desc.textContent = f.desc;
  panel.appendChild(desc);

  if (f.longDesc) {
    const longDesc = el('div', { class: 'gp-long-desc' });
    longDesc.innerHTML = f.longDesc.split('\n\n').map(p => `<p>${escapeHtml(p)}</p>`).join('');
    panel.appendChild(longDesc);
  }

  if (f.quote) {
    const quote = el('blockquote', { class: 'gp-quote' });
    quote.textContent = `"${f.quote}"`;
    panel.appendChild(quote);
  }

  if (f.impact?.length) {
    const sec = el('div', { class: 'gp-section' });
    sec.innerHTML = '<div class="gp-section-title">历史影响</div>';
    const tags = el('div', { class: 'gp-tags' });
    for (const item of f.impact) tags.appendChild(el('span', { class: 'gp-tag' }, item));
    sec.appendChild(tags);
    panel.appendChild(sec);
  }

  if (f.achievements?.length) {
    const sec = el('div', { class: 'gp-section' });
    sec.innerHTML = '<div class="gp-section-title">主要成就</div>';
    const list = el('div', { class: 'gp-ach-list' });
    for (const item of f.achievements) { const d = el('div', { class: 'gp-ach-item' }); d.innerHTML = `<span class="gp-ach-dot"></span>${escapeHtml(item)}`; list.appendChild(d); }
    sec.appendChild(list);
    panel.appendChild(sec);
  }

  if (f.controversies?.length) {
    const sec = el('div', { class: 'gp-section' });
    sec.innerHTML = '<div class="gp-section-title">争议与反思</div>';
    const list = el('div', { class: 'gp-cont-list' });
    for (const item of f.controversies) { const d = el('div', { class: 'gp-cont-item' }); d.innerHTML = `<span class="gp-cont-icon">⚖</span>${escapeHtml(item)}`; list.appendChild(d); }
    sec.appendChild(list);
    panel.appendChild(sec);
  }

  if (f.keyEvents?.length) {
    const sec = el('div', { class: 'gp-section' });
    sec.innerHTML = '<div class="gp-section-title">生平大事</div>';
    const list = el('div', { class: 'gp-ke-list' });
    for (const ev of f.keyEvents) { const d = el('div', { class: 'gp-ke-item' }); d.innerHTML = `<span class="gp-ke-year">${escapeHtml(ev.year < 0 ? '前' + Math.abs(ev.year) : String(ev.year))}</span><span class="gp-ke-dot"></span><span class="gp-ke-title">${escapeHtml(ev.title)}</span>`; list.appendChild(d); }
    sec.appendChild(list);
    panel.appendChild(sec);
  }

  if (relations.length > 0) {
    const sec = el('div', { class: 'gp-section' });
    sec.innerHTML = '<div class="gp-section-title">人物关联</div>';
    const list = el('div', { class: 'gp-rel-list' });
    for (const rel of relations) {
      const other = rel.source === f.name ? rel.target : rel.source;
      const item = el('div', { class: 'gp-rel-item' });
      const color = RELATION_COLORS[rel.type] || '#c8a951';
      item.innerHTML = `<span class="gp-rel-badge" style="background:${color}20;color:${color};border:1px solid ${color}40">${escapeHtml(RELATION_LABELS[rel.type] || rel.type)}</span><span class="gp-rel-name">${escapeHtml(other)}</span><span class="gp-rel-desc">${escapeHtml(rel.desc || '')}</span>`;
      item.addEventListener('click', () => { const t = nodes.find(n => n.type === 'figure' && n.label === other); if (t) onSelectNode(t); });
      list.appendChild(item);
    }
    sec.appendChild(list);
    panel.appendChild(sec);
  }

  if (eventLinks.length > 0) {
    const sec = el('div', { class: 'gp-section' });
    sec.innerHTML = '<div class="gp-section-title">关联事件</div>';
    const list = el('div', { class: 'gp-ev-list' });
    for (const link of eventLinks) list.appendChild(el('div', { class: 'gp-ev-item' }, link.eventTitle));
    sec.appendChild(list);
    panel.appendChild(sec);
  }

  if (f.references?.length) {
    const refHtml = renderReferences(f.references);
    if (refHtml) {
      const refContainer = el('div', { class: 'gp-section' });
      refContainer.innerHTML = refHtml;
      panel.appendChild(refContainer);
    }
  }
}

export function renderEventDetail(panel, ev, nodes, onSelectNode) {
  const head = el('div', { class: 'gp-head' });
  head.innerHTML = `<div class="gp-name" style="font-size:1.1rem">${escapeHtml(ev.title)}</div><div class="gp-dates" style="color:var(--gold)">${escapeHtml(formatYear(ev.year))}</div>`;
  panel.appendChild(head);

  const desc = el('p', { class: 'gp-desc' });
  desc.textContent = ev.desc;
  panel.appendChild(desc);

  if (ev.longDesc) {
    const longDesc = el('div', { class: 'gp-long-desc' });
    longDesc.innerHTML = ev.longDesc.split('\n\n').map(p => `<p>${escapeHtml(p)}</p>`).join('');
    panel.appendChild(longDesc);
  }

  if (hasScholarlyDetail(ev.title)) {
    const btn = el('button', { class: 'scholarly-btn gp-scholarly-btn' });
    btn.innerHTML = '📖 深度阅读讲稿';
    btn.addEventListener('click', () => openScholarlyModal(ev.title));
    panel.appendChild(btn);
  }

  const simId = getSimulationId(ev.title);
  if (simId) {
    const simBtn = el('a', { class: 'sim-link-btn gp-sim-link-btn', href: `/human-history/simulations?sim=${simId}` });
    simBtn.innerHTML = '🔮 历史模拟：如果……';
    panel.appendChild(simBtn);
  }

  const linkedFigures = FIGURE_EVENT_LINKS.filter(l => l.eventTitle === ev.title);
  if (linkedFigures.length > 0) {
    const sec = el('div', { class: 'gp-section' });
    sec.innerHTML = '<div class="gp-section-title">相关人物</div>';
    const list = el('div', { class: 'gp-rel-list' });
    for (const link of linkedFigures) {
      const item = el('div', { class: 'gp-rel-item' });
      item.innerHTML = `<span class="gp-rel-name">${escapeHtml(link.figure)}</span>`;
      item.addEventListener('click', () => { const t = nodes.find(n => n.type === 'figure' && n.label === link.figure); if (t) onSelectNode(t); });
      list.appendChild(item);
    }
    sec.appendChild(list);
    panel.appendChild(sec);
  }
}

export function renderEraDetail(panel, era) {
  const head = el('div', { class: 'gp-head' });
  head.innerHTML = `<div class="gp-name" style="font-size:1.1rem">${escapeHtml(era.name)}</div><div class="gp-dates" style="color:var(--gold)">${escapeHtml(formatYear(era.startYear))} — ${escapeHtml(formatYear(era.endYear))}</div>`;
  panel.appendChild(head);

  const desc = el('p', { class: 'gp-desc' });
  desc.textContent = era.desc;
  panel.appendChild(desc);

  if (era.highlights?.length) {
    const sec = el('div', { class: 'gp-section' });
    sec.innerHTML = '<div class="gp-section-title">时代特征</div>';
    const tags = el('div', { class: 'gp-tags' });
    for (const h of era.highlights) tags.appendChild(el('span', { class: 'gp-tag' }, h));
    sec.appendChild(tags);
    panel.appendChild(sec);
  }
}
