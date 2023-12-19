type GetArticlesResolverArgs = {
	id: string;
	page: number;
};

type CreateArticleResolverArgs = {
	article: {
		author_id: string;
		title: string;
		description: string;
		content: string;
		tags?: string[];
	};
};

export type { GetArticlesResolverArgs, CreateArticleResolverArgs };
