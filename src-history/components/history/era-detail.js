import { el } from '../../lib/dom.js';
import { renderReferences } from '../../lib/references.js';

export function createEraDetailPanel(era) {
  const panel = el('div', { class: 'era-detail-panel' });

  if (era.quote) {
    const quote = el('blockquote', { class: 'era-detail-quote' });
    quote.innerHTML = `${era.quote.text}<cite>——${era.quote.author}</cite>`;
    panel.appendChild(quote);
  }

  if (era.longDesc) {
    const desc = el('div', { class: 'era-detail-desc' });
    desc.innerHTML = era.longDesc.split('\n\n').map(p => `<p>${p}</p>`).join('');
    panel.appendChild(desc);
  }

  if (era.achievements?.length) {
    const sec = el('div', { class: 'era-detail-section' });
    sec.innerHTML = '<h4>文明成就</h4>';
    const list = el('div', { class: 'era-detail-tags' });
    for (const a of era.achievements) list.appendChild(el('span', { class: 'era-detail-tag' }, a));
    sec.appendChild(list);
    panel.appendChild(sec);
  }

  if (era.keyFigures?.length) {
    const sec = el('div', { class: 'era-detail-section' });
    sec.innerHTML = '<h4>关键人物</h4>';
    const list = el('div', { class: 'era-detail-tags' });
    for (const f of era.keyFigures) list.appendChild(el('span', { class: 'era-detail-tag era-tag-figure' }, f));
    sec.appendChild(list);
    panel.appendChild(sec);
  }

  if (era.legacy) {
    const sec = el('div', { class: 'era-detail-section' });
    sec.innerHTML = `<h4>历史遗产</h4><p class="era-detail-legacy">${era.legacy}</p>`;
    panel.appendChild(sec);
  }

  const refHtml = renderReferences(era.references);
  if (refHtml) {
    const refContainer = el('div');
    refContainer.innerHTML = refHtml;
    panel.appendChild(refContainer);
  }

  return panel;
}
