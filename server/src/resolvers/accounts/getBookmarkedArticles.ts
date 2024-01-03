import Article from "../../models/articles.js";
import { AccountInterface } from "../../models/types/account.js";

const getBookmarkedArticles = async (parent: AccountInterface) => {
	const response = await Article.find({
		_id: { $in: parent.bookmarked_articles_id },
	});

	return response;
};

export default getBookmarkedArticles;
