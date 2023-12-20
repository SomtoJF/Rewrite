import { CreateArticleResolverArgs } from "../types";
import Article from "../../models/articles.js";
import readingTime from "reading-time";

async function createArticle(_: any, args: CreateArticleResolverArgs) {
	try {
		const estimatedReadingTime = readingTime(args.article.content).text;
		const article = new Article({
			...args.article,
			est_read_time: estimatedReadingTime,
		});
		const newArticle = await article.save();
		return newArticle;
	} catch (err) {
		throw new Error(err);
	}
}

export default createArticle;
