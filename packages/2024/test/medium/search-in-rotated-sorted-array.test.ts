import { describe, expect, test } from "bun:test";
import { search } from "../../src/medium/search-in-rotated-sorted-array";

describe("Search in Rotated Sorted Array", () => {
  test("example 1", () => {
    expect(search([4, 5, 6, 7, 0, 1, 2], 0)).toBe(4);
  });

  test("example 2", () => {
    expect(search([4, 5, 6, 7, 0, 1, 2], 3)).toBe(-1);
  });

  test("example 3", () => {
    expect(search([1], 0)).toBe(-1);
  });

  test("example 4", () => {
    expect(search([4, 5, 6, 7, 0, 1, 2], 4)).toBe(0);
  });

  test("example 5", () => {
    expect(search([4, 5, 6, 7, 0, 1, 2], 6)).toBe(2);
  });

  test("example 6", () => {
    expect(search([4, 5, 6, 7, 0, 1, 2], 7)).toBe(3);
  });

  test("example 7", () => {
    expect(search([4, 5, 6, 7, 0, 1, 2], 2)).toBe(6);
  });

  test("example 8", () => {
    expect(search([3, 1], 1)).toBe(1);
  });

  test("example 9", () => {
    expect(search([4, 5, 7, 0, 1, 2, 3], 1)).toBe(4);
  });
});
