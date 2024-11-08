export function isIsomorphic(s: string, t: string): boolean {
  const set = new Set();
  const map = new Map();

  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i]) && map.get(s[i]) === t[i]) continue;
    if (map.has(s[i])) return false;
    if (set.has(t[i])) return false;

    set.add(t[i]);
    map.set(s[i], t[i]);
  }
  return true;
}
