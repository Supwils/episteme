"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const CODON_TABLE: Record<string, string> = {
  UUU: "Phe", UUC: "Phe", UUA: "Leu", UUG: "Leu",
  CUU: "Leu", CUC: "Leu", CUA: "Leu", CUG: "Leu",
  AUU: "Ile", AUC: "Ile", AUA: "Ile", AUG: "Met",
  GUU: "Val", GUC: "Val", GUA: "Val", GUG: "Val",
  UCU: "Ser", UCC: "Ser", UCA: "Ser", UCG: "Ser",
  CCU: "Pro", CCC: "Pro", CCA: "Pro", CCG: "Pro",
  ACU: "Thr", ACC: "Thr", ACA: "Thr", ACG: "Thr",
  GCU: "Ala", GCC: "Ala", GCA: "Ala", GCG: "Ala",
  UAU: "Tyr", UAC: "Tyr", UAA: "Stop", UAG: "Stop",
  CAU: "His", CAC: "His", CAA: "Gln", CAG: "Gln",
  AAU: "Asn", AAC: "Asn", AAA: "Lys", AAG: "Lys",
  GAU: "Asp", GAC: "Asp", GAA: "Glu", GAG: "Glu",
  UGU: "Cys", UGC: "Cys", UGA: "Stop", UGG: "Trp",
  CGU: "Arg", CGC: "Arg", CGA: "Arg", CGG: "Arg",
  AGU: "Ser", AGC: "Ser", AGA: "Arg", AGG: "Arg",
  GGU: "Gly", GGC: "Gly", GGA: "Gly", GGG: "Gly",
};

const BASE_COLORS: Record<string, string> = {
  A: "#ef4444", T: "#3b82f6", U: "#3b82f6", G: "#22c55e", C: "#eab308",
};

const COMPLEMENT: Record<string, string> = {
  A: "T", T: "A", G: "C", C: "G",
};

function dnaToMrna(dna: string): string {
  return dna.replace(/A/g, "u").replace(/T/g, "a").replace(/G/g, "c").replace(/C/g, "g").toUpperCase();
}

function mrnaToCodons(mrna: string): string[] {
  const codons: string[] = [];
  for (let i = 0; i < mrna.length - 2; i += 3) {
    codons.push(mrna.substring(i, i + 3));
  }
  return codons;
}

function codonsToProtein(codons: string[]): { codon: string; aminoAcid: string; isStart: boolean; isStop: boolean }[] {
  const result: { codon: string; aminoAcid: string; isStart: boolean; isStop: boolean }[] = [];
  let started = false;
  for (const codon of codons) {
    const aa = CODON_TABLE[codon] ?? "???";
    const isStart = codon === "AUG" && !started;
    const isStop = aa === "Stop";
    if (isStart) started = true;
    if (started) {
      result.push({ codon, aminoAcid: aa, isStart, isStop });
    }
    if (isStop) break;
  }
  return result;
}

const DEFAULT_DNA = "TACGCATCGATCGATCGATCGATGCATCG";

type ViewMode = "overview" | "transcription" | "translation";

const MODE_INFO: Record<ViewMode, { label: string; description: string }> = {
  overview: {
    label: "总览",
    description: "DNA → mRNA → 蛋白质的完整流程。中心法则描述了遗传信息的流动方向。",
  },
  transcription: {
    label: "转录",
    description: "RNA 聚合酶读取 DNA 模板链（3\'→5\'），合成互补的 mRNA（5\'→3\'）。A→U, T→A, G→C, C→G。",
  },
  translation: {
    label: "翻译",
    description: "核糖体读取 mRNA 密码子（每 3 个碱基一组），tRNA 带来对应的氨基酸，形成多肽链。",
  },
};

const PRODUCT_EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

interface GeneExpressionProps {
  className?: string;
}

