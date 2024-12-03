export function countBits(n: number): number[] {
  let nextPower = 1;
  let prevPower = 0;
  return Array.from(Array(n + 1).keys()).reduce((result, value) => {
    if (value === 0) return [0];
    if (value === nextPower) {
      result.push(1);
      prevPower = nextPower;
      nextPower *= 2;
    } else {
      result.push(1 + result[value % prevPower]);
    }
    return result;
  }, [] as number[]);
}
