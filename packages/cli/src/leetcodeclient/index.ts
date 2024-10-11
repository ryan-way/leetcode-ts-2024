import { CliError } from "../error";
import type { Client, QuestionData } from "./client";

export enum Type {
  INTEGER = 0,
  INTEGER_ARRAY = 1,
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

export class LeetcodeClient {
  constructor(private client: Client) {}

  async getQuestion(title: string) {
    const result = await this.client.queryQuestion(title);
    if (result.error) {
      throw new LeetcodeClientError(
        `Get Question Query returned error: ${result.error}`,
      );
    }

    if (!result.data) {
      throw new LeetcodeClientError(`Get Question Query empty data`);
    }

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
    const data = JSON.parse(metaData);
    return {
      name: data.name,
      params: data.params.map(this.mapParam.bind(this)),
      return: this.mapType(data.return.type),
    };
  }

  private mapParam(param: any): Parameter {
    return {
      name: param.name,
      type: this.mapType(param.type),
    };
  }

  private mapType(type: any): Type {
    switch (type) {
      case "integer":
        return Type.INTEGER;
      case "integer[]":
        return Type.INTEGER_ARRAY;
      default:
        throw new LeetcodeClientError(`Unsupported type: ${type}`);
    }
  }
}
