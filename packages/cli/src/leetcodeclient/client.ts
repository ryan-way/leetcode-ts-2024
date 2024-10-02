import {
	CombinedError,
	Client as UrqlClient,
	fetchExchange,
	gql,
} from "@urql/core";

interface QuestionVariables {
	titleSlug: string;
}

interface QuestionResponse {
	question: QuestionData;
}

export interface QuestionData {
	questionId: string;
	title: string;
	titleSlug: string;
	difficulty: string;
	categoryTitle: string;
	content: string;
	exampleTestcaseList: string[];
	metaData: string;
}

interface QueryResult<T> {
	error?: CombinedError;
	data?: T;
}

const QUESTION_QUERY = gql<QuestionData, QuestionVariables>`
query GetQuestion($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
        questionId
        title
        titleSlug
        difficulty
        categoryTitle
        content
        exampleTestcaseList
        metaData
    }
}
`;

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
			{ titleSlug: "two-sum" },
		);
		return {
			error: result.error,
			data: result.data,
		};
	}
}
