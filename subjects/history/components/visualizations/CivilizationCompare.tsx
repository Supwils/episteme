'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Dimension {
  key: string;
  label: string;
  icon: string;
}

interface Civilization {
  id: string;
  name: string;
  color: string;
  peak: string;
  capital: string;
  founded: string;
  ended: string;
  fact: string;
  scores: Record<string, number>;
}

const DIMENSIONS: Dimension[] = [
  { key: 'military', label: '军事力量', icon: '⚔️' },
  { key: 'economy', label: '经济产出', icon: '💰' },
  { key: 'culture', label: '文化影响', icon: '🏛️' },
  { key: 'technology', label: '技术创新', icon: '⚙️' },
  { key: 'territory', label: '疆域面积', icon: '🗺️' },
  { key: 'longevity', label: '存续时长', icon: '⏳' },
];

const CIVILIZATIONS: Civilization[] = [
  {
    id: 'roman',
    name: '罗马帝国',
    color: '#c8443a',
    peak: '公元117年',
    capital: '罗马',
    founded: '公元前27年',
    ended: '公元476年',
    fact: '罗马帝国鼎盛时期疆域覆盖500万平方公里，建立了发达的法律体系、道路网络和城市基础设施，其法律思想深刻影响了整个西方文明。',
    scores: { military: 9, economy: 8, culture: 9, technology: 7, territory: 8, longevity: 7 },
  },
  {
    id: 'han',
    name: '汉朝',
    color: '#c8a951',
    peak: '公元前100年',
    capital: '长安',
    founded: '公元前206年',
    ended: '公元220年',
    fact: '汉朝开辟了丝绸之路，发明了造纸术，确立了儒家思想的主导地位。"汉族"之名即源于此朝，奠定了中华文明的根基。',
    scores: { military: 8, economy: 9, culture: 9, technology: 8, territory: 8, longevity: 8 },
  },
  {
    id: 'persian',
    name: '波斯帝国',
    color: '#4a148c',
    peak: '公元前480年',
    capital: '波斯波利斯',
    founded: '公元前550年',
    ended: '公元前330年',
    fact: '阿契美尼德波斯帝国是世界上第一个真正的超级帝国，建立了高效的行省制度和皇家大道，推行宗教宽容政策，治理多元文化帝国。',
    scores: { military: 8, economy: 7, culture: 8, technology: 6, territory: 9, longevity: 5 },
  },
  {
    id: 'egyptian',
    name: '古埃及',
    color: '#2d6a4f',
    peak: '公元前1400年',
    capital: '孟菲斯/底比斯',
    founded: '公元前3100年',
    ended: '公元前30年',
    fact: '古埃及文明延续了三千年，建造了金字塔和狮身人面像，发明了象形文字和纸莎草纸，在医学、天文学方面成就卓著。',
    scores: { military: 6, economy: 7, culture: 9, technology: 7, territory: 5, longevity: 10 },
  },
  {
    id: 'maya',
    name: '玛雅文明',
    color: '#2b4a73',
    peak: '公元600年',
    capital: '蒂卡尔等城邦',
    founded: '公元前2000年',
    ended: '公元1500年',
    fact: '玛雅人独立发明了零的概念，建立了精确的历法系统，在天文学和数学方面的成就令人惊叹。他们的文字系统是美洲最复杂的书写体系。',
    scores: { military: 4, economy: 5, culture: 8, technology: 7, territory: 3, longevity: 9 },
  },
  {
    id: 'mongol',
    name: '蒙古帝国',
    color: '#6b4226',
    peak: '公元1279年',
    capital: '哈拉和林/大都',
    founded: '公元1206年',
    ended: '公元1368年',
    fact: '蒙古帝国是人类历史上最大的连续陆地帝国，疆域达2400万平方公里。蒙古人建立了横跨欧亚的驿站系统，促进了东西方贸易与文化交流。',
    scores: { military: 10, economy: 5, culture: 5, technology: 4, territory: 10, longevity: 3 },
  },
  {
    id: 'ottoman',
    name: '奥斯曼帝国',
    color: '#8b1a1a',
    peak: '公元1683年',
    capital: '伊斯坦布尔',
    founded: '公元1299年',
    ended: '公元1922年',
    fact: '奥斯曼帝国存续超过六百年，控制了东西方贸易要道。其多元宗教共存的米利特制度和建筑艺术（如蓝色清真寺）影响深远。',
    scores: { military: 8, economy: 7, culture: 8, technology: 6, territory: 8, longevity: 9 },
  },
  {
    id: 'british',
    name: '大英帝国',
    color: '#1e3a5f',
    peak: '公元1920年',
    capital: '伦敦',
    founded: '公元1603年',
    ended: '公元1997年',
    fact: '大英帝国鼎盛时期统治了地球四分之一的土地和人口，英语成为全球通用语言。工业革命发源于此，深刻改变了人类文明的进程。',
    scores: { military: 9, economy: 9, culture: 8, technology: 9, territory: 10, longevity: 7 },
  },
];

