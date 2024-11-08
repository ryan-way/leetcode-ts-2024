import { describe, expect, test } from "bun:test";
import { letterCombinations } from "../../src/medium/letter-combinations-of-a-phone-number";

describe("Letter Combinations of a Phone Number", () => {
  test("example 1", () => {
    expect(letterCombinations("23").toSorted()).toContainAllValues([
      "ad",
      "ae",
      "af",
      "bd",
      "be",
      "bf",
      "cd",
      "ce",
      "cf",
    ]);
  });

  test("example 2", () => {
    expect(letterCombinations("")).toEqual([]);
  });

  test("example 3", () => {
    expect(letterCombinations("2")).toEqual(["a", "b", "c"]);
  });
});
