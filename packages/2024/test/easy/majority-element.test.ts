import { describe, expect, test } from "bun:test";
import { majorityElement } from "../../src/easy/majority-element";

describe("Majority Element", () => {
  test("example 1", () => {
    expect(majorityElement([3, 2, 3])).toBe(3);
  });

  test("example 2", () => {
    expect(majorityElement([2, 2, 1, 1, 1, 2, 2])).toBe(2);
  });
});
