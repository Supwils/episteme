export const RAMP_LENGTH = 4;
export const GRAVITY = 9.81;

export type RampMeasurement = { angle: number; time: number; distance: number };

export function rampAcceleration(angle: number): number {
  return (5 / 7) * GRAVITY * Math.sin((angle * Math.PI) / 180);
}

export function rampDuration(angle: number): number {
  return Math.sqrt((2 * RAMP_LENGTH) / rampAcceleration(angle));
}

export function rampSample(angle: number, time: number): RampMeasurement {
  const stoppedTime = Math.min(Math.max(time, 0), rampDuration(angle));
  return { angle, time: stoppedTime, distance: 0.5 * rampAcceleration(angle) * stoppedTime ** 2 };
}
