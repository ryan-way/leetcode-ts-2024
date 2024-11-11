export function isValidSudoku(board: string[][]): boolean {
  return board
    .concat(getColumns(board))
    .concat(getSubGrids(board))
    .every((area) => isListValid(area));
}

function isListValid(list: string[]): boolean {
  const set = new Set();
  return list.every((item) => {
    const result = !set.has(item) || item === ".";
    set.add(item);
    return result;
  });
}

function getColumns(board: string[][]): string[][] {
  return board[0].map((_, idx) => board.map((row) => row[idx]));
}

function getSubGrids(board: string[][]): string[][] {
  const result: string[][] = [];

  for (let i = 0; i < board.length; i++) {
    const root_y = Math.floor(i / 3) * 3;
    const root_x = (i % 3) * 3;
    const row = [];
    for (let j = 0; j < board.length; j++) {
      const y = Math.floor(j / 3) + root_y;
      const x = (j % 3) + root_x;

      row.push(board[y][x]);
    }
    result.push(row);
  }

  return result;
}
