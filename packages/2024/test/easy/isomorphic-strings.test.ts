import { describe, expect, test } from "bun:test";
import { isIsomorphic } from "../../src/easy/isomorphic-strings";

describe("Isomorphic Strings", () => {
  test("example 1", () => {
    expect(isIsomorphic("egg", "add")).toBeTrue();
  });

  test("example 2", () => {
    expect(isIsomorphic("foo", "bar")).toBeFalse();
  });

  test("example 3", () => {
    expect(isIsomorphic("paper", "title")).toBeTrue();
  });
});
