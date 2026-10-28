import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three";
import { PALETTE } from "@/lib/design/palette";
import { DOMAIN_SEALS } from "@/lib/design/seals";
import { DOMAIN_WEDGES, polarToXY } from "@/lib/knowledge-geometry";
import { KNOWLEDGE_LEVELS, type KnowledgeLevel } from "@/lib/knowledge-levels";
import {
  SUMMIT_CAMERA_UP,
  SUMMIT_INTRO_MS,
  SUMMIT_LOOK_AT,
  summitEye,
  type SummitView,
} from "@/lib/summit-camera";
import {
  summitClusterColor,
  summitGroundColor,
  summitLevelColor,
  summitMeshColor,
  summitThemeName,
} from "@/lib/summit-colors";
import { SUMMIT_NODE_STRIDE, type SummitLayoutFile } from "@/lib/summit-layout";
import { summitTerrainMesh } from "@/lib/summit-terrain";
import { summitNodeLabel } from "./summit-dom";

export type SummitLens = "domain" | "level";

export type SummitScene = {
  setLens: (lens: SummitLens) => void;
  setSelected: (index: number | null, links: readonly number[]) => void;
  dispose: () => void;
};

const POINT_VERTEX = `
attribute float aSize;
attribute vec3 aColor;
varying vec3 vColor;
void main() {
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (4.0 / max(0.5, -mv.z));
  gl_Position = projectionMatrix * mv;
}
`;

const POINT_FRAGMENT = `
precision mediump float;
varying vec3 vColor;
void main() {
  vec2 point = gl_PointCoord - vec2(0.5);
  if (dot(point, point) > 0.25) discard;
  gl_FragColor = vec4(vColor, 1.0);
}
`;

