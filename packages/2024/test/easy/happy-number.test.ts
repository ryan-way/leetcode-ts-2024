import { describe, expect, test } from "bun:test";
import { isHappy } from "../../src/easy/happy-number";

describe("Happy Number", () => {
  test("example 1", () => {
    expect(isHappy(19)).toBeTrue();
  });

  test("example 2", () => {
    expect(isHappy(2)).toBeFalse();
  });
});
