import Account from "../../models/accounts.js";
import { ArticleInterface } from "../../models/types/article.js";

const getArticleAuthor = async (parent: ArticleInterface) =>
	await Account.findOne({ _id: parent.author_id });

export default getArticleAuthor;
