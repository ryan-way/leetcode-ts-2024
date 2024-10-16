import { describe, expect, test } from "bun:test";
import { removeDuplicates } from "../../src/easy/remove-duplicates-from-sorted-array";

describe("Test Remove Duplicates from Sorted Array", () => {
  test("Example 1", () => {
    const nums = [1, 1, 2];
    expect(removeDuplicates(nums)).toBe(2);
    expect(nums.slice(0, 2)).toEqual([1, 2]);
  });

  test("Example 2", () => {
    const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
    expect(removeDuplicates(nums)).toBe(5);
    expect(nums.slice(0, 5)).toEqual([0, 1, 2, 3, 4]);
  });

  test("Example 3", () => {
    const nums = [1];
    expect(removeDuplicates(nums)).toBe(1);
    expect(nums).toEqual([1]);
  });

  test("Example 4", () => {
    const nums = [1, 2, 3, 4];
    expect(removeDuplicates(nums)).toBe(4);
    expect(nums).toEqual([1, 2, 3, 4]);
  });
});
