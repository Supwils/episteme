// @ts-check

export function scaleValue(value, scaleRatio) {
  return value * scaleRatio;
}

export function hitTestNodes(nodes, mx, my, radius, scaleRatio) {
  for (const node of nodes) {
    const dx = mx - scaleValue(node.x, scaleRatio);
    const dy = my - scaleValue(node.y, scaleRatio);
    if (Math.sqrt(dx * dx + dy * dy) < radius) return node;
  }
  return null;
}

export function isNearNodes(nodes, mx, my, radius, scaleRatio) {
  return !!hitTestNodes(nodes, mx, my, radius, scaleRatio);
}

export function getNodeBounds(nodes, scaleRatio) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const node of nodes) {
    const x = scaleValue(node.x, scaleRatio);
    const y = scaleValue(node.y, scaleRatio);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  return { minX, maxX, minY, maxY };
}
