export function lengthOfLongestSubstring(s: string): number {
  let start = 0;
  let best = 0;

  const set = new Set();

  for (let end = 0; end < s.length; end++) {
    while (set.has(s[end])) {
      set.delete(s[start]);
      start++;
    }
    set.add(s[end]);

    best = Math.max(best, end - start + 1);
  }
  return best;
}
