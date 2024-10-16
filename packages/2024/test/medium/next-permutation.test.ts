import { describe, expect, test } from "bun:test";
import { nextPermutation } from "../../src/medium/next-permutation";

describe("Next Permutation", () => {
  test("example 1", () => {
    const nums = [1, 2, 3];
    nextPermutation(nums);
    expect(nums).toEqual([1, 3, 2]);
  });

  test("example 2", () => {
    const nums = [3, 2, 1];
    nextPermutation(nums);
    expect(nums).toEqual([1, 2, 3]);
  });

  test("example 3", () => {
    const nums = [1, 1, 5];
    nextPermutation(nums);
    expect(nums).toEqual([1, 5, 1]);
  });

  test("example 4", () => {
    const nums = [5, 4, 7, 5, 3, 2];
    nextPermutation(nums);
    expect(nums).toEqual([5, 5, 2, 3, 4, 7]);
  });
});
