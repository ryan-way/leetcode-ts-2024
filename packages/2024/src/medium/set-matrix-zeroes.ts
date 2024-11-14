export function setZeroes(matrix: number[][]): void {
  let setFirstRow = false;
  let setFirstCol = false;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === 0) {
        setFirstRow ||= row === 0;
        setFirstCol ||= col === 0;
        matrix[row][0] = 0;
        matrix[0][col] = 0;
      }
    }
  }

  for (let row = 1; row < matrix.length; row++) {
    for (let col = 1; col < matrix[row].length; col++) {
      if (matrix[row][0] === 0 || matrix[0][col] === 0) {
        matrix[row][col] = 0;
      }
    }
  }

  if (setFirstRow) {
    for (let col = 0; col < matrix[0].length; col++) {
      matrix[0][col] = 0;
    }
  }

  if (setFirstCol) {
    for (const row of matrix) {
      row[0] = 0;
    }
  }
}
