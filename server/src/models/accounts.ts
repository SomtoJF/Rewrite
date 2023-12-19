import mongoose from "mongoose";
import { AccountInterface } from "./types/account";

const accountSchema = new mongoose.Schema<AccountInterface>(
	{
		_id: {
			type: String,
			required: true,
		},
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		profile_picture: {
			type: String,
			required: false,
		},
		bookmarked_articles: {
			type: [String],
			required: false,
		},
	},
	{ timestamps: true }
);

const Account = mongoose.model("Account", accountSchema, "accounts");
export default Account;
