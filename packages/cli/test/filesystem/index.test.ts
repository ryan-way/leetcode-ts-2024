import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  mock,
  spyOn,
  test,
} from "bun:test";
import type { BunFile } from "bun";
import { FileSystem, ProblemWorkspace } from "../../src/filesystem";
import { type Question, Type } from "../../src/leetcodeclient";

describe("When file system is initialized", () => {
  test("should throw if package.json does not exist", async () => {
    mock.module("path", () => {
      return {
        resolve: mock(() => "/root"),
      };
    });
    spyOn(Bun, "file")
      .mockReset()
      .mockReturnValue({
        exists: mock(),
      } as unknown as BunFile);
    expect(FileSystem.initialize(".")).rejects.toMatchObject({
      message: "Could not find root directory from: /root",
    });
  });

  test("should throw if src directory does not exist", async () => {
    mock.module("path", () => {
      return {
        resolve: mock(() => "/root"),
      };
    });
    spyOn(Bun, "file")
      .mockReset()
      .mockReturnValue({
        exists: mock(() => Promise.resolve(true)),
      } as unknown as BunFile);

    mock.module("node:fs/promises", () => {
      return {
        exists: mock(),
      };
    });
    expect(FileSystem.initialize(".")).rejects.toMatchObject({
      message: "Directory does not exist: /root/src",
    });
  });

  test("should throw if test directory does not exist", async () => {
    mock.module("path", () => {
      return {
        resolve: mock(() => "/root"),
      };
    });
    spyOn(Bun, "file")
      .mockReset()
      .mockReturnValue({
        exists: mock(() => Promise.resolve(true)),
      } as unknown as BunFile);

    mock.module("node:fs/promises", () => {
      return {
        exists: mock().mockImplementationOnce(() => Promise.resolve(true)),
      };
    });
    expect(FileSystem.initialize(".")).rejects.toMatchObject({
      message: "Directory does not exist: /root/test",
    });
  });

  test("should initialize with current directory if it is root", async () => {
    mock.module("path", () => {
      return {
        resolve: mock(() => "/root"),
      };
    });
    spyOn(Bun, "file")
      .mockReset()
      .mockReturnValue({
        exists: mock(() => Promise.resolve(true)),
      } as unknown as BunFile);

    mock.module("node:fs/promises", () => {
      return {
        exists: mock(() => Promise.resolve(true)),
      };
    });

    const fileSystem = await FileSystem.initialize("");
    expect(fileSystem.sourceDirectory).toBe("/root/src");
    expect(fileSystem.testDirectory).toBe("/root/test");
  });

  test("should initialize with parent directory if it is root", async () => {
    mock.module("path", () => {
      return {
        resolve: mock(() => "/root"),
      };
    });
    spyOn(Bun, "file")
      .mockReset()
      .mockReturnValue({
        exists: mock()
          .mockImplementationOnce(() => Promise.resolve(false))
          .mockImplementationOnce(() => Promise.resolve(true)),
      } as unknown as BunFile);

    mock.module("node:fs/promises", () => {
      return {
        exists: mock(() => Promise.resolve(true)),
      };
    });

    const fileSystem = await FileSystem.initialize("");
    expect(fileSystem.sourceDirectory).toBe("/src");
    expect(fileSystem.testDirectory).toBe("/test");
  });

  test("should create problem workspace correctly", async () => {
    mock.module("path", () => {
      return {
        resolve: mock(() => "/root"),
      };
    });
    spyOn(Bun, "file")
      .mockReset()
      .mockReturnValue({
        exists: mock().mockImplementation(() => Promise.resolve(true)),
        mkdir: mock(),
      } as unknown as BunFile);

    mock.module("node:fs/promises", () => {
      return {
        exists: mock(() => Promise.resolve(true)),
      };
    });
    const fileSystem = await FileSystem.initialize(".");

    const question: Question = {
      categoryTitle: "test-category",
      codeSnippet: "test snippet",
      content: "test content",
      difficulty: "easy",
      exampleTestcaseList: [],
      metaData: {
        name: "test meta data name",
        params: [],
        return: Type.INTEGER,
      },
      questionId: "test-question",
      title: "test-title",
      titleSlug: "test-slug",
    };

    const problemWorkspace = await fileSystem.createProblemWorkspace(question);

    expect(problemWorkspace.srcFile).toBe("/root/src/easy/test-slug.ts");
    expect(problemWorkspace.testFile).toBe("/root/test/easy/test-slug.test.ts");
  });
});

describe("Problem workspace", () => {
  test("should create source file correctly", async () => {
    const mock = spyOn(Bun, "write")
      .mockReset()
      .mockImplementation(() => Promise.resolve(0));
    const question: Question = {
      categoryTitle: "test-category",
      codeSnippet: "function test snippet",
      content: "test content",
      difficulty: "easy",
      exampleTestcaseList: [],
      metaData: {
        name: "test meta data name",
        params: [],
        return: Type.INTEGER,
      },
      questionId: "test-question",
      title: "test-title",
      titleSlug: "test-slug",
    };
    const problemWorkspace = new ProblemWorkspace(
      "testFile",
      "srcFile",
      question,
    );

    await problemWorkspace.writeSourceFileContents();

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith("srcFile", "export function test snippet");
  });
  test("should create test file correctly", async () => {
    const mock = spyOn(Bun, "write")
      .mockReset()
      .mockImplementation(() => Promise.resolve(0));
    const question: Question = {
      categoryTitle: "test-category",
      codeSnippet: "function test snippet",
      content: "test content",
      difficulty: "easy",
      exampleTestcaseList: [{ input: "test input 1", output: "test output 1" }],
      metaData: {
        name: "test meta data name",
        params: [],
        return: Type.INTEGER,
      },
      questionId: "test-question",
      title: "test-title",
      titleSlug: "test-slug",
    };
    const problemWorkspace = new ProblemWorkspace(
      "testFile",
      "srcFile",
      question,
    );

    await problemWorkspace.writeTestFileContents();

    expect(mock).toBeCalledTimes(1);
  });
});
