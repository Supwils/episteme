import { gsap } from 'gsap';
import { ERAS } from '@/content/human-history/data/eras.js';
import { TIMELINE_EVENT_CATALOG } from '@/content/human-history/data/generated/timeline-catalog.js';
import { SCHOLARLY_TITLES } from '@/content/human-history/data/scholarly-titles.js';
import { el, clearApp, animateIn, prefersReducedMotion } from '../lib/dom.js';
import { openScholarlyModal, hasScholarlyDetail, cleanupScholarlyModal } from '../components/history/scholarly-modal.js';
import { addSwipeGesture } from '../lib/gesture.js';
import { getQuery } from '../lib/router.js';
import { getReadingProgress, clearReadingProgress, estimateReadMinutes, saveReadingProgress } from '../lib/reading-progress.js';
import { getSimulationId } from '../lib/simulation-links.js';
import { loadTimelineDetail } from '../lib/timeline-detail-loader';
import { icon, DETAIL_ICONS, CAT_ICONS } from '../lib/icons.js';
import { escapeHtml } from '../lib/escape-html';

const CAT_LABELS = {
  politics: '政治',
  military: '军事',
  economy: '经济',
  culture: '文化',
  science: '科技',
  technology: '技术',
};

const CAT_COLORS = {
  politics: '#C8A951',
  military: '#8B1A1A',
  economy: '#2D6A4F',
  culture: '#1E3A5F',
  science: '#4A148C',
  technology: '#8B4513',
};

const REGION_LABELS = {
  asia: '亚洲',
  europe: '欧洲',
  africa: '非洲',
  americas: '美洲',
  oceania: '大洋洲',
  global: '全球',
};

function formatYear(year) {
  if (year <= -10000) return `约${Math.abs(year).toLocaleString()}年前`;
  if (year < 0) return `公元前${Math.abs(year)}年`;
  if (year === 0) return '公元元年';
  return `公元${year}年`;
}

const ALL_EVENTS = TIMELINE_EVENT_CATALOG;

const REGION_TABS = [
  { id: 'all', name: '全部', color: '#c8a951', icon: 'mdi:earth' },
  { id: 'asia', name: '亚洲', color: '#C8A951', icon: 'mdi:terrain' },
  { id: 'europe', name: '欧洲', color: '#1E3A5F', icon: 'mdi:pillar' },
  { id: 'africa', name: '非洲', color: '#8B4513', icon: 'mdi:globe-model' },
  { id: 'americas', name: '美洲', color: '#2D6A4F', icon: 'mdi:statue-liberty' },
  { id: 'global', name: '全球', color: '#4A148C', icon: 'mdi:earth' },
];

let expandedTitle = null;
let currentPage = 0;
let activeEraFilter = null;
let searchQuery = '';
let detailOnly = false;
const activeRegionPerEra = {};
let _swipeCleanup = null;
let detailRequestId = 0;

