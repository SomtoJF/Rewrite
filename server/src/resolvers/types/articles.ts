type GetArticlesResolverArgs = {
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

type UpdateArticleResolverArgs = {
	id: string;
	edits: {
		title?: string;
		description?: string;
		content?: string;
		tags?: string[];
	};
};

export type {
	GetArticlesResolverArgs,
	CreateArticleResolverArgs,
	UpdateArticleResolverArgs,
};
