import { CreateArticleResolverArgs } from "../types";
import Article from "../../models/articles.js";

async function createArticle(_: any, args: CreateArticleResolverArgs) {
	try {
		const article = new Article(args.article);
		const newArticle = await article.save();
		return newArticle;
	} catch (err) {
		throw new Error(err);
	}
}

export default createArticle;
