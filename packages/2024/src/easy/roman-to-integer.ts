export function romanToInt(s: string): number {
  return s
    .split("")
    .reverse()
    .map(tokenToValue)
    .reduce((prev, curr) => {
      if (prev > curr * 3) {
        return prev - curr;
      }
      return prev + curr;
    });
}

function tokenToValue(c: string): number {
  const values = new Map([
    ["I", 1],
    ["V", 5],
    ["X", 10],
    ["L", 50],
    ["C", 100],
    ["D", 500],
    ["M", 1000],
  ]);

  const result = values.get(c);
  if (!result) throw new Error("Invalid token");

  return result;
}
