'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';

interface MapCity {
  id: string;
  name: string;
  x: number;
  y: number;
  startYear: number;
  endYear: number;
  civilization: string;
}

interface Civilization {
  id: string;
  name: string;
  color: string;
  startYear: number;
  endYear: number;
  path: string;
}

interface TradeRoute {
  id: string;
  name: string;
  path: string;
  startYear: number;
  endYear: number;
  color: string;
}

interface Battle {
  id: string;
  name: string;
  x: number;
  y: number;
  year: number;
}

interface Migration {
  id: string;
  name: string;
  path: string;
  startYear: number;
  endYear: number;
}

type LayerKey = 'civilizations' | 'tradeRoutes' | 'battles' | 'migrations';

const ERAS = [
  { label: '3000 BCE', value: -3000 },
  { label: '2000 BCE', value: -2000 },
  { label: '1000 BCE', value: -1000 },
  { label: '500 BCE', value: -500 },
  { label: '1 CE', value: 1 },
  { label: '500 CE', value: 500 },
  { label: '1000 CE', value: 1000 },
  { label: '1500 CE', value: 1500 },
  { label: '1800 CE', value: 1800 },
  { label: '2000 CE', value: 2000 },
];

const CONTINENT_PATHS = {
  africa: 'M 480 280 L 520 260 L 560 250 L 580 270 L 590 310 L 580 360 L 560 400 L 540 430 L 510 440 L 490 420 L 480 380 L 470 340 L 475 300 Z',
  europe: 'M 480 180 L 520 170 L 560 175 L 580 190 L 570 210 L 550 220 L 530 230 L 510 235 L 490 230 L 480 210 Z',
  asia: 'M 580 140 L 650 120 L 720 130 L 780 150 L 800 180 L 790 220 L 760 250 L 720 260 L 680 250 L 640 240 L 600 230 L 580 210 L 570 180 Z',
  northAmerica: 'M 120 120 L 180 100 L 240 110 L 280 140 L 290 180 L 270 220 L 240 250 L 200 260 L 160 250 L 130 220 L 120 180 Z',
  southAmerica: 'M 220 300 L 260 290 L 290 310 L 300 350 L 290 400 L 270 440 L 240 460 L 220 440 L 210 400 L 200 360 L 210 330 Z',
  oceania: 'M 760 340 L 800 330 L 830 350 L 820 380 L 790 390 L 770 370 Z',
};

const CIVILIZATIONS: Civilization[] = [
  { id: 'egypt', name: 'Egypt', color: '#D4A017', startYear: -3000, endYear: -30, path: 'M 520 270 L 540 260 L 555 265 L 550 285 L 535 290 L 520 285 Z' },
  { id: 'mesopotamia', name: 'Mesopotamia', color: '#C0392B', startYear: -3500, endYear: -539, path: 'M 580 220 L 600 210 L 615 215 L 610 235 L 595 240 L 580 235 Z' },
  { id: 'indus', name: 'Indus', color: '#E67E22', startYear: -3300, endYear: -1300, path: 'M 650 230 L 670 220 L 685 225 L 680 245 L 665 250 L 650 245 Z' },
  { id: 'china', name: 'China', color: '#E74C3C', startYear: -2070, endYear: 220, path: 'M 720 180 L 750 170 L 770 180 L 765 210 L 740 220 L 720 210 Z' },
  { id: 'greece', name: 'Greece', color: '#3498DB', startYear: -800, endYear: -146, path: 'M 540 210 L 555 205 L 560 215 L 555 225 L 545 225 L 540 220 Z' },
  { id: 'rome', name: 'Rome', color: '#9B59B6', startYear: -753, endYear: 476, path: 'M 520 200 L 540 195 L 550 205 L 545 220 L 530 225 L 520 215 Z' },
  { id: 'byzantine', name: 'Byzantine', color: '#8E44AD', startYear: 330, endYear: 1453, path: 'M 550 200 L 570 195 L 580 205 L 575 220 L 560 225 L 550 215 Z' },
  { id: 'islamic', name: 'Islamic Golden Age', color: '#27AE60', startYear: 750, endYear: 1258, path: 'M 570 220 L 610 210 L 640 220 L 635 250 L 600 260 L 570 250 Z' },
  { id: 'tang', name: 'Tang Dynasty', color: '#E74C3C', startYear: 618, endYear: 907, path: 'M 710 170 L 740 160 L 760 170 L 755 200 L 730 210 L 710 200 Z' },
  { id: 'hre', name: 'Holy Roman Empire', color: '#F39C12', startYear: 800, endYear: 1806, path: 'M 510 180 L 530 175 L 540 185 L 535 200 L 520 205 L 510 195 Z' },
  { id: 'ottoman', name: 'Ottoman', color: '#C0392B', startYear: 1299, endYear: 1922, path: 'M 550 200 L 580 195 L 590 210 L 585 230 L 565 235 L 550 225 Z' },
  { id: 'spanish', name: 'Spanish Empire', color: '#F1C40F', startYear: 1492, endYear: 1898, path: 'M 490 210 L 510 205 L 520 215 L 515 225 L 500 230 L 490 220 Z' },
  { id: 'british', name: 'British Empire', color: '#3498DB', startYear: 1583, endYear: 1997, path: 'M 490 180 L 505 175 L 510 185 L 505 195 L 495 195 L 490 190 Z' },
  { id: 'mughal', name: 'Mughal Empire', color: '#E67E22', startYear: 1526, endYear: 1857, path: 'M 650 220 L 670 215 L 680 225 L 675 245 L 660 250 L 650 240 Z' },
  { id: 'qing', name: 'Qing Dynasty', color: '#E74C3C', startYear: 1644, endYear: 1912, path: 'M 710 160 L 740 150 L 760 160 L 755 190 L 730 200 L 710 190 Z' },
];

