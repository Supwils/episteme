import { el, prefersReducedMotion } from '../../lib/dom.js';

export function buildEraTooltip(era) {
  const topicCount = era.topics.length > 0 ? `${era.topics.length} 个主题` : '';
  let preview = '';
  if (era.topics.length > 0) {
    preview = era.topics.slice(0, 2).map(topic => topic.name).join('、');
    if (era.topics.length > 2) preview += '…';
  }
  return `
    <div class="atlas-tt-head" style="border-left:3px solid ${era.hue}">
      <strong>${era.name}</strong>
      <span class="atlas-tt-sub">${era.sub}</span>
    </div>
    <div class="atlas-tt-meta">${topicCount}</div>
    ${preview ? `<div class="atlas-tt-preview">涵盖：${preview}</div>` : ''}
    <div class="atlas-tt-hint">点击深入探索 →</div>
  `;
}

export function buildTopicTooltip(topic, eraName) {
  const firstScene = topic.scenes.length > 0 ? topic.scenes[0].title : '';
  return `
    <div class="atlas-tt-head" style="border-left:3px solid var(--gold)">
      <strong>${topic.name}</strong>
      <span class="atlas-tt-sub">${eraName}</span>
    </div>
    <div class="atlas-tt-meta">${topic.scenes.length} 个历史场景</div>
    ${firstScene ? `<div class="atlas-tt-preview">首个场景：${firstScene}</div>` : ''}
    <div class="atlas-tt-hint">点击查看详细内容 →</div>
  `;
}

