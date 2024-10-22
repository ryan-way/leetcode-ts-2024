function rangeStart(nums: number[], target: number): number {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = Math.floor((end + start) / 2);

    if (nums[mid] < target) {
      start = mid + 1;
    } else if (nums[mid] > target) {
      end = mid - 1;
    } else if (mid === 0 || nums[mid - 1] !== target) {
      return mid;
    } else {
      end = mid - 1;
    }
  }

  return -1;
}

function rangeEnd(nums: number[], target: number): number {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = Math.floor((end + start) / 2);

    if (nums[mid] < target) {
      start = mid + 1;
    } else if (nums[mid] > target) {
      end = mid - 1;
    } else if (mid === nums.length - 1 || nums[mid + 1] !== target) {
      return mid;
    } else {
      start = mid + 1;
    }
  }

  return -1;
}

export function searchRange(nums: number[], target: number): number[] {
  const start = rangeStart(nums, target);

  if (start === -1) {
    return [-1, -1];
  }

  const end = rangeEnd(nums, target);
  return [start, end];
}
