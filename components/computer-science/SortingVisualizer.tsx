"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const ACCENT = "#4f9cf0";

// A single rendered frame: the array state plus which indices are being
// touched (compared/swapped) and which are confirmed in their final place.
type Step = {
  arr: number[];
  active: [number, number] | null;
  sorted: boolean[];
  comps: number;
  swaps: number;
};

type Algo = {
  key: string;
  label: string;
  best: string;
  avg: string;
  worst: string;
  space: string;
  note: string;
  run: (input: number[]) => Step[];
};

// Each instrumented sort records a snapshot on every comparison and swap, so the
// player can step through the exact decisions the algorithm makes. N is small,
// so copying the array per frame is cheap and keeps the frames immutable.
function snapshot(
  arr: number[],
  active: [number, number] | null,
  sorted: boolean[],
  comps: number,
  swaps: number
): Step {
  return { arr: [...arr], active, sorted: [...sorted], comps, swaps };
}

function bubble(input: number[]): Step[] {
  const a = [...input];
  const n = a.length;
  const sorted = new Array(n).fill(false);
  const steps: Step[] = [];
  let comps = 0;
  let swaps = 0;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      comps++;
      steps.push(snapshot(a, [j, j + 1], sorted, comps, swaps));
      if (a[j]! > a[j + 1]!) {
        [a[j], a[j + 1]] = [a[j + 1]!, a[j]!];
        swaps++;
        steps.push(snapshot(a, [j, j + 1], sorted, comps, swaps));
      }
    }
    sorted[n - 1 - i] = true;
  }
  sorted[0] = true;
  steps.push(snapshot(a, null, sorted, comps, swaps));
  return steps;
}

function selection(input: number[]): Step[] {
  const a = [...input];
  const n = a.length;
  const sorted = new Array(n).fill(false);
  const steps: Step[] = [];
  let comps = 0;
  let swaps = 0;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      comps++;
      steps.push(snapshot(a, [min, j], sorted, comps, swaps));
      if (a[j]! < a[min]!) min = j;
    }
    if (min !== i) {
      [a[i], a[min]] = [a[min]!, a[i]!];
      swaps++;
    }
    sorted[i] = true;
    steps.push(snapshot(a, [i, min], sorted, comps, swaps));
  }
  sorted[n - 1] = true;
  steps.push(snapshot(a, null, sorted, comps, swaps));
  return steps;
}

function insertion(input: number[]): Step[] {
  const a = [...input];
  const n = a.length;
  const sorted = new Array(n).fill(false);
  const steps: Step[] = [];
  let comps = 0;
  let swaps = 0;
  sorted[0] = true;
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      comps++;
      steps.push(snapshot(a, [j - 1, j], sorted, comps, swaps));
      if (a[j - 1]! <= a[j]!) break;
      [a[j - 1], a[j]] = [a[j]!, a[j - 1]!];
      swaps++;
      steps.push(snapshot(a, [j - 1, j], sorted, comps, swaps));
      j--;
    }
    for (let k = 0; k <= i; k++) sorted[k] = true;
  }
  steps.push(snapshot(a, null, sorted, comps, swaps));
  return steps;
}

function quick(input: number[]): Step[] {
  const a = [...input];
  const n = a.length;
  const sorted = new Array(n).fill(false);
  const steps: Step[] = [];
  let comps = 0;
  let swaps = 0;
  const sort = (lo: number, hi: number) => {
    if (lo >= hi) {
      if (lo === hi) sorted[lo] = true;
      return;
    }
    const pivot = a[hi]!;
    let i = lo;
    for (let j = lo; j < hi; j++) {
      comps++;
      steps.push(snapshot(a, [j, hi], sorted, comps, swaps));
      if (a[j]! < pivot) {
        if (i !== j) {
          [a[i], a[j]] = [a[j]!, a[i]!];
          swaps++;
          steps.push(snapshot(a, [i, j], sorted, comps, swaps));
        }
        i++;
      }
    }
    [a[i], a[hi]] = [a[hi]!, a[i]!];
    swaps++;
    sorted[i] = true;
    steps.push(snapshot(a, [i, hi], sorted, comps, swaps));
    sort(lo, i - 1);
    sort(i + 1, hi);
  };
  sort(0, n - 1);
  sorted.fill(true);
  steps.push(snapshot(a, null, sorted, comps, swaps));
  return steps;
}

