import { expect } from "bun:test";

export function matchOccurences<T>(received: T[], expected: T[]) {
  const receivedOccurences = occurenceMap(received);
  const expectedOccurences = occurenceMap(expected);

  expect(receivedOccurences).toEqual(expectedOccurences);
}

function occurenceMap<T>(array: T[]): Map<T, number> {
  const map = new Map<T, number>();

  for (const element of array) {
    let occurences = map.get(element);
    if (occurences === undefined) {
      map.set(element, 0);
      occurences = 0;
    }
    map.set(element, occurences + 1);
  }

  return map;
}
