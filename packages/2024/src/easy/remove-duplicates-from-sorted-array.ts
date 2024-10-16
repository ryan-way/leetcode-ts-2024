/*
What needs to be computed?
- The number of unique numbers
- parameters needs to be updated inplace with non repeating numbers

How can this be computed?
- Can be computed by creating a 
*/

export function removeDuplicates(nums: number[]): number {
  let first = 1;
  for (let second = 1; second < nums.length; second++) {
    if (nums[second] === nums[second - 1]) {
      continue;
    }

    nums[first] = nums[second];
    first++;
  }
  return first;
}
