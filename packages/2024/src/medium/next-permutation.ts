/**
 Do not return anything, modify nums in-place instead.
 */

/*
 [1, 4, 3, 2]
 [2, 1, 3, 4]
 */
export function nextPermutation(nums: number[]): void {
  let last = nums.length - 1;

  while (last !== 0 && nums[last] <= nums[last - 1]) {
    last--;
  }

  if (last > 0) {
    let nextHighest = nums.length - 1;

    while (nextHighest !== last && nums[nextHighest] <= nums[last - 1]) {
      nextHighest--;
    }

    const temp = nums[last - 1];
    nums[last - 1] = nums[nextHighest];
    nums[nextHighest] = temp;
  }

  for (let i = 0; i < Math.floor((nums.length - last) / 2); i++) {
    const temp = nums[last + i];
    nums[last + i] = nums[nums.length - 1 - i];
    nums[nums.length - 1 - i] = temp;
  }
}