function merge(input: number[]): Step[] {
  const a = [...input];
  const n = a.length;
  const sorted = new Array(n).fill(false);
  const steps: Step[] = [];
  let comps = 0;
  let swaps = 0;
  const buf = new Array(n).fill(0);
  const run = (lo: number, hi: number) => {
    if (hi - lo < 1) return;
    const mid = (lo + hi) >> 1;
    run(lo, mid);
    run(mid + 1, hi);
    let i = lo;
    let j = mid + 1;
    let k = lo;
    while (i <= mid && j <= hi) {
      comps++;
      steps.push(snapshot(a, [i, j], sorted, comps, swaps));
      if (a[i]! <= a[j]!) buf[k++] = a[i++]!;
      else buf[k++] = a[j++]!;
    }
    while (i <= mid) buf[k++] = a[i++]!;
    while (j <= hi) buf[k++] = a[j++]!;
    for (let t = lo; t <= hi; t++) {
      a[t] = buf[t]!;
      swaps++;
      steps.push(snapshot(a, [t, t], sorted, comps, swaps));
    }
  };
  run(0, n - 1);
  sorted.fill(true);
  steps.push(snapshot(a, null, sorted, comps, swaps));
  return steps;
}

const ALGOS: Algo[] = [
  {
    key: "bubble",
    label: "冒泡排序",
    best: "O(n)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    note: "相邻两两比较、逆序就交换，每一趟把最大的「冒」到末尾。直观但最慢。",
    run: bubble,
  },
  {
    key: "insertion",
    label: "插入排序",
    best: "O(n)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    note: "像理扑克：把每张新牌插入左边已排好的序列。对近乎有序的数据极快。",
    run: insertion,
  },
  {
    key: "selection",
    label: "选择排序",
    best: "O(n²)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    note: "每趟从未排序区里选出最小值放到前面。交换次数少，但比较恒为 O(n²)。",
    run: selection,
  },
  {
    key: "quick",
    label: "快速排序",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
    note: "选一个基准把数组分成「小于」「大于」两半再递归。平均最快，最坏退化。",
    run: quick,
  },
  {
    key: "merge",
    label: "归并排序",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    note: "不断对半拆分再有序合并。最坏也稳定 O(n log n)，代价是额外空间。",
    run: merge,
  },
];

const N = 22;

