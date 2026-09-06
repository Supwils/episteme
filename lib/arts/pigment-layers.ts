export type PigmentLayer = {
  id: string;
  name: string;
  what: string;
};

export const PIGMENT_LAYERS: readonly PigmentLayer[] = [
  {
    id: "varnish",
    name: "光油",
    what: "最外层保护膜，改变表面光泽，也是后来清洗与变黄的主要位置。",
  },
  {
    id: "glaze",
    name: "釉染层",
    what: "半透明色层叠在不透明色之上，让颜色“沉下去”而不是一次性涂满。",
  },
  {
    id: "body",
    name: "色层 / 塑造层",
    what: "用含颜料较多的涂料建立形体与明暗；大多数可见色彩在这里。",
  },
  {
    id: "ground",
    name: "底子",
    what: "石膏或含铅/钛白的准备层，决定吸油与肌理，也决定后来龟裂如何走。",
  },
  {
    id: "support",
    name: "支撑体",
    what: "木板、画布或墙壁。它不提供颜色，却决定整幅画能不能活过湿度变化。",
  },
];
