interface AccountInterface {
	_id: string;
	firstname: string;
	lastname: string;
	profile_picture?: string;
	// IDs of bookmarked articless
	bookmarked_articles?: string[];
}

export type { AccountInterface };