// ============================================================
//  PAGINATED DETAIL CARD
// ============================================================
function renderPaginatedCard(ev, record) {
  const detail = record?.detail;
  const catColor = CAT_COLORS[ev.cat] || '#c8a951';
  const era = ERAS.find(r => r.id === ev.era);

  const pages = detail?.pages || [{ title: ev.title, body: record?.longDesc || ev.desc }];
  const hasFacts = detail?.facts && detail.facts.length > 0;
  const hasQuote = !!detail?.quote;
  const totalPages = pages.length + (hasFacts ? 1 : 0) + (hasQuote ? 1 : 0);

  function buildPage(idx) {
    if (idx < pages.length) {
      const p = pages[idx];
      return `<h3 class="pc-page-title">${escapeHtml(p.title)}</h3><div class="pc-page-body">${escapeHtml(p.body)}</div>`;
    }
    if (hasFacts && idx === pages.length) {
      return `<h3 class="pc-page-title">${icon(DETAIL_ICONS.facts, 16)} 鲜为人知的历史细节</h3>
        <div class="pc-facts-list">${detail.facts.map(f => `<div class="pc-fact">▸ ${escapeHtml(f)}</div>`).join('')}</div>`;
    }
    if (hasQuote && idx === totalPages - 1) {
      return `<h3 class="pc-page-title">${icon(DETAIL_ICONS.quote, 16)} 历史之声</h3>
        <blockquote class="pc-quote">"${escapeHtml(detail.quote.text)}"<cite>—— ${escapeHtml(detail.quote.author)}</cite></blockquote>`;
    }
    return '';
  }

  const card = el('div', { class: 'paginated-card' });
  card.innerHTML = `
    <div class="pc-header">
      <div class="pc-meta">
        <span class="tl-year">${formatYear(ev.year)}</span>
        <span class="tl-cat" style="color:${catColor};background:${catColor}15">${icon(CAT_ICONS[ev.cat] || 'mdi:tag', 12)} ${CAT_LABELS[ev.cat] || ev.cat}</span>
        <span class="tl-region">${REGION_LABELS[ev.region] || ev.region}</span>
        ${era ? `<span class="tag" style="color:${era.color};border-color:${era.color}30;background:${era.color}10;font-size:0.65rem">${escapeHtml(era.name)}</span>` : ''}
      </div>
      <div class="pc-title-row">
        <h2 class="pc-title">${escapeHtml(ev.title)}</h2>
        <button class="pc-close" aria-label="收起">${icon('mdi:close', 16)}</button>
      </div>
    </div>
    <div class="pc-body"><div class="pc-content">${buildPage(0)}</div></div>
    <div class="pc-footer">
      <button class="pc-nav pc-prev" disabled>${icon('mdi:chevron-left', 18)} 上一页</button>
      <div class="pc-dots"></div>
      <button class="pc-nav pc-next">${totalPages > 1 ? '下一页 ' + icon('mdi:chevron-right', 18) : ''}</button>
    </div>`;

  const dots = card.querySelector('.pc-dots');
  for (let i = 0; i < totalPages; i++) {
    const dot = el('button', { class: `pc-dot${i === 0 ? ' active' : ''}` });
    dot.addEventListener('click', () => goTo(i));
    dots.appendChild(dot);
  }

  const content = card.querySelector('.pc-content');
  const prev = card.querySelector('.pc-prev');
  const next = card.querySelector('.pc-next');

  function goTo(idx) {
    if (idx < 0 || idx >= totalPages || idx === currentPage) return;
    const old = currentPage;
    currentPage = idx;
    saveReadingProgress({ title: ev.title, page: idx, type: 'timeline' });
    const reduce = prefersReducedMotion();
    if (!reduce) {
      gsap.to(content, {
        opacity: 0, x: idx > old ? -20 : 20, duration: 0.15,
        onComplete: () => {
          content.innerHTML = buildPage(idx);
          gsap.fromTo(content, { opacity: 0, x: idx > old ? 20 : -20 }, { opacity: 1, x: 0, duration: 0.2 });
        },
      });
    } else {
      content.innerHTML = buildPage(idx);
    }
    prev.disabled = idx === 0;
    next.innerHTML = idx === totalPages - 1 ? '' : '下一页 ' + icon('mdi:chevron-right', 18);
    next.disabled = idx === totalPages - 1;
    dots.querySelectorAll('.pc-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  prev.addEventListener('click', () => goTo(currentPage - 1));
  next.addEventListener('click', () => goTo(currentPage + 1));
  card.querySelector('.pc-close').addEventListener('click', (e) => { e.stopPropagation(); collapseCard(); });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(currentPage - 1);
    if (e.key === 'ArrowRight') goTo(currentPage + 1);
    if (e.key === 'Escape') collapseCard();
  });
  return card;
}

