import { describe, expect, test } from "bun:test";
import { searchRange } from "../../src/medium/find-first-and-last-position-of-element-in-sorted-array";

describe("Find First and Last Position of Element in Sorted Array", () => {
  test("example 1", () => {
    expect(searchRange([5, 7, 7, 8, 8, 10], 8)).toEqual([3, 4]);
  });

  test("example 2", () => {
    expect(searchRange([5, 7, 7, 8, 8, 10], 6)).toEqual([-1, -1]);
  });

  test("example 3", () => {
    expect(searchRange([], 0)).toEqual([-1, -1]);
  });

  test("example 4", () => {
    expect(searchRange([2, 2], 2)).toEqual([0, 1]);
  });
});
