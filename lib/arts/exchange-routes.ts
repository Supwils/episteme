export type ExchangeRoute = {
  id: string;
  name: string;
  what: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
};

export const EXCHANGE_ROUTES: readonly ExchangeRoute[] = [
  {
    id: "silk",
    name: "丝路与颜料",
    what: "群青的原料来自阿富汗 lapis，经长距离贸易进入欧洲画室。这是物质移动，不是“风格传播”的同义词。",
    from: { x: 168, y: 78 },
    to: { x: 92, y: 62 },
  },
  {
    id: "porcelain",
    name: "瓷器与模仿",
    what: "景德镇瓷器进入欧洲收藏后，本地窑口模仿釉色与器形。交流常常先发生在器物，再进入绘画母题。",
    from: { x: 188, y: 86 },
    to: { x: 96, y: 70 },
  },
  {
    id: "islamic-geometry",
    name: "几何纹样",
    what: "伊斯兰建筑装饰的周期铺砌被当作可学习的形式知识传播，不等于把一座清真寺“翻译”成另一座教堂。",
    from: { x: 128, y: 78 },
    to: { x: 108, y: 64 },
  },
  {
    id: "modern-canon",
    name: "现代主义的取材",
    what: "20 世纪初欧洲艺术家从非洲雕刻与日本浮世获得形式刺激。这是一次不对称的观看，需与殖民收藏史一起读。",
    from: { x: 118, y: 118 },
    to: { x: 98, y: 66 },
  },
];
