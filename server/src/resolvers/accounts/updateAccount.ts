import Account from "../../models/accounts.js";
import { UpdateAccountResolverArgs } from "../types";

async function updateAccount(_: any, args: UpdateAccountResolverArgs) {
	const accountDetails = await Account.findById(args.id);

	if (args.edits.firstname) accountDetails.firstname = args.edits.firstname;
	if (args.edits.lastname) accountDetails.lastname = args.edits.lastname;
	if (args.edits.profile_picture)
		accountDetails.profile_picture = args.edits.profile_picture;
	if (args.edits.banner_picture)
		accountDetails.banner_picture = args.edits.banner_picture;
	try {
		const response = await accountDetails.save();
		return response;
	} catch (err) {
		throw new Error(err);
	}
}

export default updateAccount;
