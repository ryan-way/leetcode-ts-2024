/*
What needs to be calculated?
All triplets from list whose sum equals 0,
must not include duplicates

How is this calculated?

for each starting index a,
 for each starting index b,
  for each starting index c,
   if the sum of each index is 0, add to the list

This gives O(n^3) because each loop will scan the entire list

If a hashmap is used, then the loops for b and c can be combined.
While scanning with b, we insert each iteration in the hashmap, and check later iterations for the compliment

De-duplication will still need to be handled

alternatively, we can sort the array, and have each loop skip duplicate elements

This would not require any additional space, and would keep the runtime at O(n^2)
*/

export function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result = [];

  for (let a = 0; a < nums.length; a++) {
    if (a !== 0 && nums[a] === nums[a - 1]) {
      continue;
    }
    let b = a + 1;
    let c = nums.length - 1;
    while (b < c) {
      if (b !== a + 1 && nums[b] === nums[b - 1]) {
        b++;
      } else if (c !== nums.length - 1 && nums[c] === nums[c + 1]) {
        c--;
      } else if (nums[a] + nums[b] + nums[c] === 0) {
        result.push([nums[a], nums[b], nums[c]]);
        b++;
      } else if (nums[a] + nums[b] + nums[c] > 0) {
        c--;
      } else if (nums[a] + nums[b] + nums[c] < 0) {
        b++;
      }
    }
  }
  return result;
}
