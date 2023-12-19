import { CreateAccountResolverArgs } from "./account.js";
import { UpdateAccountResolverArgs } from "./account.js";
import { GetArticlesResolverArgs } from "./articles.js";
import { CreateArticleResolverArgs } from "./articles.js";

type GetByIdArgType = {
	id: string;
};

export type {
	GetByIdArgType,
	CreateAccountResolverArgs,
	UpdateAccountResolverArgs,
	GetArticlesResolverArgs,
	CreateArticleResolverArgs,
};
