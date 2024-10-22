export function lengthOfLastWord(s: string): number {
  let count = 0;

  for (const c of s.split("").reverse()) {
    if (count === 0 && c === " ") {
      continue;
    }
    if (c === " ") {
      return count;
    }
    count++;
  }

  return count;
}
