"use client";

import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/subjects/physics/lib/cn";
import {
  HW_THEME_LABEL,
  nextHwTheme,
  type HandwrittenTheme,
} from "@/subjects/physics/lib/handwritten-theme";
import {
  defaultRouteForSection,
  getSectionConfig,
  getSectionFromPath,
  getSectionRoute,
  sectionSupportsView,
  type SectionId,
  type ViewMode,
} from "@/subjects/physics/lib/section";
import { getViewMode } from "@/subjects/physics/lib/tier";
import { useHandwrittenStore } from "@/subjects/physics/store/useHandwrittenStore";
import { useUniverseStore } from "@/subjects/physics/store/useUniverseStore";

const STORAGE_KEY = "universe-physics-control-pos";

type Pos = { x: number; y: number };

const noopSubscribe = () => () => {};

function readPersistedPos(): Pos {
  if (typeof window === "undefined") return { x: 0, y: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Pos;
      if (typeof parsed.x === "number" && typeof parsed.y === "number") {
        return parsed;
      }
    }
  } catch {
    // fall through to default
  }
  return { x: window.innerWidth - 88, y: 88 };
}

/**
 * Single draggable puck that hosts the view-mode toggle (3D ↔
 * handwritten) and, when the user is on the handwritten variant, the
 * theme switch (deep ↔ near). Hover or focus expands the puck into a
 * popover; pointer-leave snaps it back. Position persists in
 * localStorage so the puck respects each user's spatial preference.
 */
