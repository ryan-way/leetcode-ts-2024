import { describe, expect, test } from "bun:test";
import { countBits } from "../../src/easy/counting-bits";

describe("Counting Bits", () => {
  test("example 1", () => {
    expect(countBits(2)).toEqual([0, 1, 1]);
  });

  test("example 2", () => {
    expect(countBits(5)).toEqual([0, 1, 1, 2, 1, 2]);
  });
});
