import { describe, expect, test } from "bun:test";
import { containsNearbyDuplicate } from "../../src/easy/contains-duplicate-ii";

describe("Contains Duplicate II", () => {
  test("example 1", () => {
    expect(containsNearbyDuplicate([1, 2, 3, 1], 3)).toBeTrue();
  });

  test("example 2", () => {
    expect(containsNearbyDuplicate([1, 0, 1, 1], 1)).toBeTrue();
  });

  test("example 3", () => {
    expect(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2)).toBeFalse();
  });

  test("example 4", () => {
    expect(containsNearbyDuplicate([1, 2, 1], 0)).toBeFalse();
  });
});
