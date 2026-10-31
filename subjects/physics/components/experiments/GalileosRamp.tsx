"use client";

import { useEffect, useRef, useState } from "react";
import { useExperimentReducedMotion } from "./use-experiment-reduced-motion";
import { cn } from "@/subjects/physics/lib/cn";
import { GalileoDiagram } from "./GalileoDiagram";
import { rampDuration, rampSample, type RampMeasurement } from "./galileo-model";

const controlClass =
  "rounded-lg bg-accent-cool/20 px-3 py-2 text-sm text-accent-cool transition-colors hover:bg-accent-cool/30 disabled:opacity-40";

function Measurements({ rows }: { rows: RampMeasurement[] }) {
  if (!rows.length) return null;
  return (
    <div className="border-fg-disabled/30 overflow-x-auto rounded-lg border">
      <table className="w-full text-xs">
        <caption className="text-fg-muted p-2 text-left">模型数据 · 每一行保留记录时的角度</caption>
        <thead>
          <tr>
            {["角度", "时间 (s)", "时间² (s²)", "距离 (m)"].map((label) => (
              <th key={label} scope="col" className="text-fg-muted px-2 py-2 text-left">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((m, i) => (
            <tr key={i} className="border-fg-disabled/20 border-t">
              <td className="px-2 py-2">{m.angle}°</td>
              <td className="px-2 py-2 font-mono">{m.time.toFixed(3)}</td>
              <td className="px-2 py-2 font-mono">{(m.time ** 2).toFixed(3)}</td>
              <td className="px-2 py-2 font-mono">{m.distance.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GalileosRamp({ className }: { className?: string }) {
  const [angle, setAngle] = useState(10);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [measurements, setMeasurements] = useState<RampMeasurement[]>([]);
  const clock = useRef(0);
  const reduce = useExperimentReducedMotion();
  const sample = rampSample(angle, time);
  const finished = time >= rampDuration(angle);

  useEffect(() => {
    if (reduce) {
      setPlaying(false);
      return;
    }
    if (!playing) return;
    let frame = 0;
    let previous: number | undefined;
    const tick = (now: number) => {
      if (previous !== undefined) clock.current += (now - previous) / 1000;
      previous = now;
      clock.current = Math.min(clock.current, rampDuration(angle));
      setTime(clock.current);
      if (clock.current < rampDuration(angle)) frame = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, angle, reduce]);

  const reset = () => {
    setPlaying(false);
    clock.current = 0;
    setTime(0);
  };
  const play = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (finished) {
      clock.current = 0;
      setTime(0);
    }
    if (reduce) {
      clock.current = Math.min(clock.current + 0.25, rampDuration(angle));
      setTime(clock.current);
    } else setPlaying(true);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <label className="flex flex-wrap items-center gap-3 text-sm">
        斜面角度
        <input
          aria-label="斜面角度"
          type="range"
          min={5}
          max={30}
          value={angle}
          disabled={playing}
          onChange={(e) => {
            reset();
            setAngle(Number(e.target.value));
          }}
          className="accent-accent-warm w-32"
        />
        <span className="font-mono">{angle}°</span>
      </label>
      <GalileoDiagram sample={sample} measurements={measurements} />
      <p className="text-accent-cool text-sm" aria-live={playing ? "off" : "polite"}>
        时间 {sample.time.toFixed(3)} s · 距离 {sample.distance.toFixed(3)} m
        {finished ? " · 已到达底端" : ""}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={play} className={controlClass}>
          {playing ? "暂停" : reduce ? "推进0.25秒" : time > 0 && !finished ? "继续" : "释放小球"}
        </button>
        <button onClick={reset} className={controlClass}>
          重置小球
        </button>
        <button
          onClick={() => setMeasurements((rows) => [...rows, sample])}
          disabled={playing || time === 0}
          className={controlClass}
        >
          记录数据
        </button>
        <button
          onClick={() => setMeasurements([])}
          disabled={!measurements.length}
          className={controlClass}
        >
          清空记录
        </button>
      </div>
      <Measurements rows={measurements} />
      <p className="border-accent-warm/20 bg-accent-warm/5 text-fg-secondary rounded-lg border p-3 text-xs leading-relaxed">
        从静止出发且加速度恒定时，s=½at²。这里用四米斜面上的均匀实心球纯滚动模型：a=(5/7)g
        sinθ，假定静摩擦足够、忽略滚动阻力；它不是无摩擦滑块的g
        sinθ，也不复刻伽利略槽道。图和表是模型计算值。伽利略1638年《两门新科学》叙述了斜面滚动与水钟计时。
      </p>
      <p className="text-accent-cool flex flex-wrap gap-3 text-xs">
        <a
          href="https://galileo.phys.virginia.edu/classes/109/lectures/gal_accn96.htm"
          target="_blank"
          rel="noreferrer"
        >
          伽利略原文节选
        </a>
        <a
          href="https://openstax.org/books/university-physics-volume-1/pages/11-1-rolling-motion"
          target="_blank"
          rel="noreferrer"
        >
          滚动模型的力学推导
        </a>
      </p>
    </div>
  );
}