const MAX_SELECTION = 3;
const CHART_SIZE = 420;
const CHART_CENTER = CHART_SIZE / 2;
const CHART_RADIUS = 160;
const RING_COUNT = 5;

function polarToCartesian(angle: number, radius: number): { x: number; y: number } {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CHART_CENTER + radius * Math.cos(rad),
    y: CHART_CENTER + radius * Math.sin(rad),
  };
}

function getAxisEndpoints(): { x1: number; y1: number; x2: number; y2: number; labelX: number; labelY: number }[] {
  const angleStep = 360 / DIMENSIONS.length;
  return DIMENSIONS.map((_, i) => {
    const angle = i * angleStep;
    const end = polarToCartesian(angle, CHART_RADIUS);
    const label = polarToCartesian(angle, CHART_RADIUS + 28);
    return { x1: CHART_CENTER, y1: CHART_CENTER, x2: end.x, y2: end.y, labelX: label.x, labelY: label.y };
  });
}

function getPolygonPoints(scores: Record<string, number>): string {
  const angleStep = 360 / DIMENSIONS.length;
  return DIMENSIONS.map((dim, i) => {
    const value = scores[dim.key] ?? 0;
    const radius = (value / 10) * CHART_RADIUS;
    const point = polarToCartesian(i * angleStep, radius);
    return `${point.x},${point.y}`;
  }).join(' ');
}

function getRingPath(radius: number): string {
  const angleStep = 360 / DIMENSIONS.length;
  const points = DIMENSIONS.map((_, i) => {
    const p = polarToCartesian(i * angleStep, radius);
    return `${p.x},${p.y}`;
  });
  return `M${points.join('L')}Z`;
}

interface HoverInfo {
  dimensionIndex: number;
  civilizationId: string;
  x: number;
  y: number;
}

