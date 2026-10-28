/**
 * 格致山镜头。唯一的取景公式：tilt 0 在头顶，tilt 1 是四分之三侧看。
 * 方位角 0 时镜头在南侧（世界 +Z），视线朝向北方。
 * camera.up 固定为 (0, 0, −1)，使 θ = 0（世界 −Z）落在画面上方，与星盘一致。
 * 默认距离下，半径 1.16 的学科环落在 42° 方画幅里。镜头始终高于 1.02 的台地。
 */
export type SummitView = {
  tilt: number;
  azimuth: number;
  distance: number;
};

export const SUMMIT_CAMERA_UP = { x: 0, y: 0, z: -1 } as const;
export const SUMMIT_LOOK_AT = { x: 0, y: 0.35, z: 0 } as const;
export const SUMMIT_INTRO_MS = 1200;

export function clampSummitView(view: SummitView): SummitView {
  return {
    tilt: clamp(view.tilt, 0, 1),
    azimuth: view.azimuth,
    distance: clamp(view.distance, 0.75, 1.45),
  };
}

export function summitEye(view: SummitView): { x: number; y: number; z: number } {
  const next = clampSummitView(view);
  const radial = (0.35 + next.tilt * 2.6) * next.distance;
  const y = Math.max(2.4, 4.4 - next.tilt * 1.5);
  return {
    x: Math.sin(next.azimuth) * radial,
    y,
    z: Math.cos(next.azimuth) * radial,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
