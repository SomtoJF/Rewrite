interface AccountInterface {
	_id: string;
	firstname: string;
	lastname: string;
	profile_picture?: string;
	banner_picture?: string;
	// IDs of bookmarked articless
	bookmarked_articles_id?: string[];
}

export type { AccountInterface };
