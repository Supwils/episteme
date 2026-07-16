"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { DailySelected } from "../lib/daily-selector";
import { buildShareText, formatDisplayDate, getWeekday } from "../lib/daily-selector";

type DailyShareCardProps = {
  daily: DailySelected;
};

const DOMAIN_CARDS = [
  {
    key: "physics" as const,
    icon: "🔬",
    label: "宇宙物理",
    color: "#60a5fa",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.2)",
  },
  {
    key: "history" as const,
    icon: "📜",
    label: "人类历史",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
  },
  {
    key: "philosophy" as const,
    icon: "💭",
    label: "哲学思想",
    color: "#eab308",
    bg: "rgba(234,179,8,0.1)",
    border: "rgba(234,179,8,0.2)",
  },
  {
    key: "economics" as const,
    icon: "📊",
    label: "经济学",
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.2)",
  },
  {
    key: "psychology" as const,
    icon: "🧠",
    label: "心理学",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.1)",
    border: "rgba(244,114,182,0.2)",
  },
  {
    key: "mathematics" as const,
    icon: "📐",
    label: "数学",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.1)",
    border: "rgba(167,139,250,0.2)",
  },
  {
    key: "lifeScience" as const,
    icon: "🧬",
    label: "生命科学",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.2)",
  },
  {
    key: "cosmology" as const,
    icon: "🌌",
    label: "宇宙学",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.1)",
    border: "rgba(129,140,248,0.2)",
  },
  {
    key: "computerScience" as const,
    icon: "💻",
    label: "计算机科学",
    color: "#4f9cf0",
    bg: "rgba(79,156,240,0.1)",
    border: "rgba(79,156,240,0.2)",
  },
  {
    key: "politicalScience" as const,
    icon: "⚖️",
    label: "政治学",
    color: "#c25b5b",
    bg: "rgba(194,91,91,0.1)",
    border: "rgba(194,91,91,0.2)",
  },
  {
    key: "earthScience" as const,
    icon: "🌍",
    label: "地球科学",
    color: "#4f9d76",
    bg: "rgba(79,157,118,0.1)",
    border: "rgba(79,157,118,0.2)",
  },
  {
    key: "medicine" as const,
    icon: "⚕️",
    label: "医学与公共卫生",
    color: "#d9544d",
    bg: "rgba(217,84,77,0.1)",
    border: "rgba(217,84,77,0.2)",
  },
  {
    key: "chemistry" as const,
    icon: "⚗️",
    label: "化学",
    color: "#e08a3c",
    bg: "rgba(224,138,60,0.1)",
    border: "rgba(224,138,60,0.2)",
  },
  {
    key: "sociology" as const,
    icon: "🏙",
    label: "社会学",
    color: "#7a8f5a",
    bg: "rgba(122,143,90,0.1)",
    border: "rgba(122,143,90,0.2)",
  },
] as const;

export function DailyShareCard({ daily }: DailyShareCardProps) {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopyText = useCallback(async () => {
    const text = buildShareText(daily);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    }
  }, [daily]);

  const handleGenerateImage = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 800;
    const itemHeight = 110;
    const height = 130 + DOMAIN_CARDS.length * itemHeight + 220;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const displayDate = formatDisplayDate(daily.date);
    const weekday = getWeekday(daily.date);

    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, "#0f0f1a");
    grad.addColorStop(1, "#1a1a2e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    const accentGrad = ctx.createLinearGradient(0, 0, width, 0);
    accentGrad.addColorStop(0, "#3b82f6");
    accentGrad.addColorStop(0.17, "#f59e0b");
    accentGrad.addColorStop(0.33, "#eab308");
    accentGrad.addColorStop(0.5, "#10b981");
    accentGrad.addColorStop(0.67, "#f472b6");
    accentGrad.addColorStop(0.83, "#22c55e");
    accentGrad.addColorStop(1, "#818cf8");
    ctx.fillStyle = accentGrad;
    ctx.fillRect(0, 0, width, 4);

    ctx.fillStyle = "#e8e8f0";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText("📚 每日知识", 40, 60);

    ctx.fillStyle = "#8b919a";
    ctx.font = "16px sans-serif";
    ctx.fillText(`${displayDate} ${weekday}`, 40, 90);

    let y = 130;
    for (const card of DOMAIN_CARDS) {
      const item = daily[card.key];

      ctx.fillStyle = card.bg;
      ctx.strokeStyle = card.border;
      ctx.lineWidth = 1;
      roundRect(ctx, 30, y, width - 60, itemHeight - 10, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = card.color;
      ctx.font = "bold 13px sans-serif";
      ctx.fillText(`${card.icon} ${card.label}`, 50, y + 28);

      ctx.fillStyle = "#e8e8f0";
      ctx.font = "bold 16px sans-serif";
      const titleLines = wrapText(ctx, item.title, width - 120);
      for (let i = 0; i < titleLines.length; i++) {
        ctx.fillText(titleLines[i]!, 50, y + 52 + i * 22);
      }

      ctx.fillStyle = "#8b8fa3";
      ctx.font = "13px sans-serif";
      const descY = y + 52 + titleLines.length * 22 + 4;
      const descLines = wrapText(ctx, item.description, width - 120);
      const maxDescLines = 2;
      for (let i = 0; i < Math.min(descLines.length, maxDescLines); i++) {
        ctx.fillText(descLines[i]!, 50, descY + i * 18);
      }

      y += itemHeight;
    }

    y += 15;
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    roundRect(ctx, 30, y, width - 60, 80, 12);
    ctx.fill();

    ctx.fillStyle = "#eab308";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("❓ 今日一问", 50, y + 28);

    ctx.fillStyle = "#c8cad3";
    ctx.font = "14px sans-serif";
    const questionLines = wrapText(ctx, daily.question, width - 120);
    for (let i = 0; i < Math.min(questionLines.length, 2); i++) {
      ctx.fillText(questionLines[i]!, 50, y + 52 + i * 20);
    }

    y += 100;
    ctx.fillStyle = "#8b919a";
    ctx.font = "12px sans-serif";
    ctx.fillText("Episteme · 格致 · episteme.vercel.app", 40, y + 20);

    const link = document.createElement("a");
    link.download = `daily-knowledge-${daily.date}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [daily]);

  return (
    <motion.section
      className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl backdrop-blur-xl"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)",
      }}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="p-6 sm:p-8">
        <h3
          className="mb-4 text-lg font-bold"
          style={{
            background: "linear-gradient(135deg, #e8e8f0, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          分享今日知识
        </h3>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleCopyText}
            className="flex-1 cursor-pointer rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200"
            style={{
              background: copied ? "rgba(34,197,94,0.15)" : "rgba(129,140,248,0.12)",
              border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : "rgba(129,140,248,0.2)"}`,
              color: copied ? "#22c55e" : "#818cf8",
            }}
          >
            {copied ? "✓ 已复制到剪贴板" : "📋 复制为文本"}
          </button>

          <button
            onClick={handleGenerateImage}
            className="flex-1 cursor-pointer rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200"
            style={{
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: "#f59e0b",
            }}
          >
            🖼️ 生成分享图片
          </button>
        </div>

        <canvas ref={canvasRef} aria-hidden="true" className="hidden" />
      </div>
    </motion.section>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let current = "";

  for (const char of text) {
    const test = current + char;
    if (ctx.measureText(test).width > maxWidth && current.length > 0) {
      lines.push(current);
      current = char;
    } else {
      current = test;
    }
  }
  if (current.length > 0) {
    lines.push(current);
  }
  return lines;
}
