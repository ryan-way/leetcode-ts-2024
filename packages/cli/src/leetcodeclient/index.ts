import { CliError } from "../error";
import { logger } from "../util";
import type {
  Client,
  QuestionData,
  QuestionDataMetaData,
  QuestionDataMetaDataParameter,
} from "./client";

export enum Type {
  INTEGER = 0,
  INTEGER_ARRAY = 1,
  INTEGER_2D_ARRAY = 2,
  VOID = 3,
  STRING = 4,
  STRING_ARRAY = 5,
  BOOLEAN = 6,
}

export interface Parameter {
  name: string;
  type: Type;
}

export interface MetaData {
  name: string;
  params: Parameter[];
  return: Type;
}

export interface TestCase {
  input: string;
  output: string;
}

export interface Question {
  categoryTitle: string;
  codeSnippet: string;
  content: string;
  difficulty: string;
  exampleTestcaseList: TestCase[];
  metaData: MetaData;
  questionId: string;
  title: string;
  titleSlug: string;
}

export class LeetcodeClientError extends CliError {}

const log = logger.getSubLogger({ name: "LeetCodeClient" });

export class LeetcodeClient {
  constructor(private client: Client) {}

  async getQuestion(title: string) {
    log.info(`Getting question: ${title}`);
    const result = await this.client.queryQuestion(title);
    if (result.error) {
      throw new LeetcodeClientError(
        `Get Question Query returned error: ${result.error}`,
      );
    }

    if (!result.data) {
      throw new LeetcodeClientError("Get Question Query empty data");
    }

    const question = this.mapQuestionData(result.data.question);

    log.info("Content", question.content);
    log.info("Test case", question.exampleTestcaseList);
    return question;
  }

  private mapQuestionData(questionData: QuestionData): Question {
    const testcaseList = this.getTestCaseList(questionData.content);
    const metaData = this.mapMetaData(questionData.metaData);
    const typeScriptSnippet = questionData.codeSnippets.find(
      (value) => value.langSlug === "typescript",
    );
    if (!typeScriptSnippet) {
      throw new LeetcodeClientError("Typescript code snippet not found");
    }

    return {
      ...questionData,
      difficulty: questionData.difficulty.toLocaleLowerCase(),
      codeSnippet: typeScriptSnippet.code,
      exampleTestcaseList: testcaseList,
      metaData,
    };
  }

  private getTestCaseList(content: string): TestCase[] {
    const inputs = content
      .split("\n")
      .filter((line) => line.includes("Input:"))
      .map((line) =>
        line
          .replace("<strong>Input:</strong> ", "")
          .replaceAll("&quot;", '"')
          .replaceAll(/\w+ = /g, ""),
      );
    log.info("Input", inputs);
    const outputs = content
      .split("\n")
      .filter((line) => line.includes("Output:"))
      .map((line) =>
        line.replace("<strong>Output:</strong> ", "").replaceAll("&quot;", '"'),
      );
    log.info("Output", outputs);

    return inputs.map((input, idx) => {
      return { input, output: outputs[idx] };
    });
  }

  private mapMetaData(metaData: string): MetaData {
    const data = JSON.parse(metaData) as QuestionDataMetaData;
    return {
      name: data.name,
      params: data.params.map(this.mapParam.bind(this)),
      return: this.mapType(data.return.type),
    };
  }

  private mapParam(param: QuestionDataMetaDataParameter): Parameter {
    return {
      name: param.name,
      type: this.mapType(param.type),
    };
  }

  private mapType(type: string): Type {
    switch (type) {
      case "integer":
        return Type.INTEGER;
      case "integer[]":
        return Type.INTEGER_ARRAY;
      case "list<list<integer>>":
        return Type.INTEGER_2D_ARRAY;
      case "void":
        return Type.VOID;
      case "string":
        return Type.STRING;
      case "string[]":
      case "list<string>":
        return Type.STRING_ARRAY;
      case "boolean":
        return Type.BOOLEAN;
      default:
        throw new LeetcodeClientError(`Unsupported type: ${type}`);
    }
  }
}
