import { describe, expect, test } from "bun:test";
import { convert } from "../../src/medium/zigzag-conversion";

describe("Zigzag Conversion", () => {
  test("example 1", () => {
    expect(convert("PAYPALISHIRING", 3)).toBe("PAHNAPLSIIGYIR");
  });

  test("example 2", () => {
    expect(convert("PAYPALISHIRING", 4)).toBe("PINALSIGYAHRPI");
  });

  test("example 3", () => {
    expect(convert("A", 1)).toBe("A");
  });

  test("example 3", () => {
    expect(convert("PAYPALISHIRING", 1)).toBe("PAYPALISHIRING");
  });
});
