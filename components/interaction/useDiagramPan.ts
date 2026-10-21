"use client";

import {
  useCallback,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type RefObject,
} from "react";

type Point = { x: number; y: number };
type Press<T extends Element> = {
  id: number;
  x: number;
  y: number;
  origin: Point;
  element: T;
  moved: boolean;
};
type Gesture<T extends Element> = {
  press: RefObject<Press<T> | null>;
  suppressClick: RefObject<boolean>;
  setIsPanning: (value: boolean) => void;
};
type PanOptions<T extends Element> = {
  pan: Point;
  onPan: (next: Point) => void;
  toPanDelta?: (dx: number, dy: number, element: T) => Point;
};
const pixelDelta = (x: number, y: number): Point => ({ x, y });

function beginPan<T extends Element>(
  event: PointerEvent<T>,
  armed: boolean,
  pan: Point,
  state: Gesture<T>
) {
  if (event.button !== 0 || event.isPrimary === false || state.press.current) return;
  state.suppressClick.current = false;
  if ((event.pointerType === "touch" || event.pointerType === "pen") && !armed) return;
  state.press.current = {
    id: event.pointerId,
    x: event.clientX,
    y: event.clientY,
    origin: pan,
    element: event.currentTarget,
    moved: false,
  };
}

function movePan<T extends Element>(
  event: PointerEvent<T>,
  state: Gesture<T>,
  options: PanOptions<T>,
  cancel: () => void
) {
  const active = state.press.current;
  if (!active) return false;
  if (active.id !== event.pointerId) return true;
  if (event.buttons === 0) {
    cancel();
    return true;
  }
  const dx = event.clientX - active.x,
    dy = event.clientY - active.y;
  if (!active.moved && Math.hypot(dx, dy) < 5) return true;
  const delta = (options.toPanDelta ?? pixelDelta)(dx, dy, event.currentTarget);
  if (!active.moved) {
    active.moved = true;
    state.suppressClick.current = true;
    state.setIsPanning(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  options.onPan({ x: active.origin.x + delta.x, y: active.origin.y + delta.y });
  return true;
}

function panHandlers<T extends Element>(
  state: Gesture<T>,
  options: PanOptions<T>,
  armed: boolean,
  cancel: () => void
) {
  const end = (event: PointerEvent<T>) => {
    if (state.press.current?.id === event.pointerId) cancel();
  };
  const lost = (event: PointerEvent<T>) => {
    // Taking capture from a child emits a bubbling lost event while the surface still owns it.
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) end(event);
  };
  return {
    onPointerDown: (event: PointerEvent<T>) => beginPan(event, armed, options.pan, state),
    onPointerMove: (event: PointerEvent<T>) => movePan(event, state, options, cancel),
    onPointerUp: end,
    onPointerCancel: end,
    onLostPointerCapture: lost,
    onPointerLeave: lost,
    onClickCapture: (event: MouseEvent<T>) => {
      if (event.detail === 0 || !state.suppressClick.current) return;
      state.suppressClick.current = false;
      event.preventDefault();
      event.stopPropagation();
    },
  };
}

export function useDiagramPan<T extends Element>(options: PanOptions<T>) {
  const surfaceId = useId();
  const [armed, setArmed] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const press = useRef<Press<T> | null>(null);
  const suppressClick = useRef(false);
  const cancel = useCallback(() => {
    const active = press.current;
    press.current = null;
    if (active?.element.hasPointerCapture(active.id))
      active.element.releasePointerCapture(active.id);
    setIsPanning(false);
    setArmed(false);
  }, []);
  const toggle = () => {
    cancel();
    setArmed(!armed);
  };
  const state = { press, suppressClick, setIsPanning };
  return {
    surfaceId,
    armed,
    toggle,
    cancel,
    isPanning,
    touchAction: armed ? "none" : "manipulation",
    handlers: panHandlers(state, options, armed, cancel),
  };
}
