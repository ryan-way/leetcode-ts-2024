import { exists, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { CliError } from "../error";
import type { Question } from "../leetcodeclient";
import { logger } from "../util";

export enum Difficulty {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}

export class FileSystemError extends CliError {}

const log = logger.getSubLogger({ name: "FileSystem" });

export class FileSystem {
  static async initialize(cwdDirectory: string): Promise<FileSystem> {
    log.info("Initalizing file system");
    return new FileSystemInitializer(cwdDirectory).initialize(
      FileSystem.create,
    );
  }

  private constructor(
    readonly sourceDirectory: string,
    readonly testDirectory: string,
  ) {}

  private static create(
    sourceDirectory: string,
    testDirectory: string,
  ): FileSystem {
    return new FileSystem(sourceDirectory, testDirectory);
  }

  async createProblemWorkspace(question: Question): Promise<ProblemWorkspace> {
    log.info("Creating problem workspace");
    const testFile = await this.getFileName(this.testDirectory, question);
    const srcFile = await this.getFileName(this.sourceDirectory, question);
    return new ProblemWorkspace(testFile, srcFile, question);
  }

  private async getFileName(
    rootDirectory: string,
    question: Question,
  ): Promise<string> {
    const extension = rootDirectory.includes("test") ? ".test.ts" : ".ts";
    const problemDirectory = [rootDirectory, question.difficulty].join("/");
    if (!(await Bun.file(problemDirectory).exists())) {
      await mkdir(problemDirectory, { recursive: true });
    }
    return [problemDirectory, question.titleSlug].join("/") + extension;
  }
}

export class ProblemWorkspace {
  constructor(
    readonly testFile: string,
    readonly srcFile: string,
    private question: Question,
  ) {}

  async writeTestFileContents() {
    log.info("Writing test file contents");
    const snippet = `
import { describe, expect, test } from "bun:test";

describe("${this.question.title}", () => {
  test("example 1", () => {
    expect(2).toBe(3);
  });

});
    `;

    return Bun.write(this.testFile, snippet);
  }

  async writeSourceFileContents() {
    log.info("Writing source file contents");
    await Bun.write(
      this.srcFile,
      this.question.codeSnippet.replace("function", "export function"),
    );
  }
}

class FileSystemInitializer {
  private static readonly MINFEST_FILE_NAME = "package.json";
  private static readonly SOURCE_DIRECTORY_NAME = "src";
  private static readonly TEST_DIRECTORY_NAME = "test";

  constructor(private cwdDirectory: string) {}

  async initialize(
    factoryMethod: (
      sourceDirectory: string,
      testDirectory: string,
    ) => FileSystem,
  ): Promise<FileSystem> {
    const path = resolve(this.cwdDirectory);
    log.info(`Directory ${this.cwdDirectory} resolved to: ${path}`);
    const rootDirectory = await this.getRoot(path);

    const sourceDirectory = await this.existsOrThrow(
      rootDirectory + FileSystemInitializer.SOURCE_DIRECTORY_NAME,
    );

    const testDirectory = await this.existsOrThrow(
      rootDirectory + FileSystemInitializer.TEST_DIRECTORY_NAME,
    );

    log.info("File system validated");
    return factoryMethod(sourceDirectory, testDirectory);
  }

  async existsOrThrow(directoryName: string): Promise<string> {
    const directoryExists = await exists(directoryName);
    if (!directoryExists) {
      throw new FileSystemError(`Directory does not exist: ${directoryName}`);
    }

    return directoryName;
  }

  async getRoot(directoryName: string): Promise<string> {
    const split = directoryName.split("/");
    while (
      !(await Bun.file(
        `${split.join("/")}/${FileSystemInitializer.MINFEST_FILE_NAME}`,
      ).exists()) &&
      split.pop() !== undefined
    );

    if (split.length === 0) {
      throw new FileSystemError(
        `Could not find root directory from: ${directoryName}`,
      );
    }

    return `${split.join("/")}/`;
  }
}
