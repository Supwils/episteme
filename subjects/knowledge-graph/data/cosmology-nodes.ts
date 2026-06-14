import type { GraphNode, GraphEdge } from "./types";

const n = (slug: string, label: string, description: string, tags: string[]): GraphNode => ({
  id: `cosmology:${slug}`,
  label,
  domain: "cosmology",
  type: "cosmic",
  slug,
  section: "knowledge-base",
  url: `/cosmology/knowledge-base/${slug}`,
  tags,
  description,
});

export const COSMOLOGY_NODES: GraphNode[] = [
  n("大爆炸理论", "大爆炸理论", "时间与空间的起点，宇宙演化的开端。", ["宇宙起源"]),
  n("cosmic-inflation", "宇宙暴胀", "诞生瞬间的指数级膨胀，抹平并放大了宇宙。", ["暴胀"]),
  n("宇宙微波背景", "宇宙微波背景", "38 万年时释放的最古老的光。", ["CMB"]),
  n("恒星核合成", "恒星核合成", "构成万物的重元素在恒星内部锻造。", ["元素", "恒星"]),
  n("星系形成与演化", "星系形成与演化", "气体在暗物质晕中坍缩成星系。", ["星系"]),
  n("宇宙大尺度结构", "宇宙大尺度结构", "星系沿暗物质纤维织成宇宙之网。", ["大尺度结构"]),
  n("暗物质与暗能量", "暗物质与暗能量", "占宇宙能量约 95% 的未知成分。", ["暗物质", "暗能量"]),
  n("black-holes", "黑洞", "时空被压垮处，广义相对论的极端预言。", ["黑洞", "相对论"]),
  n("引力波天文学", "引力波天文学", "用时空涟漪聆听宇宙的剧烈事件。", ["引力波"]),
  n("宇宙的最终命运", "宇宙的最终命运", "热寂、大撕裂还是大坍缩？", ["宇宙命运"]),
];

const e = (from: string, to: string, label: string): GraphEdge => ({
  source: `cosmology:${from}`,
  target: `cosmology:${to}`,
  type: "cross-reference",
  label,
});

export const COSMOLOGY_EDGES: GraphEdge[] = [
  e("大爆炸理论", "cosmic-inflation", "紧随"),
  e("cosmic-inflation", "宇宙微波背景", "之后"),
  e("宇宙微波背景", "恒星核合成", "之后"),
  e("恒星核合成", "星系形成与演化", "提供物质"),
  e("星系形成与演化", "宇宙大尺度结构", "构成"),
  e("宇宙大尺度结构", "暗物质与暗能量", "受其主导"),
  e("暗物质与暗能量", "宇宙的最终命运", "决定"),
  e("星系形成与演化", "black-holes", "孕育"),
  e("black-holes", "引力波天文学", "并合产生"),
];
