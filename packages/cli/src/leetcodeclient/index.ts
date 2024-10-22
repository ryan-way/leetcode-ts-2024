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
  input: string[];
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

    log.info("Mapping question data");
    const question = this.mapQuestionData(result.data.question);

    return question;
  }

  private mapQuestionData(questionData: QuestionData): Question {
    const testcaseList = questionData.exampleTestcaseList.map(this.mapTestCase);
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

  private mapTestCase(testCase: string): TestCase {
    return {
      input: testCase.split("\n"),
    };
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
        return Type.STRING_ARRAY;
      default:
        throw new LeetcodeClientError(`Unsupported type: ${type}`);
    }
  }
}
