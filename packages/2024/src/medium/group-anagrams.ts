export function groupAnagrams(strs: string[]): string[][] {
  const result: string[][] = [];

  for (const str of strs) {
    const map = occurenceMap(str);

    let i = 0;
    for (; i < result.length; i++) {
      const check = occurenceMap(result[i][0]);
      if (mapsEqual(map, check)) {
        break;
      }
    }

    if (i === result.length) {
      result.push([]);
    }

    result[i].push(str);
  }
  return result;
}

function occurenceMap(s: string): Map<string, number> {
  const map: Map<string, number> = new Map();
  for (const c of s.split("")) {
    let value = map.get(c);

    if (value === undefined) {
      value = 0;
    }

    map.set(c, value + 1);
  }
  return map;
}

function mapsEqual(
  first: Map<string, number>,
  second: Map<string, number>,
): boolean {
  for (const key of first.keys()) {
    if (first.get(key) !== second.get(key)) {
      return false;
    }
  }

  return first.size === second.size;
}
