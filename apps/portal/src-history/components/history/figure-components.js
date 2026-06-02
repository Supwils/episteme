// @ts-nocheck
import { ERAS, FIGURES, FIGURE_RELATIONS, FIGURE_EVENT_LINKS, RELATION_LABELS, RELATION_COLORS, REGION_LABELS } from '../../data/index.js';
import { el } from '../../lib/dom.js';
import { DOMAIN_LABELS, getFigureDates, getFigureDomain, getFigureLifespan } from '../../features/figures/figure-model.js';
import { renderReferences } from '../../lib/references.js';

let activeModalCleanup = null;

function createEraTag(era) {
  if (!era) return '';
  return `<span class="tag" style="color:${era.color};border-color:${era.color}30;background:${era.color}10">${era.name}</span>`;
}

function createFigureTags(figure) {
  const era = ERAS.find(e => e.id === figure.era);
  const domain = getFigureDomain(figure);
  return `
    ${createEraTag(era)}
    <span class="tag">${REGION_LABELS[figure.region] || figure.region}</span>
    <span class="tag">${DOMAIN_LABELS[domain]}</span>
  `;
}

export function createFigureCard(figure, onSelect) {
  const card = el('button', { class: 'figure-card', type: 'button', onClick: () => onSelect(figure) });
  const relCount = FIGURE_RELATIONS.filter(r => r.source === figure.name || r.target === figure.name).length;
  const evCount = FIGURE_EVENT_LINKS.filter(l => l.figure === figure.name).length;
  const paraCount = (figure.longDesc || '').split('\n\n').filter(Boolean).length;
  const readMins = Math.max(2, paraCount * 2);
  card.innerHTML = `
    <div class="figure-head">
      <div class="figure-avatar">${figure.name[0]}</div>
      <div>
        <div class="figure-name">${figure.name}</div>
        <div class="figure-title-text">${figure.title}</div>
        <div class="figure-dates">${getFigureDates(figure)}</div>
      </div>
    </div>
    <p class="figure-desc">${figure.desc}</p>
    ${figure.quote ? `<p class="figure-card-quote">"${figure.quote}"</p>` : ''}
    <div class="figure-meta-row">${createFigureTags(figure)}</div>
    ${figure.impact?.length ? `<div class="figure-impact-inline">${figure.impact.slice(0, 3).map(item => `<span>${item}</span>`).join('')}</div>` : ''}
    <div class="figure-card-foot">
      ${paraCount >= 3 ? `<span class="figure-depth-badge">${paraCount}段传记 · 约${readMins}分钟</span>` : ''}
      ${relCount > 0 || evCount > 0 ? `<span class="figure-network-hint">${relCount ? relCount + '个人物关联' : ''}${relCount && evCount ? ' · ' : ''}${evCount ? evCount + '个事件' : ''}</span>` : ''}
    </div>`;
  return card;
}

function createRelatedFiguresSection(figure) {
  const relations = FIGURE_RELATIONS.filter(r => r.source === figure.name || r.target === figure.name);
  if (relations.length === 0) return '';

  const items = relations.map(rel => {
    const other = rel.source === figure.name ? rel.target : rel.source;
    const color = RELATION_COLORS[rel.type] || '#c8a951';
    return `<div class="fm-rel-item" data-figure="${other}">
      <span class="fm-rel-badge" style="background:${color}20;color:${color};border:1px solid ${color}40">${RELATION_LABELS[rel.type] || rel.type}</span>
      <span class="fm-rel-name">${other}</span>
      <span class="fm-rel-desc">${rel.desc || ''}</span>
    </div>`;
  }).join('');

  return `<div class="fm-section"><div class="fm-section-title">人物关联网络</div><div class="fm-rel-list">${items}</div></div>`;
}

function createEventLinksSection(figure) {
  const links = FIGURE_EVENT_LINKS.filter(l => l.figure === figure.name);
  if (links.length === 0) return '';

  const items = links.map(link => `<div class="fm-ev-item">${link.eventTitle}</div>`).join('');
  return `<div class="fm-section"><div class="fm-section-title">关联历史事件</div><div class="fm-ev-list">${items}</div></div>`;
}

function createFigureTimeline(figure) {
  const era = ERAS.find(e => e.id === figure.era);
  if (!era) return '';

  const lifespan = figure.death != null ? figure.death - figure.birth : 2025 - figure.birth;
  const eraStart = era.startYear;
  const eraEnd = era.endYear;
  const eraSpan = eraEnd - eraStart;

  if (eraSpan <= 0) return '';

  const birthPct = Math.max(0, Math.min(100, ((figure.birth - eraStart) / eraSpan) * 100));
  const deathPct = figure.death != null ? Math.max(0, Math.min(100, ((figure.death - eraStart) / eraSpan) * 100)) : 100;

  return `
    <div class="fm-section">
      <div class="fm-section-title">在历史中的位置</div>
      <div class="fm-timeline">
        <div class="fm-tl-era" style="--era-color:${era.color}">
          <span class="fm-tl-era-name">${era.name}</span>
          <span class="fm-tl-era-range">${eraStart < 0 ? '前' + Math.abs(eraStart) : eraStart} — ${eraEnd < 0 ? '前' + Math.abs(eraEnd) : eraEnd}</span>
        </div>
        <div class="fm-tl-track">
          <div class="fm-tl-bar" style="left:${birthPct}%;width:${deathPct - birthPct}%;background:${era.color}40;border-color:${era.color}"></div>
          <div class="fm-tl-marker fm-tl-birth" style="left:${birthPct}%">
            <span class="fm-tl-dot" style="background:${era.color}"></span>
            <span class="fm-tl-label">${figure.birth < 0 ? '前' + Math.abs(figure.birth) : figure.birth} 出生</span>
          </div>
          ${figure.death != null ? `<div class="fm-tl-marker fm-tl-death" style="left:${deathPct}%">
            <span class="fm-tl-dot" style="background:${era.color}"></span>
            <span class="fm-tl-label">${figure.death < 0 ? '前' + Math.abs(figure.death) : figure.death} 逝世</span>
          </div>` : ''}
        </div>
      </div>
    </div>
  `;
}

