import { describe, expect, test } from "bun:test";
import { lengthOfLastWord } from "../../src/easy/length-of-last-word";

describe("Length of Last Word", () => {
  test("example 1", () => {
    expect(lengthOfLastWord("Hello World")).toBe(5);
  });

  test("example 2", () => {
    expect(lengthOfLastWord("   fly me   to   the moon  ")).toBe(4);
  });

  test("example 3", () => {
    expect(lengthOfLastWord("luffy is still joyboy")).toBe(6);
  });

  test("example 4", () => {
    expect(lengthOfLastWord("     ")).toBe(0);
  });
});
