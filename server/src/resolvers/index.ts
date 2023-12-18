import Account from "../models/accounts.js";
import { CreateAccountResolverArgs } from "./types/account.js";

type GetByIdArgType = {
	id: string;
};

const resolvers = {
	Query: {
		account: async (_: any, args: GetByIdArgType) =>
			await Account.findById(args.id),
	},
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
	},
};

export default resolvers;
