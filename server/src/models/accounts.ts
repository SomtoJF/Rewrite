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
		banner_picture: {
			type: String,
			required: false,
		},
		bookmarked_articles_id: {
			type: [String],
			required: false,
		},
		bio: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

const Account = mongoose.model("Account", accountSchema, "accounts");
export default Account;
