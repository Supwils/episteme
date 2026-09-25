"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Glyph, type GlyphName } from "@/components/design/Glyph";
import { DURATION_MS, EASE_INSTRUMENT } from "@/lib/design/motion-tokens";

type ThemeChoice = "dark" | "light" | "system";

// Cycle 观测台 → 手记 → 跟随系统. The button shows where a click takes you.
const NEXT: Record<ThemeChoice, ThemeChoice> = { dark: "light", light: "system", system: "dark" };
const TARGET: Record<ThemeChoice, { glyph: GlyphName; label: string }> = {
  dark: { glyph: "telescope", label: "切换到观测台（深色主题）" },
  light: { glyph: "pen", label: "切换到手记（浅色主题）" },
  system: { glyph: "auto", label: "跟随系统主题" },
};

function resolve(choice: ThemeChoice): "dark" | "light" {
  if (choice !== "system") return choice;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

const BUTTON =
  "border-border-subtle text-fg-muted hover:border-accent-gold hover:text-fg-primary flex h-10 w-10 items-center justify-center rounded-lg border bg-transparent transition-colors";

/**
 * 主题切换即隐喻（T-DESIGN-03d）：望远镜是观测台，笔尖是手记。支持 View
 * Transitions 的浏览器里，新主题从按钮处以圆形展开；不支持或要求减少动效时瞬切。
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button type="button" className={BUTTON} aria-label="切换主题" disabled>
        <Glyph name="auto" size={18} />
      </button>
    );
  }

  const current = (theme ?? "dark") as ThemeChoice;
  const next = NEXT[current] ?? "dark";

  const apply = () => {
    // Set the class ourselves inside the transition callback so the "new"
    // snapshot is already the new theme; next-themes then persists the choice.
    const resolved = resolve(next);
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
    flushSync(() => setTheme(next));
  };

  const switchTheme = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const button = buttonRef.current;
    if (!document.startViewTransition || reduce || !button || resolve(next) === resolve(current)) {
      apply();
      return;
    }
    const box = button.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(apply);
    void transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: DURATION_MS.slow,
          easing: `cubic-bezier(${EASE_INSTRUMENT.join(", ")})`,
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  const target = TARGET[next];
  return (
    <button
      ref={buttonRef}
      type="button"
      className={BUTTON}
      onClick={switchTheme}
      aria-label={target.label}
      title={target.label}
    >
      <Glyph name={target.glyph} size={18} />
    </button>
  );
}
