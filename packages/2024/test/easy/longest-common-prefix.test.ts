import { describe, expect, test } from "bun:test";
import { longestCommonPrefix } from "../../src/easy/longest-common-prefix";

describe("Longest Common Prefix", () => {
  test("example 1", () => {
    expect(longestCommonPrefix(["flower", "flow", "flight"])).toBe("fl");
  });

  test("example 2", () => {
    expect(longestCommonPrefix(["dog", "racecar", "car"])).toBe("");
  });

  test("example 3", () => {
    expect(longestCommonPrefix(["ab", "a"])).toBe("a");
  });
});