export function buildPreviewText(text, max = 68) {
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

export function createOverviewButton(label, meta, desc, onClick, isActive = false) {
  const button = el('button', {
    class: `atlas-overview-item${isActive ? ' active' : ''}`,
    type: 'button',
  });
  button.appendChild(el('span', { class: 'atlas-overview-title' }, label));
  button.appendChild(el('span', { class: 'atlas-overview-meta' }, meta));
  if (desc) button.appendChild(el('span', { class: 'atlas-overview-desc' }, desc));
  button.addEventListener('click', onClick);
  return button;
}

export function renderScenePanel({ scenePanel, topic, era, onBack, onClose, onOpen }) {
  scenePanel.innerHTML = '';

  const header = el('div', { class: 'scene-header' });
  const topRow = el('div', { class: 'scene-top-row' });
  const backBtn = el('button', { class: 'scene-back', 'aria-label': '返回' }, '← 返回主题');
  const closeBtn = el('button', { class: 'scene-close', 'aria-label': '关闭' }, '✕');

  backBtn.addEventListener('click', onBack);
  closeBtn.addEventListener('click', onClose);
  topRow.appendChild(backBtn);
  topRow.appendChild(closeBtn);
  header.appendChild(topRow);
  header.appendChild(el('h2', { class: 'scene-title' }, topic.name));
  header.appendChild(el('p', { class: 'scene-meta' }, `${era.name} · ${topic.scenes.length} 个场景`));

  const progressBar = el('div', { class: 'scene-progress' });
  progressBar.innerHTML = `<div class="scene-progress-fill" style="width:0%"></div>`;
  header.appendChild(progressBar);
  scenePanel.appendChild(header);

  const cardsWrap = el('div', { class: 'scene-cards' });
  for (let index = 0; index < topic.scenes.length; index++) {
    const scene = topic.scenes[index];
    const card = el('div', { class: 'scene-card' });
    card.innerHTML = `
      <div class="scene-step">
        <span class="scene-num">${index + 1}</span>
        ${index < topic.scenes.length - 1 ? '<div class="scene-line"></div>' : ''}
      </div>
      <div class="scene-body">
        <h3 class="scene-card-title">${scene.title}</h3>
        <p class="scene-card-body">${scene.body}</p>
      </div>
    `;
    cardsWrap.appendChild(card);
  }
  scenePanel.appendChild(cardsWrap);

  cardsWrap.addEventListener('scroll', () => {
    const scrollable = cardsWrap.scrollHeight - cardsWrap.clientHeight;
    const pct = scrollable > 0 ? (cardsWrap.scrollTop / scrollable) * 100 : 100;
    const fill = scenePanel.querySelector('.scene-progress-fill');
    if (fill) fill.style.width = `${Math.min(100, pct)}%`;
  });

  requestAnimationFrame(onOpen);
}

export function scrollSceneCard(scenePanel, index) {
  const cards = scenePanel.querySelectorAll('.scene-card');
  if (cards[index]) {
    cards[index].scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }
}

export function createAtlasToolbar({ onBack, onZoomOut, onZoomIn, onFit, onReset }) {
  const toolbar = el('div', { class: 'atlas-toolbar' });
  const breadcrumbEl = el('div', { class: 'atlas-breadcrumb' });
  const controls = el('div', { class: 'atlas-controls' });

  const backBtn = el('button', { class: 'atlas-ctrl-btn', title: '返回上级 (Esc)', 'aria-label': '返回' });
  backBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`;
  backBtn.addEventListener('click', onBack);

  const zoomOutBtn = el('button', { class: 'atlas-ctrl-btn', title: '缩小 (-)', 'aria-label': '缩小' }, '−');
  zoomOutBtn.addEventListener('click', onZoomOut);

  const zoomInBtn = el('button', { class: 'atlas-ctrl-btn', title: '放大 (+)', 'aria-label': '放大' }, '+');
  zoomInBtn.addEventListener('click', onZoomIn);

  const fitBtn = el('button', { class: 'atlas-ctrl-btn', title: '适应视图 (F)', 'aria-label': '适应视图' });
  fitBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>`;
  fitBtn.addEventListener('click', onFit);

  const resetBtn = el('button', { class: 'atlas-ctrl-btn', title: '重置 (0)', 'aria-label': '重置' });
  resetBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`;
  resetBtn.addEventListener('click', onReset);

  controls.appendChild(backBtn);
  controls.appendChild(zoomOutBtn);
  controls.appendChild(zoomInBtn);
  controls.appendChild(fitBtn);
  controls.appendChild(resetBtn);
  toolbar.appendChild(breadcrumbEl);
  toolbar.appendChild(controls);

  return { toolbar, breadcrumbEl };
}

export function eraSceneCount(era) {
  return era.topics.reduce((sum, topic) => sum + topic.scenes.length, 0);
}

export function updateOverviewPanel({ overviewPanel, level, activeEra, activeTopic, ATLAS_ERAS, selectEra, selectTopic, scrollSceneCardFn, scenePanel }) {
  if (!overviewPanel) return;
  overviewPanel.innerHTML = '';

  const heading = level === 1 ? '时代目录' : activeTopic ? activeTopic.name : activeEra.name;
  const meta = level === 1
    ? `${ATLAS_ERAS.length} 个时代 · ${ATLAS_ERAS.reduce((sum, era) => sum + era.topics.length, 0)} 个主题`
    : activeTopic
      ? `${activeEra.name} · ${activeTopic.scenes.length} 个场景`
      : `${activeEra.sub} · ${activeEra.topics.length} 个主题`;

  const head = el('div', { class: 'atlas-overview-head' });
  head.appendChild(el('strong', {}, heading));
  head.appendChild(el('span', {}, meta));
  overviewPanel.appendChild(head);

  const list = el('div', { class: 'atlas-overview-list' });
  if (level === 1) {
    for (const era of ATLAS_ERAS) {
      const topicNames = era.topics.map(topic => topic.name).join('、');
      list.appendChild(createOverviewButton(
        era.name,
        `${era.topics.length} 个主题 · ${eraSceneCount(era)} 个场景`,
        topicNames,
        () => selectEra(era),
        activeEra === era
      ));
    }
  } else if (activeTopic) {
    for (let i = 0; i < activeTopic.scenes.length; i++) {
      const scene = activeTopic.scenes[i];
      list.appendChild(createOverviewButton(
        scene.title,
        `场景 ${i + 1}`,
        buildPreviewText(scene.body),
        () => scrollSceneCardFn(scenePanel, i)
      ));
    }
  } else {
    for (const topic of activeEra.topics) {
      const sceneNames = topic.scenes.map(scene => scene.title).join('、');
      list.appendChild(createOverviewButton(
        topic.name,
        `${topic.scenes.length} 个场景`,
        sceneNames,
        () => selectTopic(topic),
        activeTopic === topic
      ));
    }
  }

  overviewPanel.appendChild(list);
}
