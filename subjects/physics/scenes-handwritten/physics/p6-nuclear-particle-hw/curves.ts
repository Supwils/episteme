// Selected AME2020 nuclides; connecting segments are visual guides, not an isobaric average.
export const bindingNuclides = [
  { a: 1, isotope: "¹H", be: 0 },
  { a: 2, isotope: "²H", be: 1.1122831 },
  { a: 3, isotope: "³He", be: 2.57268044 },
  { a: 4, isotope: "⁴He", be: 7.0739156 },
  { a: 7, isotope: "⁷Li", be: 5.6064401 },
  { a: 12, isotope: "¹²C", be: 7.6801446 },
  { a: 16, isotope: "¹⁶O", be: 7.9762072 },
  { a: 28, isotope: "²⁸Si", be: 8.4477445 },
  { a: 40, isotope: "⁴⁰Ca", be: 8.5513046 },
  { a: 56, isotope: "⁵⁶Fe", be: 8.7903563 },
  { a: 62, isotope: "⁶²Ni", be: 8.7945555 },
  { a: 100, isotope: "¹⁰⁰Mo", be: 8.6046626 },
  { a: 120, isotope: "¹²⁰Sn", be: 8.504488 },
  { a: 160, isotope: "¹⁶⁰Dy", be: 8.1840526 },
  { a: 208, isotope: "²⁰⁸Pb", be: 7.867453 },
  { a: 235, isotope: "²³⁵U", be: 7.5909151 },
  { a: 238, isotope: "²³⁸U", be: 7.5701262 },
] as const;

export const bindingPoint = (a: number, be: number) => ({
  x: -140 + ((a - 1) / 237) * 280,
  y: 70 - (be / 9) * 150,
});

export const bindingPath = bindingNuclides
  .map(({ a, be }, i) => {
    const p = bindingPoint(a, be);
    return `${i ? "L" : "M"} ${p.x} ${p.y}`;
  })
  .join(" ");

const mz = 91.1876;
const alphaAtMz = 0.118;
const beta0 = 11 - (2 * 5) / 3;

// A fixed-five-flavour one-loop illustration restricted to the perturbative regime.
export const alphaS = (q: number) =>
  alphaAtMz / (1 + ((alphaAtMz * beta0) / (2 * Math.PI)) * Math.log(q / mz));
export const couplingPoint = (q: number, alpha = alphaS(q)) => ({
  x: -130 + (Math.log(q / 10) / Math.log(150 / 10)) * 260,
  y: 70 - (alpha / 0.2) * 150,
});
export const couplingPath = Array.from({ length: 81 }, (_, i) => {
  const q = 10 * (150 / 10) ** (i / 80),
    p = couplingPoint(q);
  return `${i ? "L" : "M"} ${p.x} ${p.y}`;
}).join(" ");
export const mzPoint = couplingPoint(mz);
