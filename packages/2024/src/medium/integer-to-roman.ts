export function intToRoman(num: number): string {
  let temp = num;
  const result: string[] = [];

  const tokens: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  for (const [value, token] of tokens) {
    if (temp >= value) {
      const remainder = temp % value;
      const repeat = (temp - remainder) / value;
      result.push(token.repeat(repeat));
      temp = remainder;
    }
  }
  return result.join("");
}