export default function CivilizationCompare() {
  const [selected, setSelected] = useState<string[]>(['roman', 'han']);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
  const prefersReduced = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);

  const axisData = useMemo(() => getAxisEndpoints(), []);

  const toggleCivilization = useCallback(
    (id: string) => {
      setSelected((prev) => {
        if (prev.includes(id)) return prev.filter((c) => c !== id);
        if (prev.length >= MAX_SELECTION) return prev;
        return [...prev, id];
      });
    },
    [],
  );

  const selectedCivs = useMemo(
    () => CIVILIZATIONS.filter((c) => selected.includes(c.id)),
    [selected],
  );

  const handleDotHover = useCallback(
    (dimIndex: number, civId: string, e: React.MouseEvent) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      setHoverInfo({
        dimensionIndex: dimIndex,
        civilizationId: civId,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [],
  );

  const handleDotLeave = useCallback(() => setHoverInfo(null), []);

  const hoverCiv = hoverInfo ? CIVILIZATIONS.find((c) => c.id === hoverInfo.civilizationId) : null;
  const hoverDim = hoverInfo ? DIMENSIONS[hoverInfo.dimensionIndex] : null;
  const hoverValue = hoverCiv && hoverDim ? hoverCiv.scores[hoverDim.key] : null;

  return (
    <section className="civ-compare">
      <header className="civ-compare__header">
        <h2 className="civ-compare__title">文明比较矩阵</h2>
        <p className="civ-compare__subtitle">
          选择最多 {MAX_SELECTION} 个文明，通过六维雷达图对比它们的综合实力
        </p>
      </header>

      <div className="civ-compare__body">
        <aside className="civ-compare__selector" role="group" aria-label="选择文明">
          {CIVILIZATIONS.map((civ) => {
            const isSelected = selected.includes(civ.id);
            const isDisabled = !isSelected && selected.length >= MAX_SELECTION;
            return (
              <label
                key={civ.id}
                className={`civ-option${isSelected ? ' civ-option--selected' : ''}${isDisabled ? ' civ-option--disabled' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  disabled={isDisabled}
                  onChange={() => toggleCivilization(civ.id)}
                  className="civ-option__input"
                />
                <span className="civ-option__swatch" style={{ backgroundColor: civ.color }} />
                <span className="civ-option__name">{civ.name}</span>
                <span className="civ-option__peak">{civ.peak}</span>
              </label>
            );
          })}
        </aside>

        <div className="civ-compare__chart-wrap">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
            className="civ-compare__svg"
            role="img"
            aria-label="文明比较雷达图"
          >
            <defs>
              {selectedCivs.map((civ) => (
                <linearGradient key={`grad-${civ.id}`} id={`grad-${civ.id}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={civ.color} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={civ.color} stopOpacity={0.08} />
                </linearGradient>
              ))}
            </defs>

            {Array.from({ length: RING_COUNT }, (_, i) => {
              const radius = ((i + 1) / RING_COUNT) * CHART_RADIUS;
              return (
                <path
                  key={`ring-${i}`}
                  d={getRingPath(radius)}
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth={i === RING_COUNT - 1 ? 1.2 : 0.6}
                  opacity={0.5}
                />
              );
            })}

            {axisData.map((axis, i) => (
              <line
                key={`axis-${i}`}
                x1={axis.x1}
                y1={axis.y1}
                x2={axis.x2}
                y2={axis.y2}
                stroke="var(--border)"
                strokeWidth={0.6}
                opacity={0.4}
              />
            ))}

            {axisData.map((axis, i) => (
              <text
                key={`label-${i}`}
                x={axis.labelX}
                y={axis.labelY}
                textAnchor="middle"
                dominantBaseline="central"
                className="civ-compare__axis-label"
              >
                {DIMENSIONS[i]?.icon} {DIMENSIONS[i]?.label}
              </text>
            ))}

            {Array.from({ length: RING_COUNT }, (_, i) => {
              const value = ((i + 1) / RING_COUNT) * 10;
              const pos = polarToCartesian(315, ((i + 1) / RING_COUNT) * CHART_RADIUS + 2);
              return (
                <text
                  key={`ring-label-${i}`}
                  x={pos.x + 6}
                  y={pos.y - 4}
                  className="civ-compare__ring-label"
                >
                  {value}
                </text>
              );
            })}

            {selectedCivs.map((civ) => (
              <motion.polygon
                key={civ.id}
                points={getPolygonPoints(civ.scores)}
                fill={`url(#grad-${civ.id})`}
                stroke={civ.color}
                strokeWidth={2}
                initial={prefersReduced ? undefined : { opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReduced ? undefined : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${CHART_CENTER}px ${CHART_CENTER}px` }}
              />
            ))}

            {selectedCivs.map((civ) =>
              DIMENSIONS.map((dim, i) => {
                const angleStep = 360 / DIMENSIONS.length;
                const value = civ.scores[dim.key] ?? 0;
                const radius = (value / 10) * CHART_RADIUS;
                const point = polarToCartesian(i * angleStep, radius);
                return (
                  <circle
                    key={`dot-${civ.id}-${dim.key}`}
                    cx={point.x}
                    cy={point.y}
                    r={4}
                    fill={civ.color}
                    stroke="var(--bg)"
                    strokeWidth={1.5}
                    className="civ-compare__dot"
                    onMouseEnter={(e) => handleDotHover(i, civ.id, e)}
                    onMouseLeave={handleDotLeave}
                  />
                );
              }),
            )}
          </svg>

          {hoverInfo && hoverCiv && hoverDim && hoverValue !== null && (
            <div
              className="civ-compare__tooltip"
              style={{
                left: hoverInfo.x,
                top: hoverInfo.y - 48,
              }}
            >
              <span style={{ color: hoverCiv.color, fontWeight: 600 }}>{hoverCiv.name}</span>
              <span>{hoverDim.icon} {hoverDim.label}</span>
              <span className="civ-compare__tooltip-value">{hoverValue}/10</span>
            </div>
          )}
        </div>
      </div>

      {selectedCivs.length > 0 && (
        <div className="civ-compare__facts">
          {selectedCivs.map((civ) => (
            <motion.article
              key={civ.id}
              className="civ-fact-card"
              initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ borderLeftColor: civ.color }}
            >
              <div className="civ-fact-card__header">
                <span className="civ-fact-card__swatch" style={{ backgroundColor: civ.color }} />
                <h3 className="civ-fact-card__name">{civ.name}</h3>
              </div>
              <div className="civ-fact-card__meta">
                <span>🏛 首都: {civ.capital}</span>
                <span>📅 建立: {civ.founded}</span>
                <span>📅 终结: {civ.ended}</span>
                <span>⭐ 鼎盛: {civ.peak}</span>
              </div>
              <p className="civ-fact-card__desc">{civ.fact}</p>
              <div className="civ-fact-card__scores">
                {DIMENSIONS.map((dim) => {
                  const val = civ.scores[dim.key] ?? 0;
                  return (
                    <div key={dim.key} className="civ-fact-score">
                      <span className="civ-fact-score__label">{dim.icon} {dim.label}</span>
                      <div className="civ-fact-score__bar-track">
                        <motion.div
                          className="civ-fact-score__bar-fill"
                          style={{ backgroundColor: civ.color }}
                          initial={prefersReduced ? undefined : { width: 0 }}
                          animate={{ width: `${(val / 10) * 100}%` }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                      <span className="civ-fact-score__value">{val}</span>
                    </div>
                  );
                })}
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {selectedCivs.length === 0 && (
        <div className="civ-compare__empty">
          <p>请从上方选择文明以开始对比</p>
        </div>
      )}
    </section>
  );
}
