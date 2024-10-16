export function plusOne(digits: number[]): number[] {
  digits.reverse();

  let carry = 1;
  let curr = 0;

  while (carry !== 0 && curr < digits.length) {
    digits[curr] += carry;
    carry = Math.floor(digits[curr] / 10);
    digits[curr] = digits[curr] % 10;
    curr++;
  }

  if (carry) {
    digits.push(carry);
  }

  digits.reverse();
  return digits;
}
