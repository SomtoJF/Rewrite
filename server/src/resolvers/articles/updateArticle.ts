import Article from "../../models/articles.js";
import { UpdateArticleResolverArgs } from "../types";
import readingTime from "reading-time";

async function updateArticle(_: any, args: UpdateArticleResolverArgs) {
	const articleDetails = await Article.findById(args.id);

	if (args.edits.title) articleDetails.title = args.edits.title;
	if (args.edits.description)
		articleDetails.description = args.edits.description;
	if (args.edits.content) articleDetails.content = args.edits.content;
	if (args.edits.tags) articleDetails.tags = args.edits.tags;
	articleDetails.est_read_time = readingTime(articleDetails.content).text;

	try {
		const response = await articleDetails.save();
		return response;
	} catch (err) {
		throw new Error(err);
	}
}

export default updateArticle;
