export type ChronologyMode = "relative" | "absolute";

export const CHRONOLOGY_MODES: readonly { id: ChronologyMode; label: string; tease: string }[] = [
  {
    id: "relative",
    label: "相对地层",
    tease: "下压上。能说的是先后，不是日历年。",
  },
  {
    id: "absolute",
    label: "绝对测年",
    tease: "碳十四、树轮校正给出区间。区间不是某年某日的发掘许可。",
  },
];

export const CHRONOLOGY_BANDS: readonly {
  id: string;
  label: string;
  relative: string;
  absolute: string;
}[] = [
  { id: "top", label: "上层", relative: "扰动、近代填土", absolute: "校正后可能与下层重叠" },
  {
    id: "mid",
    label: "中层",
    relative: "叠压在下、被上覆盖",
    absolute: "测年样品必须标明出土单位",
  },
  { id: "base", label: "下层", relative: "先沉积", absolute: "更老的样品仍可能被后期坑打破" },
];
