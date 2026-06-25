"use client";

import { useState } from "react";

const ACCENT = "#4f9d76";

type Div = {
  key: string;
  zh: string;
  en: string;
  from: number; // Ma, older bound
  to: number; // Ma, younger bound
  color: string;
  note: string;
};

// Boundary ages follow the ICS 2023 chart (Ma = millions of years ago).
const EON_TOTAL = 4567;
const PHANEROZOIC = 538.8;

const EONS: Div[] = [
  {
    key: "hadean",
    zh: "冥古宙",
    en: "Hadean",
    from: 4567,
    to: 4031,
    color: "#b85c5c",
    note: "地球与月球形成，岩浆海冷却，最早的海洋出现。几乎没有岩石记录。",
  },
  {
    key: "archean",
    zh: "太古宙",
    en: "Archean",
    from: 4031,
    to: 2500,
    color: "#c8956b",
    note: "最早的生命（原核生物）、叠层石与产氧光合作用的萌芽。",
  },
  {
    key: "proterozoic",
    zh: "元古宙",
    en: "Proterozoic",
    from: 2500,
    to: 538.8,
    color: "#6a9bd1",
    note: "大氧化事件、真核细胞、雪球地球，末期出现埃迪卡拉软躯体生物群。",
  },
  {
    key: "phanerozoic",
    zh: "显生宙",
    en: "Phanerozoic",
    from: 538.8,
    to: 0,
    color: ACCENT,
    note: "「看得见生命」的时代——从寒武纪大爆发至今，占地球历史不到 12%。",
  },
];

const ERA_COLOR: Record<string, string> = {
  paleozoic: "#56a89a",
  mesozoic: "#7fa86b",
  cenozoic: "#d2a24c",
};

const PERIODS: Div[] = [
  {
    key: "cambrian",
    zh: "寒武纪",
    en: "Cambrian",
    from: 538.8,
    to: 485.4,
    color: ERA_COLOR.paleozoic!,
    note: "寒武纪生命大爆发：现存动物的多数门类在地质瞬间内同时登场。",
  },
  {
    key: "ordovician",
    zh: "奥陶纪",
    en: "Ordovician",
    from: 485.4,
    to: 443.8,
    color: ERA_COLOR.paleozoic!,
    note: "海洋无脊椎动物极盛，末期一次大灭绝抹去约 85% 的物种。",
  },
  {
    key: "silurian",
    zh: "志留纪",
    en: "Silurian",
    from: 443.8,
    to: 419.2,
    color: ERA_COLOR.paleozoic!,
    note: "维管植物登陆，有颌鱼类崛起，珊瑚礁广布。",
  },
  {
    key: "devonian",
    zh: "泥盆纪",
    en: "Devonian",
    from: 419.2,
    to: 358.9,
    color: ERA_COLOR.paleozoic!,
    note: "「鱼类时代」，四足动物首次爬上陆地，末期再遭大灭绝。",
  },
  {
    key: "carboniferous",
    zh: "石炭纪",
    en: "Carboniferous",
    from: 358.9,
    to: 298.9,
    color: ERA_COLOR.paleozoic!,
    note: "巨型蕨类森林造就今日煤层，两栖类繁盛，氧气充沛养出巨型昆虫。",
  },
  {
    key: "permian",
    zh: "二叠纪",
    en: "Permian",
    from: 298.9,
    to: 251.9,
    color: ERA_COLOR.paleozoic!,
    note: "盘古超大陆成形；末期「大灭绝」灭掉约 96% 的海洋物种，史上最惨。",
  },
  {
    key: "triassic",
    zh: "三叠纪",
    en: "Triassic",
    from: 251.9,
    to: 201.4,
    color: ERA_COLOR.mesozoic!,
    note: "生命从大灭绝中复苏，恐龙与最早的哺乳动物祖先登场。",
  },
  {
    key: "jurassic",
    zh: "侏罗纪",
    en: "Jurassic",
    from: 201.4,
    to: 145,
    color: ERA_COLOR.mesozoic!,
    note: "恐龙称霸大陆，始祖鸟标志鸟类起源。",
  },
  {
    key: "cretaceous",
    zh: "白垩纪",
    en: "Cretaceous",
    from: 145,
    to: 66,
    color: ERA_COLOR.mesozoic!,
    note: "被子植物兴起；末期小行星撞击引发 K–Pg 灭绝，非鸟恐龙退场。",
  },
  {
    key: "paleogene",
    zh: "古近纪",
    en: "Paleogene",
    from: 66,
    to: 23.03,
    color: ERA_COLOR.cenozoic!,
    note: "哺乳动物大辐射，迅速占据恐龙留下的生态位。",
  },
  {
    key: "neogene",
    zh: "新近纪",
    en: "Neogene",
    from: 23.03,
    to: 2.58,
    color: ERA_COLOR.cenozoic!,
    note: "草原扩张，人科（hominids）在非洲出现。",
  },
  {
    key: "quaternary",
    zh: "第四纪",
    en: "Quaternary",
    from: 2.58,
    to: 0,
    color: ERA_COLOR.cenozoic!,
    note: "冰期与间冰期交替，智人演化并发展出文明——就是我们所在的纪。",
  },
];

