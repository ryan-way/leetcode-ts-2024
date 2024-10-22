import { describe, expect, test } from "bun:test";
import { strStr } from "../../src/easy/find-the-index-of-the-first-occurrence-in-a-string";

describe("Find the Index of the First Occurrence in a String", () => {
  test("example 1", () => {
    expect(strStr("sadbutsad", "sad")).toBe(0);
  });

  test("example 2", () => {
    expect(strStr("leetcode", "leeto")).toBe(-1);
  });
});
