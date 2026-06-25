"use client";

import { useState } from "react";

const ACCENT = "#e08a3c";

type Cat = "ALK" | "AEM" | "TM" | "PTM" | "MET" | "NM" | "HAL" | "NG" | "LAN" | "ACT";

const CATS: Record<Cat, { label: string; color: string }> = {
  ALK: { label: "碱金属", color: "#e06c75" },
  AEM: { label: "碱土金属", color: "#e0a458" },
  TM: { label: "过渡金属", color: "#c8956b" },
  PTM: { label: "后过渡金属", color: "#8fbf9f" },
  MET: { label: "类金属", color: "#56b6c2" },
  NM: { label: "非金属", color: "#98c379" },
  HAL: { label: "卤素", color: "#61afef" },
  NG: { label: "稀有气体", color: "#c678dd" },
  LAN: { label: "镧系", color: "#d98ab0" },
  ACT: { label: "锕系", color: "#be8b5a" },
};

// [atomicNumber, symbol, name (zh for Z≤103, IUPAC en for superheavies), category]
type El = [number, string, string, Cat];

const ELEMENTS: El[] = [
  [1, "H", "氢", "NM"],
  [2, "He", "氦", "NG"],
  [3, "Li", "锂", "ALK"],
  [4, "Be", "铍", "AEM"],
  [5, "B", "硼", "MET"],
  [6, "C", "碳", "NM"],
  [7, "N", "氮", "NM"],
  [8, "O", "氧", "NM"],
  [9, "F", "氟", "HAL"],
  [10, "Ne", "氖", "NG"],
  [11, "Na", "钠", "ALK"],
  [12, "Mg", "镁", "AEM"],
  [13, "Al", "铝", "PTM"],
  [14, "Si", "硅", "MET"],
  [15, "P", "磷", "NM"],
  [16, "S", "硫", "NM"],
  [17, "Cl", "氯", "HAL"],
  [18, "Ar", "氩", "NG"],
  [19, "K", "钾", "ALK"],
  [20, "Ca", "钙", "AEM"],
  [21, "Sc", "钪", "TM"],
  [22, "Ti", "钛", "TM"],
  [23, "V", "钒", "TM"],
  [24, "Cr", "铬", "TM"],
  [25, "Mn", "锰", "TM"],
  [26, "Fe", "铁", "TM"],
  [27, "Co", "钴", "TM"],
  [28, "Ni", "镍", "TM"],
  [29, "Cu", "铜", "TM"],
  [30, "Zn", "锌", "TM"],
  [31, "Ga", "镓", "PTM"],
  [32, "Ge", "锗", "MET"],
  [33, "As", "砷", "MET"],
  [34, "Se", "硒", "NM"],
  [35, "Br", "溴", "HAL"],
  [36, "Kr", "氪", "NG"],
  [37, "Rb", "铷", "ALK"],
  [38, "Sr", "锶", "AEM"],
  [39, "Y", "钇", "TM"],
  [40, "Zr", "锆", "TM"],
  [41, "Nb", "铌", "TM"],
  [42, "Mo", "钼", "TM"],
  [43, "Tc", "锝", "TM"],
  [44, "Ru", "钌", "TM"],
  [45, "Rh", "铑", "TM"],
  [46, "Pd", "钯", "TM"],
  [47, "Ag", "银", "TM"],
  [48, "Cd", "镉", "TM"],
  [49, "In", "铟", "PTM"],
  [50, "Sn", "锡", "PTM"],
  [51, "Sb", "锑", "MET"],
  [52, "Te", "碲", "MET"],
  [53, "I", "碘", "HAL"],
  [54, "Xe", "氙", "NG"],
  [55, "Cs", "铯", "ALK"],
  [56, "Ba", "钡", "AEM"],
  [57, "La", "镧", "LAN"],
  [58, "Ce", "铈", "LAN"],
  [59, "Pr", "镨", "LAN"],
  [60, "Nd", "钕", "LAN"],
  [61, "Pm", "钷", "LAN"],
  [62, "Sm", "钐", "LAN"],
  [63, "Eu", "铕", "LAN"],
  [64, "Gd", "钆", "LAN"],
  [65, "Tb", "铽", "LAN"],
  [66, "Dy", "镝", "LAN"],
  [67, "Ho", "钬", "LAN"],
  [68, "Er", "铒", "LAN"],
  [69, "Tm", "铥", "LAN"],
  [70, "Yb", "镱", "LAN"],
  [71, "Lu", "镥", "LAN"],
  [72, "Hf", "铪", "TM"],
  [73, "Ta", "钽", "TM"],
  [74, "W", "钨", "TM"],
  [75, "Re", "铼", "TM"],
  [76, "Os", "锇", "TM"],
  [77, "Ir", "铱", "TM"],
  [78, "Pt", "铂", "TM"],
  [79, "Au", "金", "TM"],
  [80, "Hg", "汞", "TM"],
  [81, "Tl", "铊", "PTM"],
  [82, "Pb", "铅", "PTM"],
  [83, "Bi", "铋", "PTM"],
  [84, "Po", "钋", "PTM"],
  [85, "At", "砹", "HAL"],
  [86, "Rn", "氡", "NG"],
  [87, "Fr", "钫", "ALK"],
  [88, "Ra", "镭", "AEM"],
  [89, "Ac", "锕", "ACT"],
  [90, "Th", "钍", "ACT"],
  [91, "Pa", "镤", "ACT"],
  [92, "U", "铀", "ACT"],
  [93, "Np", "镎", "ACT"],
  [94, "Pu", "钚", "ACT"],
  [95, "Am", "镅", "ACT"],
  [96, "Cm", "锔", "ACT"],
  [97, "Bk", "锫", "ACT"],
  [98, "Cf", "锎", "ACT"],
  [99, "Es", "锿", "ACT"],
  [100, "Fm", "镄", "ACT"],
  [101, "Md", "钔", "ACT"],
  [102, "No", "锘", "ACT"],
  [103, "Lr", "铹", "ACT"],
  [104, "Rf", "rutherfordium", "TM"],
  [105, "Db", "dubnium", "TM"],
  [106, "Sg", "seaborgium", "TM"],
  [107, "Bh", "bohrium", "TM"],
  [108, "Hs", "hassium", "TM"],
  [109, "Mt", "meitnerium", "TM"],
  [110, "Ds", "darmstadtium", "TM"],
  [111, "Rg", "roentgenium", "TM"],
  [112, "Cn", "copernicium", "TM"],
  [113, "Nh", "nihonium", "PTM"],
  [114, "Fl", "flerovium", "PTM"],
  [115, "Mc", "moscovium", "PTM"],
  [116, "Lv", "livermorium", "PTM"],
  [117, "Ts", "tennessine", "HAL"],
  [118, "Og", "oganesson", "NG"],
];

