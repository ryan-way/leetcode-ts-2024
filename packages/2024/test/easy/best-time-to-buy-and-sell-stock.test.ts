import { describe, expect, test } from "bun:test";
import { maxProfit } from "../../src/easy/best-time-to-buy-and-sell-stock";

describe("Best Time to Buy and Sell Stock", () => {
  test("example 1", () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
  });

  test("example 2", () => {
    expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
  });
});
