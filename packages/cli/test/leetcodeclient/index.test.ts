import { beforeAll, beforeEach, describe, expect, mock, test } from "bun:test";
import { LeetcodeClient, Type } from "../../src/leetcodeclient";
import type { Client } from "../../src/leetcodeclient/client";
import { logger } from "../../src/util";

describe("Leetcode Client", () => {
	let client: LeetcodeClient;

	beforeAll(() => {
		logger.settings.minLevel = 10;
	})

	describe("on receiving valid question response", () => {
		beforeEach(() => {
			const mockClient: Client = {
				queryQuestion: (titleSlug: string) => {
					return Promise.resolve({
						error: undefined,
						data: {
							question: {
								questionId: "1",
								title: "Two Sum",
								titleSlug: "two-sum",
								difficulty: "Easy",
								categoryTitle: "Algorithms",
								codeSnippets: [
									{
										langSlug: "typescript",
										code: "",
									}
								],
								content:
									'<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>\n\n<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>\n\n<p>You can return the answer in any order.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,7,11,15], target = 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,4], target = 6\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,3], target = 6\n<strong>Output:</strong> [0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><strong>Only one valid answer exists.</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code><font face="monospace">&nbsp;</font>time complexity?',
								exampleTestcaseList: [
									"[2,7,11,15]\n9",
									"[3,2,4]\n6",
									"[3,3]\n6",
								],
								metaData:
									'{\n  "name": "twoSum",\n  "params": [\n    {\n      "name": "nums",\n      "type": "integer[]"\n    },\n    {\n      "name": "target",\n      "type": "integer"\n    }\n  ],\n  "return": {\n    "type": "integer[]",\n    "size": 2\n  },\n  "manual": false\n}',
							},
						},
					});
				},
			};
			client = new LeetcodeClient(mockClient);
		});

		test("should properly map test cases", async () => {
			const question = await client.getQuestion("two-sum");
			const testcaseList = question.exampleTestcaseList;
			expect(testcaseList).not.toBeNull();
			expect(testcaseList.length).toBe(3);
			expect(
				testcaseList.every((testcase) => testcase.input.length === 2),
			).toBeTruthy();
		});

		test("should properly map meta data", async () => {
			const question = await client.getQuestion("two-sum");
			const metaData = question.metaData;

			expect(metaData).not.toBeNull();
			expect(metaData.name).toBe("twoSum");
			expect(metaData.return).toBe(Type.INTEGER_ARRAY);
			expect(metaData.params.length).toBe(2);
			expect(metaData.params[0].name).toBe("nums");
			expect(metaData.params[0].type).toBe(Type.INTEGER_ARRAY);
			expect(metaData.params[1].name).toBe("target");
			expect(metaData.params[1].type).toBe(Type.INTEGER);
		});
	});

	describe("on empty data", () => {
		beforeEach(() => {
			const mockClient: Client = {
				queryQuestion: (titleSlug: string) => {
					return Promise.resolve({
						error: undefined,
						data: undefined,
					});
				},
			};
			client = new LeetcodeClient(mockClient);
		});

		test("should throw error", () => {
			expect(client.getQuestion("two-sum")).rejects.toMatchObject({
				message: "Get Question Query empty data",
			});
		});
	});

	describe("on error", () => {
		beforeEach(() => {
			const mockClient: Client = {
				queryQuestion: (titleSlug: string) => {
					return Promise.resolve({
						error: {
							name: "test",
							message: "test error message",
							graphQLErrors: [],
						},
						data: undefined,
					});
				},
			};
			client = new LeetcodeClient(mockClient);
		});

		test("should throw error", async () => {
			expect(client.getQuestion("two-sum")).rejects.not.toBeNull();
		});
	});
});