function renderDetailLoadingCard(ev) {
  const card = el('div', { class: 'paginated-card timeline-detail-loading' });
  card.setAttribute('role', 'status');
  card.setAttribute('aria-live', 'polite');
  card.innerHTML = `
    <div class="pc-body" style="min-height:180px;display:grid;place-items:center">
      <div style="display:flex;align-items:center;gap:10px;color:var(--parchment-dim)">
        <span class="loading-spinner" aria-hidden="true"></span>
        <span>正在载入「${escapeHtml(ev.title)}」的时代资料…</span>
      </div>
    </div>`;
  return card;
}

function animateExpandedCard(card) {
  card.setAttribute('tabindex', '-1');
  card.focus();
  if (prefersReducedMotion()) return;
  card.style.willChange = 'height, opacity';
  gsap.fromTo(card, { height: 0, opacity: 0 }, {
    height: '55vh', opacity: 1, duration: 0.45, ease: 'power2.out',
    onComplete: () => { card.style.willChange = 'auto'; },
  });
  setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
}

function collapseCard() {
  detailRequestId += 1;
  const existing = document.querySelector('.paginated-card');
  if (existing) {
    const reduce = prefersReducedMotion();
    if (reduce) existing.remove();
    else {
      existing.style.willChange = 'height, opacity';
      gsap.to(existing, {
        height: 0, opacity: 0, duration: 0.3, ease: 'power2.in',
        onComplete: () => { existing.style.willChange = 'auto'; existing.remove(); },
      });
    }
  }
  expandedTitle = null;
  currentPage = 0;
  document.querySelectorAll('.tl-event.expanded').forEach(e => e.classList.remove('expanded'));
}

function eventMatchesGlobalFilters(ev) {
  if (detailOnly && !ev.hasDetail && !hasScholarlyDetail(ev.title)) return false;
  if (!searchQuery) return true;

  const haystack = [
    ev.title,
    ev.desc,
    CAT_LABELS[ev.cat],
    REGION_LABELS[ev.region],
    ERAS.find(era => era.id === ev.era)?.name,
  ].filter(Boolean).join(' ').toLowerCase();

  return haystack.includes(searchQuery.toLowerCase());
}

function scrollToHashTarget() {
  const raw = window.location.hash.replace('#', '');
  if (!raw) return;
  const target = document.getElementById(`era-${raw}`) || document.getElementById(raw);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openDeepLinkEvent(title, options = {}) {
  if (!title) return;
  const ev = ALL_EVENTS.find(e => e.title === title);
  if (!ev) return;
  const section = document.getElementById(`era-${ev.era}`);
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => {
    const eventEl = document.querySelector(`.tl-event[data-title="${CSS.escape(title)}"]`);
    if (!eventEl) return;
    if (options.scholarly && hasScholarlyDetail(title)) {
      openScholarlyModal(title);
      return;
    }
    expandCard(ev, eventEl);
  }, 320);
}

function buildContinueBanner() {
  const progress = getReadingProgress();
  if (!progress?.title) return null;
  const banner = el('div', { class: 'timeline-continue' });
  const label = progress.type === 'scholarly' ? '深度讲稿' : '时间线';
  banner.innerHTML = `
    <span>${icon('mdi:bookmark-outline', 16)} 继续阅读 · ${label}「${escapeHtml(progress.title)}」</span>
    <button type="button" class="timeline-continue-btn">继续</button>
    <button type="button" class="timeline-continue-dismiss" aria-label="清除">✕</button>
  `;
  banner.querySelector('.timeline-continue-btn').addEventListener('click', () => {
    if (progress.type === 'scholarly' && hasScholarlyDetail(progress.title)) {
      openScholarlyModal(progress.title);
      return;
    }
    openDeepLinkEvent(progress.title);
  });
  banner.querySelector('.timeline-continue-dismiss').addEventListener('click', () => {
    clearReadingProgress(progress.title);
    banner.remove();
  });
  return banner;
}

