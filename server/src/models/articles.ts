import mongoose from "mongoose";
import { ArticleInterface } from "./types/article.js";

const articleSchema = new mongoose.Schema<ArticleInterface>(
	{
		_id: {
			type: String,
			required: true,
		},
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
	},
	{ timestamps: true }
);

const Account = mongoose.model("Account", articleSchema, "accounts");
export default Account;
