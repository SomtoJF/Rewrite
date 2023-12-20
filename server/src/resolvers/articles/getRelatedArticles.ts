import Article from "../../models/articles.js";
import { ArticleInterface } from "../../models/types/article.js";

// Remove the current article from the result and sort the results by number of tags in common
const getRelatedArticles = async (parent: ArticleInterface) =>
	await Article.aggregate([
		{
			$match: {
				tags: { $in: parent.tags }, // Check if any element in "tags" is present in "parent.tags"
			},
		},
		{
			$addFields: {
				intersectionSize: {
					$size: {
						$setIntersection: ["$tags", parent.tags],
					},
				},
			},
		},
		{
			$sort: { intersectionSize: -1 }, // Sort by intersection size in descending order
		},
		{
			$match: { _id: { $ne: parent._id } }, // Exclude specific ID (optional)
		},
	]);

export default getRelatedArticles;
