export function isValid(s: string): boolean {
  const opennings = ["(", "{", "["];
  function match(o: string, c: string) {
    return (
      (o === "(" && c === ")") ||
      (o === "{" && c === "}") ||
      (o === "[" && c === "]")
    );
  }
  const stack: string[] = [];

  for (const value of s.split("")) {
    if (opennings.includes(value)) {
      stack.push(value);
    } else if (stack.length === 0 || !match(stack[stack.length - 1], value)) {
      return false;
    } else {
      stack.pop();
    }
  }
  return stack.length === 0;
}
