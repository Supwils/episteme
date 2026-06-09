'use client';

import { useReducedMotion } from 'framer-motion';
import type { HistoryNodeType } from '../../lib/graph-data';
import { useHistoryGraphState, type HistoryGraphProps } from './useHistoryGraphState';
import { useHistoryGraphRenderer } from './useHistoryGraphRenderer';
import { useHistoryGraphInteractions } from './useHistoryGraphInteractions';
import { FilterSelect, DetailPanel } from './HistoryGraphUI';
import { NODE_COLORS, NODE_TYPE_LABELS } from './constants';

export type { HistoryGraphProps };

export function HistoryGraph({ nodes, edges, filterOptions }: HistoryGraphProps) {
  const reducedMotion = useReducedMotion();
  const state = useHistoryGraphState({ nodes, edges, filterOptions });
  useHistoryGraphRenderer(state, reducedMotion);
  const interactions = useHistoryGraphInteractions(state);

  const {
    canvasRef,
    containerRef,
    searchInputRef,
    isLoading,
    searchQuery,
    setSearchQuery,
    searchResults,
    zoom,
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
    tooltipPos,
    filteredNodes,
    filteredEdges,
    selectedNode,
    connectedNodes,
    connectedEdges,
    activeFilterCount,
    setSelectedNodeId,
    filterOptions: opts,
  } = state;

  const {
    handleSearchSelect,
    handleZoomIn,
    handleZoomOut,
    handleFitToScreen,
    handleDetailNodeClick,
  } = interactions;

  return (
    <div className="flex h-full w-full flex-col bg-[#0c0a09] text-white">
      {/* Header */}
      <div className="shrink-0 px-3 py-3 sm:px-4 sm:py-3">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-amber-100 sm:text-xl">
            历史关联图谱
          </h1>
          <span className="text-xs text-white/30">
            {filteredNodes.length} 节点 · {filteredEdges.length} 关系
          </span>
        </div>

        {/* Toolbar */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {/* Type filter tabs */}
          <div className="flex rounded-lg border border-white/[0.06] bg-[#111118]/80 backdrop-blur-xl">
            {(['all', 'era', 'event', 'figure'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTypeFilter(t)}
                className={`px-2.5 py-1.5 text-xs transition-colors ${
                  activeTypeFilter === t
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'text-white/40 hover:text-white/60'
                } ${t === 'all' ? 'rounded-l-lg' : t === 'figure' ? 'rounded-r-lg' : ''}`}
              >
                {t === 'all' ? '全部' : NODE_TYPE_LABELS[t]}
              </button>
            ))}
          </div>

          {/* Advanced filters toggle */}
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
              showFilters || activeFilterCount > 0
                ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                : 'border-white/[0.06] bg-[#111118]/80 text-white/40 hover:text-white/60'
            }`}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
              <path d="M2 4h12M4 8h8M6 12h4" strokeLinecap="round" />
            </svg>
            筛选
            {activeFilterCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/30 text-[9px] text-amber-200">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Search */}
          <div className="relative flex-1 min-w-[140px]">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30"
            >
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5L14 14" strokeLinecap="round" />
            </svg>
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索人物、事件或时代…"
              className="w-full rounded-lg border border-white/[0.06] bg-[#111118]/80 py-1.5 pl-8 pr-3 text-xs text-white/80 placeholder-white/30 outline-none backdrop-blur-xl focus:border-amber-500/30"
              aria-label="搜索图谱节点"
            />
            {searchQuery && searchResults.length > 0 && (
              <div className="absolute top-full left-0 z-50 mt-1 w-full min-w-[200px] rounded-lg border border-white/[0.08] bg-[#111118]/95 py-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                {searchResults.map((result) => (
                  <button
                    key={result.node.id}
                    type="button"
                    onClick={() => handleSearchSelect(result.node.id)}
                    className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-white/70 hover:bg-white/[0.06] hover:text-white"
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: NODE_COLORS[result.node.type as HistoryNodeType] ?? '#f59e0b' }}
                    />
                    <span className="truncate">{result.node.label}</span>
                    <span className="ml-auto shrink-0 text-[10px] text-white/30">
                      {NODE_TYPE_LABELS[result.node.type as HistoryNodeType]}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleZoomOut}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.06] bg-[#111118]/80 text-white/40 transition-colors hover:text-white/70"
              aria-label="缩小"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                <path d="M4 8h8" strokeLinecap="round" />
              </svg>
            </button>
            <span className="min-w-[2.5rem] text-center text-[10px] text-white/30 tabular-nums">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.06] bg-[#111118]/80 text-white/40 transition-colors hover:text-white/70"
              aria-label="放大"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                <path d="M8 4v8M4 8h8" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleFitToScreen}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.06] bg-[#111118]/80 text-white/40 transition-colors hover:text-white/70"
              aria-label="适应屏幕"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                <rect x="3" y="3" width="10" height="10" rx="1.5" />
                <path d="M3 6V4a1 1 0 011-1h2M10 3h2a1 1 0 011 1v2M13 10v2a1 1 0 01-1 1h-2M6 13H4a1 1 0 01-1-1v-2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Advanced filters dropdown */}
        {showFilters && (
          <div
            className="mt-2 flex flex-wrap gap-3 rounded-lg border border-white/[0.06] bg-[#111118]/80 p-3 backdrop-blur-xl"
          >
            <FilterSelect
              label="时代"
              value={selectedEra}
              onChange={setSelectedEra}
              options={opts.eras.map((e) => ({ value: e.id, label: e.name }))}
            />
            <FilterSelect
              label="地区"
              value={selectedRegion}
              onChange={setSelectedRegion}
              options={opts.regions.map((r) => ({ value: r, label: r }))}
            />
            <FilterSelect
              label="类别"
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={opts.categories.map((c) => ({ value: c, label: c }))}
            />
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setActiveTypeFilter('all');
                  setSelectedEra('all');
                  setSelectedRegion('all');
                  setSelectedCategory('all');
                }}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] text-amber-400/70 transition-colors hover:text-amber-300"
              >
                清除筛选
              </button>
            )}
          </div>
        )}
      </div>

      {/* Canvas area */}
      <div className="relative flex min-h-0 flex-1">
        <div
          ref={containerRef}
          className="relative flex-1 overflow-hidden"
          role="application"
          aria-label="历史图谱可视化区域"
          aria-roledescription="交互式历史知识图谱"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            style={{ touchAction: 'none' }}
            tabIndex={0}
            role="img"
            aria-label={`历史图谱，包含 ${filteredNodes.length} 个节点和 ${filteredEdges.length} 条边`}
          />

          {isLoading && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0c0a09]/80 backdrop-blur-sm">
              <div
                className="flex flex-col items-center gap-3"
              >
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500/20 border-t-amber-400" />
                <p className="text-sm text-white/40">正在计算历史图谱布局…</p>
              </div>
            </div>
          )}

          {/* Tooltip */}
          {tooltipNode && (
            <div
              key={tooltipNode.id}
              className="pointer-events-none fixed z-[100] max-w-[260px] rounded-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              style={{
                left: isMobile ? '50%' : tooltipPos.x + 16,
                top: isMobile ? 12 : tooltipPos.y + 16,
                transform: isMobile ? 'translateX(-50%)' : undefined,
                background: 'rgba(15, 15, 25, 0.88)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div
                className="flex flex-col gap-1.5 p-3"
                style={{ borderLeft: `3px solid ${NODE_COLORS[tooltipNode.type]}` }}
              >
                <span className="text-[10px] font-mono tracking-wider text-amber-400/60 uppercase">
                  {NODE_TYPE_LABELS[tooltipNode.type]}
                </span>
                <h4 className="text-sm font-semibold text-white/95">{tooltipNode.label}</h4>
                {tooltipNode.description && (
                  <p className="text-[11px] leading-relaxed text-white/50">
                    {tooltipNode.description.length > 60
                      ? tooltipNode.description.slice(0, 60) + '…'
                      : tooltipNode.description}
                  </p>
                )}
                <span className="text-[10px] text-white/30">点击查看详情</span>
              </div>
            </div>
          )}

          {/* Legend */}
          {!isLoading && (
            <div className="absolute bottom-3 left-3 z-20 flex flex-col gap-1.5 rounded-lg border border-white/[0.06] bg-[#111118]/80 px-3 py-2 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: NODE_COLORS.era }} />
                <span className="text-[10px] text-white/50">时代</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: NODE_COLORS.event }} />
                <span className="text-[10px] text-white/50">事件</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: NODE_COLORS.figure }} />
                <span className="text-[10px] text-white/50">人物</span>
              </div>
            </div>
          )}

          {/* Mobile zoom buttons */}
          {isMobile && !isLoading && (
            <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleZoomIn}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-[#111118]/80 text-white/50 backdrop-blur-xl transition-colors hover:text-white/80"
                aria-label="放大"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <path d="M8 4v8M4 8h8" strokeLinecap="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-[#111118]/80 text-white/50 backdrop-blur-xl transition-colors hover:text-white/80"
                aria-label="缩小"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <path d="M4 8h8" strokeLinecap="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleFitToScreen}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-[#111118]/80 text-white/50 backdrop-blur-xl transition-colors hover:text-white/80"
                aria-label="适应屏幕"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <rect x="3" y="3" width="10" height="10" rx="1.5" />
                  <path d="M3 6V4a1 1 0 011-1h2M10 3h2a1 1 0 011 1v2M13 10v2a1 1 0 01-1 1h-2M6 13H4a1 1 0 01-1-1v-2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <DetailPanel
          node={selectedNode}
          connectedNodes={connectedNodes}
          connectedEdges={connectedEdges}
          onClose={() => setSelectedNodeId(null)}
          onNodeClick={handleDetailNodeClick}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}
