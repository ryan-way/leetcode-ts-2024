import { describe, expect, test } from "bun:test";
import { romanToInt } from "../../src/easy/roman-to-integer";

describe("Roman to Integer", () => {
  test("example 1", () => {
    expect(romanToInt("III")).toBe(3);
  });

  test("example 2", () => {
    expect(romanToInt("LVIII")).toBe(58);
  });

  test("example 3", () => {
    expect(romanToInt("MCMXCIV")).toBe(1994);
  });
});
