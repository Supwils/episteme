/** Dense Gaussian elimination with partial pivoting. Teaching-sized systems only. */
export function solveLinear(matrix: number[][], values: number[]): number[] {
  const size = values.length;
  if (size === 0) return [];
  const augmented = matrix.map((row, index) => {
    if (row.length !== size) throw new Error("matrix is not square");
    return [...row, values[index]!];
  });

  for (let pivot = 0; pivot < size; pivot++) {
    let best = pivot;
    for (let row = pivot + 1; row < size; row++) {
      if (Math.abs(augmented[row]![pivot]!) > Math.abs(augmented[best]![pivot]!)) best = row;
    }
    const swap = augmented[pivot]!;
    augmented[pivot] = augmented[best]!;
    augmented[best] = swap;
    const diagonal = augmented[pivot]![pivot]!;
    if (Math.abs(diagonal) < 1e-10) throw new Error("singular matrix");
    for (let row = pivot + 1; row < size; row++) {
      const factor = augmented[row]![pivot]! / diagonal;
      for (let col = pivot; col <= size; col++) {
        augmented[row]![col]! -= factor * augmented[pivot]![col]!;
      }
    }
  }

  const solution = Array.from({ length: size }, () => 0);
  for (let row = size - 1; row >= 0; row--) {
    let sum = augmented[row]![size]!;
    for (let col = row + 1; col < size; col++) sum -= augmented[row]![col]! * solution[col]!;
    solution[row] = sum / augmented[row]![row]!;
  }
  return solution;
}