async function expandCard(ev, eventEl) {
  if (expandedTitle === ev.title) { collapseCard(); return; }
  collapseCard();
  expandedTitle = ev.title;
  currentPage = 0;
  const requestId = detailRequestId;
  eventEl.classList.add('expanded');
  const loadingCard = renderDetailLoadingCard(ev);
  eventEl.after(loadingCard);
  animateExpandedCard(loadingCard);

  try {
    const record = await loadTimelineDetail(ev.era, ev.title);
    if (
      requestId !== detailRequestId ||
      expandedTitle !== ev.title ||
      !loadingCard.isConnected
    ) return;
    const card = renderPaginatedCard(ev, record);
    gsap.killTweensOf(loadingCard);
    loadingCard.replaceWith(card);
    card.setAttribute('tabindex', '-1');
    card.focus();
  } catch {
    if (
      requestId !== detailRequestId ||
      expandedTitle !== ev.title ||
      !loadingCard.isConnected
    ) return;
    loadingCard.setAttribute('role', 'alert');
    loadingCard.innerHTML = `
      <div class="pc-body" style="min-height:180px;display:grid;place-items:center;text-align:center">
        <div>
          <p style="color:var(--parchment-dim);margin-bottom:12px">时代资料载入失败，请重试。</p>
          <button type="button" class="timeline-detail-retry">重新载入</button>
        </div>
      </div>`;
    loadingCard.querySelector('.timeline-detail-retry').addEventListener('click', () => {
      expandedTitle = null;
      void expandCard(ev, eventEl);
    });
  }
}

