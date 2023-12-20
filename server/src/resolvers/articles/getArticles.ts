import Article from "../../models/articles.js";
import { GetArticlesResolverArgs } from "../types";

const getArticles = async (_: any, args: GetArticlesResolverArgs) => {
	if (args.page <= 0) throw new Error("Page number must not be less than 1");
	return await Article.find()
		.skip(15 * (args.page - 1))
		.limit(15);
};

export default getArticles;
