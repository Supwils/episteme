export function potentialPoint(fieldOverV: number) {
  const normalizedPotential = (fieldOverV ** 2 - 1) ** 2;
  return { x: 80 * fieldOverV, y: 60 - 90 * normalizedPotential };
}

export const potentialMinima = [-1, 1].map(potentialPoint);

export function potentialPath() {
  return Array.from({ length: 81 }, (_, i) => {
    const p = potentialPoint(-1.5 + (3 * i) / 80);
    return `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
  }).join(" ");
}