const TRADE_ROUTES: TradeRoute[] = [
  { id: 'silk-road', name: 'Silk Road', path: 'M 740 190 Q 700 200 660 210 Q 620 220 580 225 Q 550 230 540 215', startYear: -130, endYear: 1453, color: '#F1C40F' },
  { id: 'spice-route', name: 'Spice Route', path: 'M 670 240 Q 640 260 600 270 Q 560 280 540 260 Q 520 240 510 220', startYear: -300, endYear: 1800, color: '#E67E22' },
  { id: 'trans-saharan', name: 'Trans-Saharan', path: 'M 500 280 Q 510 300 520 320 Q 530 340 540 360', startYear: -500, endYear: 1600, color: '#D4A017' },
  { id: 'maritime', name: 'Maritime Routes', path: 'M 510 220 Q 480 250 460 290 Q 440 330 430 370 Q 420 410 440 440', startYear: 1400, endYear: 1800, color: '#3498DB' },
];

const CITIES: MapCity[] = [
  { id: 'memphis', name: 'Memphis', x: 535, y: 275, startYear: -3100, endYear: -30, civilization: 'egypt' },
  { id: 'ur', name: 'Ur', x: 595, y: 225, startYear: -3800, endYear: -500, civilization: 'mesopotamia' },
  { id: 'mohenjo', name: 'Mohenjo-daro', x: 665, y: 235, startYear: -2500, endYear: -1700, civilization: 'indus' },
  { id: 'athens', name: 'Athens', x: 550, y: 215, startYear: -508, endYear: 200, civilization: 'greece' },
  { id: 'rome-city', name: 'Rome', x: 530, y: 210, startYear: -753, endYear: 476, civilization: 'rome' },
  { id: 'constantinople', name: 'Constantinople', x: 560, y: 210, startYear: 330, endYear: 1453, civilization: 'byzantine' },
  { id: 'baghdad', name: 'Baghdad', x: 600, y: 225, startYear: 762, endYear: 1258, civilization: 'islamic' },
  { id: 'xian', name: "Xi'an", x: 735, y: 185, startYear: -202, endYear: 904, civilization: 'china' },
  { id: 'london', name: 'London', x: 495, y: 185, startYear: 43, endYear: 2000, civilization: 'british' },
  { id: 'madrid', name: 'Madrid', x: 495, y: 215, startYear: 1561, endYear: 2000, civilization: 'spanish' },
  { id: 'delhi', name: 'Delhi', x: 665, y: 230, startYear: -1000, endYear: 2000, civilization: 'mughal' },
  { id: 'beijing', name: 'Beijing', x: 745, y: 170, startYear: 1403, endYear: 2000, civilization: 'qing' },
  { id: 'istanbul', name: 'Istanbul', x: 560, y: 210, startYear: 1453, endYear: 2000, civilization: 'ottoman' },
  { id: 'cairo', name: 'Cairo', x: 540, y: 265, startYear: 969, endYear: 2000, civilization: 'egypt' },
];

