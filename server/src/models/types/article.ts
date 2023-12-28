interface ArticleInterface {
	_id: string;
	author_id: string;
	title: string;
	description: string;
	content: string;
	tags: Array<string>;
	est_read_time: string;
	images?: Array<string>;
	thumbnail_url?: string;
}

export type { ArticleInterface };
