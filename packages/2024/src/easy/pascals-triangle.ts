export function generate(numRows: number): number[][] {
  const result = [];
  result.push([1]);

  for (let i = 1; i < numRows; i++) {
    const prev = result[result.length - 1];
    const row = [1];

    for (let a = 0, b = 1; b < prev.length; a++, b++) {
      row.push(prev[a] + prev[b]);
    }

    row.push(1);
    result.push(row);
  }
  return result;
}