const BATTLES: Battle[] = [
  { id: 'thermopylae', name: 'Thermopylae', x: 548, y: 212, year: -480 },
  { id: 'gaugamela', name: 'Gaugamela', x: 600, y: 220, year: -331 },
  { id: 'cannae', name: 'Cannae', x: 532, y: 208, year: -216 },
  { id: 'actium', name: 'Actium', x: 545, y: 215, year: -31 },
  { id: 'manzikert', name: 'Manzikert', x: 575, y: 205, year: 1071 },
  { id: 'hastings', name: 'Hastings', x: 493, y: 183, year: 1066 },
  { id: 'crusades', name: 'Crusades', x: 555, y: 225, year: 1096 },
  { id: 'hundred-years', name: 'Hundred Years War', x: 500, y: 195, year: 1337 },
  { id: 'lepanto', name: 'Lepanto', x: 535, y: 212, year: 1571 },
  { id: 'waterloo', name: 'Waterloo', x: 505, y: 188, year: 1815 },
  { id: 'somme', name: 'Somme', x: 502, y: 186, year: 1916 },
  { id: 'stalingrad', name: 'Stalingrad', x: 590, y: 185, year: 1942 },
];

const MIGRATIONS: Migration[] = [
  { id: 'indo-european', name: 'Indo-European', path: 'M 590 200 Q 620 190 650 200 Q 680 210 700 220', startYear: -4000, endYear: -1000 },
  { id: 'bantu', name: 'Bantu Expansion', path: 'M 530 320 Q 540 340 550 360 Q 560 380 570 400', startYear: -3000, endYear: 500 },
  { id: 'polynesian', name: 'Polynesian', path: 'M 800 350 Q 830 360 860 370 Q 890 380 920 390', startYear: -1500, endYear: 1200 },
  { id: 'viking', name: 'Viking Expansion', path: 'M 510 160 Q 500 170 490 180 Q 480 190 470 200', startYear: 793, endYear: 1066 },
  { id: 'mongol', name: 'Mongol Expansion', path: 'M 700 170 Q 680 180 660 190 Q 640 200 620 210', startYear: 1206, endYear: 1368 },
];

function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  return `${year} CE`;
}

function isYearInRange(year: number, start: number, end: number): boolean {
  return year >= start && year <= end;
}

