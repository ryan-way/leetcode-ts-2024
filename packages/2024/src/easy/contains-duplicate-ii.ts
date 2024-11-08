export function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const set = new Set();
  let start = 0;

  for (const num of nums) {
    if (set.has(num)) return true;
    set.add(num);
    if (set.size > k) {
      set.delete(nums[start]);
      start++;
    }
  }
  return false;
}
