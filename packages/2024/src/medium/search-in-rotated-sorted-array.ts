// S -> R -> M -> E
// S -> T -> R -> M -> E === Move End, mid < start < target
// S -> R -> T -> M -> E === Move End, target < mid < start
// S -> R -> M -> T -> E === Move Start, mid < target < start
// S -> M -> R -> E
// S -> T -> M -> R -> E === Move End, start < target < mid
// S -> M -> T -> R -> E === Move Start, start < mid < target
// S -> M -> R -> T -> E === Move Start, target < start < mid

export function search(nums: number[], target: number): number {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = Math.floor((end + start) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[start] <= target && target < nums[mid]) {
      end = mid - 1;
    } else if (nums[start] <= nums[mid]) {
      start = mid + 1;
    } else if (nums[mid] < target && target <= nums[end]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return -1;
}
