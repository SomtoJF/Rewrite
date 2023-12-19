import Article from "../../models/articles.js";
import { GetArticlesResolverArgs } from "../types";

const getArticles = async (_: any, args: GetArticlesResolverArgs) =>
	await Article.find()
		.skip(15 * (args.page - 1))
		.limit(15);

export default getArticles;
