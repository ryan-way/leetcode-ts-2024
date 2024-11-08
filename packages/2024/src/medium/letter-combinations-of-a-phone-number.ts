export function letterCombinations(digits: string): string[] {
  const map = [
    "abc".split(""),
    "def".split(""),
    "ghi".split(""),
    "jkl".split(""),
    "mno".split(""),
    "pqrs".split(""),
    "tuv".split(""),
    "wxyz".split(""),
  ];

  let result: string[] = [];

  for (const digit of digits.split("")) {
    const newResult = [];
    const value = +digit;

    if (result.length === 0) {
      result.push("");
    }
    for (const c of map[value - 2]) {
      for (const prev of result) {
        newResult.push(prev + c);
      }
    }

    result = newResult;
  }
  return result;
}
