import { describe, expect, test } from "bun:test";
import { maxArea } from "../../src/medium/container-with-most-water";

describe("Container With Most Water", () => {
  test("example 1", () => {
    expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
  });

  test("example 2", () => {
    expect(maxArea([1, 1])).toBe(1);
  });
});
