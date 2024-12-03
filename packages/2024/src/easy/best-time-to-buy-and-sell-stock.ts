export function maxProfit(prices: number[]): number {
  let min = prices[0];
  return prices.reduce((best, value) => {
    min = Math.min(value, min);
    return Math.max(best, value - min);
  }, 0);
}
