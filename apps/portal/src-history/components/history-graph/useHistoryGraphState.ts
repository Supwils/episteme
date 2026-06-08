'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import type { HistoryGraphNode, HistoryGraphEdge, HistoryNodeType } from '../../lib/graph-data';
import { ForceLayout, GraphRenderer, searchNodes } from '@universe/graph-engine';
import type { RenderConfig, GraphNode } from '@universe/graph-engine';
import { NODE_RADIUS, BG_COLOR, LABEL_FONT, LABEL_COLOR, HIGHLIGHT_COLOR } from './constants';

export type HistoryGraphProps = {
  nodes: HistoryGraphNode[];
  edges: HistoryGraphEdge[];
  filterOptions: {
    eras: { id: string; name: string }[];
    regions: string[];
    categories: string[];
  };
};

function toGraphNode(node: HistoryGraphNode): GraphNode {
  return {
    id: node.id,
    label: node.label,
    domain: 'history',
    type: node.type,
    slug: node.slug,
    era: node.era,
    year: node.year,
    tags: node.tags,
    description: node.description,
  };
}

export function resolveNodeUrl(node: HistoryGraphNode): string | null {
  switch (node.type) {
    case 'figure':
      return `/human-history/figures`;
    case 'event':
      return `/human-history/timeline`;
    case 'era':
      return `/human-history/timeline`;
  }
}

export function useHistoryGraphState({ nodes, edges, filterOptions }: HistoryGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<GraphRenderer | null>(null);
  const layoutRef = useRef<ForceLayout | null>(null);
  const positionsRef = useRef<Map<string, { x: number; y: number }>>(new Map());
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTypeFilter, setActiveTypeFilter] = useState<HistoryNodeType | 'all'>('all');
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [tooltipNode, setTooltipNode] = useState<HistoryGraphNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const nodeMap = useMemo(() => {
    const map = new Map<string, HistoryGraphNode>();
    for (const node of nodes) map.set(node.id, node);
    return map;
  }, [nodes]);

  const filteredNodes = useMemo(() => {
    return nodes.filter((n) => {
      if (activeTypeFilter !== 'all' && n.type !== activeTypeFilter) return false;
      if (selectedEra !== 'all' && n.era !== selectedEra) return false;
      if (selectedRegion !== 'all' && n.region !== selectedRegion) return false;
      if (selectedCategory !== 'all' && !n.tags.includes(selectedCategory)) return false;
      return true;
    });
  }, [nodes, activeTypeFilter, selectedEra, selectedRegion, selectedCategory]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const filteredEdges = useMemo(() => {
    return edges.filter((e) => filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target));
  }, [edges, filteredNodeIds]);

  const graphNodes = useMemo(() => filteredNodes.map(toGraphNode), [filteredNodes]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchNodes(searchQuery, graphNodes, { maxResults: 8, domains: ['history'] });
  }, [graphNodes, searchQuery]);

  const selectedNode = selectedNodeId ? nodeMap.get(selectedNodeId) ?? null : null;

  const connectedNodes = useMemo<HistoryGraphNode[]>(() => {
    if (!selectedNodeId) return [];
    const ids = new Set<string>();
    for (const edge of edges) {
      if (edge.source === selectedNodeId) ids.add(edge.target);
      if (edge.target === selectedNodeId) ids.add(edge.source);
    }
    return nodes.filter((n) => ids.has(n.id));
  }, [selectedNodeId, edges, nodes]);

  const connectedEdges = useMemo<HistoryGraphEdge[]>(() => {
    if (!selectedNodeId) return [];
    return edges.filter((e) => e.source === selectedNodeId || e.target === selectedNodeId);
  }, [selectedNodeId, edges]);

  const renderConfig = useMemo<RenderConfig>(() => ({
    nodeRadius: Object.fromEntries(
      Object.entries(NODE_RADIUS).map(([k, v]) => [k, isMobile ? v * 1.5 : v]),
    ),
    domainColors: { history: '#f59e0b' },
    edgeColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: BG_COLOR,
    labelFont: LABEL_FONT,
    labelColor: LABEL_COLOR,
    highlightColor: HIGHLIGHT_COLOR,
  }), [isMobile]);

  const activeFilterCount = [
    activeTypeFilter !== 'all',
    selectedEra !== 'all',
    selectedRegion !== 'all',
    selectedCategory !== 'all',
  ].filter(Boolean).length;

  return {
    canvasRef,
    containerRef,
    rendererRef,
    layoutRef,
    positionsRef,
    searchInputRef,
    isLoading,
    setIsLoading,
    hoveredNodeId,
    setHoveredNodeId,
    selectedNodeId,
    setSelectedNodeId,
    searchQuery,
    setSearchQuery,
    searchResults,
    zoom,
    setZoom,
    offsetX,
    setOffsetX,
    offsetY,
    setOffsetY,
    isMobile,
    activeTypeFilter,
    setActiveTypeFilter,
    selectedEra,
    setSelectedEra,
    selectedRegion,
    setSelectedRegion,
    selectedCategory,
    setSelectedCategory,
    showFilters,
    setShowFilters,
    tooltipNode,
    setTooltipNode,
    tooltipPos,
    setTooltipPos,
    nodeMap,
    filteredNodes,
    filteredEdges,
    selectedNode,
    connectedNodes,
    connectedEdges,
    renderConfig,
    activeFilterCount,
    filterOptions,
    nodes,
    edges,
  };
}

export type HistoryGraphState = ReturnType<typeof useHistoryGraphState>;
