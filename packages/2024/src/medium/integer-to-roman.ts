const TOKENS: [string, number][] = [
  ["M", 1000],
  ["CM", 900],
  ["D", 500],
  ["CD", 400],
  ["C", 100],
  ["XC", 90],
  ["L", 50],
  ["XL", 40],
  ["X", 10],
  ["IX", 9],
  ["V", 5],
  ["IV", 4],
  ["I", 1],
];

export function intToRoman(num: number): string {
  let n = num;
  return TOKENS.reduce((result, [token, value]) => {
    if (value <= n) {
      result.push(...Array(Math.floor(n / value)).fill(token));
      n %= value;
    }
    return result;
  }, [] as string[]).join("");
}
