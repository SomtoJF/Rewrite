type CreateAccountResolverArgs = {
	account: {
		_id: string;
		firstname: string;
		lastname: string;
		profile_picture?: string;
	};
};

export type { CreateAccountResolverArgs };
