/*
Understand the problem:
Find two elements that add up to target and return their indexes

Solution:
For each element, we need to be able to determine if its compliment exists the array

This can be done by scanning through the array for each element, which would take up O(n).
The full solution would then take O(n^2)

Alternatively,
we can keep a hash table of previous elements that map to the index,
and reduce the time to O(1), and incrase space to O(n). The full runtime would then be O(n)
*/

export function twoSum(nums: number[], target: number): number[] {
  const map: Map<number, number> = new Map();

  for (let idx = 0; idx < nums.length; idx++) {
    const compliment = map.get(target - nums[idx]);
    if (compliment !== undefined) {
      return [compliment, idx];
    }

    map.set(nums[idx], idx);
  }

  // Error state
  return [0, 0];
}
