import { describe, expect, test } from "bun:test";
import {
  longestPalidromeDp,
  longestPalidromeMemo,
  longestPalindromeScan,
} from "../../src/medium/longest-palindromic-substring";

describe("Longest Palindromic Substring Scan", () => {
  test("example 1", () => {
    expect(longestPalindromeScan("babad")).toBeOneOf(["bab", "aba"]);
  });

  test("example 2", () => {
    expect(longestPalindromeScan("cbbd")).toBe("bb");
  });

  test("example 3", () => {
    expect(longestPalindromeScan("abba")).toBe("abba");
  });
});

describe("Longest Palindromic Substring Dp", () => {
  test("example 1", () => {
    expect(longestPalidromeDp("babad")).toBeOneOf(["bab", "aba"]);
  });

  test("example 2", () => {
    expect(longestPalidromeDp("cbbd")).toBe("bb");
  });

  test("example 3", () => {
    expect(longestPalidromeDp("abba")).toBe("abba");
  });
});

describe("Longest Palindromic Substring memo", () => {
  test("example 1", () => {
    expect(longestPalidromeMemo("babad")).toBeOneOf(["bab", "aba"]);
  });

  test("example 2", () => {
    expect(longestPalidromeMemo("cbbd")).toBe("bb");
  });

  test("example 3", () => {
    expect(longestPalidromeMemo("abba")).toBe("abba");
  });
});
