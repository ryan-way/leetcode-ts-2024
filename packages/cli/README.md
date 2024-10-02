endpoint: `https://leetcode.com/graphql/`
method: POST

headers:
- Content-Type: application/json

# Queries
```graphql
# query
{
  "query": "\n    query questionTitle($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    title\n    titleSlug\n    isPaidOnly\n    difficulty\n    likes\n    dislikes\n    categoryTitle\n  }\n}\n    ",
  "variables": {
    "titleSlug": "two-sum"
  },
  "operationName": "questionTitle"
}
# response
{
  "data": {
    "question": {
      "questionId": "1",
      "questionFrontendId": "1",
      "title": "Two Sum",
      "titleSlug": "two-sum",
      "isPaidOnly": false,
      "difficulty": "Easy",
      "likes": 58240,
      "dislikes": 2065,
      "categoryTitle": "Algorithms"
    }
  }
}

# query
{
  "query": "\n    query questionContent($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    content\n    mysqlSchemas\n    dataSchemas\n  }\n}\n    ",
  "variables": {
    "titleSlug": "two-sum"
  },
  "operationName": "questionContent"
}
# response
{
    "data": {
        "question": {
            "content": "<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>\n\n<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>\n\n<p>You can return the answer in any order.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,7,11,15], target = 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,4], target = 6\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,3], target = 6\n<strong>Output:</strong> [0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><strong>Only one valid answer exists.</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code><font face=\"monospace\">&nbsp;</font>time complexity?",
            "mysqlSchemas": [],
            "dataSchemas": []
        }
    }
}

# query
{
  "query": "\n    query consolePanelConfig($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    questionTitle\n    enableDebugger\n    enableRunCode\n    enableSubmit\n    enableTestMode\n    exampleTestcaseList\n    metaData\n  }\n}\n    ",
  "variables": {
    "titleSlug": "two-sum"
  },
  "operationName": "consolePanelConfig"
}

# response
{
  "data": {
    "question": {
      "questionId": "1",
      "questionFrontendId": "1",
      "questionTitle": "Two Sum",
      "enableDebugger": true,
      "enableRunCode": true,
      "enableSubmit": true,
      "enableTestMode": false,
      "exampleTestcaseList": [
        "[2,7,11,15]\n9",
        "[3,2,4]\n6",
        "[3,3]\n6"
      ],
      "metaData": "{\n  \"name\": \"twoSum\",\n  \"params\": [\n    {\n      \"name\": \"nums\",\n      \"type\": \"integer[]\"\n    },\n    {\n      \"name\": \"target\",\n      \"type\": \"integer\"\n    }\n  ],\n  \"return\": {\n    \"type\": \"integer[]\",\n    \"size\": 2\n  },\n  \"manual\": false\n}"
    }
  }
}
```