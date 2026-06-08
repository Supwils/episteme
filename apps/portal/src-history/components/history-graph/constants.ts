import type { HistoryGraphEdge, HistoryNodeType } from '../../lib/graph-data';

export const NODE_COLORS: Record<HistoryNodeType, string> = {
  event: '#d97706',
  figure: '#ca8a04',
  era: '#f5f5f4',
};

export const NODE_RADIUS: Record<HistoryNodeType, number> = {
  era: 22,
  figure: 14,
  event: 12,
};

export const NODE_TYPE_LABELS: Record<HistoryNodeType, string> = {
  era: '时代',
  event: '事件',
  figure: '人物',
};

export const EDGE_COLORS: Record<HistoryGraphEdge['type'], string> = {
  'era-event': 'rgba(245, 245, 244, 0.12)',
  'era-figure': 'rgba(202, 138, 4, 0.1)',
  'figure-event': 'rgba(217, 119, 6, 0.2)',
  temporal: 'rgba(255, 255, 255, 0.06)',
  'era-seq': 'rgba(245, 245, 244, 0.15)',
};

export const EDGE_WIDTHS: Record<HistoryGraphEdge['type'], number> = {
  'era-event': 1.2,
  'era-figure': 0.8,
  'figure-event': 1.5,
  temporal: 0.5,
  'era-seq': 1.8,
};

export const BG_COLOR = '#0c0a09';
export const LABEL_FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
export const LABEL_COLOR = 'rgba(255, 255, 255, 0.7)';
export const HIGHLIGHT_COLOR = '#f59e0b';
