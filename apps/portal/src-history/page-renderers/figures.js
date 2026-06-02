import { ERAS, FIGURES, REGION_LABELS } from '../data/index.js';
import { el, clearApp, animateIn, prefersReducedMotion } from '../lib/dom.js';
import { createEmptyState, createPageHeader, createSegmentButton, createStatCard } from '../components/common/ui.js';
import { cleanupFigureModal, createFigureCard, openFigureModal } from '../components/history/figure-components.js';
import { DOMAIN_LABELS, getFilteredFigures, getFigureDomain } from '../features/figures/figure-model.js';
import { getQuery } from '../lib/router.js';

let selectedRegion = 'all';
let selectedEra = 'all';
let selectedDomain = 'all';
let query = '';
let sortMode = 'birth';

function resetFigureState() {
  selectedRegion = 'all';
  selectedEra = 'all';
  selectedDomain = 'all';
  query = '';
  sortMode = 'birth';
}

function makeFigureSegment(label, value, current, onClick) {
  return createSegmentButton({
    label,
    value,
    current,
    className: 'figure-seg',
    onClick,
  });
}

function createSortSelect(onChange) {
  const sort = el('select', { class: 'figure-sort', 'aria-label': '排序方式' });
  sort.innerHTML = `
    <option value="birth">按出生年代</option>
    <option value="name">按姓名</option>
    <option value="region">按地区</option>
    <option value="domain">按领域</option>
  `;
  sort.addEventListener('change', () => onChange(sort.value));
  return sort;
}

export function renderFigures() {
  const app = clearApp();
  resetFigureState();
  cleanupFigureModal();

  const page = el('div', { class: 'figures-page' });
  // Use the live FIGURES count so the header stays accurate as data changes.
  page.appendChild(createPageHeader('历史人物', `${FIGURES.length}位塑造文明进程的人物——五段传记、争议反思、人物网络与事件关联，按地区与时代交叉浏览`));

  const stats = el('div', { class: 'figure-stats' });
  page.appendChild(stats);

  const controls = el('section', { class: 'figure-controls', 'aria-label': '人物筛选' });
  const search = el('input', {
    class: 'figure-search',
    type: 'search',
    placeholder: '搜索姓名、称号、影响、地区...',
    'aria-label': '搜索历史人物',
  });

  const rows = el('div', { class: 'figure-filter-rows' });
  const regionRow = el('div', { class: 'figure-segments' });
  const eraRow = el('div', { class: 'figure-segments' });
  const domainRow = el('div', { class: 'figure-segments' });

  rows.appendChild(regionRow);
  rows.appendChild(eraRow);
  rows.appendChild(domainRow);
  controls.appendChild(search);
  controls.appendChild(rows);
  controls.appendChild(createSortSelect(value => {
    sortMode = value;
    rebuild();
  }));
  page.appendChild(controls);

  const grid = el('div', { class: 'figures-grid' });
  page.appendChild(grid);
  app.appendChild(page);

  search.addEventListener('input', () => {
    query = search.value;
    rebuild();
  });

  function renderControlRows() {
    regionRow.innerHTML = '';
    eraRow.innerHTML = '';
    domainRow.innerHTML = '';

    const regions = ['all', ...new Set(FIGURES.map(f => f.region))];
    for (const region of regions) {
      regionRow.appendChild(makeFigureSegment(
        region === 'all' ? '全部地区' : REGION_LABELS[region] || region,
        region,
        selectedRegion,
        () => { selectedRegion = region; rebuild(); }
      ));
    }

    eraRow.appendChild(makeFigureSegment('全部时代', 'all', selectedEra, () => { selectedEra = 'all'; rebuild(); }));
    for (const era of ERAS) {
      if (FIGURES.some(f => f.era === era.id)) {
        eraRow.appendChild(makeFigureSegment(era.name, era.id, selectedEra, () => { selectedEra = era.id; rebuild(); }));
      }
    }

    for (const [domain, label] of Object.entries(DOMAIN_LABELS)) {
      if (domain === 'all' || FIGURES.some(f => getFigureDomain(f) === domain)) {
        domainRow.appendChild(makeFigureSegment(label, domain, selectedDomain, () => { selectedDomain = domain; rebuild(); }));
      }
    }
  }

  function rebuildStats(filtered) {
    stats.innerHTML = '';
    stats.appendChild(createStatCard('人物总数', FIGURES.length));
    stats.appendChild(createStatCard('当前结果', filtered.length));
    stats.appendChild(createStatCard('覆盖地区', new Set(filtered.map(f => f.region)).size));
    stats.appendChild(createStatCard('知识领域', new Set(filtered.map(getFigureDomain)).size));
  }

  function rebuild() {
    renderControlRows();
    const filtered = getFilteredFigures({ selectedRegion, selectedEra, selectedDomain, query, sortMode });
    rebuildStats(filtered);
    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.appendChild(createEmptyState('没有匹配的人物', '调整搜索词或筛选条件后再试。', 'figures-empty'));
      return;
    }

    for (const figure of filtered) {
      grid.appendChild(createFigureCard(figure, openFigureModal));
    }

    if (!prefersReducedMotion()) {
      animateIn([...grid.children], { stagger: 0.04, y: 18 });
    }
  }

  rebuild();

  let highlightName = '';
  try { highlightName = sessionStorage.getItem('highlight-figure') || ''; sessionStorage.removeItem('highlight-figure'); } catch (e) {}
  if (!highlightName) {
    const q = getQuery();
    if (q.name) highlightName = q.name;
  }
  if (highlightName) {
    const target = FIGURES.find(f => f.name === highlightName);
    if (target) {
      search.value = highlightName;
      query = highlightName;
      rebuild();
      requestAnimationFrame(() => {
        const card = grid.querySelector('.figure-card');
        if (card) openFigureModal(target);
      });
    }
  }
}

export function cleanupFigures() {
  cleanupFigureModal();
}
