import { type Client, type QuestionData } from "./client";

export enum Type {
	INTEGER,
	INTEGER_ARRAY,
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
	questionId: string;
	title: string;
	titleSlug: string;
	difficulty: string;
	categoryTitle: string;
	content: string;
	exampleTestcaseList: TestCase[];
	metaData: MetaData;
}

export class LeetcodeClientError extends Error {
	constructor(message: string) {
		super(message);
	}
}

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

		return {
			...questionData,
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
