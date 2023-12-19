interface ArticleInterface {
	_id: string;
	author_id: string;
	title: string;
	description: string;
	content: string;
	tags?: Array<string>;
}

export type { ArticleInterface };
