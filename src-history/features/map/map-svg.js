import { CAT_COLORS, CAT_LABELS, ERAS, REGION_LABELS, formatYear } from '@/content/human-history/data/index.js';
import { projectGeo } from '@/content/human-history/data/geo-events.js';
import { icon } from '../../lib/icons.js';
import {
  COUNTRY_PATHS,
  HISTORIC_ROUTES,
  LAND_PATHS,
  MAP_H,
  MAP_W,
  REFERENCE_BOUNDARIES,
  WORLD_LANDMASSES,
  geoLinePath,
  geoPolygonPath,
  projectLabel,
} from './world-map.js';

export { MAP_H, MAP_W } from './world-map.js';

function svgDefs() {
  return `
    <defs>
      <filter id="wobble" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="5"/>
        <feDisplacementMap in="SourceGraphic" scale="4" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <filter id="wobble-soft" x="-3%" y="-3%" width="106%" height="106%">
        <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="12"/>
        <feDisplacementMap in="SourceGraphic" scale="2" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <radialGradient id="sea-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--gold)" stop-opacity="0.04"/>
        <stop offset="100%" stop-color="var(--gold)" stop-opacity="0"/>
      </radialGradient>
      <pattern id="paper-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        ${Array.from({ length: 8 }, (_, i) => {
          const cx = Math.round(Math.abs(Math.sin(i * 7.3) * 40));
          const cy = Math.round(Math.abs(Math.cos(i * 13.1) * 40));
          const r = (Math.abs(Math.sin(i * 3.7)) * 0.8 + 0.3).toFixed(1);
          return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--gold)" opacity="0.15"/>`;
        }).join('')}
      </pattern>
    </defs>`;
}

function drawSea() {
  return `
    <rect width="${MAP_W}" height="${MAP_H}" fill="var(--bg)"/>
    <rect width="${MAP_W}" height="${MAP_H}" fill="url(#sea-glow)"/>
    <rect width="${MAP_W}" height="${MAP_H}" fill="url(#paper-dots)" opacity="0.4"/>
    ${Array.from({ length: 8 }, (_, i) => {
      const y = 60 + i * 70;
      return `<line x1="0" y1="${y}" x2="${MAP_W}" y2="${y}" stroke="var(--gold)" stroke-width="0.5" stroke-dasharray="3 12" opacity="0.06"/>`;
    }).join('')}
    ${Array.from({ length: 12 }, (_, i) => {
      const x = 50 + i * 100;
      return `<line x1="${x}" y1="0" x2="${x}" y2="${MAP_H}" stroke="var(--gold)" stroke-width="0.5" stroke-dasharray="3 12" opacity="0.06"/>`;
    }).join('')}
    ${Array.from({ length: 15 }, (_, i) => {
      const x = 50 + Math.abs(Math.sin(i * 5.7)) * (MAP_W - 100);
      const y = 50 + Math.abs(Math.cos(i * 3.3)) * (MAP_H - 100);
      const len = 20 + Math.abs(Math.sin(i * 2.1)) * 40;
      return `<path d="M${x} ${y} Q${x + len / 2} ${y - 3} ${x + len} ${y}" fill="none" stroke="var(--gold)" stroke-width="0.6" opacity="0.05"/>`;
    }).join('')}`;
}

function drawContinents(activeRegion) {
  let html = '';
  for (const [id, continent] of Object.entries(WORLD_LANDMASSES)) {
    const isActive = activeRegion === id;
    const baseOpacity = isActive ? 0.22 : 0.012;
    const strokeOpacity = isActive ? 0.65 : 0;
    for (const polygon of continent.polygons) {
      const path = geoPolygonPath(polygon);
      html += `<g class="map-continent" data-region="${id}" style="cursor:pointer">
        <path d="${path}" fill="${continent.color}" fill-opacity="${baseOpacity}" stroke="${continent.color}" stroke-width="${isActive ? 1.6 : 0}" stroke-opacity="${strokeOpacity}" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
      </g>`;
    }
    const label = projectLabel(continent.label);
    html += `<text x="${label.x}" y="${label.y}" text-anchor="middle" fill="var(--parchment)" font-size="16" font-family="'Noto Serif SC',serif" font-weight="600" opacity="${isActive ? 0.9 : 0.55}" filter="url(#wobble-soft)" class="map-label" data-region="${id}" style="cursor:pointer">${REGION_LABELS[id] || id}</text>`;
  }
  return html;
}

function drawCountryLayer() {
  const land = LAND_PATHS.map(path => `<path d="${path}" class="map-land-shape"/>`).join('');
  const countries = COUNTRY_PATHS.map(country =>
    `<path d="${country.path}" class="map-country-boundary" data-country="${country.name}"><title>${country.name}</title></path>`
  ).join('');

  return `<g class="map-country-layer" aria-label="Natural Earth 国家边界">
    <g class="map-land-layer">${land}</g>
    <g class="map-country-boundaries">${countries}</g>
  </g>`;
}

function drawRoutes() {
  const routes = HISTORIC_ROUTES.map(route => {
    const label = projectLabel(route.labelAt);
    return `<path d="${geoLinePath(route.points)}" fill="none" stroke="var(--gold)" stroke-width="1.2" stroke-dasharray="4 6" stroke-linecap="round" stroke-linejoin="round" opacity="0.58" filter="url(#wobble-soft)" vector-effect="non-scaling-stroke"/>
      <text x="${label.x}" y="${label.y}" fill="var(--gold)" font-size="8.5" font-family="'Noto Serif SC',serif" opacity="0.56">${route.label}</text>`;
  }).join('');

  return `<g class="map-routes" opacity="0.32">${routes}</g>`;
}

function drawReferenceBoundaries(showBoundaries) {
  if (!showBoundaries) return '';
  const lines = REFERENCE_BOUNDARIES.map(boundary =>
    `<path d="${geoLinePath(boundary.points)}" class="map-reference-line" data-boundary="${boundary.id}"/>`
  ).join('');

  return `<g class="map-reference-boundaries" aria-label="地理参考边界">${lines}</g>`;
}

function drawCompass() {
  return `<g transform="translate(1130, 530)" opacity="0.2">
    <circle cx="0" cy="0" r="28" fill="none" stroke="var(--gold)" stroke-width="1"/>
    <line x1="0" y1="-28" x2="0" y2="28" stroke="var(--gold)" stroke-width="0.8"/>
    <line x1="-28" y1="0" x2="28" y2="0" stroke="var(--gold)" stroke-width="0.8"/>
    <path d="M0 -28 L-4 -20 L4 -20Z" fill="var(--gold)"/>
    <text x="0" y="-32" text-anchor="middle" fill="var(--gold)" font-size="10" font-family="'Noto Serif SC',serif">N</text>
  </g>`;
}

function escapeAttr(value) {
  return String(value).replace(/[&"]/g, char => ({ '&': '&amp;', '"': '&quot;' }[char]));
}

function getMarkerScale(viewBox) {
  if (!viewBox) return 1;
  const zoomRatio = viewBox.w / MAP_W;
  return Math.max(0.34, Math.min(1, Math.pow(zoomRatio, 1.32)));
}

function layoutEventMarkers(events, viewBox) {
  const zoomRatio = viewBox ? viewBox.w / MAP_W : 1;
  const collisionDistance = 18 * Math.max(0.35, zoomRatio);
  const clusters = [];

  for (const event of events) {
    const anchor = projectGeo(event.lng, event.lat, MAP_W, MAP_H);
    let cluster = clusters.find(item => Math.hypot(anchor.x - item.x, anchor.y - item.y) < collisionDistance);
    if (!cluster) {
      cluster = { x: anchor.x, y: anchor.y, items: [] };
      clusters.push(cluster);
    }
    cluster.items.push({ event, anchor });
    cluster.x = cluster.items.reduce((sum, item) => sum + item.anchor.x, 0) / cluster.items.length;
    cluster.y = cluster.items.reduce((sum, item) => sum + item.anchor.y, 0) / cluster.items.length;
  }

  return clusters.flatMap(cluster => {
    const clusterTitles = cluster.items
      .map(item => item.event.title)
      .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));

    if (cluster.items.length === 1) {
      const item = cluster.items[0];
      return [{ ...item, x: item.anchor.x, y: item.anchor.y, clusterSize: 1, clusterIndex: 0, clusterTitles }];
    }

    const spread = Math.min(28, 9 + cluster.items.length * 1.45) * Math.max(0.42, zoomRatio);
    return cluster.items
      .sort((a, b) => a.event.year - b.event.year)
      .map((item, index) => {
        const angle = -Math.PI / 2 + (Math.PI * 2 * index) / cluster.items.length;
        return {
          ...item,
          x: item.anchor.x + Math.cos(angle) * spread,
          y: item.anchor.y + Math.sin(angle) * spread,
          clusterSize: cluster.items.length,
          clusterIndex: index,
          clusterTitles,
        };
      });
  });
}

function drawEventMarkers(events, hoveredTitle, viewBox) {
  let html = '';
  const markerScale = getMarkerScale(viewBox);
  for (const marker of layoutEventMarkers(events, viewBox)) {
    const { event, anchor, x, y, clusterSize, clusterIndex, clusterTitles } = marker;
    const catColor = CAT_COLORS[event.cat] || '#c8a951';
    const isHovered = hoveredTitle === event.title;
    const isDisplaced = Math.hypot(x - anchor.x, y - anchor.y) > 1.5;
    const hitRadius = (clusterSize > 1 ? 13 : 14) * Math.max(0.58, markerScale);
    const haloRadius = (isHovered ? 13 : 9) * markerScale;
    const coreRadius = (isHovered ? 6.8 : 4.6) * markerScale;
    const ringRadius = (isHovered ? 10 : 7) * markerScale;

    html += `<g class="map-marker" data-title="${escapeAttr(event.title)}" data-x="${x.toFixed(1)}" data-y="${y.toFixed(1)}" data-marker-scale="${markerScale.toFixed(3)}" data-cluster-size="${clusterSize}" data-cluster-index="${clusterIndex}" data-cluster-titles="${escapeAttr(clusterTitles.join('||'))}">
      ${isDisplaced ? `<line class="map-marker-stem" x1="${anchor.x.toFixed(1)}" y1="${anchor.y.toFixed(1)}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${catColor}"/>` : ''}
      ${isDisplaced ? `<circle class="map-marker-anchor" cx="${anchor.x.toFixed(1)}" cy="${anchor.y.toFixed(1)}" r="${Math.max(1.1, 2.2 * markerScale).toFixed(2)}" fill="${catColor}"/>` : ''}
      <circle class="map-marker-hit" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${hitRadius.toFixed(2)}" fill="transparent"/>
      <circle class="map-marker-halo" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${haloRadius.toFixed(2)}" fill="${catColor}" opacity="0.14"/>
      <circle class="map-marker-core" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${coreRadius.toFixed(2)}" fill="${catColor}" opacity="${isHovered ? 0.96 : 0.76}" stroke="var(--bg)" stroke-width="${(1.6 * markerScale).toFixed(2)}" filter="url(#wobble-soft)"/>
      <circle class="map-marker-ring" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${ringRadius.toFixed(2)}" fill="none" stroke="${catColor}" stroke-width="${(1.2 * markerScale).toFixed(2)}" opacity="${isHovered ? 0.4 : 0}"/>
      ${clusterSize > 1 && clusterIndex === 0 ? `<text class="map-marker-cluster-count" x="${(x + 7 * markerScale).toFixed(1)}" y="${(y - 7 * markerScale).toFixed(1)}">${clusterSize}</text>` : ''}
    </g>`;
  }
  return html;
}

export function drawMapTooltip(event, pos) {
  if (!event) return '';
  const catColor = CAT_COLORS[event.cat] || '#c8a951';
  const era = ERAS.find(item => item.id === event.era);
  const tx = pos.x > MAP_W * 0.7 ? pos.x - 200 : pos.x + 20;
  const ty = pos.y > MAP_H * 0.7 ? pos.y - 80 : pos.y + 20;

  return `<g class="map-tooltip" transform="translate(${tx}, ${ty})">
    <rect x="0" y="0" width="190" height="85" rx="6" fill="var(--bg-card)" stroke="${catColor}" stroke-width="1" opacity="0.95" filter="url(#wobble-soft)"/>
    <text x="12" y="20" fill="${catColor}" font-size="10" font-family="'Noto Sans SC',sans-serif">${formatYear(event.year)} · ${CAT_LABELS[event.cat] || event.cat}</text>
    <text x="12" y="38" fill="var(--parchment)" font-size="13" font-family="'Noto Serif SC',serif" font-weight="600">${event.title}</text>
    <text x="12" y="55" fill="var(--parchment-dim)" font-size="9" font-family="'Noto Sans SC',sans-serif">${era ? era.name : ''} · ${REGION_LABELS[event.region] || event.region}</text>
    <text x="12" y="75" fill="${catColor}" font-size="9" font-family="'Noto Sans SC',sans-serif" opacity="0.7">${icon('mdi:book-open-page-variant', 10)} 点击阅读故事</text>
  </g>`;
}

function getViewBox(viewBox) {
  if (!viewBox) return `0 0 ${MAP_W} ${MAP_H}`;
  return `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`;
}

export function createMapSvg({
  events,
  activeRegion,
  hoveredTitle,
  tooltipEvent,
  tooltipPosition,
  viewBox,
  showBoundaries,
}) {
  return `<svg viewBox="${getViewBox(viewBox)}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;border-radius:12px;border:1px solid var(--border);background:var(--bg)">
    ${svgDefs()}
    ${drawSea()}
    ${drawCountryLayer()}
    ${drawContinents(activeRegion)}
    ${drawReferenceBoundaries(showBoundaries)}
    ${drawRoutes()}
    ${drawCompass()}
    ${drawEventMarkers(events, hoveredTitle, viewBox)}
    <g class="map-tooltip-layer">${tooltipEvent ? drawMapTooltip(tooltipEvent, tooltipPosition) : ''}</g>
  </svg>`;
}

export function updateMapMarkerStyles(svgEl, { hoveredTitle, selectedTitle, tooltipEvent, tooltipPosition }) {
  const tooltipLayer = svgEl.querySelector('.map-tooltip-layer');
  if (tooltipLayer) {
    tooltipLayer.innerHTML = tooltipEvent ? drawMapTooltip(tooltipEvent, tooltipPosition) : '';
  }
  svgEl.querySelectorAll('.map-marker').forEach(marker => {
    const title = marker.dataset.title;
    const isHovered = title === hoveredTitle || title === selectedTitle;
    const core = marker.querySelector('.map-marker-core');
    const halo = marker.querySelector('.map-marker-halo');
    const ring = marker.querySelector('.map-marker-ring');
    const markerScale = Number(marker.dataset.markerScale || 1);
    core?.setAttribute('r', ((isHovered ? 6.8 : 4.6) * markerScale).toFixed(2));
    core?.setAttribute('opacity', isHovered ? 0.96 : 0.76);
    halo?.setAttribute('r', ((isHovered ? 13 : 9) * markerScale).toFixed(2));
    halo?.setAttribute('opacity', isHovered ? 0.18 : 0.1);
    ring?.setAttribute('r', ((isHovered ? 10 : 7) * markerScale).toFixed(2));
    ring?.setAttribute('opacity', isHovered ? 0.4 : 0);
  });
}
