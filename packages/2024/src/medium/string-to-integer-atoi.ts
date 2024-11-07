export function myAtoi(s: string): number {
  if (s.length === 0) return 0;

  let value = 0;
  let negate = false;

  let index = 0;

  while (index < s.length && s[index] === " ") {
    index++;
  }

  if (index < s.length && (s[index] === "+" || s[index] === "-")) {
    negate = s[index] === "-";
    index++;
  }

  while (index < s.length && isNumeric(s[index])) {
    value *= 10;
    value += Number(s[index]);
    index++;
  }

  if (negate) {
    return Math.max(-value, -(2 ** 31));
  }
  return Math.min(value, 2 ** 31 - 1);
}

function isNumeric(s: string): boolean {
  switch (s) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      return true;
    default:
      return false;
  }
}
