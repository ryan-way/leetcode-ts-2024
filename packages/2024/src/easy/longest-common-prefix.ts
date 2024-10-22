export function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 1) return strs[0];
  if (strs.some((value) => value.length === 0)) return "";

  const smallest = `${strs.reduce((prev, curr) => {
    if (prev.length < curr.length) return prev;
    return curr;
  })}$`;

  const result = smallest
    .split("")
    .map((_, idx) => smallest.substring(0, idx))
    .filter((sub) => strs.every((value) => value.startsWith(sub)));

  return result[result.length - 1];
}