// Grid placement (18 columns, periods 1-7 + two f-block strips at rows 9/10).
function pos(z: number): { col: number; row: number } {
  if (z >= 57 && z <= 71) return { col: 3 + (z - 57), row: 9 };
  if (z >= 89 && z <= 103) return { col: 3 + (z - 89), row: 10 };
  if (z === 1) return { col: 1, row: 1 };
  if (z === 2) return { col: 18, row: 1 };
  if (z >= 3 && z <= 10) {
    const i = z - 3;
    return { col: i < 2 ? i + 1 : i + 11, row: 2 };
  }
  if (z >= 11 && z <= 18) {
    const i = z - 11;
    return { col: i < 2 ? i + 1 : i + 11, row: 3 };
  }
  if (z >= 19 && z <= 36) return { col: z - 18, row: 4 };
  if (z >= 37 && z <= 54) return { col: z - 36, row: 5 };
  if (z === 55) return { col: 1, row: 6 };
  if (z === 56) return { col: 2, row: 6 };
  if (z >= 72 && z <= 86) return { col: z - 68, row: 6 };
  if (z === 87) return { col: 1, row: 7 };
  if (z === 88) return { col: 2, row: 7 };
  if (z >= 104 && z <= 118) return { col: z - 100, row: 7 };
  return { col: 1, row: 1 };
}

function groupLabel(z: number, col: number): string {
  if ((z >= 57 && z <= 71) || (z >= 89 && z <= 103)) return "f 区";
  return `第 ${col} 族`;
}

function periodLabel(z: number, row: number): string {
  if (z >= 57 && z <= 71) return "第 6 周期";
  if (z >= 89 && z <= 103) return "第 7 周期";
  return `第 ${row} 周期`;
}