export function GeneExpression({ className }: GeneExpressionProps) {
  const reduce = useReducedMotion();
  const [dnaInput, setDnaInput] = useState(DEFAULT_DNA);
  const [mode, setMode] = useState<ViewMode>("overview");

  const dna = useMemo(() => dnaInput.toUpperCase().replace(/[^ATGC]/g, ""), [dnaInput]);
  const mrna = useMemo(() => dnaToMrna(dna), [dna]);
  const codons = useMemo(() => mrnaToCodons(mrna), [mrna]);
  const protein = useMemo(() => codonsToProtein(codons), [codons]);

  const complementStrand = useMemo(() => {
    return dna.split("").map((b) => COMPLEMENT[b] ?? "N").join("");
  }, [dna]);

  return (
    <div className={className}>
      <div className="border-border-faint bg-bg-near relative overflow-hidden border">
        <div className="flex items-center justify-between border-b border-border-faint px-4 py-2">
          <span className="font-mono text-[10px] tracking-[0.28em] text-fg-muted uppercase">
            基因表达 · gene expression
          </span>
          <div className="flex items-center gap-2">
            {(["overview", "transcription", "translation"] as ViewMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`border px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                  mode === m
                    ? "border-accent-cool/40 bg-accent-cool/10 text-accent-cool"
                    : "border-border-subtle bg-bg-near hover:bg-bg-elevated text-fg-secondary"
                }`}
              >
                {MODE_INFO[m].label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <label className="text-fg-muted mb-1 block font-mono text-[10px] tracking-[0.2em] uppercase">
              输入 DNA 序列（5&apos;&rarr;3&apos;）
            </label>
            <input
              type="text"
              value={dnaInput}
              onChange={(e) => setDnaInput(e.target.value.toUpperCase())}
              className="w-full border border-border-subtle bg-bg-deep px-3 py-2 font-mono text-sm text-fg-primary outline-none focus:border-accent-cool/40"
              placeholder="输入 A, T, G, C 序列..."
              maxLength={60}
            />
            <p className="text-fg-disabled mt-1 font-mono text-[9px]">
              有效碱基: {dna.length} / {dnaInput.length} · 仅接受 A, T, G, C
            </p>
          </div>

          <AnimatePresence mode="wait">
            {mode === "overview" && (
              <motion.div
                key="overview"
                initial={reduce ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? {} : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: PRODUCT_EASE }}
                className="space-y-4"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-fg-muted w-16">DNA 5&apos;→3&apos;</span>
                    <div className="flex flex-1 flex-wrap gap-0.5">
                      {dna.split("").map((b, i) => (
                        <span
                          key={`dna-${i}`}
                          className="inline-flex h-6 w-5 items-center justify-center border border-border-faint font-mono text-[10px] font-bold"
                          style={{ color: BASE_COLORS[b] ?? "#888", borderColor: `${BASE_COLORS[b] ?? "#888"}30` }}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-fg-muted w-16">DNA 3&apos;→5&apos;</span>
                    <div className="flex flex-1 flex-wrap gap-0.5">
                      {complementStrand.split("").map((b, i) => (
                        <span
                          key={`comp-${i}`}
                          className="inline-flex h-6 w-5 items-center justify-center border border-border-faint font-mono text-[10px] font-bold opacity-60"
                          style={{ color: BASE_COLORS[b] ?? "#888", borderColor: `${BASE_COLORS[b] ?? "#888"}20` }}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-accent-cool w-16">mRNA</span>
                    <div className="flex flex-1 flex-wrap gap-0.5">
                      {mrna.split("").map((b, i) => (
                        <span
                          key={`mrna-${i}`}
                          className="inline-flex h-6 w-5 items-center justify-center border font-mono text-[10px] font-bold"
                          style={{ color: BASE_COLORS[b] ?? "#888", borderColor: `${BASE_COLORS[b] ?? "#888"}40`, background: `${BASE_COLORS[b] ?? "#888"}10` }}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-border-faint border-t pt-3">
                  <p className="text-fg-muted mb-2 font-mono text-[10px] tracking-[0.2em] uppercase">
                    蛋白质产物
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {protein.length === 0 ? (
                      <span className="text-fg-disabled font-mono text-xs">未找到起始密码子 AUG</span>
                    ) : (
                      protein.map((p, i) => (
                        <motion.span
                          key={`aa-${i}`}
                          initial={reduce ? {} : { opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: reduce ? 0 : i * 0.05 }}
                          className={`inline-flex items-center gap-1 border px-2 py-1 font-mono text-[10px] ${
                            p.isStart
                              ? "border-green-500/40 bg-green-500/10 text-green-400"
                              : p.isStop
                                ? "border-red-500/40 bg-red-500/10 text-red-400"
                                : "border-border-subtle bg-bg-deep text-fg-secondary"
                          }`}
                        >
                          <span className="text-[8px] opacity-60">{p.codon}</span>
                          <span className="font-bold">{p.aminoAcid}</span>
                        </motion.span>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {mode === "transcription" && (
              <motion.div
                key="transcription"
                initial={reduce ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? {} : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: PRODUCT_EASE }}
                className="space-y-4"
              >
                <svg viewBox="0 0 700 200" className="h-auto w-full" role="img" aria-label="转录过程示意图">
                  <defs>
                    <marker id="arrow-right" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="#60a5fa" fillOpacity="0.7" />
                    </marker>
                  </defs>

                  <text x={100} y={30} fill="#3b82f6" fontSize="11" fontFamily="monospace" fontWeight="600">
                    DNA 模板链 (3&apos;→5&apos;)
                  </text>
                  {complementStrand.slice(0, 24).split("").map((b, i) => (
                    <g key={`trans-dna-${i}`}>
                      <rect x={100 + i * 22} y={40} width={18} height={24} rx={2} fill={`${BASE_COLORS[b]}15`} stroke={`${BASE_COLORS[b]}30`} strokeWidth={1} />
                      <text x={109 + i * 22} y={56} textAnchor="middle" fill={BASE_COLORS[b]} fontSize="11" fontFamily="monospace" fontWeight="700">
                        {b}
                      </text>
                    </g>
                  ))}

                  <text x={100} y={95} fill="#22c55e" fontSize="11" fontFamily="monospace" fontWeight="600">
                    mRNA (5&apos;→3&apos;)
                  </text>
                  {mrna.slice(0, 24).split("").map((b, i) => (
                    <g key={`trans-mrna-${i}`}>
                      <rect x={100 + i * 22} y={105} width={18} height={24} rx={2} fill={`${BASE_COLORS[b]}20`} stroke={`${BASE_COLORS[b]}40`} strokeWidth={1} />
                      <text x={109 + i * 22} y={121} textAnchor="middle" fill={BASE_COLORS[b]} fontSize="11" fontFamily="monospace" fontWeight="700">
                        {b}
                      </text>
                    </g>
                  ))}

                  {Array.from({ length: Math.min(24, dna.length) }).map((_, i) => (
                    <line
                      key={`trans-bond-${i}`}
                      x1={109 + i * 22}
                      y1={64}
                      x2={109 + i * 22}
                      y2={105}
                      stroke="#444"
                      strokeWidth={1}
                      strokeDasharray="2 2"
                    />
                  ))}

                  <text x={350} y={165} textAnchor="middle" fill="#f97316" fontSize="10" fontFamily="monospace">
                    RNA 聚合酶 →
                  </text>
                  <line x1={280} y1={170} x2={420} y2={170} stroke="#f97316" strokeWidth={2} markerEnd="url(#arrow-right)" opacity={0.5} />

                  <text x={350} y={190} textAnchor="middle" fill="#555" fontSize="9" fontFamily="monospace">
                    碱基配对: A→U, T→A, G→C, C→G
                  </text>
                </svg>

                <div className="rounded-lg border border-accent-cool/20 bg-accent-cool/5 p-3">
                  <p className="text-fg-secondary text-xs leading-relaxed">
                    <span className="font-medium text-accent-cool">转录：</span>
                    RNA 聚合酶结合到基因的启动子区域，沿 DNA 模板链（3&apos;&rarr;5&apos;）移动，
                    合成互补的 mRNA 链（5&apos;&rarr;3&apos;）。转录后 mRNA 经过加工（加帽、加尾、剪接）后离开细胞核。
                  </p>
                </div>
              </motion.div>
            )}

            {mode === "translation" && (
              <motion.div
                key="translation"
                initial={reduce ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? {} : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: PRODUCT_EASE }}
                className="space-y-4"
              >
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse font-mono text-[10px]">
                    <thead>
                      <tr className="border-b border-border-faint">
                        <th className="px-2 py-1.5 text-left text-fg-muted">密码子</th>
                        <th className="px-2 py-1.5 text-left text-fg-muted">氨基酸</th>
                        <th className="px-2 py-1.5 text-left text-fg-muted">状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      {protein.map((p, i) => (
                        <motion.tr
                          key={`trans-row-${i}`}
                          initial={reduce ? {} : { opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: reduce ? 0 : i * 0.08 }}
                          className={`border-b border-border-faint/50 ${
                            p.isStart ? "bg-green-500/5" : p.isStop ? "bg-red-500/5" : ""
                          }`}
                        >
                          <td className="px-2 py-1.5">
                            <span className="flex gap-0.5">
                              {p.codon.split("").map((b, j) => (
                                <span key={j} style={{ color: BASE_COLORS[b] }} className="font-bold">
                                  {b}
                                </span>
                              ))}
                            </span>
                          </td>
                          <td className="px-2 py-1.5 font-bold text-fg-primary">{p.aminoAcid}</td>
                          <td className="px-2 py-1.5">
                            {p.isStart && <span className="text-green-400">起始密码子</span>}
                            {p.isStop && <span className="text-red-400">终止密码子</span>}
                            {!p.isStart && !p.isStop && <span className="text-fg-disabled">—</span>}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                  {protein.length === 0 && (
                    <p className="text-fg-disabled py-4 text-center font-mono text-xs">
                      未找到起始密码子 AUG，请修改 DNA 序列
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {protein.map((p, i) => (
                    <motion.span
                      key={`aa-vis-${i}`}
                      initial={reduce ? {} : { opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: reduce ? 0 : i * 0.05 }}
                      className={`inline-flex items-center border px-2 py-1 font-mono text-[10px] font-bold ${
                        p.isStart
                          ? "border-green-500/40 bg-green-500/10 text-green-400"
                          : p.isStop
                            ? "border-red-500/40 bg-red-500/10 text-red-400"
                            : "border-border-subtle bg-bg-deep text-fg-primary"
                      }`}
                    >
                      {p.aminoAcid}
                    </motion.span>
                  ))}
                </div>

                <div className="rounded-lg border border-accent-cool/20 bg-accent-cool/5 p-3">
                  <p className="text-fg-secondary text-xs leading-relaxed">
                    <span className="font-medium text-accent-cool">翻译：</span>
                    核糖体沿 mRNA 移动，每次读取 3 个碱基（一个密码子）。
                    tRNA 的反密码子与密码子配对，带来对应的氨基酸。
                    AUG 是起始密码子（甲硫氨酸），UAA/UAG/UGA 是终止密码子。
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between border-t border-border-faint px-4 py-2">
          <div className="flex items-center gap-4">
            {Object.entries(BASE_COLORS).map(([base, color]) => (
              <div key={base} className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-none" style={{ backgroundColor: color }} />
                <span className="font-mono text-[9px] text-fg-muted">{base}</span>
              </div>
            ))}
          </div>
          <span className="font-mono text-[9px] text-fg-disabled">
            中心法则: DNA → RNA → 蛋白质
          </span>
        </div>
      </div>
    </div>
  );
}
