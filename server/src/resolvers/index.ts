import createAccount from "./accounts/createAccount.js";
import deleteAccount from "./accounts/deleteAccount.js";
import getAccount from "./accounts/getOneAccount.js";
import updateAccount from "./accounts/updateAccount.js";
import getArticle from "./articles/getOneArticle.js";
import getArticles from "./articles/getArticles.js";
import createArticle from "./articles/createArticle.js";
import { ArticleInterface } from "../models/types/article.js";
import Account from "../models/accounts.js";

const resolvers = {
	Query: {
		account: getAccount,
		article: getArticle,
		articles: getArticles,
	},
	Account: {},
	Article: {
		author: async (parent: ArticleInterface) =>
			await Account.findOne({ _id: parent.author_id }),
	},
	Mutation: {
		createAccount: createAccount,
		updateAccount: updateAccount,
		deleteAccount: deleteAccount,
		createArticle: createArticle,
	},
};

export default resolvers;
