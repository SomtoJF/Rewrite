import createAccount from "./accounts/createAccount.js";
import deleteAccount from "./accounts/deleteAccount.js";
import getAccount from "./accounts/getOneAccount.js";
import updateAccount from "./accounts/updateAccount.js";
import getArticle from "./articles/getOneArticle.js";
import getArticles from "./articles/getArticles.js";
import createArticle from "./articles/createArticle.js";

const resolvers = {
	Query: {
		account: getAccount,
		article: getArticle,
		articles: getArticles,
	},
	Account: {},
	Mutation: {
		createAccount: createAccount,
		updateAccount: updateAccount,
		deleteAccount: deleteAccount,
		createArticle: createArticle,
	},
};

export default resolvers;
