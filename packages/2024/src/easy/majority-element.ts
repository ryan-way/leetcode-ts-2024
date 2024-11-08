export function majorityElement(nums: number[]): number {
  let count = 0;
  let value = nums[0];

  for (const num of nums) {
    if (num === value) {
      count++;
    } else {
      count--;
    }

    if (count === 0) {
      value = num;
      count = 1;
    }
  }
  return value;
}
