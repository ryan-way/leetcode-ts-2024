export function removeElement(nums: number[], val: number): number {
  let first = 0;

  for (let second = 0; second < nums.length; second++) {
    if (nums[second] === val) {
      continue;
    }

    nums[first] = nums[second];
    first++;
  }

  return first;
}
