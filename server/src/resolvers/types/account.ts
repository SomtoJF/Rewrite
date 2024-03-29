type CreateAccountResolverArgs = {
	account: {
		_id: string;
		firstname: string;
		lastname: string;
		profile_picture?: string;
	};
};

type UpdateAccountResolverArgs = {
	id: string;
	edits: {
		firstname?: string;
		lastname?: string;
		profile_picture?: string;
		banner_picture?: string;
		bookmarked_articles_id?: string[];
		bio?: string;
	};
};

export type { CreateAccountResolverArgs, UpdateAccountResolverArgs };