export function mountSummitScene(
  canvas: HTMLCanvasElement,
  labelRoot: HTMLElement,
  layout: SummitLayoutFile,
  labelAt: (index: number) => string,
  reducedMotion: boolean,
  onHover: (text: string, x: number, y: number) => void,
  onSelect: (index: number) => void
): SummitScene | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  const scene = new Scene();
  const camera = new PerspectiveCamera(42, 1, 0.05, 20);
  const count = layout.nodes.length / SUMMIT_NODE_STRIDE;
  const positions = new Float32Array(count * 3);
  const baseSize = new Float32Array(count);
  for (let index = 0; index < count; index++) fillPoint(layout, positions, baseSize, index);
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  const colorAttr = new BufferAttribute(new Float32Array(count * 3), 3);
  const sizeAttr = new BufferAttribute(baseSize.slice(), 1);
  geometry.setAttribute("aColor", colorAttr);
  geometry.setAttribute("aSize", sizeAttr);
  const material = new ShaderMaterial({
    vertexShader: POINT_VERTEX,
    fragmentShader: POINT_FRAGMENT,
    transparent: false,
  });
  scene.add(new Points(geometry, material));
  const terrainData = summitTerrainMesh(layout.height, layout.scale);
  const terrainGeo = new BufferGeometry();
  terrainGeo.setAttribute("position", new BufferAttribute(terrainData.positions, 3));
  terrainGeo.setIndex(new BufferAttribute(terrainData.indices, 1));
  const terrainMat = new MeshBasicMaterial({ side: DoubleSide });
  scene.add(new Mesh(terrainGeo, terrainMat));
  const linePositions = new Float32Array(24);
  const lineGeo = new BufferGeometry();
  lineGeo.setAttribute("position", new BufferAttribute(linePositions, 3));
  lineGeo.setDrawRange(0, 0);
  const lineMat = new LineBasicMaterial();
  scene.add(new LineSegments(lineGeo, lineMat));
  const beacons = beaconPoints(layout);
  scene.add(beacons.points);

  const view: SummitView = { tilt: reducedMotion ? 1 : 0, azimuth: 0.4, distance: 1 };
  let lens: SummitLens = "domain";
  let selected: number | null = null;
  let frame = 0;
  let intro = !reducedMotion;
  const started = performance.now();
  const samples: number[] = [];
  let lastStamp = started;
  const projected = new Float32Array(count * 2);
  const scratch = new Vector3();
  const labels = createLabels(labelRoot);

  const paint = () =>
    paintScene(
      layout,
      colorAttr,
      sizeAttr,
      baseSize,
      terrainMat,
      lineMat,
      beacons.material,
      lens,
      selected
    );
  const render = (stamp?: number) => {
    const now = stamp ?? performance.now();
    if (intro) {
      const t = Math.min(1, (now - started) / SUMMIT_INTRO_MS);
      view.tilt = 1 - (1 - t) ** 3;
      if (t >= 1) intro = false;
    }
    resize(renderer, camera, canvas);
    const eye = summitEye(view);
    camera.position.set(eye.x, eye.y, eye.z);
    camera.up.set(SUMMIT_CAMERA_UP.x, SUMMIT_CAMERA_UP.y, SUMMIT_CAMERA_UP.z);
    camera.lookAt(SUMMIT_LOOK_AT.x, SUMMIT_LOOK_AT.y, SUMMIT_LOOK_AT.z);
    renderer.render(scene, camera);
    projectPoints(camera, canvas, positions, projected, scratch);
    placeLabels(camera, canvas, labels, scratch);
    if (view.tilt >= 1 && samples.length < 24) {
      samples.push(now - lastStamp);
      lastStamp = now;
      if (samples.length === 24) publishFrame(canvas, samples);
    }
  };
  const kick = (stamp: number) => {
    if (document.hidden) return;
    render(stamp);
    if (intro || samples.length < 24) frame = requestAnimationFrame(kick);
  };

  paint();
  const stopInput = bindInput(
    canvas,
    view,
    projected,
    render,
    onHover,
    onSelect,
    layout,
    labelAt,
    () => selected,
    () => {
      intro = false;
    }
  );
  const observer = new MutationObserver(() => {
    paint();
    render();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  const onVisibility = () => {
    if (!document.hidden) frame = requestAnimationFrame(kick);
  };
  document.addEventListener("visibilitychange", onVisibility);
  const resizeObserver = new ResizeObserver(() => render());
  resizeObserver.observe(canvas);
  frame = requestAnimationFrame(kick);

  return {
    setLens(next) {
      lens = next;
      paint();
      render();
    },
    setSelected(index, links) {
      selected = index;
      writeLinks(linePositions, positions, index, links);
      const position = lineGeo.getAttribute("position");
      if (position) position.needsUpdate = true;
      lineGeo.setDrawRange(0, index === null ? 0 : Math.min(links.length, 4) * 2);
      paint();
      render();
    },
    dispose() {
      cancelAnimationFrame(frame);
      stopInput();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      labelRoot.replaceChildren();
      geometry.dispose();
      material.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      beacons.geometry.dispose();
      beacons.material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}

function fillPoint(
  layout: SummitLayoutFile,
  positions: Float32Array,
  sizes: Float32Array,
  index: number
) {
  const base = index * SUMMIT_NODE_STRIDE;
  const scale = layout.scale;
  positions[index * 3] = (layout.nodes[base] ?? 0) / scale;
  positions[index * 3 + 1] = (layout.nodes[base + 1] ?? 0) / scale;
  positions[index * 3 + 2] = (layout.nodes[base + 2] ?? 0) / scale;
  const degree = layout.nodes[base + 5] ?? 0;
  sizes[index] = degree >= 4 ? 10 : degree >= 1 ? 7 : 4.8;
}

function paintScene(
  layout: SummitLayoutFile,
  colors: BufferAttribute,
  sizes: BufferAttribute,
  baseSize: Float32Array,
  terrain: MeshBasicMaterial,
  lines: LineBasicMaterial,
  beacons: ShaderMaterial,
  lens: SummitLens,
  selected: number | null
) {
  const theme = summitThemeName(document.documentElement);
  const array = colors.array as Float32Array;
  const count = baseSize.length;
  for (let index = 0; index < count; index++) {
    const base = index * SUMMIT_NODE_STRIDE;
    const level = (layout.nodes[base + 3] ?? 1) as KnowledgeLevel;
    const domain = DOMAIN_WEDGES[layout.nodes[base + 4] ?? 0];
    const hex =
      lens === "level" || !domain
        ? summitLevelColor(level, theme)
        : summitClusterColor(domain.cluster, theme);
    writeColor(array, index, hex);
    sizes.setX(index, baseSize[index]! * (index === selected ? 1.9 : 1));
  }
  colors.needsUpdate = true;
  sizes.needsUpdate = true;
  terrain.color.set(summitMeshColor(theme));
  lines.color.set(PALETTE[theme].brass.mark);
  const beaconColor = beacons.uniforms.uColor;
  if (beaconColor) beaconColor.value = new Color(PALETTE[theme].brass.mark);
}

const POINT_COLOR = new Color();

function writeColor(array: Float32Array, index: number, hex: string) {
  POINT_COLOR.set(hex);
  array[index * 3] = POINT_COLOR.r;
  array[index * 3 + 1] = POINT_COLOR.g;
  array[index * 3 + 2] = POINT_COLOR.b;
}

function beaconPoints(layout: SummitLayoutFile): {
  points: Points;
  geometry: BufferGeometry;
  material: ShaderMaterial;
} {
  const positions = new Float32Array(layout.beacons.length * 3);
  layout.beacons.forEach((beacon, index) => {
    positions[index * 3] = beacon.x / layout.scale;
    positions[index * 3 + 1] = beacon.y / layout.scale;
    positions[index * 3 + 2] = beacon.z / layout.scale;
  });
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  const material = new ShaderMaterial({
    uniforms: { uColor: { value: new Color("#c39a45") } },
    vertexShader: `void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = 16.0 * (4.0 / max(0.5,-mv.z)); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform vec3 uColor; void main(){ vec2 p = gl_PointCoord-vec2(0.5); if(dot(p,p)>0.25) discard; gl_FragColor = vec4(uColor,1.0); }`,
  });
  return { points: new Points(geometry, material), geometry, material };
}

function createLabels(root: HTMLElement): HTMLElement[] {
  root.replaceChildren();
  return DOMAIN_WEDGES.map((wedge) => {
    const seal = DOMAIN_SEALS[wedge.domain as keyof typeof DOMAIN_SEALS];
    const flat = polarToXY(wedge.centerDeg, 1.08);
    return appendLabel(root, seal?.char ?? "", flat.x, 0.04, flat.y);
  });
}

function appendLabel(
  root: HTMLElement,
  text: string,
  x: number,
  y: number,
  z: number
): HTMLElement {
  const element = document.createElement("span");
  element.className = "summit-label";
  element.textContent = text;
  element.dataset.x = String(x);
  element.dataset.y = String(y);
  element.dataset.z = String(z);
  root.append(element);
  return element;
}

function placeLabels(
  camera: PerspectiveCamera,
  canvas: HTMLCanvasElement,
  labels: HTMLElement[],
  scratch: Vector3
) {
  for (const label of labels) {
    scratch.set(Number(label.dataset.x), Number(label.dataset.y), Number(label.dataset.z));
    scratch.project(camera);
    const hidden = scratch.z > 1;
    label.hidden = hidden;
    if (hidden) continue;
    label.style.left = `${(scratch.x * 0.5 + 0.5) * canvas.clientWidth}px`;
    label.style.top = `${(-scratch.y * 0.5 + 0.5) * canvas.clientHeight}px`;
  }
}

function projectPoints(
  camera: PerspectiveCamera,
  canvas: HTMLCanvasElement,
  positions: Float32Array,
  projected: Float32Array,
  scratch: Vector3
) {
  for (let index = 0; index < positions.length / 3; index++) {
    scratch.fromArray(positions, index * 3);
    scratch.project(camera);
    projected[index * 2] =
      scratch.z > 1 ? Number.NaN : (scratch.x * 0.5 + 0.5) * canvas.clientWidth;
    projected[index * 2 + 1] =
      scratch.z > 1 ? Number.NaN : (-scratch.y * 0.5 + 0.5) * canvas.clientHeight;
  }
}

function resize(renderer: WebGLRenderer, camera: PerspectiveCamera, canvas: HTMLCanvasElement) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (width === 0 || height === 0) return;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setClearColor(summitGroundColor(summitThemeName(document.documentElement)));
}

function writeLinks(
  target: Float32Array,
  positions: Float32Array,
  index: number | null,
  links: readonly number[]
) {
  target.fill(0);
  if (index === null) return;
  links.slice(0, 4).forEach((link, slot) => {
    const from = index * 3;
    const to = link * 3;
    const offset = slot * 6;
    target[offset] = positions[from] ?? 0;
    target[offset + 1] = positions[from + 1] ?? 0;
    target[offset + 2] = positions[from + 2] ?? 0;
    target[offset + 3] = positions[to] ?? 0;
    target[offset + 4] = positions[to + 1] ?? 0;
    target[offset + 5] = positions[to + 2] ?? 0;
  });
}

function bindInput(
  canvas: HTMLCanvasElement,
  view: SummitView,
  projected: Float32Array,
  render: () => void,
  onHover: (text: string, x: number, y: number) => void,
  onSelect: (index: number) => void,
  layout: SummitLayoutFile,
  labelAt: (index: number) => string,
  current: () => number | null,
  cancelIntro: () => void
): () => void {
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let originX = 0;
  let originY = 0;
  const pointer = (event: PointerEvent) => nearest(canvas, projected, event.clientX, event.clientY);
  const onDown = (event: PointerEvent) => {
    dragging = true;
    cancelIntro();
    originX = lastX = event.clientX;
    originY = lastY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
  };
  const onMove = (event: PointerEvent) => {
    if (dragging) {
      view.azimuth -= (event.clientX - lastX) * 0.005;
      view.tilt = Math.min(1, Math.max(0, view.tilt + (event.clientY - lastY) * 0.004));
      lastX = event.clientX;
      lastY = event.clientY;
      render();
      return;
    }
    const hit = pointer(event);
    onHover(hit === null ? "" : hoverText(layout, hit, labelAt), event.clientX, event.clientY);
  };
  const onUp = (event: PointerEvent) => {
    const moved = Math.hypot(event.clientX - originX, event.clientY - originY);
    dragging = false;
    if (moved < 4) {
      const hit = pointer(event);
      if (hit !== null && hit !== current()) onSelect(hit);
    }
  };
  const onWheel = (event: WheelEvent) => {
    event.preventDefault();
    view.distance = Math.min(1.45, Math.max(0.75, view.distance * Math.exp(event.deltaY * 0.001)));
    render();
  };
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("wheel", onWheel, { passive: false });
  return () => {
    canvas.removeEventListener("pointerdown", onDown);
    canvas.removeEventListener("pointermove", onMove);
    canvas.removeEventListener("pointerup", onUp);
    canvas.removeEventListener("wheel", onWheel);
  };
}

function nearest(
  canvas: HTMLCanvasElement,
  projected: Float32Array,
  clientX: number,
  clientY: number
): number | null {
  const rect = canvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  let best = -1;
  let bestDist = 18 * 18;
  for (let index = 0; index < projected.length / 2; index++) {
    const px = projected[index * 2] ?? Number.NaN;
    const py = projected[index * 2 + 1] ?? Number.NaN;
    if (Number.isNaN(px) || Number.isNaN(py)) continue;
    const dist = (px - x) ** 2 + (py - y) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      best = index;
    }
  }
  return best < 0 ? null : best;
}

function hoverText(
  layout: SummitLayoutFile,
  index: number,
  labelAt: (index: number) => string
): string {
  const level = layout.nodes[index * SUMMIT_NODE_STRIDE + 3] ?? 1;
  const domain = DOMAIN_WEDGES[layout.nodes[index * SUMMIT_NODE_STRIDE + 4] ?? 0];
  const seal = domain ? DOMAIN_SEALS[domain.domain as keyof typeof DOMAIN_SEALS] : undefined;
  const name = KNOWLEDGE_LEVELS.find((item) => item.id === level);
  const label = labelAt(index) || summitNodeLabel(index);
  return `${seal?.char ?? ""} ${label} · L${level} ${name?.label ?? ""}`.trim();
}

function publishFrame(canvas: HTMLCanvasElement, samples: number[]) {
  const body = samples.slice(4).sort((a, b) => a - b);
  const mid = body[Math.floor(body.length / 2)];
  if (mid !== undefined) canvas.dataset.frameMs = mid.toFixed(1);
}
