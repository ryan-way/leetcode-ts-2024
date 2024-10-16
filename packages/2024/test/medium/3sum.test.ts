import { describe, expect, test } from "bun:test";
import { threeSum } from "../../src/medium/3sum";

describe("3Sum", () => {
  test("example 1", () => {
    expect(threeSum([-1, 0, 1, 2, -1, -4])).toEqual([
      [-1, -1, 2],
      [-1, 0, 1],
    ]);
  });

  test("example 2", () => {
    expect(threeSum([0, 1, 1])).toEqual([]);
  });

  test("example 3", () => {
    expect(threeSum([0, 0, 0])).toEqual([[0, 0, 0]]);
  });

  test("example 4", () => {
    expect(threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4])).toEqual([
      [-4, 0, 4],
      [-4, 1, 3],
      [-3, -1, 4],
      [-3, 0, 3],
      [-3, 1, 2],
      [-2, -1, 3],
      [-2, 0, 2],
      [-1, -1, 2],
      [-1, 0, 1],
    ]);
  });
});
