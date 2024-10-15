import { describe, expect, test } from "bun:test";
import { twoSum } from "../../src/easy/two-sum";

describe("Test two sum", () => {
  test("example 1", () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  test("example 2", () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  });

  test("example 3", () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });

  test("error state", () => {
    expect(twoSum([0, 0], 3)).toEqual([0, 0]);
  });
});
