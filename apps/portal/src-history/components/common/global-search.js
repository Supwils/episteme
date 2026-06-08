import { ERAS, EVENTS, FIGURES } from '@/content/human-history/data/index.js';
import { LESSONS } from '@/content/human-history/data/lessons.js';
import { ATLAS_ERAS } from '@/content/human-history/data/atlas-content.js';
import { SCHOLARLY_TITLES } from '@/content/human-history/data/scholarly-titles.js';
import { el } from '../../lib/dom.js';
import { escapeHtml } from '../../lib/escape-html';

let activeCleanup = null;

function buildIndex() {
  const items = [];

  for (const f of FIGURES) {
    items.push({
      type: '人物',
      label: f.name,
      sub: f.title,
      desc: f.desc,
      href: `/human-history/figures?name=${encodeURIComponent(f.name)}`,
      action: 'figure',
      target: f.name,
      search: `${f.name} ${f.title} ${f.desc} ${f.era} ${f.region}`,
    });
  }
  for (const ev of EVENTS) {
    items.push({
      type: '事件',
      label: ev.title,
      sub: `${ev.year < 0 ? '前' + Math.abs(ev.year) : ev.year}年`,
      desc: ev.desc,
      href: `/human-history/timeline?event=${encodeURIComponent(ev.title)}`,
      action: 'timeline',
      target: ev.title,
      search: `${ev.title} ${ev.desc} ${ev.era} ${ev.region} ${ev.cat}`,
    });
  }
  for (const title of SCHOLARLY_TITLES) {
    if (EVENTS.some(ev => ev.title === title)) continue;
    items.push({
      type: '深度',
      label: title,
      sub: '课堂讲稿',
      desc: '深度阅读 · 5页讲稿',
      href: `/human-history/timeline?event=${encodeURIComponent(title)}&mode=scholarly`,
      action: 'scholarly',
      target: title,
      search: `${title} 深度讲稿`,
    });
  }
  for (const era of ERAS) {
    items.push({
      type: '时代',
      label: era.name,
      sub: `${era.startYear < 0 ? '前' + Math.abs(era.startYear) : era.startYear}-${era.endYear}`,
      desc: era.desc,
      href: `/human-history/timeline#${era.id}`,
      action: 'navigate',
      search: `${era.name} ${era.desc} ${(era.highlights || []).join(' ')}`,
    });
  }
  for (const lesson of LESSONS) {
    items.push({
      type: '借鉴',
      label: lesson.title,
      sub: lesson.subtitle,
      desc: lesson.intro,
      href: '/human-history/lessons',
      action: 'navigate',
      search: `${lesson.title} ${lesson.subtitle} ${lesson.intro}`,
    });
    for (const c of lesson.cases) {
      items.push({
        type: '借鉴',
        label: c.title,
        sub: lesson.title,
        desc: c.summary,
        href: '/human-history/lessons',
        action: 'navigate',
        search: `${c.title} ${c.summary} ${c.detail}`,
      });
    }
  }
  for (const era of ATLAS_ERAS) {
    for (const topic of era.topics) {
      items.push({
        type: '图谱',
        label: topic.name,
        sub: era.name,
        desc: `${topic.scenes.length}个场景`,
        href: '/human-history/atlas',
        action: 'navigate',
        search: `${topic.name} ${era.name} ${topic.scenes.map(s => s.title + ' ' + s.body).join(' ')}`,
      });
    }
  }

  return items;
}

let searchIndex = null;

function search(query) {
  if (!searchIndex) searchIndex = buildIndex();
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const tokens = q.split(/\s+/);
  return searchIndex
    .filter(item => tokens.every(t => item.search.toLowerCase().includes(t)))
    .slice(0, 25);
}

function renderResults(results, query, listEl) {
  listEl.innerHTML = '';
  if (!query.trim()) {
    listEl.innerHTML = '<div class="gs-empty">输入关键词搜索人物、事件、深度讲稿、时代、借鉴和图谱内容</div>';
    return;
  }
  if (results.length === 0) {
    const escaped = escapeHtml(query);
    listEl.innerHTML = `<div class="gs-empty">未找到"${escaped}"的相关结果</div>`;
    return;
  }

  const grouped = {};
  for (const r of results) {
    if (!grouped[r.type]) grouped[r.type] = [];
    grouped[r.type].push(r);
  }

  for (const [type, items] of Object.entries(grouped)) {
    const section = el('div', { class: 'gs-section' });
    section.innerHTML = `<div class="gs-section-label">${type}</div>`;
    for (const item of items) {
      const row = el('button', { class: 'gs-result' });
      row.innerHTML = `
        <div class="gs-result-head">
          <span class="gs-result-label">${highlightMatch(item.label, query)}</span>
          <span class="gs-result-sub">${escapeHtml(item.sub)}</span>
        </div>
        <p class="gs-result-desc">${highlightMatch(truncate(item.desc, 100), query)}</p>
      `;
      row.addEventListener('click', () => {
        closeGlobalSearch();
        if (item.action === 'figure') {
          try { sessionStorage.setItem('highlight-figure', item.target); } catch (e) {}
          window.history.pushState({}, '', item.href);
        } else if (item.action === 'timeline') {
          try { sessionStorage.setItem('open-timeline-event', item.target); } catch (e) {}
          window.history.pushState({}, '', item.href);
        } else if (item.action === 'scholarly') {
          try {
            sessionStorage.setItem('open-timeline-event', item.target);
            sessionStorage.setItem('open-scholarly', item.target);
          } catch (e) {}
          window.history.pushState({}, '', item.href);
        } else {
          window.history.pushState({}, '', item.href);
        }
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
      section.appendChild(row);
    }
    listEl.appendChild(section);
  }
}

function highlightMatch(text, query) {
  const escaped = escapeHtml(text);
  if (!query.trim()) return escaped;
  const tokens = query.trim().split(/\s+/);
  let result = escaped;
  for (const t of tokens) {
    const re = new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    result = result.replace(re, '<mark>$1</mark>');
  }
  return result;
}

function truncate(text, max) {
  if (!text || text.length <= max) return text;
  return text.slice(0, max) + '…';
}

export function openGlobalSearch() {
  closeGlobalSearch();

  const overlay = el('div', { class: 'gs-overlay' });
  const box = el('div', { class: 'gs-box', role: 'dialog', 'aria-modal': 'true', 'aria-label': '全局搜索' });
  const input = el('input', {
    class: 'gs-input',
    type: 'search',
    placeholder: '搜索人物、事件、深度讲稿、时代...',
    autofocus: 'true',
  });
  const list = el('div', { class: 'gs-list' });
  list.innerHTML = '<div class="gs-empty">输入关键词搜索人物、事件、深度讲稿、时代、借鉴和图谱内容</div>';

  box.appendChild(input);
  box.appendChild(list);
  overlay.appendChild(box);

  const doSearch = () => {
    const results = search(input.value);
    renderResults(results, input.value, list);
  };

  input.addEventListener('input', doSearch);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeGlobalSearch(); });
  const onKey = (e) => { if (e.key === 'Escape') closeGlobalSearch(); };
  document.addEventListener('keydown', onKey);
  document.body.appendChild(overlay);

  activeCleanup = () => {
    document.removeEventListener('keydown', onKey);
    overlay.remove();
    activeCleanup = null;
  };

  requestAnimationFrame(() => {
    overlay.classList.add('open');
    input.focus();
  });
}

export function closeGlobalSearch() {
  if (activeCleanup) activeCleanup();
  const stale = document.querySelector('.gs-overlay');
  if (stale) stale.remove();
}