export function PeriodicTable() {
  const [selected, setSelected] = useState(6);
  const [activeCat, setActiveCat] = useState<Cat | null>(null);

  const sel = ELEMENTS[selected - 1]!;
  const selPos = pos(sel[0]);

  return (
    <figure className="border-border-faint bg-bg-near my-8 border">
      <figcaption className="border-border-faint flex items-center justify-between gap-2 border-b px-4 py-2.5">
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: ACCENT }}
        >
          元素周期表 · 交互
        </span>
        <span className="text-fg-muted font-mono text-[10px]">118 种元素</span>
      </figcaption>

      {/* selected element detail */}
      <div className="border-border-faint flex items-stretch gap-4 border-b px-4 py-4 sm:px-6">
        <div
          className="flex h-20 w-20 shrink-0 flex-col items-center justify-center border"
          style={{ borderColor: CATS[sel[3]].color, backgroundColor: `${CATS[sel[3]].color}1f` }}
        >
          <span className="text-fg-muted self-start pl-1.5 font-mono text-[10px]">{sel[0]}</span>
          <span className="text-fg-primary -mt-1 text-2xl font-light">{sel[1]}</span>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <div className="text-fg-primary text-lg">{sel[2]}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 font-mono text-[11px]">
            <span className="text-fg-muted">
              类别 <span style={{ color: CATS[sel[3]].color }}>{CATS[sel[3]].label}</span>
            </span>
            <span className="text-fg-muted">{groupLabel(sel[0], selPos.col)}</span>
            <span className="text-fg-muted">{periodLabel(sel[0], selPos.row)}</span>
          </div>
        </div>
      </div>

      {/* the grid (scrolls horizontally on narrow screens) */}
      <div className="overflow-x-auto px-4 py-4 sm:px-6">
        <div
          className="grid min-w-[640px] gap-[3px]"
          style={{
            gridTemplateColumns: "repeat(18, 1fr)",
            gridAutoRows: "minmax(0, 1fr)",
          }}
          role="group"
          aria-label="元素周期表"
        >
          {/* f-block group-3 markers in the main body */}
          <Marker col={3} row={6} text="57–71" />
          <Marker col={3} row={7} text="89–103" />

          {ELEMENTS.map((el) => {
            const [z, sym, , cat] = el;
            const { col, row } = pos(z);
            const color = CATS[cat].color;
            const dim = activeCat !== null && activeCat !== cat;
            const isSel = z === selected;
            return (
              <button
                key={z}
                onClick={() => setSelected(z)}
                title={`${z} ${sym} ${el[2]}`}
                aria-label={`${el[2]} ${sym}，原子序数 ${z}`}
                aria-pressed={isSel}
                className="aspect-square min-w-0 border transition-opacity"
                style={{
                  gridColumn: col,
                  gridRow: row,
                  borderColor: isSel ? "var(--color-fg-primary)" : `${color}66`,
                  backgroundColor: `${color}${isSel ? "44" : "1f"}`,
                  opacity: dim ? 0.18 : 1,
                }}
              >
                <span className="flex h-full w-full flex-col items-center justify-center leading-none">
                  <span className="text-fg-disabled text-[6px]">{z}</span>
                  <span className="text-fg-primary text-[10px] sm:text-xs">{sym}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* category legend / filter */}
      <div className="border-border-faint flex flex-wrap gap-1.5 border-t px-4 py-3 sm:px-6">
        {(Object.keys(CATS) as Cat[]).map((c) => {
          const on = activeCat === c;
          return (
            <button
              key={c}
              aria-pressed={on}
              onClick={() => setActiveCat((cur) => (cur === c ? null : c))}
              className="flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] transition-colors"
              style={{
                borderColor: on ? CATS[c].color : "var(--color-border-subtle)",
                color: on ? CATS[c].color : "var(--color-fg-muted)",
                backgroundColor: on ? `${CATS[c].color}14` : "transparent",
              }}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: CATS[c].color }}
              />
              {CATS[c].label}
            </button>
          );
        })}
      </div>

      <p className="text-fg-muted border-border-faint border-t px-4 py-3 text-xs leading-relaxed sm:px-6">
        点击任一元素查看其类别、族与周期；点击下方图例可高亮某一类元素，直观看出金属、非金属与稀有气体在表中的分区。
        <span className="text-fg-disabled">
          {" "}
          镧系（57–71）与锕系（89–103）按惯例抽出单列于下方。
        </span>
      </p>
    </figure>
  );
}

function Marker({ col, row, text }: { col: number; row: number; text: string }) {
  return (
    <div
      className="border-border-subtle text-fg-disabled flex aspect-square min-w-0 items-center justify-center border border-dashed font-mono text-[7px]"
      style={{ gridColumn: col, gridRow: row }}
    >
      {text}
    </div>
  );
}