// ============================================================
//  YEAR SCRUBBER
// ============================================================
function buildScrubber() {
  const bar = el('div', { class: 'year-scrubber' });
  const track = el('div', { class: 'ys-track' });

  const totalSpan = ERAS[ERAS.length - 1].endYear - ERAS[0].startYear;

  for (const era of ERAS) {
    const span = era.endYear - era.startYear;
    const ratio = span / totalSpan;
    const seg = el('button', {
      class: 'ys-seg',
      style: `flex:${ratio};background:${era.color}30;border-color:${era.color}60`,
      title: `${era.name} (${formatYear(era.startYear)} - ${formatYear(era.endYear)})`,
    });
    seg.innerHTML = `<span class="ys-seg-label">${escapeHtml(era.name)}</span>`;
    seg.addEventListener('click', () => {
      const s = document.getElementById(`era-${era.id}`);
      if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    seg.addEventListener('mouseenter', () => seg.style.background = `${era.color}50`);
    seg.addEventListener('mouseleave', () => seg.style.background = `${era.color}30`);
    track.appendChild(seg);
  }

  const labels = el('div', { class: 'ys-labels' });
  for (const era of ERAS) {
    const lbl = el('span', { class: 'ys-label' });
    lbl.textContent = formatYear(era.startYear);
    lbl.style.flex = era.endYear - era.startYear;
    lbl.style.textAlign = 'center';
    labels.appendChild(lbl);
  }
  const finalLbl = el('span', { class: 'ys-label' });
  finalLbl.textContent = formatYear(ERAS[ERAS.length - 1].endYear);
  finalLbl.style.width = '0';
  finalLbl.style.overflow = 'visible';
  labels.appendChild(finalLbl);

  bar.appendChild(track);
  bar.appendChild(labels);
  return bar;
}

// ============================================================
//  EVENT CARD (single item in the vertical list)
// ============================================================
function renderEventCard(ev) {
  const hasDetail = ev.hasDetail;
  const pageCount = ev.detailPageCount;
  const readMins = hasDetail ? estimateReadMinutes(pageCount) : 0;
  const catColor = CAT_COLORS[ev.cat] || '#c8a951';
  const item = el('div', { class: `tl-event${hasDetail ? ' has-detail' : ''}` });
  item.dataset.title = ev.title;
  item.innerHTML = `
    <div class="tl-event-card">
      <div class="tl-meta">
        <span class="tl-year">${formatYear(ev.year)}</span>
        <span class="tl-cat" style="color:${catColor};background:${catColor}15">${icon(CAT_ICONS[ev.cat] || 'mdi:tag', 12)} ${CAT_LABELS[ev.cat] || ev.cat}</span>
        ${hasDetail ? `<span class="tl-has-detail-badge">${icon('mdi:book-open-page-variant', 10)} ${pageCount}页 · 约${readMins}分钟</span>` : ''}
      </div>
      <div class="tl-title">${escapeHtml(ev.title)}</div>
      <div class="tl-desc">${escapeHtml(ev.desc)}</div>
      ${hasDetail ? `<div class="tl-expand-hint">${icon(DETAIL_ICONS.expand, 14)} 点击展开详细历史</div>` : ''}
      ${hasScholarlyDetail(ev.title) ? `<button class="scholarly-btn" data-sch-title="${escapeHtml(ev.title)}">${icon('mdi:book-open-page-variant', 12)} 深度阅读讲稿</button>` : ''}
      ${getSimulationId(ev.title) ? `<a class="sim-link-btn" href="/human-history/simulations?sim=${getSimulationId(ev.title)}">${icon('mdi:flask-outline', 12)} 历史模拟：如果……</a>` : ''}
      <a class="event-detail-link" href="/human-history/events/${encodeURIComponent(ev.title)}" onclick="event.stopPropagation()">${icon('mdi:arrow-expand', 12)} 查看详情页</a>
    </div>`;
  item.style.setProperty('--dot-color', catColor);
  item.addEventListener('click', (e) => {
    if (e.target.closest('.scholarly-btn')) {
      e.stopPropagation();
      openScholarlyModal(e.target.closest('.scholarly-btn').dataset.schTitle);
      return;
    }
    if (e.target.closest('.sim-link-btn')) {
      e.stopPropagation();
      return;
    }
    if (e.target.closest('.event-detail-link')) {
      e.stopPropagation();
      return;
    }
    void expandCard(ev, item);
  });
  return item;
}

// ============================================================
//  REGION TABS for one era section
// ============================================================
function buildRegionTabs(eraId, events, trackContainer) {
  const tabs = el('div', { class: 'region-tabs' });

  const currentRegion = activeRegionPerEra[eraId] || 'all';

  for (const rt of REGION_TABS) {
    const count = rt.id === 'all' ? events.length : events.filter(e => e.region === rt.id).length;
    if (count === 0 && rt.id !== 'all') continue;

    const btn = el('button', {
      class: `region-tab${currentRegion === rt.id ? ' active' : ''}`,
    });
    btn.innerHTML = `${icon(rt.icon, 14)} ${rt.name} <span class="rt-count">${count}</span>`;
    if (currentRegion === rt.id) {
      btn.style.color = rt.color;
      btn.style.borderColor = rt.color;
      btn.style.background = `${rt.color}15`;
    }
    btn.addEventListener('click', () => {
      activeRegionPerEra[eraId] = rt.id;
      rebuildEraSection(eraId, events, trackContainer);
      tabs.querySelectorAll('.region-tab').forEach(b => {
        b.classList.remove('active');
        b.style.color = '';
        b.style.borderColor = '';
        b.style.background = '';
      });
      btn.classList.add('active');
      btn.style.color = rt.color;
      btn.style.borderColor = rt.color;
      btn.style.background = `${rt.color}15`;
    });
    tabs.appendChild(btn);
  }
  return tabs;
}

function rebuildEraSection(eraId, events, trackContainer) {
  collapseCard();
  trackContainer.innerHTML = '';
  const region = activeRegionPerEra[eraId] || 'all';
  const filtered = region === 'all' ? events : events.filter(e => e.region === region);

  if (filtered.length === 0) {
    trackContainer.innerHTML = `<div class="empty-state" style="padding:24px"><p style="color:var(--parchment-dim);font-size:0.85rem">该地区在此时期暂无事件记录</p></div>`;
    return;
  }

  for (const ev of filtered) {
    trackContainer.appendChild(renderEventCard(ev));
  }

  if (!prefersReducedMotion()) {
    animateIn(trackContainer.querySelectorAll('.tl-event'), { stagger: 0.03, y: 15 });
  }
}

// ============================================================
//  MAIN RENDER
// ============================================================
export function renderTimeline() {
  const app = clearApp();
  expandedTitle = null;
  currentPage = 0;
  activeEraFilter = null;
  searchQuery = '';
  detailOnly = false;
  for (const key of Object.keys(activeRegionPerEra)) delete activeRegionPerEra[key];

  const page = el('div', { class: 'timeline-page' });

  // Header
  const header = el('div', { style: { textAlign: 'center', marginBottom: '16px' } });
  header.innerHTML = `<h1 class="section-title">历史时间线</h1><p class="section-sub">从三十万年前智人诞生到公元2100年——选择地区探索并行的历史</p>`;
  page.appendChild(header);

  const continueBanner = buildContinueBanner();
  if (continueBanner) page.appendChild(continueBanner);

  const summary = el('div', { class: 'timeline-summary' });
  page.appendChild(summary);

  // Year scrubber
  page.appendChild(buildScrubber());

  // Era filter bar
  const filters = el('div', { class: 'timeline-filters' });
  filters.innerHTML = `<span class="filter-label">时期：</span>`;
  const allBtn = el('button', { class: 'filter-btn active', onClick: () => { activeEraFilter = null; renderAll(); } }, '全部');
  filters.appendChild(allBtn);
  for (const era of ERAS) {
    const btn = el('button', { class: 'filter-btn', onClick: () => {
      activeEraFilter = activeEraFilter === era.id ? null : era.id;
      renderAll();
    } }, era.name);
    filters.appendChild(btn);
  }
  page.appendChild(filters);

  const tools = el('div', { class: 'timeline-tools' });
  const search = el('label', { class: 'timeline-search' });
  search.innerHTML = `${icon('mdi:magnify', 16)} <input type="search" placeholder="搜索事件、地区、主题..." aria-label="搜索时间线事件">`;
  const searchInput = search.querySelector('input');
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.trim();
    renderAll();
  });

  const depthToggle = el('button', { class: 'filter-btn timeline-depth-toggle', type: 'button', 'aria-pressed': 'false' });
  depthToggle.innerHTML = `${icon('mdi:book-open-page-variant', 14)} 只看深度讲稿`;
  depthToggle.addEventListener('click', () => {
    detailOnly = !detailOnly;
    depthToggle.classList.toggle('active', detailOnly);
    depthToggle.setAttribute('aria-pressed', detailOnly ? 'true' : 'false');
    renderAll();
  });

  tools.appendChild(search);
  tools.appendChild(depthToggle);
  page.appendChild(tools);

  const container = el('div');
  page.appendChild(container);
  app.appendChild(page);

  const eraIds = [null, ...ERAS.map(e => e.id)];
  if (_swipeCleanup) { _swipeCleanup(); _swipeCleanup = null; }
  _swipeCleanup = addSwipeGesture(page, {
    onSwipeLeft: () => {
      const idx = eraIds.indexOf(activeEraFilter);
      const next = eraIds[(idx + 1) % eraIds.length];
      activeEraFilter = next;
      renderAll();
    },
    onSwipeRight: () => {
      const idx = eraIds.indexOf(activeEraFilter);
      const prev = eraIds[(idx - 1 + eraIds.length) % eraIds.length];
      activeEraFilter = prev;
      renderAll();
    },
  });

  function renderAll() {
    container.innerHTML = '';
    expandedTitle = null;

    const visibleEvents = ALL_EVENTS.filter(eventMatchesGlobalFilters);
    const visibleDetailed = visibleEvents.filter(
      ev => ev.hasDetail || hasScholarlyDetail(ev.title),
    ).length;
    const visibleRegions = new Set(visibleEvents.map(ev => ev.region)).size;
    summary.innerHTML = `
      <div><span>事件总量</span><strong>${visibleEvents.length}</strong></div>
      <div><span>深度讲稿</span><strong>${visibleDetailed}</strong></div>
      <div><span>覆盖地区</span><strong>${visibleRegions}</strong></div>
      <div><span>时间跨度</span><strong>${formatYear(ERAS[0].startYear)} - ${formatYear(ERAS[ERAS.length - 1].endYear)}</strong></div>
    `;

    // Update filter active states
    filters.querySelectorAll('.filter-btn').forEach(btn => {
      const text = btn.textContent;
      const isEra = ERAS.some(e => e.name === text);
      const isActive = (isEra && ERAS.find(e => e.name === text)?.id === activeEraFilter) || (text === '全部' && !activeEraFilter);
      btn.classList.toggle('active', isActive);
    });

    const grouped = ERAS.map(era => ({
      era,
      totalEvents: ALL_EVENTS.filter(e => e.era === era.id),
      events: visibleEvents.filter(e => e.era === era.id),
    })).filter(g => {
      if (activeEraFilter && g.era.id !== activeEraFilter) return false;
      return g.events.length > 0;
    });

    if (grouped.length === 0) {
      container.innerHTML = `<div class="empty-state timeline-empty"><h3>没有匹配的时间线事件</h3><p>尝试清空搜索词，或关闭“只看深度讲稿”。</p></div>`;
      return;
    }

    for (const { era, events, totalEvents } of grouped) {
      const section = el('div', { class: 'timeline-era-section', id: `era-${era.id}` });

      // Era header
      const head = el('div', { class: 'timeline-era-head' });
      head.innerHTML = `
        <div class="era-icon" style="background:${era.color}20;border:1px solid ${era.color}40">${icon(era.icon, 22)}</div>
        <div><h2>${escapeHtml(era.name)}</h2><span style="font-size:0.75rem;color:var(--parchment-dim)">${formatYear(era.startYear)} - ${formatYear(era.endYear)} · ${events.length}/${totalEvents.length}个事件</span></div>
        <div class="era-line" style="background:linear-gradient(90deg,${era.color}40,transparent)"></div>`;
      section.appendChild(head);

      // Era intro
      const intro = el('div', { class: 'tl-era-intro' });
      intro.innerHTML = `<p>${escapeHtml(era.desc)}</p>
        ${era.quote ? `<blockquote class="tl-era-quote">"${escapeHtml(era.quote.text)}"<cite>—— ${escapeHtml(era.quote.author)}</cite></blockquote>` : ''}`;
      section.appendChild(intro);

      // Region tabs
      const trackContainer = el('div', { class: 'timeline-track' });
      const tabs = buildRegionTabs(era.id, events, trackContainer);
      section.appendChild(tabs);
      section.appendChild(trackContainer);

      // Initial render with saved region or 'all'
      rebuildEraSection(era.id, events, trackContainer);

      container.appendChild(section);
    }
  }

  renderAll();
  setTimeout(scrollToHashTarget, 60);

  const q = getQuery();
  if (q.event) setTimeout(() => openDeepLinkEvent(q.event, { scholarly: q.mode === 'scholarly' }), 120);
  else {
    try {
      const pending = sessionStorage.getItem('open-timeline-event');
      const scholarlyFlag = sessionStorage.getItem('open-scholarly');
      if (pending) {
        sessionStorage.removeItem('open-timeline-event');
        sessionStorage.removeItem('open-scholarly');
        setTimeout(() => openDeepLinkEvent(pending, { scholarly: scholarlyFlag === pending }), 120);
      }
    } catch (e) {}
  }
}

export function cleanupTimeline() {
  detailRequestId += 1;
  if (_swipeCleanup) { _swipeCleanup(); _swipeCleanup = null; }
  cleanupScholarlyModal();
  // Kill all GSAP tweens to prevent height/opacity animations from leaking
  gsap.killTweensOf('*');
  expandedTitle = null;
  currentPage = 0;
  activeEraFilter = null;
  searchQuery = '';
  detailOnly = false;
  for (const key in activeRegionPerEra) delete activeRegionPerEra[key];
}
