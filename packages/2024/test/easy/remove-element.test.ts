import { describe, expect, test } from "bun:test";
import { removeElement } from "../../src/easy/remove-element";
import { matchOccurences } from "../helpers";

describe("Remove Element", () => {
  test("example 1", () => {
    const nums = [3, 2, 2, 3];
    expect(removeElement(nums, 3)).toBe(2);
    matchOccurences(nums.slice(0, 2), [2, 2]);
  });
  test("example 2", () => {
    const nums = [0, 1, 2, 2, 3, 0, 4, 2];
    expect(removeElement(nums, 2)).toBe(5);
    matchOccurences(nums.slice(0, 5), [0, 1, 4, 0, 3]);
  });
});
