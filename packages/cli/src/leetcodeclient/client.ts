import {
	type CombinedError,
	Client as UrqlClient,
	fetchExchange,
	gql,
} from "@urql/core";
import { readdir } from "node:fs/promises";

interface QuestionVariables {
	titleSlug: string;
}

interface QuestionResponse {
	question: QuestionData;
}

interface CodeSnippet {
	langSlug: string;
	code: string;
}

export interface QuestionData {
	categoryTitle: string;
	codeSnippets: CodeSnippet[];
	content: string;
	difficulty: string;
	exampleTestcaseList: string[];
	metaData: string;
	questionId: string;
	title: string;
	titleSlug: string;
}

interface QueryResult<T> {
	error?: CombinedError;
	data?: T;
}

const QUESTION_QUERY = gql<QuestionData, QuestionVariables>`${await Bun.file(import.meta.dir + "/GetQuestion.graphql").text()}`;

export interface Client {
	queryQuestion(titleSlug: string): Promise<QueryResult<QuestionResponse>>;
}

export class GraphQlClient implements Client {
	private client: UrqlClient;
	constructor() {
		this.client = new UrqlClient({
			url: "https://leetcode.com/graphql/",
			exchanges: [fetchExchange],
		});
	}

	async queryQuestion(
		titleSlug: string,
	): Promise<QueryResult<QuestionResponse>> {
		const result = await this.client.query<QuestionResponse, QuestionVariables>(
			QUESTION_QUERY,
			{ titleSlug, },
		);
		return {
			error: result.error,
			data: result.data,
		};
	}
}