export default function HistoricalMap() {
  const [currentYear, setCurrentYear] = useState(0);
  const [layers, setLayers] = useState<Record<LayerKey, boolean>>({
    civilizations: true,
    tradeRoutes: true,
    battles: true,
    migrations: true,
  });
  const [hoveredCity, setHoveredCity] = useState<MapCity | null>(null);
  const [hoveredBattle, setHoveredBattle] = useState<Battle | null>(null);
  const [hoveredRoute, setHoveredRoute] = useState<TradeRoute | null>(null);
  const [selectedCity, setSelectedCity] = useState<MapCity | null>(null);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 960, h: 600 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const visibleCivilizations = useMemo(
    () => CIVILIZATIONS.filter((c) => isYearInRange(currentYear, c.startYear, c.endYear)),
    [currentYear]
  );

  const visibleTradeRoutes = useMemo(
    () => TRADE_ROUTES.filter((r) => isYearInRange(currentYear, r.startYear, r.endYear)),
    [currentYear]
  );

  const visibleCities = useMemo(
    () => CITIES.filter((c) => isYearInRange(currentYear, c.startYear, c.endYear)),
    [currentYear]
  );

  const visibleBattles = useMemo(
    () => BATTLES.filter((b) => Math.abs(b.year - currentYear) <= 50),
    [currentYear]
  );

  const visibleMigrations = useMemo(
    () => MIGRATIONS.filter((m) => isYearInRange(currentYear, m.startYear, m.endYear)),
    [currentYear]
  );

  const toggleLayer = useCallback((layer: LayerKey) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    panStartRef.current = { x: e.clientX, y: e.clientY, vx: viewBox.x, vy: viewBox.y };
    (e.target as SVGElement).setPointerCapture?.(e.pointerId);
  }, [viewBox.x, viewBox.y]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isPanning || !panStartRef.current) return;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const scaleX = viewBox.w / rect.width;
      const scaleY = viewBox.h / rect.height;
      const dx = (e.clientX - panStartRef.current.x) * scaleX;
      const dy = (e.clientY - panStartRef.current.y) * scaleY;
      setViewBox((prev) => ({
        ...prev,
        x: panStartRef.current!.vx - dx,
        y: panStartRef.current!.vy - dy,
      }));
    },
    [isPanning, viewBox.w, viewBox.h]
  );

  const handlePointerUp = useCallback(() => {
    setIsPanning(false);
    panStartRef.current = null;
  }, []);

  const handleZoom = useCallback(
    (factor: number) => {
      setViewBox((prev) => {
        const cx = prev.x + prev.w / 2;
        const cy = prev.y + prev.h / 2;
        const nw = Math.max(200, Math.min(1920, prev.w * factor));
        const nh = (nw / 960) * 600;
        return { x: cx - nw / 2, y: cy - nh / 2, w: nw, h: nh };
      });
    },
    []
  );

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 1.1 : 0.9;
    setViewBox((prev) => {
      const svg = svgRef.current;
      if (!svg) return prev;
      const rect = svg.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * prev.w + prev.x;
      const my = ((e.clientY - rect.top) / rect.height) * prev.h + prev.y;
      const nw = Math.max(200, Math.min(1920, prev.w * factor));
      const nh = (nw / 960) * 600;
      const nx = mx - (nw / prev.w) * (mx - prev.x);
      const ny = my - (nh / prev.h) * (my - prev.y);
      return { x: nx, y: ny, w: nw, h: nh };
    });
  }, []);

  const resetView = useCallback(() => {
    setViewBox({ x: 0, y: 0, w: 960, h: 600 });
  }, []);

  const eraLabel = useMemo(() => {
    const era = ERAS.find((e) => e.value === currentYear);
    return era?.label ?? formatYear(currentYear);
  }, [currentYear]);

  return (
    <div className="historical-map-container">
      <style>{`
        .historical-map-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #0a0f1a;
          color: #e0d8c8;
          font-family: system-ui, sans-serif;
          overflow: hidden;
        }
        .hm-toolbar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          background: rgba(10, 15, 26, 0.95);
          border-bottom: 1px solid rgba(200, 169, 81, 0.15);
          flex-wrap: wrap;
          z-index: 10;
        }
        .hm-era-label {
          font-size: 1.1rem;
          font-weight: 700;
          color: #c8a951;
          min-width: 100px;
          text-align: center;
        }
        .hm-layers {
          display: flex;
          gap: 6px;
          margin-left: auto;
        }
        .hm-layer-btn {
          padding: 4px 10px;
          border: 1px solid rgba(200, 169, 81, 0.3);
          border-radius: 4px;
          background: transparent;
          color: #e0d8c8;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .hm-layer-btn.active {
          background: rgba(200, 169, 81, 0.2);
          border-color: #c8a951;
          color: #c8a951;
        }
        .hm-layer-btn:hover {
          border-color: #c8a951;
        }
        .hm-map-wrap {
          flex: 1;
          position: relative;
          overflow: hidden;
        }
        .hm-map-svg {
          width: 100%;
          height: 100%;
          display: block;
          cursor: grab;
        }
        .hm-map-svg.panning {
          cursor: grabbing;
        }
        .hm-slider-bar {
          padding: 10px 16px;
          background: rgba(10, 15, 26, 0.95);
          border-top: 1px solid rgba(200, 169, 81, 0.15);
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 10;
        }
        .hm-slider {
          flex: 1;
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          background: rgba(200, 169, 81, 0.2);
          border-radius: 2px;
          outline: none;
        }
        .hm-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #c8a951;
          cursor: pointer;
          box-shadow: 0 0 6px rgba(200, 169, 81, 0.5);
        }
        .hm-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #c8a951;
          cursor: pointer;
          border: none;
        }
        .hm-zoom-controls {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 5;
        }
        .hm-zoom-btn {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(200, 169, 81, 0.3);
          border-radius: 4px;
          background: rgba(10, 15, 26, 0.85);
          color: #e0d8c8;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .hm-zoom-btn:hover {
          border-color: #c8a951;
          color: #c8a951;
        }
        .hm-tooltip {
          position: absolute;
          pointer-events: none;
          background: rgba(10, 15, 26, 0.95);
          border: 1px solid rgba(200, 169, 81, 0.4);
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 0.8rem;
          color: #e0d8c8;
          z-index: 20;
          max-width: 200px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }
        .hm-tooltip strong {
          color: #c8a951;
          display: block;
          margin-bottom: 2px;
        }
        .hm-legend {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(10, 15, 26, 0.9);
          border: 1px solid rgba(200, 169, 81, 0.15);
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 0.7rem;
          z-index: 5;
        }
        .hm-legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 3px;
        }
        .hm-legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .hm-legend-line {
          width: 16px;
          height: 2px;
        }
        .hm-info-panel {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(10, 15, 26, 0.95);
          border: 1px solid rgba(200, 169, 81, 0.3);
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 0.8rem;
          z-index: 15;
          max-width: 260px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        }
        .hm-info-panel h3 {
          color: #c8a951;
          margin: 0 0 6px;
          font-size: 0.95rem;
        }
        .hm-info-panel p {
          margin: 0 0 4px;
          color: rgba(224, 216, 200, 0.8);
          line-height: 1.4;
        }
        .hm-info-close {
          position: absolute;
          top: 6px;
          right: 8px;
          background: none;
          border: none;
          color: rgba(224, 216, 200, 0.5);
          cursor: pointer;
          font-size: 1rem;
        }
        .hm-info-close:hover {
          color: #e0d8c8;
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -20; }
        }
        .hm-trade-route {
          animation: dash-flow 1.5s linear infinite;
        }
        @keyframes pulse {
          0%, 100% { r: 3; opacity: 0.8; }
          50% { r: 5; opacity: 1; }
        }
        .hm-city-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div className="hm-toolbar">
        <span className="hm-era-label">{eraLabel}</span>
        <div className="hm-layers">
          {([
            ['civilizations', '文明'],
            ['tradeRoutes', '贸易路线'],
            ['battles', '战役'],
            ['migrations', '迁徙'],
          ] as [LayerKey, string][]).map(([key, label]) => (
            <button
              key={key}
              className={`hm-layer-btn${layers[key] ? ' active' : ''}`}
              onClick={() => toggleLayer(key)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="hm-map-wrap">
        <svg
          ref={svgRef}
          className={`hm-map-svg${isPanning ? ' panning' : ''}`}
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
        >
          <defs>
            <radialGradient id="hm-bg-grad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#0f1724" />
              <stop offset="100%" stopColor="#070b12" />
            </radialGradient>
            <filter id="hm-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="-500" y="-500" width="2960" height="1600" fill="url(#hm-bg-grad)" />

          <g opacity="0.3">
            {Object.entries(CONTINENT_PATHS).map(([id, path]) => (
              <path
                key={id}
                d={path}
                fill="rgba(200, 169, 81, 0.05)"
                stroke="rgba(200, 169, 81, 0.15)"
                strokeWidth="1"
              />
            ))}
          </g>

          {layers.migrations &&
            visibleMigrations.map((m) => (
              <path
                key={m.id}
                d={m.path}
                fill="none"
                stroke="rgba(100, 200, 255, 0.4)"
                strokeWidth="2"
                strokeDasharray="8 4"
                className="hm-trade-route"
              >
                <title>{m.name} ({formatYear(m.startYear)} - {formatYear(m.endYear)})</title>
              </path>
            ))}

          {layers.civilizations &&
            visibleCivilizations.map((civ) => (
              <path
                key={civ.id}
                d={civ.path}
                fill={civ.color}
                fillOpacity={0.25}
                stroke={civ.color}
                strokeWidth="1.5"
                strokeOpacity={0.6}
              >
                <title>{civ.name} ({formatYear(civ.startYear)} - {formatYear(civ.endYear)})</title>
              </path>
            ))}

          {layers.tradeRoutes &&
            visibleTradeRoutes.map((route) => (
              <path
                key={route.id}
                d={route.path}
                fill="none"
                stroke={route.color}
                strokeWidth="2.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
                className="hm-trade-route"
                opacity={hoveredRoute?.id === route.id ? 1 : 0.7}
                onMouseEnter={() => setHoveredRoute(route)}
                onMouseLeave={() => setHoveredRoute(null)}
                style={{ cursor: 'pointer' }}
              >
                <title>{route.name} ({formatYear(route.startYear)} - {formatYear(route.endYear)})</title>
              </path>
            ))}

          {layers.battles &&
            visibleBattles.map((b) => (
              <g
                key={b.id}
                onMouseEnter={() => setHoveredBattle(b)}
                onMouseLeave={() => setHoveredBattle(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle cx={b.x} cy={b.y} r="3" fill="#E74C3C" opacity={0.8} />
                <circle cx={b.x} cy={b.y} r="6" fill="none" stroke="#E74C3C" strokeWidth="1" opacity={0.4}>
                  <animate attributeName="r" values="3;8;3" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                </circle>
                {hoveredBattle?.id === b.id && (
                  <text x={b.x} y={b.y - 10} textAnchor="middle" fill="#E74C3C" fontSize="8" fontWeight="600">
                    {b.name}
                  </text>
                )}
              </g>
            ))}

          {layers.civilizations &&
            visibleCities.map((city) => (
              <g
                key={city.id}
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
                onClick={() => setSelectedCity(selectedCity?.id === city.id ? null : city)}
                style={{ cursor: 'pointer' }}
              >
                <circle cx={city.x} cy={city.y} r="3" fill="#c8a951" className="hm-city-pulse" />
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={selectedCity?.id === city.id ? 7 : 5}
                  fill="none"
                  stroke="#c8a951"
                  strokeWidth="1"
                  opacity={0.5}
                />
                {(hoveredCity?.id === city.id || selectedCity?.id === city.id) && (
                  <text
                    x={city.x}
                    y={city.y - 10}
                    textAnchor="middle"
                    fill="#e0d8c8"
                    fontSize="8"
                    fontWeight="600"
                    style={{ pointerEvents: 'none' }}
                  >
                    {city.name}
                  </text>
                )}
              </g>
            ))}
        </svg>

        <div className="hm-zoom-controls">
          <button className="hm-zoom-btn" onClick={() => handleZoom(0.7)} title="Zoom In" type="button">+</button>
          <button className="hm-zoom-btn" onClick={() => handleZoom(1.4)} title="Zoom Out" type="button">−</button>
          <button className="hm-zoom-btn" onClick={resetView} title="Reset" type="button">⟲</button>
        </div>

        {selectedCity && (
          <div className="hm-info-panel">
            <button className="hm-info-close" onClick={() => setSelectedCity(null)} type="button">✕</button>
            <h3>{selectedCity.name}</h3>
            <p>{selectedCity.civilization} · {formatYear(selectedCity.startYear)} – {formatYear(selectedCity.endYear)}</p>
          </div>
        )}

        {hoveredRoute && !selectedCity && (
          <div className="hm-tooltip" style={{ top: 60, left: 16 }}>
            <strong>{hoveredRoute.name}</strong>
            {formatYear(hoveredRoute.startYear)} – {formatYear(hoveredRoute.endYear)}
          </div>
        )}

        <div className="hm-legend">
          <div className="hm-legend-item"><span className="hm-legend-dot" style={{ background: '#c8a951' }} />城市</div>
          <div className="hm-legend-item"><span className="hm-legend-dot" style={{ background: '#E74C3C' }} />战役</div>
          <div className="hm-legend-item"><span className="hm-legend-line" style={{ background: '#F1C40F' }} />贸易路线</div>
          <div className="hm-legend-item"><span className="hm-legend-line" style={{ background: 'rgba(100,200,255,0.6)' }} />迁徙</div>
        </div>
      </div>

      <div className="hm-slider-bar">
        <span style={{ fontSize: '0.75rem', color: 'rgba(224,216,200,0.5)' }}>3000 BCE</span>
        <input
          type="range"
          className="hm-slider"
          min={-3000}
          max={2000}
          step={50}
          value={currentYear}
          onChange={(e) => setCurrentYear(Number(e.target.value))}
          aria-label="Era slider"
        />
        <span style={{ fontSize: '0.75rem', color: 'rgba(224,216,200,0.5)' }}>2000 CE</span>
      </div>
    </div>
  );
}
