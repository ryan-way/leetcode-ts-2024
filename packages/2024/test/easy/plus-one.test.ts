import { describe, expect, test } from "bun:test";
import { plusOne } from "../../src/easy/plus-one";

describe("Plus One", () => {
  test("example 1", () => {
    expect(plusOne([1, 2, 3])).toEqual([1, 2, 4]);
  });

  test("example 2", () => {
    expect(plusOne([4, 3, 2, 1])).toEqual([4, 3, 2, 2]);
  });

  test("example 3", () => {
    expect(plusOne([9])).toEqual([1, 0]);
  });
});
