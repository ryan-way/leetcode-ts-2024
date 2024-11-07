import { describe, expect, test } from "bun:test";
import { intToRoman } from "../../src/medium/integer-to-roman";

describe("Integer to Roman", () => {
  test("example 1", () => {
    expect(intToRoman(3749)).toBe("MMMDCCXLIX");
  });

  test("example 2", () => {
    expect(intToRoman(58)).toBe("LVIII");
  });

  test("example 3", () => {
    expect(intToRoman(1994)).toBe("MCMXCIV");
  });
});
