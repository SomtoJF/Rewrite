import mongoose from "mongoose";
import { ArticleInterface } from "./types/article.js";

const articleSchema = new mongoose.Schema<ArticleInterface>(
	{
		author_id: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		content: {
			type: String,
			required: true,
		},
		tags: {
			type: [String],
			required: false,
		},
		est_read_time: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Article = mongoose.model("Article", articleSchema, "articles");
export default Article;
