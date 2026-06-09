'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { HistoryGraphNode, HistoryGraphEdge, HistoryNodeType } from '../../lib/graph-data';
import { NODE_COLORS, NODE_TYPE_LABELS } from './constants';
import { resolveNodeUrl } from './useHistoryGraphState';

export function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-[10px] text-white/40">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-white/[0.08] bg-[#0c0a09] px-2 py-1 text-xs text-white/70 outline-none focus:border-amber-500/30"
      >
        <option value="all">全部</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function DetailPanel({
  node,
  connectedNodes,
  connectedEdges,
  onClose,
  onNodeClick,
  isMobile,
}: {
  node: HistoryGraphNode | null;
  connectedNodes: HistoryGraphNode[];
  connectedEdges: HistoryGraphEdge[];
  onClose: () => void;
  onNodeClick: (nodeId: string) => void;
  isMobile: boolean;
}) {
  const reducedMotion = useReducedMotion();

  if (!node) return null;

  const detailUrl = resolveNodeUrl(node);
  const color = NODE_COLORS[node.type];

  const edgeMap = new Map<string, HistoryGraphEdge>();
  for (const edge of connectedEdges) {
    edgeMap.set(`${edge.source}->${edge.target}`, edge);
  }

  function findEdge(connectedId: string): HistoryGraphEdge | undefined {
    if (!node) return undefined;
    return edgeMap.get(`${node.id}->${connectedId}`) ?? edgeMap.get(`${connectedId}->${node.id}`);
  }

  return (
    <>
      <motion.div
        key="panel-backdrop"
        aria-hidden
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />
      <motion.aside
        key="detail-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${node.label} 详情`}
        className={`fixed z-50 flex flex-col overflow-hidden border-white/[0.08] shadow-[0_0_60px_rgba(0,0,0,0.45)] ${
          isMobile
            ? 'inset-x-0 bottom-0 top-12 rounded-t-2xl'
            : 'inset-0 md:inset-auto md:top-0 md:right-0 md:h-full md:max-w-[380px] md:border-l'
        }`}
        style={{
          background: 'rgba(15, 15, 25, 0.85)',
          backdropFilter: 'blur(24px) saturate(1.2)',
        }}
        initial={reducedMotion ? { opacity: 0 } : isMobile ? { y: '100%' } : { x: '102%' }}
        animate={reducedMotion ? { opacity: 1 } : isMobile ? { y: 0 } : { x: 0 }}
        exit={reducedMotion ? { opacity: 0 } : isMobile ? { y: '100%' } : { x: '102%' }}
        transition={{ duration: 0.36, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {isMobile && (
          <div className="flex justify-center py-2 shrink-0" aria-hidden>
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>
        )}

        <div aria-hidden className="h-[3px] w-full shrink-0" style={{ background: color }} />

        <div className="flex items-center justify-end px-5 pt-4 pb-2 md:px-6">
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭详情面板"
            className="flex h-11 w-11 md:h-8 md:w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/50 transition-colors hover:border-white/[0.15] hover:bg-white/[0.08] hover:text-white/80"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-3.5 w-3.5">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-10 md:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            className="flex flex-col gap-4"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
              <span
                className="inline-flex w-fit items-center rounded-full px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.15em] uppercase"
                style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
              >
                {NODE_TYPE_LABELS[node.type]}
              </span>
              <h2 className="mt-2 text-[1.5rem] font-bold leading-tight text-white/95">
                {node.label}
              </h2>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-[12px] text-white/40">
                {node.year !== undefined && (
                  <span>{node.year < 0 ? `公元前${Math.abs(node.year)}` : node.year}年</span>
                )}
                {node.region && (
                  <>
                    <span aria-hidden className="text-white/20">·</span>
                    <span>{node.region}</span>
                  </>
                )}
                {connectedNodes.length > 0 && (
                  <>
                    <span aria-hidden className="text-white/20">·</span>
                    <span>{connectedNodes.length} 个关联</span>
                  </>
                )}
              </div>
            </motion.div>

            {node.tags.length > 0 && (
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <div className="flex flex-wrap gap-1.5">
                  {node.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] tracking-wide text-white/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {node.description && (
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <p className="text-[13px] leading-relaxed text-white/60">{node.description}</p>
              </motion.div>
            )}

            {detailUrl && (
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <a
                  href={detailUrl}
                  className="inline-flex w-fit items-center gap-2 rounded-lg border px-4 py-2.5 text-[13px] font-medium transition-all hover:bg-white/[0.06]"
                  style={{ borderColor: `${color}40`, background: `${color}15`, color }}
                >
                  查看详情
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </a>
              </motion.div>
            )}

            {connectedNodes.length > 0 && (
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <div className="border-t border-white/[0.06] pt-4">
                  <h3 className="mb-3 font-mono text-[10px] tracking-[0.3em] uppercase text-white/45">
                    关联节点
                  </h3>
                  <div className="flex flex-col gap-1">
                    {connectedNodes.map((connected) => {
                      const edge = findEdge(connected.id);
                      const nodeColor = NODE_COLORS[connected.type];
                      return (
                        <button
                          key={connected.id}
                          type="button"
                          onClick={() => onNodeClick(connected.id)}
                          className="group flex items-start gap-3 rounded-lg border border-transparent bg-white/[0.02] px-3 py-2.5 text-left transition-all hover:border-white/[0.08] hover:bg-white/[0.05]"
                        >
                          <span
                            aria-hidden
                            className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                            style={{ backgroundColor: nodeColor }}
                          />
                          <div className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] font-medium text-white/80 group-hover:text-white/95">
                              {connected.label}
                            </span>
                            {edge?.label && (
                              <span className="mt-0.5 block text-[11px] text-white/45">{edge.label}</span>
                            )}
                          </div>
                          <span className="mt-1 shrink-0 text-[10px] text-white/30">
                            {NODE_TYPE_LABELS[connected.type]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}
