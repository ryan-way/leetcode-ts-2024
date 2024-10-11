import { resolve } from "path";
import type { Question } from "../leetcodeclient";
import { mkdir, exists } from "node:fs/promises";
import { CliError } from "../error";
import { Logger } from "tslog";

export enum Difficulty {
    Easy,
    Medium,
    Hard,
}

export class FileSystemError extends CliError {
}

const logger = new Logger();

export class FileSystem {
    private static logger = new Logger();
    private static readonly MINFEST_FILE_NAME = "package.json";
    private static readonly SOURCE_DIRECTORY_NAME = "src";
    private static readonly TEST_DIRECTORY_NAME = "test";

    static async initialize(cwdDirectory: string): Promise<FileSystem> {
        const path = resolve(cwdDirectory);
        logger.info(`Directory ${cwdDirectory} resolved to: ${path}`);
        const rootDirectory = await this.getRoot(path);

        const sourceDirectory = rootDirectory + FileSystem.SOURCE_DIRECTORY_NAME + "/";
        if (!await exists(sourceDirectory)) {
            throw new FileSystemError(`Source Directory does not exist: ${sourceDirectory}`);
        }

        const testDirectory = rootDirectory + FileSystem.TEST_DIRECTORY_NAME + "/";
        if (!await exists(testDirectory)) {
            throw new FileSystemError(`Test Directory does not exist: ${testDirectory}`);
        }

        return new FileSystem(sourceDirectory, testDirectory);
    }

    static async getRoot(directoryName: string): Promise<string> {
        const split = directoryName.split('/');
        while (!(await Bun.file(split.join('/') + '/' + this.MINFEST_FILE_NAME).exists()) && split.pop() !== undefined);

        if (split.length === 0) {
            throw new FileSystemError(`Could not find root directory from: ${directoryName}`);
        }

        return split.join('/') + '/';
    }

    private constructor(
        private sourceDirectory: string,
        private testDirectory: string,
    ) {
    }

    async createProblemWorkspace(question: Question): Promise<ProblemWorkspace> {
        const testFile = await this.getFileName(this.testDirectory, question);
        const srcFile = await this.getFileName(this.sourceDirectory, question);
        return new ProblemWorkspace(testFile, srcFile, question);
    }

    private async getFileName(rootDirectory: string, question: Question): Promise<string> {
        const extension = rootDirectory.includes("test")
            ? ".test.ts"
            : ".ts";
        const problemDirectory = [rootDirectory, question.difficulty].join('/');
        if (!await Bun.file(problemDirectory).exists()) {
            await mkdir(problemDirectory, { recursive: true });
        }
        return [problemDirectory, question.titleSlug].join('/') + extension;
    }
}


export class ProblemWorkspace {
    constructor(
        private testFile: string,
        private srcFile: string,
        private question: Question,
    ) { }


    writeTestFileContents() {

    }

    async writeSourceFileContents() {
        await Bun.write(this.srcFile, this.question.codeSnippet);
    }
}