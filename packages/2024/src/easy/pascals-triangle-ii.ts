export function getRow(rowIndex: number): number[] {
  let curr = [1];

  for (let i = 0; i < rowIndex; i++) {
    const prev = curr;
    curr = [1];
    for (let a = 0, b = 1; b < prev.length; a++, b++) {
      curr.push(prev[a] + prev[b]);
    }
    curr.push(1);
  }
  return curr;
}