export function FloatingViewControl() {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const tier = useUniverseStore((s) => s.currentTier);
  const transitionActive = useUniverseStore((s) => s.transition.active);
  const section = getSectionFromPath(pathname);
  const view = getViewMode(pathname);
  const cfg = getSectionConfig(section);
  const handwritten = view === "handwritten";

  const hwTheme = useHandwrittenStore((s) => s.theme);
  const setHwTheme = useHandwrittenStore((s) => s.setTheme);
  const physicsPalette = useHandwrittenStore((s) => s.physicsPalette);
  const setPhysicsPalette = useHandwrittenStore((s) => s.setPhysicsPalette);
  const universeBackdrop = useHandwrittenStore((s) => s.universeBackdrop);
  const setUniverseBackdrop = useHandwrittenStore((s) => s.setUniverseBackdrop);

  const [expanded, setExpanded] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const wasDragging = useRef(false);

  // Hydrate position from localStorage on the client via useSyncExternalStore
  // so we never touch setState inside an effect (RFC: react-hooks/set-state-in-effect).
  // On the server the snapshot is null → component renders nothing until hydration.
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
  const [localPos, setLocalPos] = useState<Pos | null>(null);
  const pos: Pos | null = isClient ? (localPos ?? readPersistedPos()) : null;

  const persistPos = (next: Pos) => {
    setLocalPos(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota / disabled storage
    }
  };

  const onSwitchView = (target: ViewMode) => {
    if (target === view || transitionActive) return;
    if (!sectionSupportsView(section, target)) return;
    // tier may belong to current section; getSectionRoute falls back if not
    router.push(getSectionRoute(section, tier, target));
  };

  const onSwitchSection = (target: SectionId) => {
    if (target === section || transitionActive) return;
    router.push(defaultRouteForSection(target));
  };

  if (!pos) return null;

  return (
    <div ref={constraintsRef} className="pointer-events-none fixed inset-0 z-40">
      <motion.div
        drag
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={constraintsRef}
        dragMomentum={false}
        dragElastic={0.05}
        onDragStart={() => {
          wasDragging.current = true;
          setExpanded(false);
        }}
        onDragEnd={(_, info) => {
          persistPos({ x: pos.x + info.offset.x, y: pos.y + info.offset.y });
          // small timeout so the click after drag-release is suppressed
          setTimeout(() => {
            wasDragging.current = false;
          }, 80);
        }}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        onHoverStart={() => !wasDragging.current && setExpanded(true)}
        onHoverEnd={() => setExpanded(false)}
        className="pointer-events-auto absolute top-0 left-0"
      >
        <motion.button
          type="button"
          aria-label="View controls"
          aria-expanded={expanded}
          onPointerDown={(e) => dragControls.start(e)}
          onClick={() => {
            if (wasDragging.current) return;
            setExpanded((v) => !v);
          }}
          className={cn(
            "border-fg-disabled/40 bg-bg-deep/70 text-fg-primary flex h-12 w-12 cursor-grab items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-200 active:cursor-grabbing",
            "hover:border-accent-warm/70"
          )}
        >
          <PuckGlyph mode={handwritten ? "handwritten" : "3d"} />
        </motion.button>

        <AnimatePresence>
          {expanded ? (
            <motion.div
              key="popover"
              initial={{ opacity: 0, y: -4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
              className="border-fg-disabled/40 bg-bg-deep/85 absolute top-14 left-1/2 flex w-[232px] -translate-x-1/2 flex-col gap-2 rounded-2xl border p-3 backdrop-blur-xl"
            >
              <SegmentGroup
                label="section"
                value={section}
                options={[
                  { id: "universe", label: "UNIVERSE · 宇宙" },
                  { id: "physics", label: "PHYSICS · 物理" },
                ]}
                onChange={(v) => onSwitchSection(v as SectionId)}
              />

              <SegmentGroup
                label="view"
                value={view}
                options={[
                  {
                    id: "3d",
                    label: "3D · LIVE",
                    disabled: !sectionSupportsView(section, "3d"),
                  },
                  { id: "handwritten", label: "HANDWRITTEN · ATLAS" },
                ]}
                onChange={(v) => onSwitchView(v as ViewMode)}
              />

              {handwritten && section === "universe" ? (
                <SegmentGroup
                  label="canvas"
                  value={hwTheme}
                  options={[
                    { id: "night", label: HW_THEME_LABEL.night.primary },
                    { id: "day", label: HW_THEME_LABEL.day.primary },
                  ]}
                  onChange={(v) => setHwTheme(v as HandwrittenTheme)}
                  showHint={() => `→ ${HW_THEME_LABEL[nextHwTheme(hwTheme)].latin}`}
                />
              ) : null}

              {handwritten && section === "universe" ? (
                <SegmentGroup
                  label="backdrop"
                  value={universeBackdrop}
                  options={[
                    { id: "stars", label: "STARS · 星点" },
                    { id: "grid", label: "GRID · 网格" },
                  ]}
                  onChange={(v) => setUniverseBackdrop(v as "stars" | "grid")}
                />
              ) : null}

              {section === "physics" ? (
                <SegmentGroup
                  label="palette"
                  value={physicsPalette}
                  options={[
                    { id: "paper", label: "PAPER · 米黄稿纸" },
                    { id: "night", label: "NIGHT · 深色对比" },
                  ]}
                  onChange={(v) => setPhysicsPalette(v as "paper" | "night")}
                />
              ) : null}

              <button
                type="button"
                onClick={() => router.push("/universe-physics/experiments")}
                className="ease-product text-fg-muted hover:bg-bg-elevated hover:text-fg-secondary flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase transition-all duration-150"
              >
                <span aria-hidden className="bg-accent-cool h-1.5 w-1.5 rounded-full" />
                <span>EXPERIMENTS · 实验</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/universe-physics/knowledge-base")}
                className="ease-product text-fg-muted hover:bg-bg-elevated hover:text-fg-secondary flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase transition-all duration-150"
              >
                <span aria-hidden className="bg-accent-cool h-1.5 w-1.5 rounded-full" />
                <span>KNOWLEDGE · 知识库</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/universe-physics/dialogues")}
                className="ease-product text-fg-muted hover:bg-bg-elevated hover:text-fg-secondary flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase transition-all duration-150"
              >
                <span aria-hidden className="bg-accent-cool h-1.5 w-1.5 rounded-full" />
                <span>DIALOGUES · 对话</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/")}
                className="ease-product text-fg-muted hover:bg-bg-elevated hover:text-fg-secondary flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase transition-all duration-150"
              >
                <span aria-hidden className="bg-fg-disabled h-1.5 w-1.5 rounded-full" />
                <span>← 返回首页</span>
              </button>

              <p className="text-fg-disabled px-1 pt-1 font-mono text-[9px] tracking-[0.28em] uppercase">
                {cfg.label.primary} · drag 拖动定位
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function PuckGlyph({ mode }: { mode: "3d" | "handwritten" }) {
  return (
    <span aria-hidden className="relative inline-flex h-6 w-6 items-center justify-center">
      <span className="border-accent-warm/70 absolute inset-0 rounded-full border" />
      <span
        className={cn(
          "absolute inset-1 rounded-full transition-colors",
          mode === "3d" ? "bg-accent-warm/60" : "bg-accent-cool/50"
        )}
      />
      <span className="text-fg-primary relative font-mono text-[9px] tracking-[0.1em] uppercase">
        {mode === "3d" ? "3D" : "Hw"}
      </span>
    </span>
  );
}

type SegmentOption = { id: string; label: string; disabled?: boolean };

function SegmentGroup({
  label,
  value,
  options,
  onChange,
  showHint,
}: {
  label: string;
  value: string;
  options: ReadonlyArray<SegmentOption>;
  onChange: (id: string) => void;
  showHint?: () => string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between px-1">
        <span className="text-fg-muted font-mono text-[9px] tracking-[0.28em] uppercase">
          {label}
        </span>
        {showHint ? (
          <span className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
            {showHint()}
          </span>
        ) : null}
      </div>
      <div
        role="tablist"
        aria-label={label}
        className="bg-bg-elevated/60 flex flex-col gap-1 rounded-lg p-1"
      >
        {options.map((opt) => {
          const isActive = opt.id === value;
          const disabled = opt.disabled === true;
          return (
            <button
              key={opt.id}
              role="tab"
              type="button"
              disabled={disabled}
              aria-selected={isActive}
              aria-disabled={disabled || undefined}
              onClick={() => !disabled && onChange(opt.id)}
              className={cn(
                "ease-product flex items-center gap-2 rounded-md px-2.5 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase transition-all duration-150",
                isActive
                  ? "bg-accent-warm/15 text-fg-primary"
                  : disabled
                    ? "text-fg-disabled cursor-not-allowed"
                    : "text-fg-muted hover:bg-bg-elevated hover:text-fg-secondary"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  isActive ? "bg-accent-warm" : "bg-fg-disabled"
                )}
              />
              <span className="truncate">{opt.label}</span>
              {disabled ? <span className="text-fg-disabled ml-auto text-[8px]">n/a</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
