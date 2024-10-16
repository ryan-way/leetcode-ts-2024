/*
What needs to be calculated?
find max area between two indices

What is needed to calculate this?
The max area for each index can be used caculate the max for all

How can we calculate the max for each index?
Calculate the area of the evaluating index with every other index

Or if we start with maximized distance, once we find an index with a larger value thatn the current,
we can skip evaluating the rest of the indexes
*/

export function maxArea(height: number[]): number {
  let first = 0;
  let last = height.length - 1;
  let max = 0;

  while (first < last) {
    const currHeight = Math.min(height[first], height[last]);
    const currArea = currHeight * (last - first);
    max = Math.max(max, currArea);

    if (height[first] < height[last]) {
      first++;
    } else {
      last--;
    }
  }
  return max;
}
