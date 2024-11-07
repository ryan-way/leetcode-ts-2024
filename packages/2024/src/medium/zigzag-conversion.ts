// zigzag length = numRows < 3? numRows: numRows + numRows-2
// zigzag position = idx in s % zigzag length
// zigzag start = idx in s // zigzag length
// z_idx =

export function convert(s: string, numRows: number): string {
  if (numRows === 1) return s;
  const array = new Array(numRows)
    .fill([])
    .map((_) => new Array<string>(s.length).fill(""));

  const zigZagLength = Math.max(numRows, numRows + numRows - 2);

  const position = [0, 0];
  let zigZagIdx = 0;

  for (const c of s) {
    array[position[0]][position[1]] = c;

    if (zigZagIdx < numRows - 1) {
      position[0]++;
    } else {
      position[0]--;
      position[1]++;
    }

    zigZagIdx = (zigZagIdx + 1) % zigZagLength;
  }

  return array
    .flat()
    .filter((value) => value !== "")
    .join("");
}
