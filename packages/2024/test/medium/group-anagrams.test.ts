import { describe, expect, test } from "bun:test";
import { groupAnagrams } from "../../src/medium/group-anagrams";

describe("Group Anagrams", () => {
  test("example 1", () => {
    expect(
      groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
        .map((item) => item.toSorted())
        .toSorted(),
    ).toContainAllValues([["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]);
  });

  test("example 2", () => {
    expect(groupAnagrams([""])).toContainAllValues([[""]]);
  });

  test("example 3", () => {
    expect(groupAnagrams(["a"])).toContainAllValues([["a"]]);
  });
});