function createAchievementsSection(figure) {
  const items = figure.achievements || [];
  if (items.length === 0) return '';
  return `<div class="fm-section"><div class="fm-section-title">主要成就</div><div class="fm-achievements">${items.map(item => `<div class="fm-ach-item"><span class="fm-ach-dot"></span>${item}</div>`).join('')}</div></div>`;
}

function createControversiesSection(figure) {
  const items = figure.controversies || [];
  if (items.length === 0) return '';
  return `<div class="fm-section"><div class="fm-section-title">争议与反思</div><div class="fm-controversies">${items.map(item => `<div class="fm-cont-item"><span class="fm-cont-icon">⚖</span>${item}</div>`).join('')}</div></div>`;
}

function createKeyEventsSection(figure) {
  const events = figure.keyEvents || [];
  if (events.length === 0) return '';
  return `<div class="fm-section"><div class="fm-section-title">生平大事年表</div><div class="fm-key-events">${events.map(ev => `<div class="fm-ke-item"><span class="fm-ke-year">${ev.year < 0 ? '前' + Math.abs(ev.year) : ev.year}</span><span class="fm-ke-dot"></span><span class="fm-ke-title">${ev.title}</span></div>`).join('')}</div></div>`;
}

function formatLongDesc(text) {
  if (!text) return '';
  return text.split('\n\n').map(p => `<p class="fm-paragraph">${p}</p>`).join('');
}

export function openFigureModal(figure) {
  cleanupFigureModal();

  const overlay = el('div', { class: 'modal-overlay' });
  const impactItems = figure.impact || [];
  overlay.innerHTML = `
    <div class="modal-card figure-modal-card figure-modal-enhanced" role="dialog" aria-modal="true" aria-label="${figure.name} · ${figure.title}">
      <div class="figure-modal-head">
        <div class="figure-avatar figure-modal-avatar">${figure.name[0]}</div>
        <div class="figure-modal-id">
          <div class="figure-name">${figure.name}</div>
          <div class="figure-title-text">${figure.title}</div>
          <div class="figure-dates">${getFigureDates(figure)} · ${getFigureLifespan(figure)}</div>
        </div>
        <button class="modal-close" aria-label="关闭">✕</button>
      </div>
      <div class="figure-modal-tags">${createFigureTags(figure)}</div>
      ${createFigureTimeline(figure)}
      <div class="figure-modal-desc">${formatLongDesc(figure.longDesc) || figure.desc}</div>
      ${createAchievementsSection(figure)}
      ${impactItems.length ? `<div class="fm-section"><div class="fm-section-title">历史影响</div><div class="figure-impact-list">${impactItems.map(item => `<span>${item}</span>`).join('')}</div></div>` : ''}
      ${figure.quote ? `<blockquote class="figure-quote">"${figure.quote}"</blockquote>` : ''}
      ${createControversiesSection(figure)}
      ${createKeyEventsSection(figure)}
      ${createRelatedFiguresSection(figure)}
      ${createEventLinksSection(figure)}
      ${renderReferences(figure.references)}
    </div>
  `;

  const close = () => cleanupFigureModal();
  const onOverlayClick = (event) => {
    if (event.target === overlay) close();
    const relItem = event.target.closest('.fm-rel-item');
    if (relItem) {
      const figName = relItem.dataset.figure;
      const targetFigure = FIGURES.find(f => f.name === figName);
      if (targetFigure) {
        close();
        requestAnimationFrame(() => openFigureModal(targetFigure));
      }
    }
  };
  const onKeydown = (event) => { if (event.key === 'Escape') close(); };

  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onKeydown);
  document.body.appendChild(overlay);

  activeModalCleanup = () => {
    document.removeEventListener('keydown', onKeydown);
    overlay.removeEventListener('click', onOverlayClick);
    overlay.remove();
    activeModalCleanup = null;
  };

  requestAnimationFrame(() => {
    overlay.classList.add('open');
    overlay.querySelector('.modal-close')?.focus();
  });
}

export function cleanupFigureModal() {
  if (activeModalCleanup) activeModalCleanup();
  const staleOverlay = document.querySelector('.modal-overlay');
  if (staleOverlay) staleOverlay.remove();
}