function randomArray(): number[] {
  // Heights 8..100, shuffled — distinct-ish so bars read clearly.
  const a = Array.from({ length: N }, (_, i) => 8 + Math.round((92 * i) / (N - 1)));
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

const SPEEDS = [
  { label: "慢", ms: 320 },
  { label: "中", ms: 140 },
  { label: "快", ms: 45 },
];

export function SortingVisualizer() {
  const reduced = usePrefersReducedMotion();
  const [algoKey, setAlgoKey] = useState<string>("quick");
  const [base, setBase] = useState<number[]>(() => randomArray());
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(1);

  const algo = ALGOS.find((a) => a.key === algoKey) ?? ALGOS[0]!;

  // algo + array fully determine the frame list, so it's memoised and
  // regenerated only when either changes ("打乱" swaps in a fresh array).
  const steps = useMemo(() => algo.run(base), [algo, base]);
  const cur = steps[Math.min(frame, steps.length - 1)]!;
  const done = frame >= steps.length - 1;

  // reset the playhead whenever the algorithm or data set changes
  useEffect(() => {
    setFrame(0);
    setPlaying(false);
  }, [algoKey, base]);

  const timer = useRef<number | null>(null);
  useEffect(() => {
    if (!playing) return;
    if (done) {
      setPlaying(false);
      return;
    }
    timer.current = window.setTimeout(
      () => setFrame((f) => Math.min(f + 1, steps.length - 1)),
      SPEEDS[speedIdx]!.ms
    );
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [playing, frame, done, speedIdx, steps.length]);

  const maxH = 100;

  return (
    <figure className="border-border-faint bg-bg-near my-8 border">
      <figcaption className="border-border-faint flex items-center justify-between gap-2 border-b px-4 py-2.5">
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: ACCENT }}
        >
          排序算法 · 可视化
        </span>
        <span className="text-fg-muted font-mono text-[10px]">{N} 个元素</span>
      </figcaption>

      {/* algorithm tabs */}
      <div
        className="border-border-faint flex flex-wrap gap-1.5 border-b px-4 py-3"
        role="tablist"
        aria-label="排序算法"
      >
        {ALGOS.map((a) => {
          const on = a.key === algoKey;
          return (
            <button
              key={a.key}
              role="tab"
              aria-selected={on}
              onClick={() => setAlgoKey(a.key)}
              className="border px-2.5 py-1 font-mono text-[11px] transition-colors"
              style={{
                borderColor: on ? ACCENT : "var(--color-border-subtle)",
                color: on ? ACCENT : "var(--color-fg-muted)",
                backgroundColor: on ? `${ACCENT}14` : "transparent",
              }}
            >
              {a.label}
            </button>
          );
        })}
      </div>

      {/* bars */}
      <div className="px-4 pt-5 sm:px-6">
        <div
          className="flex h-44 items-end justify-center gap-[3px]"
          role="img"
          aria-label={`${algo.label}过程：当前第 ${Math.min(frame + 1, steps.length)} / ${steps.length} 步，已完成 ${cur.swaps} 次交换`}
        >
          {cur.arr.map((h, i) => {
            const isActive = cur.active && (i === cur.active[0] || i === cur.active[1]);
            const isSorted = cur.sorted[i];
            const color = isActive ? "#e0a458" : isSorted ? "#98c379" : ACCENT;
            return (
              <div
                key={i}
                className={reduced ? "" : "transition-[height] duration-75"}
                style={{
                  height: `${(h / maxH) * 100}%`,
                  width: `${100 / N}%`,
                  maxWidth: "16px",
                  backgroundColor: color,
                  opacity: isSorted && !isActive ? 0.55 : 1,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* controls */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-1.5">
          <Ctrl
            label={playing ? "暂停" : "播放"}
            onClick={() => (done ? (setFrame(0), setPlaying(true)) : setPlaying((p) => !p))}
            primary
          />
          <Ctrl
            label="单步"
            onClick={() => {
              setPlaying(false);
              setFrame((f) => Math.min(f + 1, steps.length - 1));
            }}
            disabled={done}
          />
          <Ctrl
            label="重置"
            onClick={() => {
              setPlaying(false);
              setFrame(0);
            }}
          />
          <Ctrl label="打乱" onClick={() => setBase(randomArray())} />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-fg-disabled font-mono text-[9px] tracking-[0.18em] uppercase">
            速度
          </span>
          {SPEEDS.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setSpeedIdx(i)}
              aria-pressed={i === speedIdx}
              className="border px-2 py-0.5 font-mono text-[11px] transition-colors"
              style={{
                borderColor: i === speedIdx ? ACCENT : "var(--color-border-subtle)",
                color: i === speedIdx ? ACCENT : "var(--color-fg-muted)",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="text-fg-muted ml-auto flex gap-4 font-mono text-[11px]">
          <span>
            比较 <span className="text-fg-secondary">{cur.comps}</span>
          </span>
          <span>
            交换 <span className="text-fg-secondary">{cur.swaps}</span>
          </span>
        </div>
      </div>

      {/* complexity row */}
      <div className="border-border-faint text-fg-muted grid grid-cols-2 gap-x-4 gap-y-1 border-t px-4 py-3 font-mono text-[11px] sm:grid-cols-4 sm:px-6">
        <span>
          最好 <span className="text-fg-secondary">{algo.best}</span>
        </span>
        <span>
          平均 <span className="text-fg-secondary">{algo.avg}</span>
        </span>
        <span>
          最坏 <span className="text-fg-secondary">{algo.worst}</span>
        </span>
        <span>
          空间 <span className="text-fg-secondary">{algo.space}</span>
        </span>
      </div>

      <p className="text-fg-muted border-border-faint border-t px-4 py-3 text-xs leading-relaxed sm:px-6">
        {algo.note}
        <span className="text-fg-disabled">
          {" "}
          条形高度即数值；
          <span style={{ color: "#e0a458" }}>橙色</span>为正在比较/交换、
          <span style={{ color: "#98c379" }}>绿色</span>为已就位。
        </span>
      </p>
    </figure>
  );
}

function Ctrl({
  label,
  onClick,
  disabled,
  primary,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="border px-3 py-1 font-mono text-[11px] transition-colors disabled:opacity-35"
      style={{
        borderColor: primary ? ACCENT : "var(--color-border-subtle)",
        color: primary ? ACCENT : "var(--color-fg-secondary)",
        backgroundColor: primary ? `${ACCENT}14` : "transparent",
      }}
    >
      {label}
    </button>
  );
}
