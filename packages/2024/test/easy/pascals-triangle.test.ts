import { describe, expect, test } from "bun:test";
import { generate } from "../../src/easy/pascals-triangle";

describe("Pascal's Triangle", () => {
  test("example 1", () => {
    expect(generate(5)).toEqual([
      [1],
      [1, 1],
      [1, 2, 1],
      [1, 3, 3, 1],
      [1, 4, 6, 4, 1],
    ]);
  });

  test("example 2", () => {
    expect(generate(1)).toEqual([[1]]);
  });
});
