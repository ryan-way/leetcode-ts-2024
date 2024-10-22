import { describe, expect, test } from "bun:test";
import { isValid } from "../../src/easy/valid-parentheses";

describe("Valid Parentheses", () => {
  test("example 1", () => {
    expect(isValid("()")).toBe(true);
  });

  test("example 2", () => {
    expect(isValid("()[]{}")).toBe(true);
  });

  test("example 3", () => {
    expect(isValid("(]")).toBe(false);
  });

  test("example 4", () => {
    expect(isValid("([])")).toBe(true);
  });
});
