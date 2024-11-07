import { describe, expect, test } from "bun:test";
import { myAtoi } from "../../src/medium/string-to-integer-atoi";

describe("String to Integer (atoi)", () => {
  test("example 1", () => {
    expect(myAtoi("42")).toBe(42);
  });

  test("example 2", () => {
    expect(myAtoi(" -042")).toBe(-42);
  });

  test("example 3", () => {
    expect(myAtoi("1337c0d3")).toBe(1337);
  });

  test("example 4", () => {
    expect(myAtoi("0-1")).toBe(0);
  });

  test("example 5", () => {
    expect(myAtoi("words and 987")).toBe(0);
  });

  test("example 5", () => {
    expect(myAtoi("-91283472332")).toBe(-2147483648);
  });
});
