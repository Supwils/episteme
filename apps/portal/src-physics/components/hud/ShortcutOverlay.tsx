"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Close } from "./icons";

type Shortcut = { keys: string[]; desc: string };

const ROWS: Shortcut[] = [
  { keys: ["↑", "↓"], desc: "切换 tier · 跨段自动跳过 placeholder" },
  { keys: ["←", "→"], desc: "Physics 多页档 · 上一页 / 下一页" },
  { keys: ["1", "…", "9"], desc: "直跳 tier · Universe 1–8 → T0–T7 · Physics 1–9 → P0–P8" },
  { keys: ["O"], desc: "打开当前 tier 的 atlas 知识面板" },
  { keys: ["Esc"], desc: "关闭 atlas 面板 / 快捷键面板" },
  { keys: ["?"], desc: "唤起本面板" },
];

/**
 * Visual cheat-sheet for the global keyboard navigation. Toggled from
 * KeyboardNav by pressing "?" (Shift+/). Esc dismisses. Esc passthrough
 * is handled by KeyboardNav.
 */
export function ShortcutOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            key="catcher"
            aria-hidden
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Keyboard shortcuts"
            className="hud-capsule fixed top-1/2 left-1/2 z-50 w-[min(420px,92vw)] -translate-x-1/2 -translate-y-1/2 px-6 py-5"
            initial={{ opacity: 0, scale: 0.96, y: "-46%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%" }}
            exit={{ opacity: 0, scale: 0.96, y: "-46%" }}
            transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="flex items-center justify-between pb-3">
              <span className="hud-meta text-fg-muted">keyboard · 快捷键</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close shortcuts"
                className="border-fg-disabled/40 text-fg-secondary hover:border-fg-secondary hover:text-fg-primary ease-product flex h-6 w-6 items-center justify-center border transition-colors duration-150"
              >
                <Close className="h-3 w-3" />
              </button>
            </div>
            <ul className="divide-fg-disabled/20 divide-y">
              {ROWS.map((row) => (
                <li key={row.keys.join("-")} className="flex items-center gap-4 py-2.5">
                  <span className="flex shrink-0 gap-1">
                    {row.keys.map((k) => (
                      <kbd
                        key={k}
                        className="border-fg-disabled/50 text-fg-primary bg-bg-elevated/40 inline-flex h-7 min-w-7 items-center justify-center rounded-md border px-1.5 font-mono text-xs"
                      >
                        {k}
                      </kbd>
                    ))}
                  </span>
                  <span className="text-fg-secondary text-sm leading-snug">{row.desc}</span>
                </li>
              ))}
            </ul>
            <p className="text-fg-muted mt-3 pt-3 font-mono text-[10px] tracking-[0.24em] uppercase">
              tap outside · close
            </p>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
