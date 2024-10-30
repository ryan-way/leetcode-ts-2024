export function longestPalindromeScan(s: string): string {
  let best = "";

  for (let start = 0; start < s.length; start++) {
    let curr = longestPalindromeFrom(s, start, start);

    if (curr.length > best.length) {
      best = curr;
    }

    curr = longestPalindromeFrom(s, start, start + 1);

    if (curr.length > best.length) {
      best = curr;
    }
  }
  return best;
}

function longestPalindromeFrom(s: string, start: number, end: number): string {
  if (s[start] !== s[end]) return "";
  let offset = 0;

  while (start - offset >= 0 && end + offset < s.length) {
    if (s[start - offset] !== s[end + offset]) {
      break;
    }
    offset++;
  }

  return s.slice(start - offset + 1, end + offset);
}

export function longestPalidromeDp(s: string): string {
  const dp: boolean[][] = [];
  for (let i = 0; i < s.length; i++) {
    const curr = [];

    for (let j = 0; j < s.length; j++) {
      curr.push(false);
    }

    dp.push(curr);
  }

  let best = "";

  for (let i = 0; i < s.length; i++) {
    for (let j = 0; i + j < s.length; j++) {
      if (i === 0) {
        dp[j][i + j] = true;
      } else if (i === 1) {
        dp[j][i + j] = s[j] === s[i + j];
      } else {
        dp[j][i + j] = s[j] === s[i + j] && dp[j + 1][i + j - 1];
      }

      if (dp[j][i + j]) {
        best = s.slice(j, i + j + 1);
      }
    }
  }
  return best;
}

export function longestPalidromeMemo(s: string): string {
  const memo = new Map<number, boolean>();

  let best = "";

  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      if (isPalindrome(s, i, j, memo) && j - i + 1 > best.length) {
        best = s.slice(i, j + 1);
      }
    }
  }

  return best;
}

function isPalindrome(
  s: string,
  start: number,
  end: number,
  memo: Map<number, boolean>,
): boolean {
  if (start === end) return true;
  if (start === end - 1) return s[start] === s[end];

  const cache = memo.get(encode(start, end));

  if (cache !== undefined) {
    return cache;
  }

  if (s[start] !== s[end]) {
    memo.set(encode(start, end), false);
    return false;
  }

  const result = isPalindrome(s, start + 1, end - 1, memo);

  memo.set(encode(start, end), result);

  return result;
}

function encode(start: number, end: number): number {
  return start * 10000 + end;
}
