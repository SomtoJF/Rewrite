import Article from "../../models/articles.js";
import { AccountInterface } from "../../models/types/account.js";

const getAccountArticles = async (parent: AccountInterface) => {
	return await Article.find({ author_id: parent._id });
};

export default getAccountArticles;
