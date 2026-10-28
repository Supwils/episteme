/** 布局文件的节点步长：x, y, z, level, domainIndex, degree。坐标已乘 scale。 */
export const SUMMIT_NODE_STRIDE = 6;

export const SUMMIT_LAYOUT_VERSION = 1;

export type SummitBeaconRecord = {
  id: string;
  title: string;
  x: number;
  y: number;
  z: number;
};

export type SummitLayoutFile = {
  v: number;
  scale: number;
  grid: number;
  span: number;
  height: number[];
  nodes: number[];
  beacons: SummitBeaconRecord[];
};

export function parseSummitLayout(value: unknown): SummitLayoutFile | null {
  if (!value || typeof value !== "object") return null;
  const record = value as SummitLayoutFile;
  if (record.v !== SUMMIT_LAYOUT_VERSION) return null;
  if (!Array.isArray(record.nodes) || record.nodes.length % SUMMIT_NODE_STRIDE !== 0) return null;
  if (!Array.isArray(record.height) || !Array.isArray(record.beacons)) return null;
  if (typeof record.scale !== "number" || typeof record.grid !== "number") return null;
  return record;
}
