import { describe, expect, test } from "bun:test";
import { climbStairs } from "../../src/easy/climbing-stairs";

describe("Climbing Stairs", () => {
  test("example 1", () => {
    expect(climbStairs(2)).toBe(2);
  });

  test("example 2", () => {
    expect(climbStairs(3)).toBe(3);
  });
});