const ALL: Record<string, Div> = Object.fromEntries([...EONS, ...PERIODS].map((d) => [d.key, d]));

function fmtAge(ma: number): string {
  if (ma === 0) return "至今";
  if (ma >= 1000) return `${(ma / 1000).toFixed(2)} Ga`;
  return `${ma} Ma`;
}

function Bar({
  divs,
  total,
  selected,
  onSelect,
  label,
}: {
  divs: Div[];
  total: number;
  selected: string;
  onSelect: (k: string) => void;
  label: string;
}) {
  return (
    <div className="flex h-11 w-full overflow-hidden" role="group" aria-label={label}>
      {divs.map((d) => {
        const pct = ((d.from - d.to) / total) * 100;
        const isSel = d.key === selected;
        return (
          <button
            key={d.key}
            onClick={() => onSelect(d.key)}
            aria-pressed={isSel}
            aria-label={`${d.zh}，${fmtAge(d.from)} 至 ${fmtAge(d.to)}`}
            title={`${d.zh} ${d.en}`}
            className="flex min-w-0 items-center justify-center overflow-hidden border-r border-[color:var(--color-bg-near)] px-0.5 transition-all last:border-r-0"
            style={{
              flexBasis: `${pct}%`,
              backgroundColor: `${d.color}${isSel ? "" : "cc"}`,
              outline: isSel ? "2px solid var(--color-fg-primary)" : "none",
              outlineOffset: "-2px",
            }}
          >
            <span className="truncate text-[10px] font-medium text-black/75">{d.zh}</span>
          </button>
        );
      })}
    </div>
  );
}

export function GeologicTimeScale() {
  const [selected, setSelected] = useState("phanerozoic");
  const sel = ALL[selected]!;
  const duration = sel.from - sel.to;

  return (
    <figure className="border-border-faint bg-bg-near my-8 border">
      <figcaption className="border-border-faint flex items-center justify-between gap-2 border-b px-4 py-2.5">
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: ACCENT }}
        >
          地质年代 · 时间轴
        </span>
        <span className="text-fg-muted font-mono text-[10px]">46 亿年</span>
      </figcaption>

      <div className="px-4 py-5 sm:px-6">
        {/* eon bar — linear over all 4567 Ma; Phanerozoic is only a sliver */}
        <div className="text-fg-disabled mb-1.5 flex justify-between font-mono text-[9px]">
          <span>46.7 亿年前</span>
          <span>四个宙（按时长）</span>
          <span>至今</span>
        </div>
        <Bar
          divs={EONS}
          total={EON_TOTAL}
          selected={selected}
          onSelect={setSelected}
          label="地质年代——宙"
        />

        <div className="text-fg-muted my-2 text-center font-mono text-[9px]">
          ↓ 放大显生宙（最近 5.39 亿年）
        </div>

        {/* phanerozoic period bar — zoomed; colored by era */}
        <Bar
          divs={PERIODS}
          total={PHANEROZOIC}
          selected={selected}
          onSelect={setSelected}
          label="地质年代——显生宙各纪"
        />
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px]">
          <Legend color={ERA_COLOR.paleozoic!} label="古生代" />
          <Legend color={ERA_COLOR.mesozoic!} label="中生代" />
          <Legend color={ERA_COLOR.cenozoic!} label="新生代" />
        </div>
      </div>

      {/* detail */}
      <div className="border-border-faint border-t px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            className="text-fg-primary text-lg"
            style={{ borderBottom: `2px solid ${sel.color}` }}
          >
            {sel.zh}
          </span>
          <span className="text-fg-muted font-mono text-xs">{sel.en}</span>
          <span className="text-fg-muted ml-auto font-mono text-[11px]">
            {fmtAge(sel.from)} – {fmtAge(sel.to)}
            <span className="text-fg-disabled">
              {" "}
              · 历时 {duration.toFixed(duration < 10 ? 2 : 0)} Ma
            </span>
          </span>
        </div>
        <p className="text-fg-secondary mt-2 text-sm leading-relaxed">{sel.note}</p>
      </div>

      <p className="text-fg-muted border-border-faint border-t px-4 py-3 text-xs leading-relaxed sm:px-6">
        点击任一宙或纪查看其年龄与标志事件。上方按真实时长铺排——可见复杂生命所在的
        <span style={{ color: ACCENT }}>显生宙</span>仅占地球历史末端的薄薄一层。
        <span className="text-fg-disabled"> 边界年龄依据国际年代地层表（ICS 2023）。</span>
      </p>
    </figure>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="text-fg-muted flex items-center gap-1.5">
      <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
