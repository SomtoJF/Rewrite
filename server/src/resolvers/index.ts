import Account from "../models/accounts.js";
import {
	CreateAccountResolverArgs,
	UpdateAccountResolverArgs,
} from "./types/account.js";

type GetByIdArgType = {
	id: string;
};

const resolvers = {
	Query: {
		account: async (_: any, args: GetByIdArgType) =>
			await Account.findById(args.id),
	},
	Account: {},
	Mutation: {
		createAccount: async (_: any, args: CreateAccountResolverArgs) => {
			try {
				const account = new Account(args.account);
				console.log(args);
				const newAccount = await account.save();
				return newAccount;
			} catch (err) {
				throw new Error(err);
			}
		},
		deleteAccount: async (_: any, args: GetByIdArgType) =>
			await Account.findByIdAndDelete(args.id),
		updateAccount: async (_: any, args: UpdateAccountResolverArgs) => {
			const accountDetails = await Account.findById(args.id);

			if (args.edits.firstname) accountDetails.firstname = args.edits.firstname;
			if (args.edits.lastname) accountDetails.lastname = args.edits.lastname;
			if (args.edits.profile_picture)
				accountDetails.profile_picture = args.edits.profile_picture;

			try {
				const response = await accountDetails.save();
				return response;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};

export default resolvers;
