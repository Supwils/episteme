"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Mol* (molstar) is a multi-MB WebGL library. To keep it entirely OUT of our
// webpack bundle (bundle-check caps any single chunk at 285 KB gzip) AND off
// the initial page load, we (1) load it from a pinned CDN build, and (2) only
// inject it when the user explicitly clicks "view 3D" on a given molecule.
// The structures themselves are real, experimentally-determined coordinates
// from the RCSB Protein Data Bank — accurate, not AI-generated.
const MOLSTAR_VERSION = "4.9.0";
const MOLSTAR_JS = `https://cdn.jsdelivr.net/npm/molstar@${MOLSTAR_VERSION}/build/viewer/molstar.js`;
const MOLSTAR_CSS = `https://cdn.jsdelivr.net/npm/molstar@${MOLSTAR_VERSION}/build/viewer/molstar.css`;

// `molstar` is a CDN-injected UMD global with no bundled types; `any` is the
// honest shape of an untyped runtime global loaded outside the build.
type MolstarGlobal = {
  Viewer: { create: (el: HTMLElement, options: Record<string, unknown>) => Promise<MolstarViewer> };
};
type MolstarViewer = {
  loadPdb: (id: string) => Promise<void>;
  plugin?: { dispose?: () => void };
  dispose?: () => void;
};

let molstarPromise: Promise<MolstarGlobal> | null = null;

function loadMolstar(): Promise<MolstarGlobal> {
  const existing = (globalThis as { molstar?: MolstarGlobal }).molstar;
  if (existing) return Promise.resolve(existing);
  if (molstarPromise) return molstarPromise;
  molstarPromise = new Promise<MolstarGlobal>((resolve, reject) => {
    if (!document.querySelector(`link[data-molstar]`)) {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = MOLSTAR_CSS;
      css.dataset.molstar = "true";
      document.head.appendChild(css);
    }
    const script = document.createElement("script");
    script.src = MOLSTAR_JS;
    script.async = true;
    script.onload = () => {
      const g = (globalThis as { molstar?: MolstarGlobal }).molstar;
      if (g) resolve(g);
      else reject(new Error("molstar loaded but global missing"));
    };
    script.onerror = () => {
      molstarPromise = null; // allow retry
      reject(new Error("molstar CDN load failed"));
    };
    document.head.appendChild(script);
  });
  return molstarPromise;
}

export type MoleculeViewerProps = {
  /** RCSB PDB id, e.g. "1ZNI" (insulin). */
  pdbId: string;
  /** Display name shown on the placeholder, e.g. "胰岛素". */
  title: string;
  /** Optional accent hex for the activate button. */
  accent?: string;
  /** Viewer height in px (default 360). */
  height?: number;
};

type Status = "idle" | "loading" | "ready" | "error";

export function MoleculeViewer({
  pdbId,
  title,
  accent = "#5fb3a3",
  height = 360,
}: MoleculeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<MolstarViewer | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const activate = useCallback(async () => {
    if (status === "loading" || status === "ready") return;
    setStatus("loading");
    try {
      const molstar = await loadMolstar();
      if (!containerRef.current) return;
      const viewer = await molstar.Viewer.create(containerRef.current, {
        layoutIsExpanded: false,
        layoutShowControls: false,
        layoutShowRemoteState: false,
        layoutShowSequence: false,
        layoutShowLog: false,
        layoutShowLeftPanel: false,
        viewportShowExpand: true,
        viewportShowControls: false,
        pdbProvider: "rcsb",
        pixelScale: 1,
      });
      viewerRef.current = viewer;
      await viewer.loadPdb(pdbId);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [pdbId, status]);

  useEffect(() => {
    return () => {
      const v = viewerRef.current;
      if (v?.plugin?.dispose) v.plugin.dispose();
      else if (v?.dispose) v.dispose();
      viewerRef.current = null;
    };
  }, []);

  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-white/10 bg-[#0b0b12]">
      <div className="relative w-full" style={{ height }}>
        <div
          ref={containerRef}
          className="absolute inset-0"
          aria-label={`${title} 的三维分子结构`}
        />

        {status !== "ready" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <div className="text-sm text-white/70">
              <span className="font-semibold text-white/90">{title}</span>
              <span className="ml-2 font-mono text-[11px] text-white/40">PDB {pdbId}</span>
            </div>
            {status === "idle" && (
              <button
                type="button"
                onClick={activate}
                className="rounded-full px-4 py-2 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ background: accent }}
              >
                查看 3D 结构 ▶
              </button>
            )}
            {status === "loading" && (
              <div className="flex items-center gap-2 text-[13px] text-white/60">
                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white/70" />
                正在从 RCSB 蛋白质数据库加载真实结构…
              </div>
            )}
            {status === "error" && (
              <div className="text-[13px] text-white/60">
                加载失败。可直接在{" "}
                <a
                  href={`https://www.rcsb.org/structure/${pdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={{ color: accent }}
                >
                  RCSB PDB
                </a>{" "}
                查看。
              </div>
            )}
          </div>
        )}
      </div>
      <figcaption className="border-t border-white/10 px-4 py-2 text-[11px] text-white/40">
        实验测定的三维结构 · 数据来自 RCSB Protein Data Bank（PDB {pdbId}）· 由 Mol* 渲染
      </figcaption>
    </figure>
  );
}
