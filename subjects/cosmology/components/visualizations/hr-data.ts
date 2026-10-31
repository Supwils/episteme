export type SpectralClass = "O" | "B" | "A" | "F" | "G" | "K" | "M";

export type StarRegion = "main-sequence" | "red-giant" | "supergiant" | "white-dwarf";

export type Star = {
  id: string;
  nameCn: string;
  nameEn: string;
  temperature: number;
  luminosity: number;
  mass: number;
  radius: number;
  spectralClass: SpectralClass | "DA" | "DQZ";
  source: string;
  parameterNote?: string;
  radiusLabel?: string;
  region: StarRegion;
  description: string;
};

export const STARS: Star[] = [
  {
    id: "sun",
    nameCn: "太阳",
    nameEn: "Sun",
    temperature: 5772,
    luminosity: 1,
    mass: 1,
    radius: 1,
    spectralClass: "G",
    region: "main-sequence",
    description:
      "我们的恒星，一颗典型的 G 型主序星。诞生于约 46 亿年前，还将继续主序演化数十亿年。",
    source: "https://science.nasa.gov/sun/facts/",
  },
  {
    id: "sirius-a",
    nameCn: "天狼星 A",
    nameEn: "Sirius A",
    temperature: 9845,
    luminosity: 24.74,
    mass: 2.06,
    radius: 1.71,
    spectralClass: "A",
    region: "main-sequence",
    description:
      "除太阳外，夜空中视亮度最高的恒星，距离地球 8.6 光年。一颗 A 型主序星，质量约为太阳的两倍。",
    source: "https://arxiv.org/abs/1703.10625",
  },
  {
    id: "proxima",
    nameCn: "比邻星",
    nameEn: "Proxima Centauri",
    temperature: 3050,
    luminosity: 0.00155,
    mass: 0.12,
    radius: 0.141,
    spectralClass: "M",
    region: "main-sequence",
    description:
      "距离太阳最近的恒星（4.24 光年），一颗暗淡的红矮星。拥有至少一颗位于宜居带的行星。",
    source: "https://exoplanetarchive.ipac.caltech.edu/overview/GJ-551",

    parameterNote:
      "采用 NASA 档案所列 Anglada-Escudé 等（2016）的近似恒星参数；温度、半径和光度为同一组文献尺度。",
  },
  {
    id: "vega",
    nameCn: "织女星",
    nameEn: "Vega",
    temperature: 9360,
    luminosity: 47.2,
    mass: 2.15,
    radius: 2.726,
    spectralClass: "A",
    region: "main-sequence",
    description:
      "天琴座 α 星，一颗快速旋转、近乎朝向自转极的 A 型主序星。赤道鼓起，极区与赤道温度不同，不能把整颗星看成均温球。",
    source: "https://arxiv.org/abs/1211.6055",
    parameterNote:
      "采用 Monnier 等（2012）Concordance 模型的总光度、表面平均温度和赤道半径；面向观测者的表观参数不同。",
    radiusLabel: "赤道半径",
  },
  {
    id: "betelgeuse",
    nameCn: "参宿四",
    nameEn: "Betelgeuse",
    temperature: 3600,
    luminosity: 90000,
    mass: 18,
    radius: 764,
    spectralClass: "M",
    region: "supergiant",
    description:
      "猎户座 α 星，一颗红超巨星。图中采用一组演化模型的近似参数，半径约为太阳的 764 倍，约合 3.6 天文单位。它最终可能发生核心坍缩，但目前不能给出可靠的爆发日期。",
    source: "https://arxiv.org/abs/2006.09837",
    parameterNote:
      "Joyce 等（2020）的模型给出现今质量 16.5–19 M☉、半径 764（+116/−62）R☉；光度取约值，距离与演化解释仍影响参数。",
  },
  {
    id: "aldebaran",
    nameCn: "毕宿五",
    nameEn: "Aldebaran",
    temperature: 3900,
    luminosity: 480,
    mass: 1.16,
    radius: 44.2,
    spectralClass: "K",
    region: "red-giant",
    description: "金牛座 α 星，一颗橙色巨星。距离地球约 65 光年，是夜空中最亮的恒星之一。",
    source: "https://arxiv.org/abs/1802.09812",
    parameterNote:
      "Farr 等（2018）的质量与干涉半径；温度和光度采用其列出的 Sheffield 文献解。不同模型的参数存在系统差异。",
  },
  {
    id: "sirius-b",
    nameCn: "天狼星 B",
    nameEn: "Sirius B",
    temperature: 25369,
    luminosity: 0.02448,
    mass: 1.02,
    radius: 0.008098,
    spectralClass: "DA",
    region: "white-dwarf",
    description: "天狼星的伴星，一颗白矮星。质量接近太阳但体积仅与地球相当，密度极高。",
    source: "https://arxiv.org/abs/1703.10625",
  },
  {
    id: "procyon-b",
    nameCn: "南河三 B",
    nameEn: "Procyon B",
    temperature: 7740,
    luminosity: 0.00049,
    mass: 0.592,
    radius: 0.01232,
    spectralClass: "DQZ",
    region: "white-dwarf",
    description:
      "南河三的伴星，一颗白矮星。质量约为太阳的 60%，大气以氦为主，光谱可见碳和更重元素。",
    source: "https://arxiv.org/abs/1510.00485",
  },
  {
    id: "rigel",
    nameCn: "参宿七",
    nameEn: "Rigel",
    temperature: 12100,
    luminosity: 120000,
    mass: 21,
    radius: 78.9,
    spectralClass: "B",
    region: "supergiant",
    description: "猎户座 β 星，一颗蓝超巨星。是猎户座中最亮的恒星，距离地球约 860 光年。",
    source: "https://arxiv.org/abs/1202.1836",
    parameterNote: "采用 Moravveji 等（2012）表 1 的观测文献参数；光度与半径依赖所用距离。",
  },
  {
    id: "deneb",
    nameCn: "天津四",
    nameEn: "Deneb",
    temperature: 8525,
    luminosity: 196000,
    mass: 19,
    radius: 203,
    spectralClass: "A",
    region: "supergiant",
    description: "天鹅座 α 星，一颗蓝白超巨星。是已知最明亮的恒星之一，距离地球约 2600 光年。",
    source: "https://arxiv.org/abs/0712.0040",
    parameterNote:
      "采用 Schiller 与 Przybilla（2008）的光谱及距离模型；这些并非无误差的统一精确值。",
  },
];
