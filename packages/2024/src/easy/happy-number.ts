export function isHappy(n: number): boolean {
  let temp = n;
  const set = new Set<number>();

  while (!set.has(temp) && temp !== 1) {
    set.add(temp);
    let sum = 0;
    while (temp > 0) {
      sum += (temp % 10) ** 2;
      temp = Math.floor(temp / 10);
    }

    temp = sum;
  }
  return temp === 1;
}
