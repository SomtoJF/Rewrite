import { CreateAccountResolverArgs } from "../types";
import Account from "../../models/accounts.js";

async function createAccount(_: any, args: CreateAccountResolverArgs) {
	try {
		const account = new Account(args.account);
		console.log(args);
		const newAccount = await account.save();
		return newAccount;
	} catch (err) {
		throw new Error(err);
	}
}

export default createAccount;
