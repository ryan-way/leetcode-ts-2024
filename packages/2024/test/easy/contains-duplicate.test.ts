import { describe, expect, test } from "bun:test";
import { containsDuplicate } from "../../src/easy/contains-duplicate";

describe("Contains Duplicate", () => {
  test("example 1", () => {
    expect(containsDuplicate([1, 2, 3, 1])).toBeTrue();
  });

  test("example 2", () => {
    expect(containsDuplicate([1, 2, 3, 4])).toBeFalse();
  });

  test("example 3", () => {
    expect(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])).toBeTrue();
  });
});
