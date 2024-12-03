/*
N = 0
starting position

N = 1
start + taking 1 step
1

N = 2
start + 2 step
start + 1 step + 1 step
2

N = 3
(N = 1 solution) + (N = 2  solution)
3

N = 4
3 + 2 = 5

N = 5
5 + 3 = 8

N = 6
8 + 5 = 13

Where K is the number of steps,
the distinct ways you can get to the top D is:
when F(1), D = 1
when F(2), D = 2
else D = F(K-1) + F(K-2)
*/

export function climbStairs(n: number): number {
  const lookup = [1, 2];

  for (let i = 2; i < n; i++) {
    lookup.push(lookup[i - 1] + lookup[i - 2]);
  }
  return lookup[n - 1];
}
