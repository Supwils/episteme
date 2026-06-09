"use client";

import { useEffect, useState } from "react";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

const STATS: StatItem[] = [
  { label: "地质时代", value: 8, suffix: "个", icon: "🌍" },
  { label: "物种记录", value: 50, suffix: "+", icon: "🦕" },
  { label: "大灭绝事件", value: 5, suffix: "次", icon: "💥" },
  { label: "科学家", value: 20, suffix: "+", icon: "🔬" },
  { label: "生命演化跨度", value: 40, suffix: "亿年", icon: "⏳" },
];

export function LifeStats() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {STATS.map((stat) => (
        <StatCounter key={stat.label} stat={stat} />
      ))}
    </div>
  );
}

function StatCounter({ stat }: { stat: StatItem }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setCount(stat.value);
      return;
    }
    const duration = 1200;
    const steps = 40;
    const increment = stat.value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [stat.value]);

  return (
    <div
      className="flex flex-col items-center gap-1.5 border p-4 text-center"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(255,255,255,0.06)",
        borderRadius: "12px",
      }}
    >
      <span className="text-xl">{stat.icon}</span>
      <span className="font-mono text-2xl font-bold text-[#e8e8f0]">
        <span aria-label={`${stat.value}${stat.suffix}`}>
          {count}
          {stat.suffix}
        </span>
      </span>
      <span className="font-mono text-[10px] tracking-wider text-[#888]">
        {stat.label}
      </span>
    </div>
  );
}
