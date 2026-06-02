// @ts-nocheck
import { gsap } from 'gsap';
import { ERAS, REGIONS, CAT_COLORS, CAT_LABELS, REGION_LABELS, formatYear } from '../data/index.js';
import { GEO_EVENTS, projectGeo } from '../data/geo-events.js';
import { el, clearApp, prefersReducedMotion } from '../lib/dom.js';
import { createPageHeader } from '../components/common/ui.js';
import { getEventStory, getMapEventSummary, getRegionProfile } from '../features/map/map-content.js';
import { MAP_H, MAP_W, createMapSvg, updateMapMarkerStyles } from '../features/map/map-svg.js';

const DEFAULT_VIEW = { x: 0, y: 0, w: MAP_W, h: MAP_H };
const MIN_VIEW_W = MAP_W / 4;
const MAP_ASPECT = MAP_H / MAP_W;
const EVENT_YEARS = [...new Set(GEO_EVENTS.map(event => event.year))].sort((a, b) => a - b);

export function cleanupMap() {
  gsap.killTweensOf('.map-detail, .map-info-panel > *');
}

export function renderMap() {
  cleanupMap();
  const app = clearApp();

  let activeEra = null;
  let activeRegion = null;
  let selectedTitle = null;
  let hoveredTitle = null;
  let hoveredPos = null;
  let tooltipEv = null;
  let storyPageIndex = 0;
  let timeStartIndex = 0;
  let timeEndIndex = EVENT_YEARS.length - 1;
  let mapView = { ...DEFAULT_VIEW };
  let showBoundaries = true;
  let isPanning = false;
  let panStart = null;

  const page = el('div', { class: 'map-page' });
  page.appendChild(createPageHeader('世界历史地图', '经纬度投影地图 · 缩放拖拽探索空间格局 · 点击事件标记查看历史脉络'));

  const eraBar = el('div', { class: 'map-era-bar' });
  const eraTrack = el('div', { class: 'map-era-track' });
  const allEraBtn = el('button', { class: 'map-era-btn active', type: 'button' }, '全部时代');
  allEraBtn.addEventListener('click', () => {
    activeEra = null;
    selectedTitle = null;
    renderAll();
  });
  eraTrack.appendChild(allEraBtn);

  for (const era of ERAS) {
    const eraBtn = el('button', { class: 'map-era-btn', type: 'button', style: `--era-color:${era.color}` }, era.name);
    eraBtn.dataset.era = era.id;
    eraBtn.addEventListener('click', () => {
      activeEra = era.id;
      selectedTitle = null;
      renderAll();
    });
    eraTrack.appendChild(eraBtn);
  }
  eraBar.appendChild(eraTrack);
  page.appendChild(eraBar);

  const legend = el('div', { class: 'graph-legend', style: 'margin-bottom:12px' });
  legend.innerHTML = Object.entries(CAT_COLORS).map(([key, color]) =>
    `<span><span class="legend-dot" style="background:${color}"></span>${CAT_LABELS[key]}</span>`
  ).join('');
  page.appendChild(legend);

  const timePanel = el('section', { class: 'map-time-panel', 'aria-label': '时间窗口筛选' });
  const timeStartLabel = el('strong', { class: 'map-time-label' }, formatYear(EVENT_YEARS[timeStartIndex]));
  const timeEndLabel = el('strong', { class: 'map-time-label' }, formatYear(EVENT_YEARS[timeEndIndex]));
  const timeCountLabel = el('span', { class: 'map-time-count' }, '');
  const timeStartInput = el('input', {
    class: 'map-time-range',
    type: 'range',
    min: '0',
    max: String(EVENT_YEARS.length - 1),
    value: String(timeStartIndex),
    'aria-label': '开始年份',
  });
  const timeEndInput = el('input', {
    class: 'map-time-range',
    type: 'range',
    min: '0',
    max: String(EVENT_YEARS.length - 1),
    value: String(timeEndIndex),
    'aria-label': '结束年份',
  });
  const timeResetBtn = el('button', { class: 'map-time-reset', type: 'button' }, '全部时间');
  timePanel.innerHTML = '<div class="map-time-head"><span>时间窗口</span></div>';
  timePanel.querySelector('.map-time-head').append(timeCountLabel, timeResetBtn);
  const timeBody = el('div', { class: 'map-time-body' });
  const timeLabels = el('div', { class: 'map-time-labels' });
  timeLabels.append(timeStartLabel, timeEndLabel);
  const timeRanges = el('div', { class: 'map-time-ranges' });
  timeRanges.append(timeStartInput, timeEndInput);
  timeBody.append(timeLabels, timeRanges);
  timePanel.appendChild(timeBody);
  page.appendChild(timePanel);

  const regionBar = el('div', { class: 'map-region-bar' });
  const summary = el('div', { class: 'map-summary' });
  const explorer = el('div', { class: 'map-explorer' });
  const svgWrap = el('div', { class: 'map-svg-wrap', style: 'position:relative' });
  const mapToolbar = el('div', { class: 'map-toolbar', 'aria-label': '地图控制' });
  const zoomOutBtn = el('button', { class: 'map-tool-btn', type: 'button', title: '缩小' }, '−');
  const resetBtn = el('button', { class: 'map-tool-btn', type: 'button', title: '复位' }, '1:1');
  const zoomInBtn = el('button', { class: 'map-tool-btn', type: 'button', title: '放大' }, '+');
  const boundaryBtn = el('button', { class: 'map-tool-btn active', type: 'button', title: '显示/隐藏参考边界' }, '边界');
  const sidePanel = el('aside', { class: 'map-side-panel', 'aria-label': '地图事件列表' });
  const infoPanel = el('div', { class: 'map-info-panel' });

  mapToolbar.append(zoomOutBtn, resetBtn, zoomInBtn, boundaryBtn);
  svgWrap.appendChild(mapToolbar);
  explorer.appendChild(svgWrap);
  explorer.appendChild(sidePanel);
  page.appendChild(regionBar);
  page.appendChild(summary);
  page.appendChild(explorer);
  page.appendChild(infoPanel);
  app.appendChild(page);

  function getEraFilteredEvents() {
    const startYear = EVENT_YEARS[timeStartIndex];
    const endYear = EVENT_YEARS[timeEndIndex];
    const events = activeEra ? GEO_EVENTS.filter(event => event.era === activeEra) : GEO_EVENTS;
    return events.filter(event => event.year >= startYear && event.year <= endYear);
  }

  function getFilteredEvents() {
    const events = getEraFilteredEvents();
    if (!activeRegion) return events;
    return events.filter(event => event.region === activeRegion || event.region === 'global');
  }

  function clampView(view) {
    const w = Math.min(MAP_W, Math.max(MIN_VIEW_W, view.w));
    const h = Math.min(MAP_H, w * MAP_ASPECT);
    return {
      w,
      h,
      x: Math.min(Math.max(0, view.x), MAP_W - w),
      y: Math.min(Math.max(0, view.y), MAP_H - h),
    };
  }

  function setMapView(nextView) {
    mapView = clampView(nextView);
    const svgEl = svgWrap.querySelector('svg');
    if (svgEl) svgEl.setAttribute('viewBox', `${mapView.x} ${mapView.y} ${mapView.w} ${mapView.h}`);
  }

  function zoomMap(scale) {
    const centerX = mapView.x + mapView.w / 2;
    const centerY = mapView.y + mapView.h / 2;
    const w = mapView.w * scale;
    const h = w * MAP_ASPECT;
    setMapView({
      x: centerX - w / 2,
      y: centerY - h / 2,
      w,
      h,
    });
  }

  function updateTimePanel(events) {
    timeStartInput.value = String(timeStartIndex);
    timeEndInput.value = String(timeEndIndex);
    timeStartLabel.textContent = formatYear(EVENT_YEARS[timeStartIndex]);
    timeEndLabel.textContent = formatYear(EVENT_YEARS[timeEndIndex]);
    timeCountLabel.textContent = `${events.length} 个节点`;
    timeResetBtn.disabled = timeStartIndex === 0 && timeEndIndex === EVENT_YEARS.length - 1;
  }

  function setTimeWindow(startIndex, endIndex) {
    const nextStart = Math.max(0, Math.min(EVENT_YEARS.length - 1, startIndex));
    const nextEnd = Math.max(0, Math.min(EVENT_YEARS.length - 1, endIndex));
    timeStartIndex = Math.min(nextStart, nextEnd);
    timeEndIndex = Math.max(nextStart, nextEnd);
    selectedTitle = null;
    hoveredTitle = null;
    tooltipEv = null;
    infoPanel.innerHTML = '';
    renderAll();
  }

  function updateEraButtons() {
    eraTrack.querySelectorAll('.map-era-btn').forEach(button => {
      const eraId = button.dataset.era;
      button.classList.toggle('active', (!eraId && !activeEra) || eraId === activeEra);
    });
  }

  function updateRegionButtons() {
    regionBar.innerHTML = '';
    const allRegionBtn = el('button', {
      class: `map-region-btn${activeRegion ? '' : ' active'}`,
      type: 'button',
      onClick: () => {
        activeRegion = null;
        selectedTitle = null;
        renderAll();
      },
    }, '全部区域');
    regionBar.appendChild(allRegionBtn);

    for (const region of REGIONS) {
      const count = getEraFilteredEvents()
        .filter(event => event.region === region.id || (region.id !== 'global' && event.region === 'global'))
        .length;
      if (count === 0) continue;

      const regionBtn = el('button', {
        class: `map-region-btn${activeRegion === region.id ? ' active' : ''}`,
        type: 'button',
        style: `--region-color:${region.color}`,
        onClick: () => {
          activeRegion = activeRegion === region.id ? null : region.id;
          selectedTitle = null;
          renderAll();
        },
      }, `${region.name} ${count}`);
      regionBar.appendChild(regionBtn);
    }
  }

  function updateSummary(events) {
    const eraName = activeEra ? ERAS.find(era => era.id === activeEra)?.name : '全部时代';
    const regionName = activeRegion ? REGION_LABELS[activeRegion] || activeRegion : '全部区域';
    const regionCount = new Set(events.map(event => event.region)).size;
    const categoryCount = new Set(events.map(event => event.cat)).size;
    const first = events[0];
    const last = events[events.length - 1];

    summary.innerHTML = `
      <div class="map-summary-card">
        <span>当前视图</span>
        <strong>${eraName} · ${regionName}</strong>
      </div>
      <div class="map-summary-card">
        <span>事件数量</span>
        <strong>${events.length}</strong>
      </div>
      <div class="map-summary-card">
        <span>覆盖区域</span>
        <strong>${regionCount}</strong>
      </div>
      <div class="map-summary-card">
        <span>类型维度</span>
        <strong>${categoryCount}</strong>
      </div>
      <div class="map-summary-card wide">
        <span>时间跨度</span>
        <strong>${first && last ? `${formatYear(first.year)} - ${formatYear(last.year)}` : '暂无事件'}</strong>
      </div>
    `;
  }

  function selectEvent(event, markerPos = null) {
    selectedTitle = event.title;
    hoveredTitle = event.title;
    tooltipEv = event;
    storyPageIndex = 0;
    hoveredPos = markerPos || projectGeo(event.lng, event.lat, MAP_W, MAP_H);
    const pos = projectGeo(event.lng, event.lat, MAP_W, MAP_H);
    const viewW = Math.min(MAP_W, mapView.w);
    const viewH = viewW * MAP_ASPECT;
    setMapView({ x: pos.x - viewW / 2, y: pos.y - viewH / 2, w: viewW, h: viewH });
    showInfoPanel(event);
    renderAll();
  }

  function updateSidePanel(events) {
    const sorted = [...events].sort((a, b) => a.year - b.year);
    const title = activeRegion ? `${REGION_LABELS[activeRegion] || activeRegion}事件` : '全部地图事件';
    sidePanel.innerHTML = `
      <div class="map-side-head">
        <strong>${title}</strong>
        <span>${sorted.length} 个节点</span>
      </div>
      <div class="map-side-list"></div>
    `;

    const list = sidePanel.querySelector('.map-side-list');
    for (const event of sorted) {
      const catColor = CAT_COLORS[event.cat] || '#c8a951';
      const item = el('button', {
        class: `map-side-event${selectedTitle === event.title ? ' active' : ''}`,
        type: 'button',
        style: `--event-color:${catColor}`,
        onClick: () => selectEvent(event),
      });
      item.innerHTML = `
        <span class="map-ev-year">${formatYear(event.year)}</span>
        <span class="map-ev-title">${event.title}</span>
        <span class="map-ev-desc">${REGION_LABELS[event.region] || event.region} · ${CAT_LABELS[event.cat] || event.cat}</span>
      `;
      list.appendChild(item);
    }
  }

  function syncMarkerState(svgEl) {
    updateMapMarkerStyles(svgEl, {
      hoveredTitle,
      selectedTitle,
      tooltipEvent: tooltipEv,
      tooltipPosition: hoveredPos,
    });
  }

  function restoreSelectedTooltip() {
    if (!selectedTitle) {
      hoveredTitle = null;
      tooltipEv = null;
      hoveredPos = null;
      return;
    }
    const selectedEvent = GEO_EVENTS.find(event => event.title === selectedTitle);
    if (!selectedEvent) return;
    hoveredTitle = selectedEvent.title;
    tooltipEv = selectedEvent;
    hoveredPos = projectGeo(selectedEvent.lng, selectedEvent.lat, MAP_W, MAP_H);
  }

  function bindMapInteractions(svgEl, events) {
    svgEl.querySelectorAll('.map-marker').forEach(marker => {
      const title = marker.dataset.title;
      const event = events.find(item => item.title === title);

      marker.addEventListener('mouseenter', () => {
        hoveredTitle = title;
        if (event) {
          tooltipEv = event;
          hoveredPos = {
            x: Number(marker.dataset.x || 0),
            y: Number(marker.dataset.y || 0),
          };
        }
        syncMarkerState(svgEl);
      });

      marker.addEventListener('mouseleave', () => {
        restoreSelectedTooltip();
        syncMarkerState(svgEl);
      });

      marker.addEventListener('click', () => {
        if (event) {
          const clusterSize = Number(marker.dataset.clusterSize || 1);
          if (clusterSize > 1) {
            const titles = (marker.dataset.clusterTitles || '')
              .split('||')
              .filter(Boolean);
            const clusterEvents = titles
              .map(itemTitle => events.find(candidate => candidate.title === itemTitle))
              .filter(Boolean)
              .sort((a, b) => a.year - b.year);
            showClusterInfo(clusterEvents, event.title);
            return;
          }
          selectEvent(event, {
            x: Number(marker.dataset.x || 0),
            y: Number(marker.dataset.y || 0),
          });
        }
      });
    });

    const selectRegion = (regionId) => {
      activeRegion = activeRegion === regionId ? null : regionId;
      selectedTitle = null;
      showRegionInfo(activeRegion || 'global');
      renderAll();
    };

    svgEl.querySelectorAll('.map-continent').forEach(continent => {
      continent.addEventListener('click', () => selectRegion(continent.dataset.region));
    });
    svgEl.querySelectorAll('.map-label').forEach(label => {
      label.addEventListener('click', () => selectRegion(label.dataset.region));
    });

    svgEl.addEventListener('pointerdown', (event) => {
      if (event.target.closest('.map-marker, .map-continent, .map-label, .map-tooltip')) return;
      isPanning = true;
      panStart = {
        clientX: event.clientX,
        clientY: event.clientY,
        view: { ...mapView },
        rect: svgEl.getBoundingClientRect(),
      };
      svgEl.setPointerCapture?.(event.pointerId);
      svgWrap.classList.add('is-panning');
    });

    svgEl.addEventListener('pointermove', (event) => {
      if (!isPanning || !panStart) return;
      const dx = (event.clientX - panStart.clientX) * (panStart.view.w / panStart.rect.width);
      const dy = (event.clientY - panStart.clientY) * (panStart.view.h / panStart.rect.height);
      setMapView({
        ...panStart.view,
        x: panStart.view.x - dx,
        y: panStart.view.y - dy,
      });
    });

    const stopPan = (event) => {
      if (!isPanning) return;
      isPanning = false;
      panStart = null;
      svgEl.releasePointerCapture?.(event.pointerId);
      svgWrap.classList.remove('is-panning');
    };
    svgEl.addEventListener('pointerup', stopPan);
    svgEl.addEventListener('pointercancel', stopPan);
  }

  function renderSVG() {
    const events = getFilteredEvents();
    const existingToolbar = mapToolbar;
    svgWrap.innerHTML = createMapSvg({
      events,
      activeRegion,
      hoveredTitle: hoveredTitle || selectedTitle,
      tooltipEvent: tooltipEv,
      tooltipPosition: hoveredPos,
      viewBox: mapView,
      showBoundaries,
    });
    svgWrap.appendChild(existingToolbar);

    const svgEl = svgWrap.querySelector('svg');
    bindMapInteractions(svgEl, events);
  }

  function renderAll() {
    const events = [...getFilteredEvents()].sort((a, b) => a.year - b.year);
    if (selectedTitle && !events.some(event => event.title === selectedTitle)) {
      selectedTitle = null;
      hoveredTitle = null;
      tooltipEv = null;
      infoPanel.innerHTML = '';
    }
    updateEraButtons();
    updateTimePanel(events);
    updateRegionButtons();
    updateSummary(events);
    updateSidePanel(events);
    renderSVG();
  }

  function animateInfoPanel() {
    if (!prefersReducedMotion() && infoPanel.children[0]) {
      gsap.fromTo(infoPanel.children[0], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 });
    }
  }

  function showInfoPanel(event) {
    const catColor = CAT_COLORS[event.cat] || '#c8a951';
    const era = ERAS.find(item => item.id === event.era);
    const story = getEventStory(event);
    const pageIndex = Math.min(storyPageIndex, story.pages.length - 1);
    const storyPage = story.pages[pageIndex];

    let html = `<div class="map-detail" style="border-left:3px solid ${catColor}">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <div>
          <span style="color:${catColor};font-size:0.8rem">${formatYear(event.year)} · ${CAT_LABELS[event.cat]}</span>
          <h2 style="font-family:var(--serif);color:var(--parchment);margin:4px 0">${event.title}</h2>
          <span style="font-size:0.75rem;color:var(--parchment-dim)">${era ? era.name : ''} · ${REGION_LABELS[event.region] || event.region}</span>
        </div>
        <button class="modal-close" style="background:none;border:none;color:var(--parchment-dim);cursor:pointer;font-size:1.2rem">✕</button>
      </div>`;

    html += `<p class="map-desc">${getMapEventSummary(event)}</p>`;

    html += `<section class="map-story-card">
      <div class="map-story-head">
        <span>故事 ${pageIndex + 1} / ${story.pages.length}</span>
        <strong>${storyPage.title}</strong>
      </div>
      <p>${storyPage.body}</p>
      <div class="map-story-controls">
        <button class="map-story-btn" type="button" data-story-dir="-1" ${pageIndex === 0 ? 'disabled' : ''}>上一页</button>
        <div class="map-story-dots">
          ${story.pages.map((_, index) => `<span class="${index === pageIndex ? 'active' : ''}"></span>`).join('')}
        </div>
        <button class="map-story-btn" type="button" data-story-dir="1" ${pageIndex === story.pages.length - 1 ? 'disabled' : ''}>下一页</button>
      </div>
    </section>`;

    html += `<div class="map-facts">
      ${story.facts.slice(0, 5).map(fact => `<span>${fact}</span>`).join('')}
    </div>`;

    const related = GEO_EVENTS
      .filter(item => item.title !== event.title && item.era === event.era && item.region === event.region)
      .sort((a, b) => Math.abs(a.year - event.year) - Math.abs(b.year - event.year))
      .slice(0, 3);
    if (related.length) {
      html += `<div class="map-related"><h4>相关节点</h4><div class="map-related-list">`;
      for (const rel of related) {
        html += `<button type="button" class="map-related-btn" data-related="${rel.title}">${formatYear(rel.year)} · ${rel.title}</button>`;
      }
      html += `</div></div>`;
    }

    html += '</div>';
    infoPanel.innerHTML = html;
    infoPanel.querySelector('.modal-close').addEventListener('click', () => {
      selectedTitle = null;
      infoPanel.innerHTML = '';
      renderAll();
    });
    infoPanel.querySelectorAll('.map-related-btn').forEach(button => {
      button.addEventListener('click', () => {
        const rel = GEO_EVENTS.find(item => item.title === button.dataset.related);
        if (rel) {
          storyPageIndex = 0;
          selectEvent(rel, projectGeo(rel.lng, rel.lat, MAP_W, MAP_H));
        }
      });
    });
    infoPanel.querySelectorAll('.map-story-btn').forEach(button => {
      button.addEventListener('click', () => {
        storyPageIndex = Math.min(
          story.pages.length - 1,
          Math.max(0, storyPageIndex + Number(button.dataset.storyDir))
        );
        showInfoPanel(event);
      });
    });
    animateInfoPanel();
    requestAnimationFrame(() => {
      infoPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  function showClusterInfo(clusterEvents, focusTitle) {
    if (clusterEvents.length === 0) return;
    const years = clusterEvents.map(event => event.year);
    const start = Math.min(...years);
    const end = Math.max(...years);
    const categories = new Set(clusterEvents.map(event => event.cat));
    const regions = new Set(clusterEvents.map(event => event.region));

    let html = `<div class="map-detail map-cluster-detail">
      <div class="map-cluster-head">
        <div>
          <span>${clusterEvents.length} 个重叠节点</span>
          <h2>密集区域事件组</h2>
          <p>${formatYear(start)} - ${formatYear(end)} · ${regions.size} 个区域 · ${categories.size} 种类型</p>
        </div>
        <button class="modal-close" style="background:none;border:none;color:var(--parchment-dim);cursor:pointer;font-size:1.2rem">✕</button>
      </div>
      <div class="map-cluster-list">`;

    for (const event of clusterEvents) {
      const catColor = CAT_COLORS[event.cat] || '#c8a951';
      html += `<button class="map-cluster-event${event.title === focusTitle ? ' active' : ''}" type="button" data-title="${event.title}" style="--event-color:${catColor}">
        <span>${formatYear(event.year)}</span>
        <strong>${event.title}</strong>
        <em>${REGION_LABELS[event.region] || event.region} · ${CAT_LABELS[event.cat] || event.cat}</em>
      </button>`;
    }

    html += `</div>
      <p class="map-detail-hint">这些节点在当前缩放层级非常接近；放大地图会自动缩小点并减少展开距离，也可以直接从这里选择具体事件。</p>
    </div>`;

    infoPanel.innerHTML = html;
    infoPanel.querySelector('.modal-close').addEventListener('click', () => {
      infoPanel.innerHTML = '';
    });
    infoPanel.querySelectorAll('.map-cluster-event').forEach(item => {
      item.addEventListener('click', () => {
        const event = clusterEvents.find(candidate => candidate.title === item.dataset.title);
        if (event) selectEvent(event);
      });
    });
    animateInfoPanel();
    requestAnimationFrame(() => {
      infoPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  function showRegionInfo(regionId) {
    const profile = getRegionProfile(regionId || 'global');
    const regionEvents = getEraFilteredEvents()
      .filter(event => profile.id === 'global' ? event.region === 'global' : (event.region === profile.id || event.region === 'global'))
      .sort((a, b) => a.year - b.year);

    let html = `<div class="map-detail" style="border-left:3px solid ${profile.color || '#c8a951'}">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <h2 style="font-family:var(--serif);color:var(--parchment);margin:0">${profile.name} · ${activeEra ? ERAS.find(era => era.id === activeEra)?.name : '全部时代'}</h2>
        <button class="modal-close" style="background:none;border:none;color:var(--parchment-dim);cursor:pointer;font-size:1.2rem">✕</button>
      </div>
      <p class="map-desc">${profile.desc}</p>
      <div class="map-highlights">${(profile.highlights || []).map(item => `<span class="tag">${item}</span>`).join('')}</div>
      <p style="color:var(--parchment-dim);font-size:0.8rem;margin-bottom:12px">${regionEvents.length} 个事件</p>
      <div class="map-event-list">`;

    for (const event of regionEvents.slice(0, 18)) {
      const catColor = CAT_COLORS[event.cat] || '#c8a951';
      html += `<button class="map-event-item" data-title="${event.title}" style="--event-color:${catColor}">
        <span class="map-ev-year">${formatYear(event.year)}</span>
        <span class="map-ev-title">${event.title}</span>
        <span class="map-ev-desc">${CAT_LABELS[event.cat] || event.cat}</span>
      </button>`;
    }

    if (regionEvents.length > 18) {
      html += `<p style="color:var(--parchment-dim);opacity:0.5;font-size:0.75rem;text-align:center">还有 ${regionEvents.length - 18} 个事件可在右侧列表继续浏览</p>`;
    }

    html += '</div></div>';
    infoPanel.innerHTML = html;
    infoPanel.querySelector('.modal-close').addEventListener('click', () => {
      infoPanel.innerHTML = '';
    });
    infoPanel.querySelectorAll('.map-event-item').forEach(item => {
      item.addEventListener('click', () => {
        const event = regionEvents.find(candidate => candidate.title === item.dataset.title);
        if (event) selectEvent(event);
      });
    });
    animateInfoPanel();
    requestAnimationFrame(() => {
      infoPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  zoomOutBtn.addEventListener('click', () => zoomMap(1.35));
  zoomInBtn.addEventListener('click', () => zoomMap(0.72));
  resetBtn.addEventListener('click', () => {
    mapView = { ...DEFAULT_VIEW };
    renderSVG();
  });
  boundaryBtn.addEventListener('click', () => {
    showBoundaries = !showBoundaries;
    boundaryBtn.classList.toggle('active', showBoundaries);
    renderSVG();
  });
  timeStartInput.addEventListener('input', () => {
    setTimeWindow(Number(timeStartInput.value), timeEndIndex);
  });
  timeEndInput.addEventListener('input', () => {
    setTimeWindow(timeStartIndex, Number(timeEndInput.value));
  });
  timeResetBtn.addEventListener('click', () => {
    setTimeWindow(0, EVENT_YEARS.length - 1);
  });

  renderAll();
}
