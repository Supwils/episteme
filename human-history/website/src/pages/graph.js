import { ERAS, EVENTS, FIGURES, FIGURE_RELATIONS, FIGURE_EVENT_LINKS, RELATION_COLORS } from '../data/index.js';
import { PARALLEL_EVENTS } from '../data/parallel-events.js';
import { el, clearApp, prefersReducedMotion } from '../lib/dom.js';
import { renderFigureDetail, renderEventDetail, renderEraDetail } from '../components/history/graph-panel.js';
import { cleanupScholarlyModal } from '../components/history/scholarly-modal.js';

let _tick = null;
let _resizeFn = null;

export function cleanupGraph() {
  if (_tick) { cancelAnimationFrame(_tick); _tick = null; }
  if (_resizeFn) { window.removeEventListener('resize', _resizeFn); _resizeFn = null; }
  const panel = document.querySelector('.graph-detail-panel');
  if (panel) panel.remove();
  // Scholarly modal can be opened from the event detail panel; it lives on
  // document.body, so close it (detaches keydown) when leaving the page.
  cleanupScholarlyModal();
}

const NODE_SIZES = { era: 14, event: 4, figure: 7 };
const NODE_COLORS = { era: null, event: '#f4e8c1', figure: '#e8d48b' };

export function renderGraph() {
  cleanupGraph();
  const app = clearApp();

  const page = el('div', { class: 'graph-page' });

  const header = el('div', { class: 'graph-header' });
  header.innerHTML = `<h1 class="section-title">历史人物<em>关联图谱</em></h1><p class="section-sub">探索事件、人物和时代之间的深层关联——师承、影响、同时代与对立</p>`;

  const toolbar = el('div', { class: 'graph-toolbar' });
  let filter = 'all';
  const filters = [
    { key: 'all', label: '全部' },
    { key: 'era', label: '时代' },
    { key: 'event', label: '事件' },
    { key: 'figure', label: '人物' },
  ];
  for (const f of filters) {
    const btn = el('button', {
      class: `filter-btn${f.key === 'all' ? ' active' : ''}`,
      onClick: () => {
        filter = f.key;
        toolbar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      },
    }, f.label);
    toolbar.appendChild(btn);
  }

  const searchBar = el('div', { class: 'graph-search-bar' });
  const searchInput = el('input', {
    class: 'graph-search-input',
    type: 'search',
    placeholder: '搜索人物、事件或时代...',
    'aria-label': '搜索图谱节点',
  });
  searchBar.appendChild(searchInput);

  const legend = el('div', { class: 'graph-legend' });
  legend.innerHTML = [
    '<span><span class="legend-dot" style="background:#c8a951"></span>时代</span>',
    '<span><span class="legend-dot" style="background:#f4e8c1"></span>事件</span>',
    '<span><span class="legend-dot" style="background:#e8d48b"></span>人物</span>',
    '<span class="legend-sep">|</span>',
    `<span><span class="legend-line" style="background:${RELATION_COLORS.teacher}"></span>师承</span>`,
    `<span><span class="legend-line" style="background:${RELATION_COLORS.influence}"></span>影响</span>`,
    `<span><span class="legend-line" style="background:${RELATION_COLORS.contemporary}"></span>同时代</span>`,
    `<span><span class="legend-line" style="background:${RELATION_COLORS.rival}"></span>对立</span>`,
  ].join('');

  header.appendChild(toolbar);
  header.appendChild(searchBar);
  header.appendChild(legend);
  page.appendChild(header);

  const container = el('div', { class: 'graph-container' });
  const canvas = el('canvas');
  container.appendChild(canvas);
  const hint = el('div', { class: 'graph-hint' });
  hint.textContent = '拖拽节点 · 滚轮缩放 · 点击查看详情';
  container.appendChild(hint);
  page.appendChild(container);

  const detailPanel = el('div', { class: 'graph-detail-panel' });
  page.appendChild(detailPanel);

  app.appendChild(page);

  const ctx = canvas.getContext('2d');
  let W, H;
  let nodes = [];
  let links = [];
  let dragging = null;
  let hoverNode = null;
  let pan = { x: 0, y: 0 };
  let zoom = 1;
  let isPanning = false;
  let panStart = { x: 0, y: 0 };
  let selectedNode = null;
  let searchTerm = '';
  let dragMoved = false;
  let pressPos = { x: 0, y: 0 };

  function resize() {
    const rect = container.getBoundingClientRect();
    W = canvas.width = rect.width * devicePixelRatio;
    H = canvas.height = rect.height * devicePixelRatio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(devicePixelRatio, devicePixelRatio);
    W = rect.width;
    H = rect.height;
  }

  function buildGraph() {
    nodes = [];
    links = [];

    for (const era of ERAS) {
      nodes.push({
        id: `era-${era.id}`, label: era.name, type: 'era', group: era.id,
        x: W / 2 + (Math.random() - 0.5) * 200, y: H / 2 + (Math.random() - 0.5) * 200,
        vx: 0, vy: 0, connections: 0,
      });
    }

    for (const ev of EVENTS) {
      const id = `ev-${ev.year}-${ev.title}`;
      nodes.push({
        id, label: ev.title, type: 'event', group: ev.era,
        x: W / 2 + (Math.random() - 0.5) * 300, y: H / 2 + (Math.random() - 0.5) * 300,
        vx: 0, vy: 0, connections: 0, data: ev,
      });
      links.push({ source: `era-${ev.era}`, target: id, type: 'era-event' });
    }

    // Surface the parallel-history events that a figure actually links to
    // (and that aren't already core EVENTS), so figure-event edges resolve
    // without flooding the graph with every background node.
    const coreEventTitles = new Set(EVENTS.map(e => e.title));
    const linkedEventTitles = new Set(FIGURE_EVENT_LINKS.map(l => l.eventTitle));
    for (const ev of PARALLEL_EVENTS) {
      if (coreEventTitles.has(ev.title) || !linkedEventTitles.has(ev.title)) continue;
      const id = `ev-${ev.year}-${ev.title}`;
      if (getNode(id)) continue;
      nodes.push({
        id, label: ev.title, type: 'event', group: ev.era,
        x: W / 2 + (Math.random() - 0.5) * 300, y: H / 2 + (Math.random() - 0.5) * 300,
        vx: 0, vy: 0, connections: 0, data: ev,
      });
      links.push({ source: `era-${ev.era}`, target: id, type: 'era-event' });
    }

    for (const f of FIGURES) {
      const id = `fig-${f.name}`;
      nodes.push({
        id, label: f.name, type: 'figure', group: f.era,
        x: W / 2 + (Math.random() - 0.5) * 300, y: H / 2 + (Math.random() - 0.5) * 300,
        vx: 0, vy: 0, connections: 0, data: f,
      });
      links.push({ source: `era-${f.era}`, target: id, type: 'era-figure' });
    }

    for (const rel of FIGURE_RELATIONS) {
      const sid = `fig-${rel.source}`;
      const tid = `fig-${rel.target}`;
      if (getNode(sid) && getNode(tid)) {
        links.push({ source: sid, target: tid, type: rel.type, desc: rel.desc });
        const sn = getNode(sid);
        const tn = getNode(tid);
        if (sn) sn.connections++;
        if (tn) tn.connections++;
      }
    }

    for (const link of FIGURE_EVENT_LINKS) {
      const figId = `fig-${link.figure}`;
      const evNode = nodes.find(n => n.type === 'event' && n.data?.title === link.eventTitle);
      if (evNode && getNode(figId)) {
        links.push({ source: figId, target: evNode.id, type: 'figure-event' });
        const fn = getNode(figId);
        if (fn) fn.connections++;
      }
    }

    for (let i = 0; i < ERAS.length - 1; i++) {
      links.push({ source: `era-${ERAS[i].id}`, target: `era-${ERAS[i + 1].id}`, type: 'era-seq' });
    }
  }

  function getNode(id) {
    return nodes.find(n => n.id === id);
  }

  function getConnectedNodes(nodeId) {
    const connected = new Set();
    for (const link of links) {
      const sid = typeof link.source === 'string' ? link.source : link.source.id;
      const tid = typeof link.target === 'string' ? link.target : link.target.id;
      if (sid === nodeId) connected.add(tid);
      if (tid === nodeId) connected.add(sid);
    }
    return connected;
  }

  function simulate() {
    for (const link of links) {
      const s = getNode(typeof link.source === 'string' ? link.source : link.source.id);
      const t = getNode(typeof link.target === 'string' ? link.target : link.target.id);
      if (!s || !t) continue;
      const dx = t.x - s.x;
      const dy = t.y - s.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const restLen = link.type === 'era-seq' ? 200 : (link.type === 'teacher' || link.type === 'influence') ? 100 : 80;
      const strength = link.type === 'era-seq' ? 0.001 : 0.004;
      const f = (d - restLen) * strength;
      s.vx += dx / d * f;
      s.vy += dy / d * f;
      t.vx -= dx / d * f;
      t.vy -= dy / d * f;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        if (d < 200) {
          const f = -60 / (d * d);
          a.vx += dx / d * f;
          a.vy += dy / d * f;
          b.vx -= dx / d * f;
          b.vy -= dy / d * f;
        }
      }
    }

    const cx = W / 2, cy = H / 2;
    for (const n of nodes) {
      n.vx += (cx - n.x) * 0.0005;
      n.vy += (cy - n.y) * 0.0005;
      n.vx *= 0.85;
      n.vy *= 0.85;
      if (n !== dragging) {
        n.x += n.vx;
        n.y += n.vy;
      }
    }
  }

  function isVisible(n) {
    if (filter === 'all') return true;
    if (filter === 'era') return n.type === 'era';
    if (filter === 'event') return n.type === 'event' || n.type === 'era';
    if (filter === 'figure') return n.type === 'figure' || n.type === 'era';
    return true;
  }

  function matchesSearch(n) {
    if (!searchTerm) return true;
    return n.label.toLowerCase().includes(searchTerm);
  }

  function draw() {
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    const connectedToSelected = selectedNode ? getConnectedNodes(selectedNode.id) : new Set();
    const connectedToHover = hoverNode ? getConnectedNodes(hoverNode.id) : new Set();

    for (const link of links) {
      const sid = typeof link.source === 'string' ? link.source : link.source.id;
      const tid = typeof link.target === 'string' ? link.target : link.target.id;
      const s = getNode(sid);
      const t = getNode(tid);
      if (!s || !t) continue;
      if (!isVisible(s) || !isVisible(t)) continue;

      const isRelation = RELATION_COLORS[link.type];
      const isHighlighted = selectedNode && (sid === selectedNode.id || tid === selectedNode.id);
      const isHoverHighlighted = hoverNode && (sid === hoverNode.id || tid === hoverNode.id);

      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(t.x, t.y);

      if (isRelation) {
        ctx.strokeStyle = RELATION_COLORS[link.type];
        ctx.globalAlpha = isHighlighted ? 0.9 : isHoverHighlighted ? 0.6 : 0.15;
        ctx.lineWidth = isHighlighted ? 2.5 : 1.2;
        ctx.setLineDash([]);
      } else if (link.type === 'era-seq') {
        ctx.strokeStyle = 'rgba(200,169,81,0.3)';
        ctx.globalAlpha = 1;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([]);
      } else {
        ctx.strokeStyle = 'rgba(160,145,110,0.08)';
        ctx.globalAlpha = 1;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([3, 3]);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }

    for (const n of nodes) {
      if (!isVisible(n)) continue;
      const isDimmed = searchTerm && !matchesSearch(n);
      const isSelected = selectedNode && n.id === selectedNode.id;
      const isConnected = selectedNode && connectedToSelected.has(n.id);
      const isHovered = hoverNode && n.id === hoverNode.id;
      const isHoverConnected = hoverNode && connectedToHover.has(n.id);

      let r = NODE_SIZES[n.type] || 4;
      if (isSelected) r *= 1.6;
      else if (isHovered) r *= 1.3;
      else if (n.connections > 3) r *= 1.2;

      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);

      if (n.type === 'era') {
        ctx.fillStyle = ERAS.find(e => e.id === n.group)?.color || '#c8a951';
        ctx.globalAlpha = isDimmed ? 0.15 : 0.9;
        ctx.fill();
        ctx.strokeStyle = '#f4e8c1';
        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        ctx.globalAlpha = isDimmed ? 0.1 : 0.8;
        ctx.stroke();
      } else if (n.type === 'figure') {
        ctx.fillStyle = NODE_COLORS.figure;
        ctx.globalAlpha = isDimmed ? 0.08 : (selectedNode ? (isConnected ? 0.9 : 0.15) : (isHoverConnected ? 0.8 : 0.55));
        ctx.fill();
        if (isSelected || isHovered) {
          ctx.strokeStyle = '#e8d48b';
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.8;
          ctx.stroke();
        }
      } else {
        ctx.fillStyle = NODE_COLORS.event;
        ctx.globalAlpha = isDimmed ? 0.05 : (selectedNode ? (isConnected ? 0.7 : 0.08) : 0.35);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const showLabel = n.type === 'era' || isSelected || isHovered ||
        (n.type === 'figure' && !selectedNode && !searchTerm) ||
        (searchTerm && matchesSearch(n));
      if (showLabel) {
        ctx.font = n.type === 'era' ? 'bold 13px "Noto Serif SC", serif' :
          n.type === 'figure' ? '11px "Noto Serif SC", serif' : '9px "Noto Serif SC", serif';
        ctx.fillStyle = n.type === 'era' ? '#f4e8c1' :
          isSelected ? '#f1e5c0' : '#a0916e';
        ctx.textAlign = 'center';
        ctx.globalAlpha = isDimmed ? 0.15 : 1;
        ctx.fillText(n.label, n.x, n.y + r + 14);
        ctx.globalAlpha = 1;
      }
    }

    ctx.restore();
  }

  let converged = false;
  let convergeFrames = 0;

  function loop() {
    if (!converged) {
      simulate();
      let totalV = 0;
      for (const n of nodes) totalV += Math.abs(n.vx) + Math.abs(n.vy);
      if (totalV < 0.5) { convergeFrames++; } else { convergeFrames = 0; }
      if (convergeFrames > 30) converged = true;
    }
    draw();
    _tick = requestAnimationFrame(loop);
  }

  function getNodeAt(mx, my) {
    const x = (mx - pan.x) / zoom;
    const y = (my - pan.y) / zoom;
    let closest = null;
    let minD = 25;
    for (const n of nodes) {
      if (!isVisible(n)) continue;
      const d = Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2);
      if (d < minD) { minD = d; closest = n; }
    }
    return closest;
  }

  function showDetailPanel(node) {
    selectedNode = node;
    detailPanel.innerHTML = '';

    if (!node) {
      detailPanel.classList.remove('open');
      return;
    }

    detailPanel.classList.add('open');

    const closeBtn = el('button', { class: 'gp-close', onClick: () => { selectedNode = null; detailPanel.classList.remove('open'); detailPanel.innerHTML = ''; } });
    closeBtn.textContent = '✕';
    detailPanel.appendChild(closeBtn);

    if (node.type === 'figure' && node.data) {
      renderFigureDetail(detailPanel, node.data, nodes, showDetailPanel);
    } else if (node.type === 'event' && node.data) {
      renderEventDetail(detailPanel, node.data, nodes, showDetailPanel);
    } else if (node.type === 'era') {
      const era = ERAS.find(e => e.id === node.group);
      if (era) renderEraDetail(detailPanel, era);
    }
  }

  canvas.addEventListener('mousedown', (e) => {
    converged = false; convergeFrames = 0;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    dragMoved = false;
    pressPos = { x: mx, y: my };
    const node = getNodeAt(mx, my);
    if (node) {
      dragging = node;
    } else {
      isPanning = true;
      panStart = { x: mx - pan.x, y: my - pan.y };
    }
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    if ((dragging || isPanning) && Math.hypot(mx - pressPos.x, my - pressPos.y) > 4) dragMoved = true;
    if (dragging) {
      dragging.x = (mx - pan.x) / zoom;
      dragging.y = (my - pan.y) / zoom;
      dragging.vx = 0;
      dragging.vy = 0;
    } else if (isPanning) {
      pan.x = mx - panStart.x;
      pan.y = my - panStart.y;
    } else {
      hoverNode = getNodeAt(mx, my);
      canvas.style.cursor = hoverNode ? 'pointer' : 'grab';
    }
  });

  canvas.addEventListener('mouseup', () => {
    dragging = null;
    isPanning = false;
  });

  canvas.addEventListener('click', (e) => {
    if (dragMoved) { dragMoved = false; return; }
    const rect = canvas.getBoundingClientRect();
    const node = getNodeAt(e.clientX - rect.left, e.clientY - rect.top);
    if (node) {
      showDetailPanel(node);
    } else {
      showDetailPanel(null);
    }
  });

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.2, Math.min(4, zoom * delta));
    pan.x = mx - (mx - pan.x) * (newZoom / zoom);
    pan.y = my - (my - pan.y) * (newZoom / zoom);
    zoom = newZoom;
  }, { passive: false });

  searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value.trim().toLowerCase();
  });

  resize();
  buildGraph();
  loop();
  _resizeFn = () => { resize(); draw(); };
  window.addEventListener('resize', _resizeFn);
}
