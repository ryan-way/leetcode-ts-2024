import { exists, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { CliError } from "../error";
import { type Question, Type } from "../leetcodeclient";
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
    let snippet = `
import { describe, expect, test } from "bun:test";
import { ${this.question.metaData.name} } from "../../src/${this.question.difficulty}/${this.question.titleSlug}";

describe("${this.question.title}", () => {`;
    snippet += this.question.exampleTestcaseList
      .map((testCase, idx) => {
        return `
  test("example ${idx + 1}", () => {
    expect(${this.question.metaData.name}(${testCase.input})).toBe(${testCase.output});
  });
`;
      })
      .join("");

    snippet += `});
    `;

    return Bun.write(this.testFile, snippet);
  }

  async writeSourceFileContents() {
    log.info("Writing source file contents");

    const params = this.question.metaData.params
      .map((param) => `${param.name}: ${this.getTypeName(param.type)}`)
      .join(",");

    await Bun.write(
      this.srcFile,
      `export function ${this.question.metaData.name}(${params}): ${this.getTypeName(this.question.metaData.return)} {
  ${this.getDefaultValueForType(this.question.metaData.return)}
}`,
    );
  }

  private getDefaultValueForType(type: Type): string {
    switch (type) {
      case Type.VOID:
        return "";
      case Type.BOOLEAN:
        return "return false";
      case Type.INTEGER:
        return "return 0";
      case Type.STRING:
        return 'return ""';
      case Type.STRING_ARRAY:
      case Type.INTEGER_ARRAY:
      case Type.INTEGER_2D_ARRAY:
        return "return []";
      default:
        throw new Error(`Unsupported default value: ${type}`);
    }
  }

  private getTypeName(type: Type): string {
    switch (type) {
      case Type.INTEGER:
        return "number";
      case Type.BOOLEAN:
        return "boolean";
      case Type.STRING:
        return "string";
      case Type.INTEGER_ARRAY:
        return "number[]";
      case Type.STRING_ARRAY:
        return "string[]";
      case Type.INTEGER_2D_ARRAY:
        return "number[][]";
      default:
        throw new Error(`Unsupported type name: ${type}`);
    }
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
