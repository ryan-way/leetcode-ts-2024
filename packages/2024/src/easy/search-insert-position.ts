export function searchInsert(nums: number[], target: number): number {
  let start = 0;
  let end = nums.length - 1;

  while (start < end) {
    const mid = Math.floor((end + start) / 2);
    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return nums[start] >= target ? start : start + 1;
}
